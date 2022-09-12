import { GameObjectClass } from 'kontra';

class Unit extends GameObjectClass {
  protected life: number;

  constructor(life: number) {
    super();
    this.life = life;
  }

  getLife() {
    return this.life;
  }

  setLife(dl: number) {
    this.life += dl;
  }

  getIsDead() {
    return this.life <= 0;
  }
}

export default Unit;
