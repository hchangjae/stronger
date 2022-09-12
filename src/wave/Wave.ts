import { EnemyName } from '../unit/Enemy';

type SummonRecipe = {
  ty: any;
  ra: number; // 0 ~ 1
};

type WaveRecipe = {
  tt: number;
  dr: number;
  sr: SummonRecipe[];
};

type Summon = {
  at: number; // second
  ty: any;
};

let compareSummon = (a: Summon, b: Summon) => b.at - a.at;

let createSummon = (summonRecipe: SummonRecipe, numOfSummon: number, dr: number) => {
  let MIN_GAP = 0.3; // second
  let sL = new Array<Summon>(numOfSummon).fill({ at: 0, ty: '' }).map(() => ({
    at: Math.round((Math.random() * dr) / MIN_GAP) * MIN_GAP,
    ty: summonRecipe.ty,
  }));

  return sL;
};

let createSummonList = (waveRecipe: WaveRecipe) => {
  let totalRatio = waveRecipe.sr.reduce((acc, cur) => acc + cur.ra, 0);
  let numOfTotalSummon = waveRecipe.tt;

  let wave = waveRecipe.sr.reduce<Summon[]>((acc, summonRecipe) => {
    let numOfSummon = Math.ceil(numOfTotalSummon * (summonRecipe.ra / totalRatio));
    let sL = createSummon(summonRecipe, numOfSummon, waveRecipe.dr);
    return [...acc, ...sL];
  }, []);

  return wave.sort(compareSummon);
};

export let waveRecipes: WaveRecipe[] = [
  {
    tt: 5, // point: 15
    dr: 5,
    sr: [{ ty: EnemyName.G4, ra: 1 }],
  },
  {
    tt: 10, // point: 23
    dr: 5,
    sr: [
      { ty: EnemyName.G1, ra: 3 },
      { ty: EnemyName.G2, ra: 2 },
    ],
  },
  {
    tt: 14, // point: 45
    dr: 7,
    sr: [
      { ty: EnemyName.G1, ra: 1 },
      { ty: EnemyName.G2, ra: 3 },
    ],
  },
  {
    tt: 14, // point: 52
    dr: 7,
    sr: [
      { ty: EnemyName.G1, ra: 2 },
      { ty: EnemyName.G2, ra: 4 },
      { ty: EnemyName.A1, ra: 1 },
    ],
  },
  {
    tt: 15, // Wave5, point: 80
    dr: 7,
    sr: [
      { ty: EnemyName.G1, ra: 4 },
      { ty: EnemyName.G2, ra: 8 },
      { ty: EnemyName.B1, ra: 1 },
      { ty: EnemyName.A1, ra: 2 },
    ],
  },
  {
    tt: 14, // point: 63
    dr: 7,
    sr: [
      { ty: EnemyName.G1, ra: 1 },
      { ty: EnemyName.G3, ra: 1 },
    ],
  },
  {
    tt: 14, // point: 66
    dr: 7,
    sr: [
      { ty: EnemyName.G1, ra: 2 },
      { ty: EnemyName.G3, ra: 4 },
      { ty: EnemyName.A1, ra: 1 },
    ],
  },
  {
    tt: 10, // point: 82
    dr: 7,
    sr: [
      { ty: EnemyName.G3, ra: 5 },
      { ty: EnemyName.B1, ra: 1 },
      { ty: EnemyName.A1, ra: 2 },
    ],
  },
  {
    tt: 25, // point: 100
    dr: 7,
    sr: [
      { ty: EnemyName.G2, ra: 4 },
      { ty: EnemyName.A1, ra: 1 },
    ],
  },
  {
    tt: 24, // Wave 10, point: 230
    dr: 7,
    sr: [
      { ty: EnemyName.G1, ra: 4 },
      { ty: EnemyName.G2, ra: 10 },
      { ty: EnemyName.G3, ra: 6 },
      { ty: EnemyName.B2, ra: 1 },
      { ty: EnemyName.A1, ra: 3 },
    ],
  },
  {
    tt: 6, // point: 120
    dr: 7,
    sr: [{ ty: EnemyName.G4, ra: 1 }],
  },
  {
    tt: 12, // point: 168
    dr: 7,
    sr: [
      { ty: EnemyName.G3, ra: 1 },
      { ty: EnemyName.G4, ra: 1 },
    ],
  },
  {
    tt: 12, // point: 264
    dr: 7,
    sr: [
      { ty: EnemyName.G4, ra: 3 },
      { ty: EnemyName.B1, ra: 1 },
    ],
  },
  {
    tt: 40, // point: 358
    dr: 15,
    sr: [
      { ty: EnemyName.G2, ra: 30 },
      { ty: EnemyName.A1, ra: 3 },
      { ty: EnemyName.G4, ra: 4 },
      { ty: EnemyName.B1, ra: 2 },
      { ty: EnemyName.B2, ra: 1 },
    ],
  },
  {
    tt: 8, // Wave: 15, point: 584
    dr: 5,
    sr: [
      { ty: EnemyName.A1, ra: 7 },
      { ty: EnemyName.B3, ra: 1 },
    ],
  },
  {
    tt: 18, // point: 360
    dr: 10,
    sr: [
      { ty: EnemyName.A1, ra: 1 },
      { ty: EnemyName.G4, ra: 1 },
      { ty: EnemyName.B1, ra: 1 },
    ],
  },
  {
    tt: 6, // point: 328
    dr: 4,
    sr: [
      { ty: EnemyName.G4, ra: 1 },
      { ty: EnemyName.B1, ra: 1 },
      { ty: EnemyName.B2, ra: 1 },
    ],
  },
  {
    tt: 9, // point: 492
    dr: 6,
    sr: [
      { ty: EnemyName.G4, ra: 1 },
      { ty: EnemyName.B1, ra: 1 },
      { ty: EnemyName.B2, ra: 1 },
    ],
  },
  {
    tt: 65, // point: 1124
    dr: 15,
    sr: [
      { ty: EnemyName.G2, ra: 50 },
      { ty: EnemyName.G4, ra: 8 },
      { ty: EnemyName.B1, ra: 4 },
      { ty: EnemyName.B2, ra: 2 },
      { ty: EnemyName.B3, ra: 1 },
    ],
  },
  {
    tt: 110, // Wave: 20
    dr: 20,
    sr: [
      { ty: EnemyName.G1, ra: 20 },
      { ty: EnemyName.G2, ra: 20 },
      { ty: EnemyName.G3, ra: 20 },
      { ty: EnemyName.G4, ra: 20 },
      { ty: EnemyName.A1, ra: 20 },
      { ty: EnemyName.B1, ra: 4 },
      { ty: EnemyName.B2, ra: 3 },
      { ty: EnemyName.B3, ra: 2 },
      { ty: EnemyName.B4, ra: 1 },
    ],
  },
];

export default class GameWave {
  waveRecipeList: WaveRecipe[];
  sL: Summon[];
  level: number = 0;
  summonTimer: number;

  constructor(waveRecipeList: WaveRecipe[]) {
    this.waveRecipeList = [...waveRecipeList];
    this.sL = [];
    this.summonTimer = 0;
  }

  isWavesDone() {
    return this.waveRecipeList.length === 0 && this.sL.length === 0;
  }

  isWaveDone() {
    return this.sL.length === 0;
  }

  isReadyToSummon() {
    if (this.isWaveDone()) return false;
    let summonAt = this.sL[this.sL.length - 1].at;

    return summonAt < this.summonTimer;
  }

  next() {
    if (this.isWavesDone()) return;

    let [waveRecipe] = this.waveRecipeList.splice(0, 1);
    this.level += 1;
    this.sL = createSummonList(waveRecipe);
    this.summonTimer = 0;

    let ba = document.querySelector('.ba');

    if (ba) {
      ba.innerHTML = `Wave ${this.level}`;
      ba.classList.add('show');

      window.setTimeout(() => {
        ba?.classList.remove('show');
      }, 2000);
    }
  }

  update(dt: number) {
    this.summonTimer += dt;
  }

  summon() {
    return this.sL.pop();
  }
}
