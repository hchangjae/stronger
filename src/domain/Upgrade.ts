type UpgradeTarget = 'ATTACK_POWER' | 'ATTACK_RATE' | 'ATTACK_RANGE' | 'HEALTH' | 'KILL_PROBABILITY' | 'LOOT_AMOUNT';

export type UpgradeProps = {
  target: UpgradeTarget;
  label: string;
  amount: number;
  resourceNeeded: number;
};

class Upgrade {
  protected target: UpgradeTarget;
  protected label: string;
  protected amount: number;
  protected resourceNeeded: number;
  protected totalAmount: number;

  constructor({ target, label, amount, resourceNeeded, totalAmount = 0 }: UpgradeProps & { totalAmount?: number }) {
    this.target = target;
    this.label = label;
    this.amount = amount;
    this.resourceNeeded = resourceNeeded;
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
    return this.resourceNeeded;
  }

  increaseResourceNeeded() {
    this.resourceNeeded = Math.floor(this.resourceNeeded * 1.5);
  }

  getTotalAmount() {
    return this.totalAmount;
  }

  setTotalAmount(totalAmount: number) {
    this.totalAmount = totalAmount;
  }
}

export default Upgrade;
