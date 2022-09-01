class Unit {
  protected life: number;

  constructor(life: number) {
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