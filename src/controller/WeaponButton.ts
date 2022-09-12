import { $ } from '../util';
import User from '../domain/User';
import { WeaponUpgradeType } from '../data/upgrade/weapons';

export type WeaponProps = {
  weapon: WeaponUpgradeType;
  user: User;
};

class WeaponButton {
  protected weapon: WeaponUpgradeType;
  protected user: User;

  private button: HTMLButtonElement;

  constructor({ weapon, user }: WeaponProps) {
    this.weapon = weapon;
    this.user = user;

    this.button = document.createElement('button');
    this.button.classList.add('button');
    this.button.addEventListener('click', this.onButtonClick);
    $('.ups .ws')?.appendChild(this.button);

    this.render();
  }

  onButtonClick = () => {
    if (this.user.getResource().getResource() < this.weapon.rN) return;

    let w = new this.weapon.weaponClass();
    this.user.addWeapon(w, this.weapon);

    let valueLabel = $(`.${w.getName()}`)!;
    valueLabel.innerHTML = `X${this.user.getWeaponCount(w.getName())}`;
  };

  update() {
    let el = this.button.querySelector('.resource')!;
    el.innerHTML = `👻 ${this.weapon.rN}`;

    if (!this.user) return;

    let resource = this.user.getResource().getResource();

    if (resource < this.weapon.rN) {
      this.button.classList.add('notenough');
    } else {
      this.button.classList.remove('notenough');
    }
  }

  render() {
    this.button.innerHTML = `
      <div>
        ${this.weapon.label} 
        <span class="resource">👻 ${this.weapon.rN}</span>
      </div>
    `;
  }
}

export default WeaponButton;
