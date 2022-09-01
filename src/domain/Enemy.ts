import Unit from "./unit";

class Enemy extends Unit {
  protected power: number;

  constructor({life, power}: Enemy) {
    super(life);
    this.power = power;
  }

  getPower() {
    return this.power;
  }
}

export default Enemy;
