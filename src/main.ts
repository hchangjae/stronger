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
import { createUnit, initUnitSpriteSheets } from './component/unit';
import waves from './component/waves';
import PlasmaGun from './weapon/PlasmaGun';
import Weapon from './weapon/Weapon';

export const TOWER_POSITION = 100;

const { canvas } = init();

const renderList: GameObject[] = [];

// Weapons built into the tower.
const weaponList: Weapon[] = [new PlasmaGun()];

// Bullets
let bulletList: GameObject[] = [];

const addRender = (obj: GameObject) => renderList.push(obj);
const subRender = (obj: GameObject) =>
  renderList.splice(renderList.indexOf(obj), 1);

const startAt = Date.now();
const getPlayTime = () => Date.now() - startAt;

// Compute the distance from the tower to the given enemy.
const getDistanceFromTower = (enemy: GameObject) => enemy.x - TOWER_POSITION;

const buttonList: ButtonArgs[] = [
  {
    text: 'Strengthen walls +30%',
    price: 100,
  },
  {
    text: 'Enhance damage +30%',
    price: 100,
  },
  {
    text: 'Add laser cannon',
    price: 100000
  },
]
initPointer();

const buttonGrid = createButtonGrid(buttonList, {x: 0, y: 400});

Promise.all([
  loadImage('assets/Slime.png'),
  loadImage('assets/plasma.png'),
]).then(() => {
  initUnitSpriteSheets();

  const loop = GameLoop({
    update: (dt) => {
      if (
        waves[waves.length - 1] &&
        getPlayTime() > waves[waves.length - 1].at
      ) {
        const summon = waves.pop();
        addRender(
          createUnit({
            scale: 20,
            speed: -1.5,
            x: canvas.width - 1,
            y: 280,
            color: 'red',
          })
        );
      }

      renderList.forEach((item) => {
        // Stop at the tower.
        if (item.x < TOWER_POSITION) {
          item.x = TOWER_POSITION;
        }

        // For each weapon, fire at the enemy if the conditions are met.
        weaponList.forEach((w) => {
          w.update(dt);

          if (w.isInRange(getDistanceFromTower(item))) {
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

        const distance = Math.sqrt(
          Math.pow(enemy.x - bullet.x, 2) + Math.pow(enemy.y - bullet.y, 2)
        );
        bullet.x += ((enemy.x - bullet.x) / distance) * bullet.speed;
        bullet.y += ((enemy.y - bullet.y) / distance) * bullet.speed;

        bullet.rotation = angleToTarget({ x: bullet.x, y: bullet.y }, enemy);

        if (collides(bullet, enemy)) {
          bullet.ttl = 0;
          bulletList = bulletList.filter((b) => b.isAlive());
        }

        bullet.update(dt);
      });
    },
    render: () => {
      renderList.forEach((item) => item.render());
      bulletList.forEach((bullet) => bullet.render());
      buttonGrid.render();
    },
  });
  loop.start();
});
