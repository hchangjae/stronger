import { init, GameLoop, loadImage, Pool, emit } from 'kontra';
import { initUnitSpriteSheets } from './component/spriteSheet';
import PlasmaGun from './weapon/PlasmaGun';
import Game from './controller/Game';
import { appendUpgradeWeapon } from './controller/Button';
import Upgrade from './domain/Upgrade';
import PASSIVES from './data/upgrade/passive';
import User from './domain/User';
import WEAPONS from './data/upgrade/weapons';
import TitleScene from './title';
import Particle from './domain/Particle';
import EndScene from './end';
import Weapon from './weapon/Weapon';

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
  loadImage('assets/bat.png'),
  loadImage('assets/golem.png'),
]).then(() => {
  let started = false;
  let passiveUpgrades: Upgrade[] = [];

  const init = () => {
    const user = new User({
      name: 'jackie',
      image: 'assets/tower.png',
      // weapons: [new PlasmaGun()],
      weapons: [],
      resource: 20,
      life: 100,
    });
    passiveUpgrades = PASSIVES.map((passive) => new Upgrade(user, passive));
    WEAPONS.forEach((weapon) => {
      appendUpgradeWeapon(weapon, () => {
        const w = new weapon.weaponClass();
        user.addWeapon(w);
        user.setResource(-1 * weapon.resourceNeeded);
      });
    });
    return new Game(user, canvas);
  };

  initUnitSpriteSheets();

  let game = init();

  const onClickStartButton = (restart = false) => {
    started = true;
    if (restart) {
      game = init();
    }
    game.start();
  };

  const titleScene = TitleScene(onClickStartButton);
  const endScene = EndScene(game, () => {
    onClickStartButton(true);
  });

  const loop = GameLoop({
    update: (dt) => {
      if (!started) {
        titleScene.update();
        return;
      } else if (game.getUser().getIsDead()) {
        game.end();
        endScene.update();
        return;
      }
      game.update(dt);
      particles.update();
      passiveUpgrades.forEach((upgrade) => upgrade.update());
    },
    render: () => {
      if (!started) {
        titleScene.render();
        return;
      } else if (game.getUser().getIsDead()) {
        endScene.render();
        return;
      }
      game.render();
      particles.render();
    },
  });
  loop.start();
});
