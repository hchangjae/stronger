import {
  init,
  GameLoop,
  GameObject,
  loadImage,
  angleToTarget,
  collides,
  initPointer,
} from 'kontra';
import { ButtonArgs } from './component/button';
import createButtonGrid from './component/buttonGrid';
import { initUnitSpriteSheets } from './component/spriteSheet';
import PlasmaGun from './weapon/PlasmaGun';
import infoScene from './scene/info';
import Game from './controller/Game';
import GameWave, { waveRecipes } from './wave/Wave';
import Enemy from './unit/enemy';
import Bullet from './domain/Bullet';

export const TOWER_POSITION = 100;

const { canvas } = init();

let enemyList: Enemy[] = [];

// GameWave
const gameWave = new GameWave(waveRecipes);

// Compute the distance from the tower to the given enemy.
const getDistanceFromTower = (enemy: GameObject) => enemy.x - TOWER_POSITION;

const game = new Game({ userName: 'jackie', userImage: '' });
const user = game.getUser();

initPointer();
const buttonList: ButtonArgs[] = [
  {
    text: 'Strengthen walls +30%',
    price: 100,
    onClick: () => {
      user.setResource(-100);
    },
  },
  {
    text: 'Enhance damage +30%',
    price: 100,
    onClick: () => {
      user.setResource(-100);
    },
  },
  {
    text: 'Add laser cannon',
    price: 100000,
    onClick: () => {
      user.setResource(-100000);
    },
  },
];

const buttonGrid = createButtonGrid(buttonList, { x: 0, y: 400 });

Promise.all([
  loadImage('assets/tower.png'),
  loadImage('assets/Slime.png'),
  loadImage('assets/plasma.png'),
  loadImage('assets/smoke.png'),
]).then(() => {
  const game = new Game({
    userName: 'jackie',
    userImage: 'assets/tower.png',
    userWeapons: [new PlasmaGun()],
  });

  const user = game.getUser();
  const weapons = user.getWeapons();

  initUnitSpriteSheets();

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
            y: 310,
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
    },
    render: () => {
      game.render();
      enemyList.forEach((item) => item.render());
      buttonGrid.render();
      infoScene(user.getResource(), 1, 3).render();
    },
  });
  loop.start();
});
