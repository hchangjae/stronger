import { angleToTarget, GameObject, imageAssets, Sprite } from 'kontra';
import { TOWER_POSITION } from '../main';
import Weapon from './Weapon';

export default class PlasmaGun extends Weapon {
  constructor() {
    super({
      name: 'plasma-gun',
      targets: ['air', 'land'],
      attackPower: 3,
      attackRange: 400,
      splashRadius: 0,
      fireCooltime: 30,
    });
  }

  fire(enemy: GameObject) {
    if (!this.canFire()) return null;

    // 총알 생성
    const bullet = Sprite({
      image: imageAssets['assets/plasma.png'],
      x: TOWER_POSITION,
      y: 100,
      width: 3,
      height: 3,
      speed: 10,
      targetEnemy: enemy,
    });

    return bullet;
  }
}
