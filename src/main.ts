import { init, GameLoop, Pool } from 'kontra';
import PlasmaGun from './weapon/PlasmaGun';
import Game from './controller/Game';
import Upgrade from './domain/Upgrade';
import PASSIVES from './data/upgrade/passive';
import User from './domain/User';
import WEAPONS from './data/upgrade/weapons';
import Particle from './domain/Particle';
import UpgradeButton from './controller/UpgradeButton';
import scene from './controller/Scene';
import TitleScene from './title';
import EndScene from './end';
import { $ } from './util';

export let TOWER_POSITION = 100;
export let AIR_POSITION = 180;
export let GROUND_POSITION = 220;

export let particles = Pool({
  // @ts-ignore
  create: Particle,
});

let { canvas } = init();

Promise.all([]).then(() => {
  let passiveUpgradeMap = new Map<string, Upgrade>();
  let upgradeButtons: UpgradeButton[];
  let weaponButtons: UpgradeButton[];

  PASSIVES.forEach((passive) => {
    passiveUpgradeMap.set(passive.target, new Upgrade(passive));
  });

  let sceneManager = scene();
  let user: User;
  let game: Game;

  let initGame = (inherit: boolean) => {
    if (!(user && inherit)) {
      console.log('NEW TRIAL');
      user = new User({
        name: 'jackie',
        ws: [new PlasmaGun()],
        resource: 30,
        life: 100,
        ups: passiveUpgradeMap,
      });
    } else {
      console.log('INHERIT');
      user.inherit();
    }
    upgradeButtons = [...user.ups.values()].map((upgrade) => new UpgradeButton({ upgrade, user }));
    [...user.ups.values()].forEach((upgrade) => {
      let valueLabel = $('.' + upgrade.getTarget())!;
      valueLabel.innerHTML = `+${upgrade.totalAmount}%`;
    });

    // @ts-ignore
    weaponButtons = WEAPONS.map((upgrade) => new UpgradeButton({ upgrade, user }));
    [...user.ws.values()].forEach((weapon) => {
      let valueLabel = $('.' + weapon.name)!;
      valueLabel.innerHTML = `x${user.getWeaponCount(weapon.name)}`;
    });
    game = new Game(user, canvas);
    game.start();
    return game;
  };

  let setGameScene = (inherit = false) => sceneManager.set(initGame(inherit));

  sceneManager.set(TitleScene(setGameScene));

  let loop = GameLoop({
    update: (dt) => {
      if (user?.getIsDead() && game.running) {
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
