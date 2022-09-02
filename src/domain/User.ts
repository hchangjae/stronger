import { imageAssets, Sprite } from 'kontra';

import Weapon from '../weapon/Weapon';
import Upgrade from './Upgrade';
import Unit from './Unit';

type UserProps = {
  name: string;
  image: string;
  resource: number;
  weapons: Weapon[];
  life: number;
};
class User extends Unit {
  protected name: string;
  protected image: string;
  protected resource: number;
  protected weapons: Weapon[];
  protected generation: number;
  protected upgrades: Upgrade[];

  constructor({ name, image, resource, weapons, life }: UserProps) {
    super(life);
    this.name = name;
    this.image = image;
    this.resource = resource;
    this.weapons = weapons;
    this.generation = 1;
    this.upgrades = [];
  }

  setResource(dm: number) {
    if (this.resource + dm < 0) return;
    this.resource += dm;
  }

  getResource() {
    return this.resource;
  }

  getWeapons() {
    return this.weapons;
  }

  addWeapon(newWeapon: Weapon) {
    this.weapons = [...this.weapons, newWeapon];
  }

  increaseGeneration(dg = 1) {
    this.generation += dg;
  }

  applyUpgrades() {
    this.upgrades.forEach(upgrade => {
      const amount = upgrade.getAmount();
      switch (upgrade.getTarget()) {
        case 'ATTACK_POWER':
          this.weapons.forEach(weapon => weapon.setAttackPower(amount));
          break;
        case 'ATTACK_RANGE':
          this.weapons.forEach(weapon => weapon.setAttackRange(amount));
          break
        case 'ATTACK_RATE':
          this.weapons.forEach(weapon => weapon.setAttackRate(amount));
          break;
        case 'KILL_PROBABILITY':
          this.weapons.forEach(weapon => weapon.setKillProbability(amount));
          break;
        case 'HEALTH':
          this.life += amount;
          break;
        default:
      }
      upgrade.activate();
    })
    this.filterInstantUpgrade();
  }

  render() {
    Sprite({
      image: imageAssets[this.image],
      x: 10,
      y: 140,
      scaleX: 2,
      scaleY: 2,
    }).render();
    this.weapons.forEach(weapon => weapon.render());
  }

  private filterInstantUpgrade() {
    this.upgrades = this.upgrades.filter(
      (upgrade) => !(upgrade.getIsInstant() || upgrade.getIsActivated())
    );
  }
}

export default User;
