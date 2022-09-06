import { imageAssets, Sprite } from 'kontra';
import { TOWER_POSITION } from '../main';
import Unit from '../unit/Unit';
import Weapon from './Weapon';

export default class PlasmaGun extends Weapon {
  constructor() {
    super({
      name: 'plasma-gun',
      targets: ['air', 'land'],
      attackPower: 3,
      attackRange: 500,
      killProbaility: 1,
      splashRadius: 0,
      fireCooltime: 0.6,
    });
  }

  fire(enemy: Unit) {
    if (!this.canFire()) return null;
    this.fireTimer = 0;

    // 총알 생성
    const bullet = Sprite({
      image: imageAssets['assets/plasma.png'],
      x: TOWER_POSITION,
      y: 160,
      width: 10,
      height: 17,
      anchor: { x: 0.5, y: 0.5 },
      speed: 10,
      followEnemy: true,
      attackPower: this.attackPower,
      splashRadius: this.splashRadius,
      targetEnemy: enemy,
    });

    return bullet;
  }
}
