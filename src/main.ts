import { init, GameLoop, loadImage, Pool } from 'kontra';
import { initUnitSpriteSheets } from './component/spriteSheet';
import PlasmaGun from './weapon/PlasmaGun';
import Game from './controller/Game';
import Upgrade from './domain/Upgrade';
import PASSIVES from './data/upgrade/passive';
import User from './domain/User';
import WEAPONS from './data/upgrade/weapons';
import Particle from './domain/Particle';
import UpgradeButton from './controller/UpgradeButton';
import WeaponButton from './controller/WeaponButton';

export const TOWER_POSITION = 100;
export const AIR_POSITION = 180;
export const GROUND_POSITION = 220;

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
  loadImage('assets/bat.png'),
  loadImage('assets/golem.png'),
]).then(() => {
  const game = new Game(
    new User({
      name: 'jackie',
      image: 'assets/tower.png',
      weapons: [new PlasmaGun()],
      resource: 20,
      life: 100,
      upgrades: PASSIVES.map((passive) => new Upgrade(passive)),
    }),
    canvas
  );

  const user = game.getUser();

  const upgradeButtons = user.getUpgrades().map((upgrade) => new UpgradeButton({ upgrade, user }));
  const weaponButtons = WEAPONS.map((weapon) => new WeaponButton({ weapon, user }));

  initUnitSpriteSheets();

  const loop = GameLoop({
    update: (dt) => {
      game.update(dt);
      particles.update();
      upgradeButtons.forEach((button) => button.update());
      weaponButtons.forEach((button) => button.update());
    },
    render: () => {
      game.render();
      particles.render();
    },
  });
  loop.start();
});
