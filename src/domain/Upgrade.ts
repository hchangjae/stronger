type UpgradeTarget =
  | 'ATTACK_POWER'
  | 'ATTACK_RATE'
  | 'ATTACK_RANGE'
  | 'HEALTH'
  | 'KILL_PROBABILITY'
  | 'LOOT_AMOUNT'; /** ? */

export type UpgradeProps = {
  isPassive: boolean;
  target: UpgradeTarget,
  amount: number;
}

class Upgrade {
  protected isPassive: boolean;
  protected target: UpgradeTarget;
  protected activated: boolean;
  protected amount: number;

  constructor({isPassive, target, amount}: UpgradeProps) {
    this.isPassive = isPassive;
    this.target = target;
    this.activated = false;
    this.amount = amount;
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

  getAmount() {
    return this.amount;
  }

  activate() {
    this.activated = true;
  }
}

export default Upgrade;
