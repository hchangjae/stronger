type WeaponTarget = 'land' | 'air';

export interface WeaponProps {
  name: string;
  targets: WeaponTarget[];
  attackPower: number;
  attackRange: number;
  splashRadius: number;
  fireCooltime: number;
}

export default class Weapon {
  protected name: string;
  protected targets: WeaponTarget[];
  protected attackPower: number;
  protected attackRange: number;
  protected splashRadius: number;
  protected fireCooltime: number;
  protected fireTimer: number;

  constructor({
    name,
    targets,
    attackPower,
    attackRange,
    splashRadius,
    fireCooltime,
  }: WeaponProps) {
    this.name = name;
    this.targets = targets;
    this.attackPower = attackPower;
    this.attackRange = attackRange;
    this.splashRadius = splashRadius;
    this.fireCooltime = fireCooltime;

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

  protected fire(_enemy: any) {
    if (this.canFire()) {
      this.fireTimer = 0;
      return true;
    }

    return false;
  }

  update(dt: number) {
    this.fireTimer += dt;
  }
}
