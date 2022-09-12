type UpgradeTarget = 'ATTACK_POWER' | 'ATTACK_RATE' | 'ATTACK_RANGE' | 'HEALTH' | 'KILL_PROBABILITY' | 'LOOT_AMOUNT';

export type UpgradeProps = {
  target: UpgradeTarget;
  label: string;
  amount: number;
  rN: number;
};

class Upgrade {
  protected target: UpgradeTarget;
  protected label: string;
  protected amount: number;
  protected rN: number;
  protected totalAmount: number;

  constructor({ target, label, amount, rN, totalAmount = 0 }: UpgradeProps & { totalAmount?: number }) {
    this.target = target;
    this.label = label;
    this.amount = amount;
    this.rN = rN;
    this.totalAmount = totalAmount;
  }

  getTarget() {
    return this.target.toString();
  }

  getLabel() {
    return this.label;
  }

  getAmount() {
    return this.amount;
  }

  setAmount(amount: number) {
    this.amount = amount;
  }

  getResourceNeeded() {
    return this.rN;
  }

  increaseResourceNeeded() {
    this.rN = Math.floor(this.rN * 1.5);
  }

  getTotalAmount() {
    return this.totalAmount;
  }

  setTotalAmount(totalAmount: number) {
    this.totalAmount = totalAmount;
  }
}

export default Upgrade;
