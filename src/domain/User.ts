import { imageAssets, Sprite, Text } from 'kontra';

import Weapon from '../weapon/Weapon';
import Upgrade from './Upgrade';
import Unit from './Unit';
import Resource from './Resource';
import { updateResource } from '../controller/Info';
import { WeaponUpgradeType } from '../data/upgrade/weapons';

let WEAPON_CHANGE_COOL = 0.1;

type UserProps = {
  name: string;
  image: string;
  resource: number;
  ws: Weapon[];
  life: number;
  ups: Map<string, Upgrade>;
};

class User extends Unit {
  // @ts-ignore
  name: string;
  // @ts-ignore
  resource: Resource;
  // @ts-ignore
  ws: Weapon[];
  // @ts-ignore
  ups: Map<string, Upgrade>;
  // @ts-ignore
  fCT: number;
  // @ts-ignore
  fireTimer: number;
  // @ts-ignore
  generation: number;
  // @ts-ignore
  upsInital: Map<string, Upgrade>;
  // @ts-ignore
  resourceInital: number;
  // @ts-ignore
  lifeBase: number;
  // @ts-ignore
  lifeMax: number;
  // @ts-ignore
  Sprite: Sprite;

  constructor({ name, resource, ws, life, ups }: UserProps) {
    let width = 55;
    let height = 85;

    super(life);

    let t = this;

    t.name = name;
    t.resource = new Resource(resource);
    t.ws = ws;
    t.lifeMax = life;
    t.lifeBase = life;
    t.generation = 1;
    t.fireTimer = 0;
    t.fCT = WEAPON_CHANGE_COOL;
    t.resourceInital = resource;
    t.upsInital = t.ups = ups;

    //@ts-ignore
    t.Sprite = Text({
      text: '🛖',
      x: 50,
      y: 170,
      width,
      height,
      scaleX: 2.4,
      scaleY: 2.4,
      anchor: {
        x: 0.09,
        y: 0,
      },
    });

    let getLife = () => t.life;
    let getLifeMax = () => t.lifeMax;
    let HPSprite = Sprite({
      x: 1,
      y: 1,
      width: width - 2,
      height: 5,
      color: '#00db00',
      update: function () {
        this.width = Math.max(((width - 2) * getLife()) / getLifeMax(), 0);
      },
    });

    let HPWrapSprite = Sprite({
      x: -3,
      y: -7,
      width,
      height: 7,
      color: '#fff',
      scaleX: 1 / 3,
      scaleY: 1 / 3,
    });

    HPWrapSprite.addChild(HPSprite);
    t.Sprite.addChild(HPWrapSprite);
  }

  inherit() {
    this.life = this.lifeMax;
    this.resource = new Resource(this.resourceInital);
    this.ups = new Map(this.upsInital);
    this.generation += 1;
  }

  setResource(dm: number) {
    let currentResource = this.resource.r;
    if (currentResource + dm < 0) return;
    this.resource.update(currentResource + dm);
  }

  coolDownFire() {
    this.fireTimer = 0;
  }

  addWeapon(newWeapon: Weapon, weaponData: WeaponUpgradeType) {
    this.ws = [...this.ws, newWeapon];

    this.setResource(-1 * weaponData.rN);
    weaponData.rN *= 2;

    updateResource(this.resource.r);
  }

  addUpgrade(upgrade: Upgrade) {
    let u = this.ups.get(upgrade.getTarget());

    if (u) {
      if (u.getTarget() === 'HEALTH') {
        this.life = this.lifeBase * (1 + u.amount);
        this.lifeMax = this.lifeBase * (1 + u.amount);
      }
      this.setResource(-1 * u.rN);
      u.totalAmount = u.totalAmount + upgrade.amount;
      u.increaseResourceNeeded();

      updateResource(this.resource.r);
    }
  }

  calculateBulletDamage(damage: number) {
    let u = this.ups.get('ATTACK_POWER');
    let amount = u ? u.totalAmount : 0;

    if (amount === 0) return damage;

    return Math.ceil(damage * (1 + amount / 100));
  }

  calculateIsInRange(weapon: Weapon, distance: number) {
    let u = this.ups.get('ATTACK_RANGE');
    let amount = u ? u.totalAmount : 0;
    let range = Math.ceil(weapon.aR * (1 + amount / 100));

    return distance <= range;
  }

  calculateCanFire(weapon: Weapon) {
    // cooltime between weapon
    if (this.fireTimer < this.fCT) return;

    let u = this.ups.get('ATTACK_RATE');
    let amount = u ? u.totalAmount : 0;
    let rate = weapon.getAttackRate() * (1 + amount / 100);
    let fCT = 1 / rate / 600;

    return weapon.fireTimer >= fCT;
  }

  getWeaponCount(name: string) {
    return this.ws.filter((weapon) => weapon.name === name).length;
  }

  update(dt: number): void {
    this.fireTimer += dt;
    this.Sprite.update();
    this.ws.forEach((w) => w.update(dt));
  }

  render() {
    this.Sprite.render();
    this.ws.forEach((w) => w.render());
  }
}

export default User;
