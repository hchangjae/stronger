type UpgradeTarget =
  | 'ATTACK_POWER'
  | 'ATTACK_RATE'
  | 'ATTACK_RANGE'
  | 'HEALTH'
  | 'KILL_PROBABILITY'
  | 'LOOT_AMOUNT'; /** ? */

export type UpgradeProps = {
  isPassive: boolean;
  target: UpgradeTarget;
  label: string;
  amount: number;
  resourceNeeded: number;
};

class Upgrade {
  protected isPassive: boolean;
  protected target: UpgradeTarget;
  protected label: string;
  protected activated: boolean;
  protected amount: number;
  protected resourceNeeded: number;

  constructor({ isPassive, target, label, amount, resourceNeeded }: UpgradeProps) {
    this.isPassive = isPassive;
    this.target = target;
    this.label = label;
    this.activated = false;
    this.amount = amount;
    this.resourceNeeded = resourceNeeded;
  }

  getIsInstant() {
    return this.isPassive;
  }

  getIsActivated() {
    return this.activated;
  }

  getTarget(): string {
    return this.target.toString();
  }

  getLabel() {
    return this.label;
  }

  getAmount() {
    return this.amount;
  }

  getResourceNeeded() {
    return this.resourceNeeded;
  }

  activate() {
    this.activated = true;
  }
}

export default Upgrade;
