import { imageAssets, Sprite } from 'kontra';

import Weapon from '../weapon/Weapon';
import Upgrade from './Upgrade';
import Unit from './Unit';
import Resource from './Resource';

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
  protected resource: Resource;
  protected weapons: Weapon[];
  protected upgrades: Upgrade[];

  constructor({ name, image, resource, weapons, life }: UserProps) {
    super(life);
    this.name = name;
    this.image = image;
    this.resource = new Resource(resource);
    this.weapons = weapons;
    this.generation = 1;
    this.upgrades = [];
  }

  setResource(dm: number) {
    const currentResource = this.resource.getResource();
    if (currentResource + dm < 0) return;
    this.resource.update(currentResource + dm);
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

  getUpgrades() {
    return this.upgrades;
  }

  addUpgrade(upgrade: Upgrade) {
    this.upgrades = [...this.upgrades, upgrade];
  }

  applyUpgrades() {
    this.upgrades
      .filter((upgrade) => !upgrade.getIsActivated())
      .forEach((upgrade) => {
        const amount = upgrade.getAmount();
        switch (upgrade.getTarget()) {
          case 'ATTACK_POWER':
            this.weapons.forEach((weapon) => weapon.increaseAttackPower(amount));
            break;
          case 'ATTACK_RANGE':
            this.weapons.forEach((weapon) => weapon.setAttackRange(weapon.getAttackRange() * (1 + amount / 100)));
            break;
          case 'ATTACK_RATE':
            this.weapons.forEach((weapon) => weapon.setAttackRate(weapon.getAttackRate() * (1 + amount / 100)));
            break;
          case 'KILL_PROBABILITY':
            this.weapons.forEach((weapon) => weapon.setKillProbability(weapon.getAttackPower() * (1 + amount / 100)));
            break;
          case 'HEALTH':
            this.life *= 1 + amount / 100;
            break;
          default:
        }
        upgrade.activate();
        upgrade.increaseResourceNeeded();
      });
  }

  render() {
    Sprite({
      image: imageAssets[this.image],
      x: 10,
      y: 140,
      scaleX: 1,
      scaleY: 1,
    }).render();
    this.weapons.forEach((weapon) => weapon.render());
  }

  update(dt: number): void {
    this.weapons.forEach((w) => w.update(dt));
    this.applyUpgrades();
  }
}

export default User;
