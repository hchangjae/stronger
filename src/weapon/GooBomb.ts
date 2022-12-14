import { Text } from 'kontra';
import { GROUND_POSITION, particles, TOWER_POSITION } from '../main';
import Unit from '../unit/Unit';
import Weapon from './Weapon';

export default class GooBomb extends Weapon {
  constructor() {
    super({
      name: 'goobomb',
      aP: 0,
      aR: 800,
      slowPower: 0.5,
      sR: 50,
      fCT: 1,
    });
  }

  fire(enemy: Unit) {
    this.fireTimer = 0;

    // 총알 생성
    let bullet = Text({
      text: '🎾',
      x: TOWER_POSITION,
      y: 160,
      width: 10,
      height: 10,
      anchor: { x: 0.5, y: 0.5 },
      sp: 10,
      followEnemy: true,
      slowPower: this.slowPower,
      aP: this.aP,
      sR: this.sR,
      targetEnemy: enemy,
    });

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
          color: 'green',
          ttl: 40,
          opacity: 1,
          rotation: Math.random() * 2 * Math.PI,
        });
      }
    };

    return bullet;
  }
}
