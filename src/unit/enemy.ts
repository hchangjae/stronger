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

export let isAir = (name: EnemyName) => [EnemyName.A1, EnemyName.B4].includes(name);

let enemyNameToPropsMap: Record<EnemyName, Omit<UnitProps, 'x' | 'y'>> = {
  [EnemyName.G1]: {
    HP: 10,
    name: EnemyName.G1,
    sp: EnemySpeed.NORMAL,
    width: 32,
    height: 32,
    sP: 3,
    aP: 2,
    aR: 5,
    dP: 0,
    fCT: 5,
    text: '👹',
  },
  [EnemyName.G2]: {
    HP: 7,
    name: EnemyName.G1,
    sp: EnemySpeed.FASTER,
    width: 20,
    height: 20,
    sP: 2,
    aP: 2,
    aR: 5,
    dP: 0,
    fCT: 3,
    text: '👺',
  },
  [EnemyName.G3]: {
    HP: 15,
    name: EnemyName.G3,
    sp: EnemySpeed.NORMAL,
    width: 32,
    height: 32,
    sP: 6,
    aP: 11,
    aR: 5,
    dP: 2,
    fCT: 5,
    text: '👽',
  },
  [EnemyName.G4]: {
    HP: 35,
    name: EnemyName.G3,
    sp: EnemySpeed.NORMAL,
    width: 32,
    height: 32,
    sP: 20,
    aP: 20,
    aR: 5,
    dP: 5,
    fCT: 5,
    text: '🤖',
  },
  [EnemyName.B1]: {
    HP: 34,
    name: EnemyName.B1,
    sp: EnemySpeed.SLOWER,
    width: 60,
    height: 60,
    sP: 28,
    aP: 35,
    aR: 5,
    dP: 1,
    fCT: 5,
    text: '👹',
  },
  [EnemyName.B2]: {
    HP: 50,
    name: EnemyName.B1,
    sp: EnemySpeed.SLOW,
    width: 60,
    height: 60,
    sP: 126,
    aP: 100,
    aR: 5,
    dP: 4,
    fCT: 5,
    text: '👺',
  },
  [EnemyName.B3]: {
    HP: 100,
    name: EnemyName.B3,
    sp: EnemySpeed.FASTER,
    width: 60,
    height: 60,
    sP: 500,
    aP: 100,
    aR: 5,
    dP: 10,
    fCT: 5,
    text: '👽',
  },
  [EnemyName.B4]: {
    HP: 200,
    name: EnemyName.B4,
    sp: EnemySpeed.FASTER,
    width: 60,
    height: 60,
    sP: 0,
    aP: 10,
    aR: 5,
    dP: 10,
    fCT: 0.05,
    text: '🤖',
  },
  [EnemyName.A1]: {
    HP: 8,
    name: EnemyName.A1,
    sp: EnemySpeed.FAST,
    width: 32,
    height: 32,
    sP: 12,
    aP: 6,
    aR: 50,
    dP: 3,
    fCT: 5,
    text: '👾',
  },
};

let mapEnemyNameToProps = (v: EnemyName) => enemyNameToPropsMap[v];

type EnemyProps = {
  name: EnemyName;
  x: number;
  y: number;
};

export default class Enemy extends Unit {
  constructor({ name, x, y }: EnemyProps) {
    let unitProps = mapEnemyNameToProps(name);
    super({ x, y, ...unitProps });
  }
}
