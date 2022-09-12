import { Sprite } from 'kontra';
import { GROUND_POSITION, particles, TOWER_POSITION } from '../main';
import Unit from '../unit/Unit';
import Weapon from './Weapon';

export default class ElectricFence extends Weapon {
  constructor() {
    super({
      name: 'electric-fence',
      targets: ['land', 'air'],
      aP: 2,
      aR: 30,
      killProbaility: 1,
      sR: 0,
      fCT: 1,
    });
  }

  fire(enemy: Unit) {
    this.fireTimer = 0;

    // 총알 생성
    let bullet = Sprite({
      x: TOWER_POSITION,
      y: GROUND_POSITION - 40,
      ddy: 500,
      dx: 10,
      width: 10,
      height: 10,
      anchor: { x: 0.5, y: 0.5 },
      sp: 5,
      followEnemy: false,
      aP: this.aP,
      sR: this.sR,
      targetPosition: enemy.Sprite.x,
    });

    bullet.onDestroy = () => {
      let p = {
        width: 2,
        height: 2,
        color: 'white',
        ttl: 40,
        opacity: 1,
        rotation: Math.random() * 2 * Math.PI,
      };

      for (let i = 0; i < 10; i++) {
        particles.get({
          ...p,
          x: TOWER_POSITION + i,
          y: GROUND_POSITION - i,
        });

        particles.get({
          ...p,
          x: TOWER_POSITION + i,
          y: GROUND_POSITION - i - 10,
        });

        particles.get({
          ...p,
          x: TOWER_POSITION + i,
          y: GROUND_POSITION - i - 20,
        });
      }

      for (let i = 10; i < 20; i++) {
        particles.get({
          ...p,
          x: TOWER_POSITION + i,
          y: GROUND_POSITION - 20 + i,
        });

        particles.get({
          ...p,
          x: TOWER_POSITION + i,
          y: GROUND_POSITION - 20 + i - 10,
        });

        particles.get({
          ...p,
          x: TOWER_POSITION + i,
          y: GROUND_POSITION - 20 + i - 20,
        });
      }

      for (let i = 20; i < 30; i++) {
        particles.get({
          ...p,
          x: TOWER_POSITION + i,
          y: GROUND_POSITION + 20 - i,
        });

        particles.get({
          ...p,
          x: TOWER_POSITION + i,
          y: GROUND_POSITION + 20 - i - 10,
        });

        particles.get({
          ...p,
          x: TOWER_POSITION + i,
          y: GROUND_POSITION + 20 - i - 20,
        });
      }
    };

    return bullet;
  }
}
