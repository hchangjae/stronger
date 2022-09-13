import { imageAssets, Sprite } from 'kontra';

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
  protected name: string;
  protected image: string;
  protected resource: Resource;
  protected ws: Weapon[];
  protected ups: Map<string, Upgrade>;

  private fCT: number;
  private fireTimer: number;
  private generation: number;
  private upsInital: Map<string, Upgrade>;
  private resourceInital: number;
  private lifeBase: number;
  private lifeMax: number;
  private Sprite: Sprite;

  constructor({ name, image, resource, ws, life, ups }: UserProps) {
    let width = 55;
    let height = 85;

    super(life);
    this.name = name;
    this.image = image;
    this.image = image;
    this.resource = new Resource(resource);
    this.ws = ws;
    this.lifeMax = life;
    this.lifeBase = life;
    this.generation = 1;
    this.fireTimer = 0;
    this.fCT = WEAPON_CHANGE_COOL;
    this.resourceInital = resource;
    this.upsInital = this.ups = ups;

    this.Sprite = Sprite({
      image: imageAssets[this.image],
      x: 50,
      y: 170,
      width,
      height,
      scaleX: 3,
      scaleY: 3,
      render() {
        let ctx = this.context as CanvasRenderingContext2D;
        if (!this.image) return;
        ctx.drawImage(this.image, 0, 0);
        ctx.scale(-1, 1);
        ctx.translate(-12, 0);
        ctx.drawImage(this.image, 0, 0);
      },
    });

    let getLife = () => super.getLife();
    let getLifeMax = () => this.lifeMax;
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
    this.Sprite.addChild(HPWrapSprite);
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

  getGeneration() {
    return this.generation;
  }

  getResource() {
    return this.resource;
  }

  getWeapons() {
    return this.ws;
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

  getUpgrades() {
    return this.ups;
  }

  addUpgrade(upgrade: Upgrade) {
    let u = this.ups.get(upgrade.getTarget());

    if (u) {
      if (u.getTarget() === 'HEALTH') {
        this.life = this.lifeBase * (1 + u.getAmount());
        this.lifeMax = this.lifeBase * (1 + u.getAmount());
      }
      this.setResource(-1 * u.getResourceNeeded());
      u.setTotalAmount(u.getTotalAmount() + upgrade.getAmount());
      u.increaseResourceNeeded();

      updateResource(this.resource.r);
    }
  }

  calculateBulletDamage(damage: number) {
    let u = this.ups.get('ATTACK_POWER');
    let amount = u ? u.getTotalAmount() : 0;

    if (amount === 0) return damage;

    return Math.ceil(damage * (1 + amount / 100));
  }

  calculateIsInRange(weapon: Weapon, distance: number) {
    let u = this.ups.get('ATTACK_RANGE');
    let amount = u ? u.getTotalAmount() : 0;
    let range = Math.ceil(weapon.aR * (1 + amount / 100));

    return distance <= range;
  }

  calculateCanFire(weapon: Weapon) {
    // cooltime between weapon
    if (this.fireTimer < this.fCT) return;

    let u = this.ups.get('ATTACK_RATE');
    let amount = u ? u.getTotalAmount() : 0;
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
