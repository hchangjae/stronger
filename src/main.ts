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
import scene from './controller/Scene';
import TitleScene from './title';
import EndScene from './end';

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
  const passiveUpgradeMap = new Map<string, Upgrade>();
  let upgradeButtons: UpgradeButton[];
  let weaponButtons: WeaponButton[];

  PASSIVES.forEach((passive) => {
    passiveUpgradeMap.set(passive.target, new Upgrade(passive));
  });

  const sceneManager = scene();
  let user: User;
  let game: Game;

  const initGame = () => {
    user = new User({
      name: 'jackie',
      image: 'assets/tower.png',
      weapons: [new PlasmaGun()],
      resource: 20,
      life: 100,
      upgrades: passiveUpgradeMap,
    });
    upgradeButtons = [...user.getUpgrades().values()].map((upgrade) => new UpgradeButton({ upgrade, user }));
    weaponButtons = WEAPONS.map((weapon) => new WeaponButton({ weapon, user }));
    game = new Game(user, canvas);
    game.start();
    return game;
  }

  const setGameScene = () => sceneManager.set(initGame());

  initUnitSpriteSheets();

  sceneManager.set(TitleScene(setGameScene));

  const loop = GameLoop({
    update: (dt) => {
      if (user?.getIsDead()) {
        sceneManager.set(EndScene(game, setGameScene));
      }
      sceneManager.update(dt);
      particles.update();
      upgradeButtons?.forEach((button) => button.update());
      weaponButtons?.forEach((button) => button.update());
    },
    render: () => {
      sceneManager.render();
      particles.render();
    },
  });
  loop.start();
});
