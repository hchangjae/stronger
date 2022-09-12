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
import { $ } from './util';

export const TOWER_POSITION = 100;
export const AIR_POSITION = 180;
export const GROUND_POSITION = 220;

export const particles = Pool({
  // @ts-ignore
  create: Particle,
});

const { canvas } = init();

Promise.all([
  loadImage('images/tower.png'),
  loadImage('images/slime.png'),
  loadImage('images/slime2.png'),
  loadImage('images/slime3.png'),
  loadImage('images/plasma.png'),
  loadImage('images/smoke.png'),
  loadImage('images/ground.png'),
  loadImage('images/bat.png'),
  loadImage('images/golem.png'),
  loadImage('images/goobomb.png'),
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

  const initGame = (inherit: boolean) => {
    if (!(user && inherit)) {
      console.log('NEW TRIAL');
      user = new User({
        name: 'jackie',
        image: 'images/tower.png',
        weapons: [new PlasmaGun()],
        resource: 30000,
        life: 1,
        upgrades: passiveUpgradeMap,
      });
    } else {
      console.log('INHERIT');
      user.inherit();
    }
    upgradeButtons = [...user.getUpgrades().values()].map((upgrade) => new UpgradeButton({ upgrade, user }));
    [...user.getUpgrades().values()].forEach((upgrade) => {
      const valueLabel = $('.' + upgrade.getTarget())!;
      valueLabel.innerHTML = `+${upgrade.getTotalAmount()}%`;
    });

    weaponButtons = WEAPONS.map((weapon) => new WeaponButton({ weapon, user }));
    [...user.getWeapons().values()].forEach((weapon) => {
      const valueLabel = $('.' + weapon.getName())!;
      valueLabel.innerHTML = `X${user.getWeaponCount(weapon.getName())}`;
    });
    game = new Game(user, canvas);
    game.start();
    return game;
  };

  const setGameScene = (inherit = false) => sceneManager.set(initGame(inherit));

  initUnitSpriteSheets();

  sceneManager.set(TitleScene(setGameScene));

  const loop = GameLoop({
    update: (dt) => {
      if (user?.getIsDead() && game.isRunning()) {
        sceneManager.set(
          EndScene(
            game,
            () => setGameScene(true),
            () => setGameScene(false)
          )
        );
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
