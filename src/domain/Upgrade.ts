type UpgradeTarget = 'ATTACK_POWER' | 'ATTACK_RATE' | 'ATTACK_RANGE' | 'HEALTH' | 'KILL_PROBABILITY' | 'LOOT_AMOUNT';

export type UpgradeProps = {
  target: UpgradeTarget;
  label: string;
  amount: number;
  rN: number;
};

class Upgrade {
  target: UpgradeTarget;
  label: string;
  amount: number;
  rN: number;
  totalAmount: number;

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

  increaseResourceNeeded() {
    this.rN = Math.floor(this.rN * 1.5);
  }
}

export default Upgrade;
