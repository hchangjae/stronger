import {
  init,
  GameLoop,
  loadImage,
} from 'kontra';
import { initUnitSpriteSheets } from './component/spriteSheet';
import PlasmaGun from './weapon/PlasmaGun';
import Game from './controller/Game';
import { appendUpgradePassive } from './controller/Button';
import Upgrade from './domain/Upgrade';
import PASSIVES from './data/upgrade/passive';
import User from './domain/User';

export const TOWER_POSITION = 100;

const { canvas } = init();

Promise.all([
  loadImage('assets/tower.png'),
  loadImage('assets/Slime.png'),
  loadImage('assets/plasma.png'),
  loadImage('assets/smoke.png'),
]).then(() => {
  const game = new Game(new User({
    name: 'jackie',
    image: 'assets/tower.png',
    weapons: [new PlasmaGun()],
    resource: 100,
    life: 100,
  }), canvas);

  const user = game.getUser();

  initUnitSpriteSheets();

  PASSIVES.forEach((passive) => {
    const upgrade = new Upgrade(passive);
    appendUpgradePassive(upgrade, () => {
      user.addUpgrade(upgrade);
      user.setResource(-1 * upgrade.getResourceNeeded());
    });
  });

  const loop = GameLoop({
    update: (dt) => {
      game.update(dt);
    },
    render: () => {
      game.render();
    },
  });
  loop.start();
});
