import { GameObjectClass, Sprite } from 'kontra';

import Enemy from '../unit/Enemy';
import GameWave from '../wave/Wave';

class Corp extends GameObjectClass {
  protected enemies: Enemy[];
  protected soul: Sprite[];
  protected canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.enemies = [];
    this.soul = [];
    this.canvas = canvas;
  }

  isDestroyed() {
    return this.getAliveEnemies().length === 0;
  }

  getCount() {
    return this.enemies.length;
  }

  getAliveEnemies() {
    return this.enemies.filter((enemy) => !enemy.isDone());
  }

  buildUp(wave: GameWave) {
    const summon = wave.summon();
    this.enemies = [
      ...this.enemies,
      new Enemy({
        name: summon?.type,
        x: this.canvas.width - 1,
        y: 160 + Math.round(Math.random() * 50),
      }),
    ];
  }

  update() {
    this.enemies.forEach((enemy) => enemy.update());
    this.enemies = this.enemies.filter((enemy) => !enemy.isDone());
  }

  render(): void {
    this.enemies.forEach((enemy) => enemy.render());
  }
}

export default Corp;
