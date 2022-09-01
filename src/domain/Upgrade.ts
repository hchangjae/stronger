type UpgradeTarget =
  | 'ATTACK_POWER'
  | 'ATTACK_RATE'
  | 'ATTACK_RANGE'
  | 'HEALTH'
  | 'KILL_PROBABILITY'
  | 'LOOT_AMOUNT'; /** ? */

class Upgrade {
  protected isInstant: boolean;
  protected target: UpgradeTarget;
  protected activated: boolean;
  protected amount: number;

  constructor(isInstant: boolean, target: UpgradeTarget, amount: number) {
    this.isInstant = isInstant;
    this.target = target;
    this.activated = false;
    this.amount = amount;
  }

  getIsInstant() {
    return this.isInstant;
  }

  getIsActivated() {
    return this.activated;
  }

  getTarget() {
    return this.target;
  }

  getAmount() {
    return this.amount;
  }

  activate() {
    this.activated = true;
  }
}

export default Upgrade;
