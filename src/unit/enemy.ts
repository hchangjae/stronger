import Unit, { UnitProps } from './Unit';

export const enum EnemySpeed {
  FAST = -2,
  FASTER = -1.5,
  NORMAL = -1,
  SLOWER = -0.7,
  SLOW = -0.5,
}

export const enum EnemyName {
  G1 = 'G1',
  G2 = 'G2',
  G3 = 'G3',
  G4 = 'G4',
  B1 = 'B1',
  B2 = 'B2',
  B3 = 'B3',
  B4 = 'B4',
  A1 = 'A1',
}

export const isAir = (name: EnemyName) => [EnemyName.A1, EnemyName.B4].includes(name);

const enemyNameToPropsMap: Record<EnemyName, Omit<UnitProps, 'x' | 'y'>> = {
  [EnemyName.G1]: {
    HP: 10,
    name: EnemyName.G1,
    speed: EnemySpeed.NORMAL,
    width: 32,
    height: 32,
    soulPoint: 500,
    attackPower: 2,
    attackRange: 5,
    defensePower: 0,
    fireCooltime: 5,
    spriteAnimationKey: 'slime',
  },
  [EnemyName.G2]: {
    HP: 7,
    name: EnemyName.G1,
    speed: EnemySpeed.FASTER,
    width: 20,
    height: 20,
    soulPoint: 2,
    attackPower: 2,
    attackRange: 5,
    defensePower: 0,
    fireCooltime: 3,
    spriteAnimationKey: 'slime2',
  },
  [EnemyName.G3]: {
    HP: 15,
    name: EnemyName.G3,
    speed: EnemySpeed.NORMAL,
    width: 32,
    height: 32,
    soulPoint: 6,
    attackPower: 11,
    attackRange: 5,
    defensePower: 2,
    fireCooltime: 5,
    spriteAnimationKey: 'slime3',
  },
  [EnemyName.G4]: {
    HP: 35,
    name: EnemyName.G3,
    speed: EnemySpeed.NORMAL,
    width: 32,
    height: 32,
    soulPoint: 20,
    attackPower: 20,
    attackRange: 5,
    defensePower: 5,
    fireCooltime: 5,
    spriteAnimationKey: 'golem',
  },
  [EnemyName.B1]: {
    HP: 34,
    name: EnemyName.B1,
    speed: EnemySpeed.SLOWER,
    width: 60,
    height: 60,
    soulPoint: 28,
    attackPower: 35,
    attackRange: 5,
    defensePower: 1,
    fireCooltime: 5,
    spriteAnimationKey: 'slime',
  },
  [EnemyName.B2]: {
    HP: 50,
    name: EnemyName.B1,
    speed: EnemySpeed.SLOW,
    width: 60,
    height: 60,
    soulPoint: 126,
    attackPower: 100,
    attackRange: 5,
    defensePower: 4,
    fireCooltime: 5,
    spriteAnimationKey: 'slime3',
  },
  [EnemyName.B3]: {
    HP: 100,
    name: EnemyName.B3,
    speed: EnemySpeed.FASTER,
    width: 60,
    height: 60,
    soulPoint: 500,
    attackPower: 100,
    attackRange: 5,
    defensePower: 10,
    fireCooltime: 5,
    spriteAnimationKey: 'golem',
  },
  [EnemyName.B4]: {
    HP: 200,
    name: EnemyName.B4,
    speed: EnemySpeed.FASTER,
    width: 60,
    height: 60,
    soulPoint: 0,
    attackPower: 10,
    attackRange: 5,
    defensePower: 10,
    fireCooltime: 0.05,
    spriteAnimationKey: 'bat',
  },
  [EnemyName.A1]: {
    HP: 8,
    name: EnemyName.A1,
    speed: EnemySpeed.FAST,
    width: 32,
    height: 32,
    soulPoint: 12,
    attackPower: 6,
    attackRange: 50,
    defensePower: 3,
    fireCooltime: 5,
    spriteAnimationKey: 'bat',
  },
};

const mapEnemyNameToProps = (v: EnemyName) => enemyNameToPropsMap[v];

type EnemyProps = {
  name: EnemyName;
  x: number;
  y: number;
};

export default class Enemy extends Unit {
  constructor({ name, x, y }: EnemyProps) {
    const unitProps = mapEnemyNameToProps(name);
    super({ x, y, ...unitProps });
  }
}
