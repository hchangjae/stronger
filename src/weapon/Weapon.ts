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
  killProbaility: number;
  bullets?: Bullet[];
}

export default class Weapon {
  protected name: string;
  protected targets: WeaponTarget[];
  protected slowPower?: number;
  protected aP: number;
  protected aR: number;
  protected sR: number;
  protected fCT: number;
  protected fireTimer: number;
  protected killProbaility: number;
  protected bullets: Bullet[];

  constructor({ name, targets, slowPower, aP, aR, sR, fCT, killProbaility = 0.5, bullets = [] }: WeaponProps) {
    this.name = name;
    this.targets = targets;
    this.slowPower = slowPower;
    this.aP = aP;
    this.aR = aR;
    this.sR = sR;
    this.fCT = fCT;
    (this.killProbaility = killProbaility), (this.bullets = bullets), (this.fireTimer = 0);
  }

  canAttackLand() {
    return this.targets.includes('land');
  }

  canAttackAir() {
    return this.targets.includes('air');
  }

  getFireTimer() {
    return this.fireTimer;
  }

  getFireCooltime() {
    return this.fCT;
  }

  fire(_enemy: Unit): GameObject | null {
    return null;
  }

  update(dt: number) {
    this.fireTimer += dt;
  }

  getAttackPower() {
    return this.aP;
  }

  setAttackPower(dp: number) {
    this.aP = dp;
  }

  getAttackRange() {
    return this.aR;
  }

  setAttackRange(dr: number) {
    this.aR = dr;
  }

  getAttackRate() {
    return 1 / this.fCT / 1000;
  }

  setAttackRate(ar: number) {
    this.fCT = (1 / ar) * 1000;
  }

  getKillProbability() {
    return this.killProbaility;
  }

  setKillProbability(dp: number) {
    this.killProbaility = dp;
  }

  getBullets() {
    return this.bullets;
  }

  reload(bullet: Bullet) {
    this.bullets = [...this.bullets, bullet];
  }

  setBullets(bullets: Bullet[]) {
    this.bullets = bullets;
  }

  getName() {
    return this.name;
  }

  render() {
    this.bullets.forEach((bullet) => bullet.render());
  }
}
