export class User {
  protected currentMoney: number;

  constructor(money = 0) {
    this.currentMoney = money;
  }

  updateMoney(dm: number) {
    if (this.currentMoney + dm < 0) return;
    this.currentMoney += dm;
  }

  getCurrentMoney() {
    return this.currentMoney;
  }
}

export default User;
