import { imageAssets, Sprite } from 'kontra';

import Weapon from '../weapon/Weapon';
import Upgrade from './Upgrade';
import Unit from './Unit';
import Resource from './Resource';
import { updateResource } from '../controller/Info';
import { WeaponUpgradeType } from '../data/upgrade/weapons';

const WEAPON_CHANGE_COOL = 0.1;

type UserProps = {
  name: string;
  image: string;
  resource: number;
  weapons: Weapon[];
  life: number;
  upgrades: Map<string, Upgrade>;
};

class User extends Unit {
  protected name: string;
  protected image: string;
  protected resource: Resource;
  protected weapons: Weapon[];
  protected upgrades: Map<string, Upgrade>;

  private fireCoolTime: number;
  private fireTimer: number;
  private generation: number;
  private upgradesInital: Map<string, Upgrade>;
  private resourceInital: number;
  private lifeBase: number;
  private lifeMax: number;
  private Sprite: Sprite;

  constructor({ name, image, resource, weapons, life, upgrades }: UserProps) {
    const width = 55;
    const height = 85;

    super(life);
    this.name = name;
    this.image = image;
    this.image = image;
    this.resource = new Resource(resource);
    this.weapons = weapons;
    this.lifeMax = life;
    this.lifeBase = life;
    this.generation = 1;
    this.fireTimer = 0;
    this.fireCoolTime = WEAPON_CHANGE_COOL;
    this.resourceInital = resource;
    this.upgradesInital = this.upgrades = upgrades;

    this.Sprite = Sprite({
      image: imageAssets[this.image],
      x: 50,
      y: 130,
      width,
      height,
      scaleX: 1,
      scaleY: 1,
    });

    const getLife = () => super.getLife();
    const getLifeMax = () => this.lifeMax;
    const HPSprite = Sprite({
      x: 1,
      y: 1,
      width: width - 2,
      height: 5,
      color: 'red',
      update: function () {
        this.width = Math.max(((width - 2) * getLife()) / getLifeMax(), 0);
      },
    });

    const HPWrapSprite = Sprite({
      x: 0,
      y: -10,
      width,
      height: 7,
      color: '#fff',
    });

    HPWrapSprite.addChild(HPSprite);
    this.Sprite.addChild(HPWrapSprite);
  }

  inherit() {
    this.life = this.lifeMax;
    this.resource = new Resource(this.resourceInital);
    this.upgrades = new Map(this.upgradesInital);
    this.generation += 1;
  }

  setResource(dm: number) {
    const currentResource = this.resource.getResource();
    if (currentResource + dm < 0) return;
    this.resource.update(currentResource + dm);
  }

  getGeneration() {
    return this.generation;
  }

  getResource() {
    return this.resource;
  }

  getWeapons() {
    return this.weapons;
  }

  coolDownFire() {
    this.fireTimer = 0;
  }

  addWeapon(newWeapon: Weapon, weaponData: WeaponUpgradeType) {
    this.weapons = [...this.weapons, newWeapon];

    this.setResource(-1 * weaponData.resourceNeeded);
    weaponData.resourceNeeded *= 2;

    updateResource(this.resource.getResource());
  }

  getUpgrades() {
    return this.upgrades;
  }

  addUpgrade(upgrade: Upgrade) {
    const u = this.upgrades.get(upgrade.getTarget());

    if (u) {
      if (u.getTarget() === 'HEALTH') {
        this.life = this.lifeBase * (1 + u.getAmount());
        this.lifeMax = this.lifeBase * (1 + u.getAmount());
      }
      this.setResource(-1 * u.getResourceNeeded());
      u.setTotalAmount(u.getTotalAmount() + upgrade.getAmount());
      u.increaseResourceNeeded();

      updateResource(this.resource.getResource());
    }
  }

  calculateBulletDamage(damage: number) {
    const u = this.upgrades.get('ATTACK_POWER');
    const amount = u ? u.getTotalAmount() : 0;

    if (amount === 0) return damage;

    return Math.ceil(damage * (1 + amount / 100));
  }

  calculateIsInRange(weapon: Weapon, distance: number) {
    const u = this.upgrades.get('ATTACK_RANGE');
    const amount = u ? u.getTotalAmount() : 0;
    const range = Math.ceil(weapon.getAttackRange() * (1 + amount / 100));

    return distance <= range;
  }

  calculateCanFire(weapon: Weapon) {
    // cooltime between weapon
    if (this.fireTimer < this.fireCoolTime) return;

    const u = this.upgrades.get('ATTACK_RATE');
    const amount = u ? u.getTotalAmount() : 0;
    const rate = weapon.getAttackRate() * (1 + amount / 100);
    const fireCooltime = 1 / rate / 600;

    return weapon.getFireTimer() >= fireCooltime;
  }

  getWeaponCount(name: string) {
    return this.weapons.filter(weapon => weapon.getName() === name).length;
  }

  update(dt: number): void {
    this.fireTimer += dt;
    this.Sprite.update();
    this.weapons.forEach((w) => w.update(dt));
  }

  render() {
    this.Sprite.render();
    this.weapons.forEach((w) => w.render());
  }
}

export default User;
