import { Text } from 'kontra';
import { TOWER_POSITION } from '../main';
import Unit from '../unit/Unit';
import Weapon from './Weapon';

export default class PlasmaGun extends Weapon {
  constructor() {
    super({
      name: 'plasma-gun',
      aP: 3,
      aR: 500,
      sR: 0,
      fCT: 0.6,
    });
  }

  fire(enemy: Unit) {
    this.fireTimer = 0;

    // 총알 생성
    let bullet = Text({
      text: '⚽️',
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
