import {
  init,
  GameLoop,
  GameObject,
  loadImage,
  angleToTarget,
  collides,
} from 'kontra';
import { initUnitSpriteSheets } from './component/spriteSheet';
import PlasmaGun from './weapon/PlasmaGun';
import Game from './controller/Game';
import GameWave, { waveRecipes } from './wave/Wave';
import Enemy from './unit/enemy';
import Bullet from './domain/Bullet';
import { appendUpgradePassive } from './controller/Button';
import Upgrade from './domain/Upgrade';
import PASSIVES from './data/upgrade/passive';
import User from './domain/User';

export const TOWER_POSITION = 100;

const { canvas } = init();

let enemyList: Enemy[] = [];

// GameWave
const gameWave = new GameWave(waveRecipes);

// Compute the distance from the tower to the given enemy.
const getDistanceFromTower = (enemy: GameObject) => enemy.x - TOWER_POSITION;

Promise.all([
  loadImage('assets/tower.png'),
  loadImage('assets/Slime.png'),
  loadImage('assets/plasma.png'),
  loadImage('assets/smoke.png'),
]).then(() => {
  const game = new Game(new User({
    name: 'jackie',
    image: 'assets/tower.png',
    weapons: [new PlasmaGun()],
    resource: 100,
    life: 100,
  }), enemyList);

  const user = game.getUser();
  const weapons = user.getWeapons();

  initUnitSpriteSheets();

  PASSIVES.forEach((passive) => {
    const upgrade = new Upgrade(passive);
    appendUpgradePassive(upgrade, () => {
      user.addUpgrade(upgrade);
      user.setResource(-1 * upgrade.getResourceNeeded());
    });
  });

  const loop = GameLoop({
    update: (dt) => {
      // console.log(gameWave.level);
      // next level
      if (enemyList.length === 0 && gameWave.isWaveDone()) gameWave.next();

      if (gameWave.isReadyToSummon()) {
        const summon = gameWave.summon();

        enemyList.push(
          new Enemy({
            name: summon?.type,
            x: canvas.width - 1,
            y: 160 + Math.round(Math.random() * 10),
          })
        );
      }

      weapons.forEach((w) => w.update(dt));

      enemyList = enemyList.filter((e) => !e.isDone());
      enemyList.forEach((item) => {
        // Stop at the tower.
        if (item.Sprite.x < TOWER_POSITION) {
          item.stop();
        }

        // For each weapon, fire at the enemy if the conditions are met.
        weapons.forEach((w) => {
          if (w.isInRange(getDistanceFromTower(item.Sprite))) {
            if (w.canFire() && item.isAlive()) {
              const bullet = w.fire(item) as Bullet;

              if (bullet) w.reload(bullet);
            }
          }
        });

        item.update();
      });

      weapons.forEach((weapon) => {
        const bulletList = weapon.getBulltes();
        bulletList.forEach((bullet) => {
          const enemy = bullet.targetEnemy;
          const eSprite = enemy.Sprite;

          const distance = Math.sqrt(
            Math.pow(eSprite.x - bullet.x, 2) +
              Math.pow(eSprite.y - bullet.y, 2)
          );
          bullet.x += ((eSprite.x - bullet.x) / distance) * bullet.speed;
          bullet.y += ((eSprite.y - bullet.y) / distance) * bullet.speed;

          bullet.rotation = angleToTarget(
            { x: bullet.x, y: bullet.y },
            eSprite
          );

          if (collides(bullet, eSprite)) {
            enemy.hit(bullet.attackPower);
            bullet.ttl = 0;
            weapon.setBullets(bulletList.filter((b) => b.isAlive()));
          }

          bullet.update(dt);
        });
      });

      game.update(dt);
    },
    render: () => {
      game.render();
      enemyList.forEach((item) => item.render());
    },
  });
  loop.start();
});
