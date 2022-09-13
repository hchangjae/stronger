import Upgrade from '../domain/Upgrade';
import { $ } from '../util';
import User from '../domain/User';
import { WeaponUpgradeType } from '../data/upgrade/weapons';

export type UpgradeProps = {
  upgrade: Upgrade;
  user: User;
};

class UpgradeButton {
  upgrade: Pick<Upgrade, 'rN' | 'label'> | WeaponUpgradeType;
  user: User;

  b: HTMLButtonElement;

  constructor({ upgrade, user }: UpgradeProps) {
    this.upgrade = upgrade;
    this.user = user;

    this.b = document.createElement('button');
    this.b.classList.add('button');
    this.b.addEventListener('click', this.onButtonClick);

    const selector = this.upgrade instanceof Upgrade ? '.ups .pa' : '.ups .ws';
    $(selector)?.appendChild(this.b);

    this.render();
  }

  onButtonClick = () => {
    if (this.user.resource.r < this.upgrade.rN) return;

    if (this.upgrade instanceof Upgrade) {
      this.user.addUpgrade(this.upgrade);

      let valueLabel = $('.' + this.upgrade.getTarget())!;
      valueLabel.innerHTML = `+${this.upgrade.getTotalAmount()}%`;
    } else {
      // @ts-ignore
      let w = new this.upgrade.weaponClass();
      // @ts-ignore
      this.user.addWeapon(w, this.upgrade);

      let valueLabel = $(`.${w.name}`)!;
      valueLabel.innerHTML = `x${this.user.getWeaponCount(w.name)}`;
    }
  };

  update() {
    let el = this.b.querySelector('.resource')!;
    el.innerHTML = `👻 ${this.upgrade.rN}`;

    if (!this.user) return;

    let resource = this.user.resource.r;

    if (resource < this.upgrade.rN) {
      this.b.classList.add('notenough');
    } else {
      this.b.classList.remove('notenough');
    }
  }

  render() {
    this.b.innerHTML = `
      <div>
        ${this.upgrade.label} 
        ${this.upgrade instanceof Upgrade ? `<span class="amount">+${this.upgrade.amount}%</span>` : ''}
        <span class="resource">👻 ${this.upgrade.rN}</span>
      </div>
    `;
  }
}

export default UpgradeButton;
