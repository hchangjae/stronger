import { GameObjectClass } from 'kontra';

class Unit extends GameObjectClass {
  life: number;

  constructor(life: number) {
    super();
    this.life = life;
  }

  setLife(dl: number) {
    this.life += dl;
  }

  getIsDead() {
    return this.life <= 0;
  }
}

export default Unit;
