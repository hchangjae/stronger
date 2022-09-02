import { GameObject } from 'kontra';
import Unit from '../unit/Unit';

type WeaponTarget = 'land' | 'air';

export interface WeaponProps {
  name: string;
  targets: WeaponTarget[];
  attackPower: number;
  attackRange: number;
  splashRadius: number;
  fireCooltime: number;
  attackRate: number;
  killProbaility: number;
}

export default class Weapon {
  protected name: string;
  protected targets: WeaponTarget[];
  protected attackPower: number;
  protected attackRange: number;
  protected attackRate: number;
  protected splashRadius: number;
  protected fireCooltime: number;
  protected fireTimer: number;
  protected killProbaility: number;

  constructor({
    name,
    targets,
    attackPower,
    attackRange,
    splashRadius,
    fireCooltime,
    attackRate = 1,
    killProbaility = 0.5,
  }: WeaponProps) {
    this.name = name;
    this.targets = targets;
    this.attackPower = attackPower;
    this.attackRange = attackRange;
    this.splashRadius = splashRadius;
    this.fireCooltime = fireCooltime;
    this.attackRate = attackRate;
    this.killProbaility = killProbaility,

    this.fireTimer = 0;
  }

  canAttackLand() {
    return this.targets.includes('land');
  }

  canAttackAir() {
    return this.targets.includes('air');
  }

  isInRange(distance: number) {
    return distance <= this.attackRange;
  }

  canFire() {
    return this.fireTimer >= this.fireCooltime;
  }

  fire(_enemy: Unit): GameObject | null {
    return null;
  }

  update(dt: number) {
    this.fireTimer += dt;
  }

  setAttackPower(dp: number) {
    this.attackPower = dp;
  }

  setAttackRate(dr: number) {
    this.attackRate = dr;
  }

  setAttackRange(dr: number) {
    this.attackRange = dr;
  }

  setKillProbability(dp: number) {
    this.killProbaility = dp;
  }
}
