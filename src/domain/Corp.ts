import { GameObjectClass, Sprite } from 'kontra';
import { AIR_POSITION, GROUND_POSITION } from '../main';

import Enemy, { isAir } from '../unit/Enemy';
import GameWave from '../wave/Wave';

class Corp extends GameObjectClass {
  protected es: Enemy[];
  protected soul: Sprite[];
  protected canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.es = [];
    this.soul = [];
    this.canvas = canvas;
  }

  isDestroyed() {
    return this.getAliveEnemies().length === 0;
  }

  getCount() {
    return this.es.length;
  }

  getAliveEnemies() {
    return this.es.filter((enemy) => !enemy.isDone());
  }

  buildUp(wave: GameWave) {
    let summon = wave.summon();
    this.es = [
      ...this.es,
      new Enemy({
        name: summon?.ty,
        x: this.canvas.width - 1,
        y: isAir(summon?.ty) ? AIR_POSITION : GROUND_POSITION,
      }),
    ];
  }

  update(dt: number) {
    this.es.forEach((enemy) => enemy.update(dt));
    this.es = this.es.filter((enemy) => !enemy.isDone());
  }

  render(): void {
    this.es.forEach((enemy) => enemy.render());
  }
}

export default Corp;
