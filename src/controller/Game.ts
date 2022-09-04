import { GameObjectClass } from 'kontra';
import User from '../domain/User';
import Enemy from '../unit/enemy';

class Game extends GameObjectClass {
  protected user: User;
  protected wave: number;
  protected enemies: Enemy[];

  constructor(user: User, enemies: Enemy[]) {
    super();
    this.user = user;
    this.wave = 1;
    this.enemies = enemies;
  }

  getUser() {
    return this.user;
  }

  passWave() {
    this.setWave();
  }

  getWave() {
    return this.wave;
  }

  setEnemies(enemies: Enemy[]) {
    this.enemies = enemies;
  }

  render() {
    this.user.render();
  }

  private setWave(dw = 1) {
    this.wave += dw;
  }
}

export default Game;
