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
      fireCooltime: 20,
    });
  }

  fire(enemy: GameObject) {
    if (!this.canFire()) return null;

    this.fireTimer = 0;

    // 총알 생성
    const bullet = Sprite({
      image: imageAssets['assets/plasma.png'],
      x: TOWER_POSITION,
      y: 100,
      width: 3,
      height: 3,
      anchor: { x: 0.5, y: 0.5 },
      speed: 10,
      targetEnemy: enemy,
    });

    return bullet;
  }
}
