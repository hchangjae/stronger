import Upgrade from '../domain/Upgrade';
import { $ } from '../util';
import User from '../domain/User';

export type UpgradeProps = {
  upgrade: Upgrade;
  user: User;
};

class UpgradeButton {
  protected upgrade: Upgrade;
  protected user: User;

  private button: HTMLButtonElement;

  constructor({ upgrade, user }: UpgradeProps) {
    this.upgrade = upgrade;
    this.user = user;

    this.button = document.createElement('button');
    this.button.classList.add('button');
    this.button.addEventListener('click', this.onButtonClick);
    $('.ups .pa')?.appendChild(this.button);

    this.render();
  }

  onButtonClick = () => {
    if (this.user.getResource().getResource() < this.upgrade.getResourceNeeded()) return;

    this.user.addUpgrade(this.upgrade);

    let valueLabel = $('.' + this.upgrade.getTarget())!;
    valueLabel.innerHTML = `+${this.upgrade.getTotalAmount()}%`;
  };

  update() {
    let el = this.button.querySelector('.resource')!;
    el.innerHTML = `👻 ${this.upgrade.getResourceNeeded()}`;

    if (!this.user) return;

    let resource = this.user.getResource().getResource();

    if (resource < this.upgrade.getResourceNeeded()) {
      this.button.classList.add('notenough');
    } else {
      this.button.classList.remove('notenough');
    }
  }

  render() {
    this.button.innerHTML = `
      <div>
        ${this.upgrade.getLabel()} 
        <span class="amount">+${this.upgrade.getAmount()}%</span> 
        <span class="resource">👻 ${this.upgrade.getResourceNeeded()}</span>
      </div>
    `;
  }
}

export default UpgradeButton;
