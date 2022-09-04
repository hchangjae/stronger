import { GameObjectClass } from 'kontra';
import { TOWER_POSITION } from '../main';

import Enemy from '../unit/Enemy';
import GameWave from '../wave/Wave';

class Corp extends GameObjectClass {
  protected enemies: Enemy[];
  protected canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.enemies = [];
    this.canvas = canvas;
  }

  getCount() {
    return this.enemies.length;
  }

  getAliveEnemies() {
    return this.enemies.filter(enemy => !enemy.isDone());
  }

  buildUp(wave: GameWave) {
    const summon = wave.summon();
    this.enemies = [
      ...this.enemies,
      new Enemy({
        name: summon?.type,
        x: this.canvas.width - 1,
        y: 160 + Math.round(Math.random() * 10),
      }),
    ];
  }

  move() {
    const aliveEnemies = this.getAliveEnemies();
    aliveEnemies.forEach(enemy => {
      if (enemy.Sprite.x < TOWER_POSITION) {
        enemy.stop();
      }
    })
  }

  update() {
    this.enemies.forEach(enemy => enemy.update());
  }

  render(): void {
    this.enemies.forEach(enemy => enemy.render());
  }
}

export default Corp;
