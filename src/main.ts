import { init, GameLoop, loadImage } from 'kontra';
import { initUnitSpriteSheets } from './component/spriteSheet';
import PlasmaGun from './weapon/PlasmaGun';
import Game from './controller/Game';
import { appendUpgradePassive, appendUpgradeWeapon } from './controller/Button';
import Upgrade from './domain/Upgrade';
import PASSIVES from './data/upgrade/passive';
import User from './domain/User';
import WEAPONS from './data/upgrade/weapons';
import TitleScene from './title';

export const TOWER_POSITION = 100;

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
  let started = false;

  const clickStartButton = () => {
    started = true;
  };

  const game = new Game(
    new User({
      name: 'jackie',
      image: 'assets/tower.png',
      weapons: [new PlasmaGun()],
      resource: 100000,
      life: 100,
    }),
    canvas
  );
  const user = game.getUser();

  initUnitSpriteSheets();

  PASSIVES.forEach((passive) => {
    const upgrade = new Upgrade(passive);
    appendUpgradePassive(upgrade, () => {
      user.addUpgrade(upgrade);
      user.setResource(-1 * upgrade.getResourceNeeded());
    });
  });

  WEAPONS.forEach((weapon) => {
    appendUpgradeWeapon(weapon, () => {
      const w = new weapon.weaponClass();
      user.addWeapon(w);
      user.setResource(-1 * weapon.resourceNeeded);
    });
  });

  const loop = GameLoop({
    update: (dt) => {
      if (!started) {
        TitleScene(clickStartButton).update();
        return;
      }
      game.update(dt);
    },
    render: () => {
      if (!started) {
        TitleScene(clickStartButton).render();
        return;
      }
      game.render();
    },
  });
  loop.start();
});
