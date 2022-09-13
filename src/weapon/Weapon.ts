import { GameObject } from 'kontra';
import Bullet from '../domain/Bullet';
import Unit from '../unit/Unit';

type WeaponTarget = 'land' | 'air';

export interface WeaponProps {
  name: string;
  targets: WeaponTarget[];
  slowPower?: number;
  aP: number;
  aR: number;
  sR: number;
  fCT: number;
  bullets?: Bullet[];
}

export default class Weapon {
  name: string;
  targets: WeaponTarget[];
  slowPower?: number;
  aP: number;
  aR: number;
  sR: number;
  fCT: number;
  fireTimer: number;
  bullets: Bullet[];

  constructor({ name, targets, slowPower, aP, aR, sR, fCT, bullets = [] }: WeaponProps) {
    this.name = name;
    this.targets = targets;
    this.slowPower = slowPower;
    this.aP = aP;
    this.aR = aR;
    this.sR = sR;
    this.fCT = fCT;
    this.bullets = bullets;
    this.fireTimer = 0;
  }

  fire(_enemy: Unit): GameObject | null {
    return null;
  }

  update(dt: number) {
    this.fireTimer += dt;
  }

  getAttackRate() {
    return 1 / this.fCT / 1000;
  }

  setAttackRate(ar: number) {
    this.fCT = (1 / ar) * 1000;
  }

  reload(bullet: Bullet) {
    this.bullets = [...this.bullets, bullet];
  }

  render() {
    this.bullets.forEach((bullet) => bullet.render());
  }
}
