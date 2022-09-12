import { GameObject } from 'kontra';
import Bullet from '../domain/Bullet';
import Unit from '../unit/Unit';

type WeaponTarget = 'land' | 'air';

export interface WeaponProps {
  name: string;
  targets: WeaponTarget[];
  slowPower?: number;
  attackPower: number;
  attackRange: number;
  splashRadius: number;
  fireCooltime: number;
  killProbaility: number;
  bullets?: Bullet[];
}

export default class Weapon {
  protected name: string;
  protected targets: WeaponTarget[];
  protected slowPower?: number;
  protected attackPower: number;
  protected attackRange: number;
  protected splashRadius: number;
  protected fireCooltime: number;
  protected fireTimer: number;
  protected killProbaility: number;
  protected bullets: Bullet[];

  constructor({
    name,
    targets,
    slowPower,
    attackPower,
    attackRange,
    splashRadius,
    fireCooltime,
    killProbaility = 0.5,
    bullets = [],
  }: WeaponProps) {
    this.name = name;
    this.targets = targets;
    this.slowPower = slowPower;
    this.attackPower = attackPower;
    this.attackRange = attackRange;
    this.splashRadius = splashRadius;
    this.fireCooltime = fireCooltime;
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
    return this.fireCooltime;
  }

  fire(_enemy: Unit): GameObject | null {
    return null;
  }

  update(dt: number) {
    this.fireTimer += dt;
  }

  getAttackPower() {
    return this.attackPower;
  }

  setAttackPower(dp: number) {
    this.attackPower = dp;
  }

  getAttackRange() {
    return this.attackRange;
  }

  setAttackRange(dr: number) {
    this.attackRange = dr;
  }

  getAttackRate() {
    return 1 / this.fireCooltime / 1000;
  }

  setAttackRate(ar: number) {
    this.fireCooltime = (1 / ar) * 1000;
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

  render() {
    this.bullets.forEach((bullet) => bullet.render());
  }
}
