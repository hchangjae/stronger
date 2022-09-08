import { init, GameLoop, loadImage, Pool } from 'kontra';
import { initUnitSpriteSheets } from './component/spriteSheet';
import PlasmaGun from './weapon/PlasmaGun';
import Game from './controller/Game';
import { appendUpgradeWeapon } from './controller/Button';
import Upgrade from './domain/Upgrade';
import PASSIVES from './data/upgrade/passive';
import User from './domain/User';
import WEAPONS from './data/upgrade/weapons';
import Particle from './domain/Particle';

export const TOWER_POSITION = 100;

export const particles = Pool({
  // @ts-ignore
  create: Particle,
});

const { canvas } = init();

Promise.all([
  loadImage('assets/tower.png'),
  loadImage('assets/slime.png'),
  loadImage('assets/slime2.png'),
  loadImage('assets/slime3.png'),
  loadImage('assets/plasma.png'),
  loadImage('assets/smoke.png'),
  loadImage('assets/cannon.png'),
  loadImage('assets/ground.png'),
]).then(() => {
  const game = new Game(
    new User({
      name: 'jackie',
      image: 'assets/tower.png',
      weapons: [new PlasmaGun()],
      resource: 20,
      life: 100,
    }),
    canvas
  );

  const user = game.getUser();

  initUnitSpriteSheets();

  const passiveUpgrades = PASSIVES.map((passive) => new Upgrade(user, passive));

  WEAPONS.forEach((weapon) => {
    appendUpgradeWeapon(weapon, () => {
      const w = new weapon.weaponClass();
      user.addWeapon(w);
      user.setResource(-1 * weapon.resourceNeeded);
    });
  });

  const loop = GameLoop({
    update: (dt) => {
      game.update(dt);
      particles.update();
      passiveUpgrades.forEach((upgrade) => upgrade.update());
    },
    render: () => {
      game.render();
      particles.render();
    },
  });
  loop.start();
});
