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
    $('.upgrades .weapons')?.appendChild(this.button);

    this.render();
  }

  onButtonClick = () => {
    if (this.user.getResource().getResource() < this.weapon.resourceNeeded) return;

    const w = new this.weapon.weaponClass();
    this.user.addWeapon(w, this.weapon);
  };

  update() {
    const el = this.button.querySelector('.resource')!;
    el.innerHTML = `👻 ${this.weapon.resourceNeeded}`;

    if (!this.user) return;

    const resource = this.user.getResource().getResource();

    if (resource < this.weapon.resourceNeeded) {
      this.button.classList.add('notenough');
    } else {
      this.button.classList.remove('notenough');
    }
  }

  render() {
    this.button.innerHTML = `
      <div>
        ${this.weapon.label} 
        <span class="resource">👻 ${this.weapon.resourceNeeded}</span>
      </div>
    `;
  }
}

export default WeaponButton;
