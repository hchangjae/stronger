import Upgrade from '../domain/Upgrade';
import { $ } from '../util';
import User from '../domain/User';
import { WeaponUpgradeType } from '../data/upgrade/weapons';

export type UpgradeProps = {
  upgrade: Upgrade;
  user: User;
};

class UpgradeButton {
  // @ts-ignore
  upgrade: Pick<Upgrade, 'rN' | 'label'> | WeaponUpgradeType;
  // @ts-ignore
  user: User;
  // @ts-ignore
  b: HTMLButtonElement;

  constructor({ upgrade, user }: UpgradeProps) {
    let T = this;

    T.upgrade = upgrade;
    T.user = user;

    T.b = document.createElement('button');
    T.b.classList.add('button');
    T.b.addEventListener('click', T.onButtonClick);

    const selector = T.upgrade instanceof Upgrade ? '.ups .pa' : '.ups .ws';
    $(selector)?.appendChild(T.b);

    T.render();
  }

  onButtonClick = () => {
    let T = this;
    if (T.user.resource.r < T.upgrade.rN) return;

    if (T.upgrade instanceof Upgrade) {
      T.user.addUpgrade(T.upgrade);

      let valueLabel = $('.' + T.upgrade.getTarget())!;
      valueLabel.innerHTML = `+${T.upgrade.totalAmount}%`;
    } else {
      // @ts-ignore
      let w = new T.upgrade.weaponClass();
      // @ts-ignore
      T.user.addWeapon(w, T.upgrade);

      let valueLabel = $(`.${w.name}`)!;
      valueLabel.innerHTML = `x${T.user.getWeaponCount(w.name)}`;
    }
  };

  update() {
    let T = this;
    let el = T.b.querySelector('.resource')!;
    el.innerHTML = `👻 ${T.upgrade.rN}`;

    if (!T.user) return;

    let resource = T.user.resource.r;

    if (resource < T.upgrade.rN) {
      T.b.classList.add('notenough');
    } else {
      T.b.classList.remove('notenough');
    }
  }

  render() {
    let T = this;
    T.b.innerHTML = `
      <div>
        ${T.upgrade.label} 
        ${T.upgrade instanceof Upgrade ? `<span class="amount">+${T.upgrade.amount}%</span>` : ''}
        <span class="resource">👻 ${T.upgrade.rN}</span>
      </div>
    `;
  }
}

export default UpgradeButton;
