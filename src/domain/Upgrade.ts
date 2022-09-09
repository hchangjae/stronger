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

  constructor({ target, label, amount, resourceNeeded }: UpgradeProps) {
    this.target = target;
    this.label = label;
    this.amount = amount;
    this.resourceNeeded = resourceNeeded;
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
}

export default Upgrade;
