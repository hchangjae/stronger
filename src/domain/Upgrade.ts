type UpgradeTarget = 'ATTACK_POWER' | 'ATTACK_RATE' | 'ATTACK_RANGE' | 'HEALTH' | 'KILL_PROBABILITY' | 'LOOT_AMOUNT';

export type UpgradeProps = {
  target: UpgradeTarget;
  label: string;
  amount: number;
  rN: number;
};

class Upgrade {
  // @ts-ignore
  target: UpgradeTarget;
  // @ts-ignore
  label: string;
  // @ts-ignore
  amount: number;
  // @ts-ignore
  rN: number;
  // @ts-ignore
  totalAmount: number;

  constructor({ target, label, amount, rN, totalAmount = 0 }: UpgradeProps & { totalAmount?: number }) {
    let T = this;
    T.target = target;
    T.label = label;
    T.amount = amount;
    T.rN = rN;
    T.totalAmount = totalAmount;
  }

  getTarget() {
    return this.target.toString();
  }

  increaseResourceNeeded() {
    this.rN = Math.floor(this.rN * 1.5);
  }
}

export default Upgrade;
