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
      attackRange: 400,
      attackRate: 1,
      killProbaility: 1,
      splashRadius: 0,
      fireCooltime: 0.3,
    });
  }

  fire(enemy: Unit) {
    if (!this.canFire()) return null;
    this.fireTimer = 0;

    // 총알 생성
    const bullet = Sprite({
      image: imageAssets['assets/plasma.png'],
      x: TOWER_POSITION + 40,
      y: 170,
      width: 20,
      height: 33,
      anchor: { x: 0.5, y: 0.5 },
      speed: 10,
      attackPower: this.attackPower,
      splashRadius: this.splashRadius,
      targetEnemy: enemy,
    });

    return bullet;
  }
}
