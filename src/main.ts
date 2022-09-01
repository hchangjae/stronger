import {
  init,
  GameLoop,
  GameObject,
  loadImage,
  angleToTarget,
  collides,
  initPointer,
  Text,
  Sprite,
  imageAssets,
} from 'kontra';
import { ButtonArgs } from './component/button';
import createButtonGrid from './component/buttonGrid';
import { initUnitSpriteSheets } from './component/spriteSheet';
import PlasmaGun from './weapon/PlasmaGun';
import Weapon from './weapon/Weapon';
import User from './player/user';
import Enemy from './unit/Enemy';
import GameWave, { waveRecipes } from './wave/Wave';

export const TOWER_POSITION = 100;

const { canvas } = init();

let enemyList: Enemy[] = [];

// Weapons built into the tower.
const weaponList: Weapon[] = [new PlasmaGun()];

// Bullets
let bulletList: GameObject[] = [];

// Statics
const staticList: GameObject[] = [];

// GameWave
const gameWave = new GameWave(waveRecipes);

// Compute the distance from the tower to the given enemy.
const getDistanceFromTower = (enemy: GameObject) => enemy.x - TOWER_POSITION;

const user = new User(1000000);

initPointer();
const buttonList: ButtonArgs[] = [
  {
    text: 'Strengthen walls +30%',
    price: 100,
    onClick: () => {
      user.updateMoney(-100);
    },
  },
  {
    text: 'Enhance damage +30%',
    price: 100,
    onClick: () => {
      user.updateMoney(-100);
    },
  },
  {
    text: 'Add laser cannon',
    price: 100000,
    onClick: () => {
      user.updateMoney(-100000);
    },
  },
];

const buttonGrid = createButtonGrid(buttonList, { x: 0, y: 400 });

Promise.all([
  loadImage('assets/tower.png'),
  loadImage('assets/Slime.png'),
  loadImage('assets/plasma.png'),
]).then(() => {
  staticList.push(
    Sprite({
      image: imageAssets['assets/tower.png'],
      x: 10,
      y: 140,
      scaleX: 2,
      scaleY: 2,
    })
  );

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
            y: 280 + Math.round(Math.random() * 20),
          })
        );
      }

      weaponList.forEach((w) => {
        w.update(dt);
      });

      enemyList.forEach((item) => {
        // Stop at the tower.
        if (item.Sprite.x < TOWER_POSITION) {
          item.stop();
        }

        // For each weapon, fire at the enemy if the conditions are met.
        weaponList.forEach((w) => {
          if (w.isInRange(getDistanceFromTower(item.Sprite))) {
            if (w.canFire()) {
              const bullet = w.fire(item);

              if (bullet) bulletList.push(bullet);
            }
          }
        });

        item.update();
      });

      bulletList.forEach((bullet) => {
        const enemy = bullet.targetEnemy;
        const eSprite = enemy.Sprite;

        const distance = Math.sqrt(
          Math.pow(eSprite.x - bullet.x, 2) + Math.pow(eSprite.y - bullet.y, 2)
        );
        bullet.x += ((eSprite.x - bullet.x) / distance) * bullet.speed;
        bullet.y += ((eSprite.y - bullet.y) / distance) * bullet.speed;

        bullet.rotation = angleToTarget({ x: bullet.x, y: bullet.y }, eSprite);

        if (collides(bullet, eSprite)) {
          enemy.hit(bullet.attackPower);
          bullet.ttl = 0;
          bulletList = bulletList.filter((b) => b.isAlive());
          enemyList = enemyList.filter((e) => e.isAlive());
        }

        bullet.update(dt);
      });
    },
    render: () => {
      staticList.forEach((item) => item.render());
      enemyList.forEach((item) => item.render());
      bulletList.forEach((bullet) => bullet.render());
      buttonGrid.render();
      Text({
        text: user.getCurrentMoney(),
        x: 0,
        y: 0,
        color: 'white',
      }).render();
    },
  });
  loop.start();
});
