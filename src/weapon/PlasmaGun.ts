import { imageAssets, Sprite } from 'kontra';
import { TOWER_POSITION } from '../main';
import Unit from '../unit/Unit';
import Weapon from './Weapon';

export default class PlasmaGun extends Weapon {
  constructor() {
    super({
      name: 'plasma-gun',
      targets: ['air', 'land'],
      aP: 3,
      aR: 500,
      killProbaility: 1,
      sR: 0,
      fCT: 0.6,
    });
  }

  fire(enemy: Unit) {
    this.fireTimer = 0;

    // 총알 생성
    let bullet = Sprite({
      image: imageAssets['images/plasma.png'],
      x: TOWER_POSITION,
      y: 160,
      width: 10,
      height: 17,
      anchor: { x: 0.5, y: 0.5 },
      sp: 10,
      followEnemy: true,
      aP: this.aP,
      sR: this.sR,
      targetEnemy: enemy,
    });

    return bullet;
  }
}
