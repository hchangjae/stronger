import { $ } from '../util';
import User from './User';

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
  protected button: HTMLButtonElement;

  private user: User;

  constructor(user: User, { isPassive, target, label, amount, resourceNeeded }: UpgradeProps) {
    this.isPassive = isPassive;
    this.target = target;
    this.label = label;
    this.activated = false;
    this.amount = amount;
    this.resourceNeeded = resourceNeeded;
    this.user = user;

    this.button = document.createElement('button');
    this.button.classList.add('button');
    this.button.addEventListener('click', this.onButtonClick);
    $('.upgrades .passives')?.appendChild(this.button);

    this.render();
  }

  onButtonClick = () => {
    if (this.user.getResource().getResource() < this.resourceNeeded) return;

    this.user.addUpgrade(this);
    this.user.setResource(-1 * this.resourceNeeded);
  };

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

  increaseResourceNeeded() {
    this.resourceNeeded = Math.floor(this.resourceNeeded * 1.5);
  }

  activate() {
    this.activated = true;
  }

  update() {
    const el = this.button.querySelector('.resource')!;
    el.innerHTML = `👻 ${this.resourceNeeded}`;

    const resource = this.user.getResource().getResource();

    if (resource < this.resourceNeeded) {
      this.button.classList.add('notenough');
    } else {
      this.button.classList.remove('notenough');
    }
  }

  render() {
    this.button.innerHTML = `
      <div>
        ${this.getLabel()} 
        <span class="amount">+${this.getAmount()}%</span> 
        <span class="resource">👻 ${this.resourceNeeded}</span>
      </div>
    `;
  }
}

export default Upgrade;
