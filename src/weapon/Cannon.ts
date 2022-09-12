import { imageAssets, Sprite } from 'kontra';
import { GROUND_POSITION, particles, TOWER_POSITION } from '../main';
import Unit from '../unit/Unit';
import Weapon from './Weapon';

export default class Cannon extends Weapon {
  constructor() {
    super({
      name: 'cannon',
      targets: ['land'],
      attackPower: 8,
      attackRange: 800,
      killProbaility: 1,
      splashRadius: 50,
      fireCooltime: 3,
    });
  }

  fire(enemy: Unit) {
    this.fireTimer = 0;

    // 총알 생성
    const bullet = Sprite({
      image: imageAssets['images/cannon.png'],
      x: TOWER_POSITION,
      y: 160,
      ddy: 500,
      dy: -300,
      dx: enemy.Sprite.x * 0.5,
      width: 10,
      height: 10,
      anchor: { x: 0.5, y: 0.5 },
      speed: 5,
      followEnemy: false,
      attackPower: this.attackPower,
      splashRadius: this.splashRadius,
      targetPosition: enemy.Sprite.x,
    });

    bullet.onFly = () => {
      for (let i = 1; i < 2; i++) {
        particles.get({
          x: bullet.x + bullet.width / 2,
          y: bullet.y + bullet.height / 2,
          width: 6,
          height: 6,
          color: '#666',
          ttl: 20,
          opacity: 1,
          rotation: Math.random() * 2 * Math.PI,
        });
      }
    };

    bullet.onDestroy = () => {
      for (let i = 1; i < 20; i++) {
        particles.get({
          x: bullet.x + bullet.width / 2,
          y: GROUND_POSITION,
          dx: (Math.random() - 0.5) * 4,
          dy: Math.random() * 2 * -2,
          ddy: 0.1,
          width: 4,
          height: 4,
          color: 'orange',
          ttl: 40,
          opacity: 1,
          rotation: Math.random() * 2 * Math.PI,
        });
      }
    };

    return bullet;
  }
}
