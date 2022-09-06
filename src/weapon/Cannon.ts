import { imageAssets, Sprite } from 'kontra';
import { TOWER_POSITION } from '../main';
import Unit from '../unit/Unit';
import Weapon from './Weapon';

export default class Cannon extends Weapon {
  constructor() {
    super({
      name: 'cannon',
      targets: ['land'],
      attackPower: 8,
      attackRange: 600,
      killProbaility: 1,
      splashRadius: 40,
      fireCooltime: 2,
    });
  }

  fire(enemy: Unit) {
    if (!this.canFire()) return null;
    this.fireTimer = 0;

    // 총알 생성
    const bullet = Sprite({
      image: imageAssets['assets/cannon.png'],
      x: TOWER_POSITION,
      y: 160,
      ddy: 50,
      dy: -80,
      dx: enemy.Sprite.x / 10,
      width: 10,
      height: 10,
      anchor: { x: 0.5, y: 0.5 },
      speed: 5,
      followEnemy: false,
      attackPower: this.attackPower,
      splashRadius: this.splashRadius,
      targetPosition: enemy.Sprite.x,
    });

    return bullet;
  }
}
