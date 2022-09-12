import { EnemyName } from '../unit/Enemy';

type SummonRecipe = {
  type: any;
  ratio: number; // 0 ~ 1
};

type WaveRecipe = {
  total: number;
  duration: number;
  summonRecipes: SummonRecipe[];
};

type Summon = {
  at: number; // second
  type: any;
};

const compareSummon = (a: Summon, b: Summon) => b.at - a.at;

const createSummon = (summonRecipe: SummonRecipe, numOfSummon: number, duration: number) => {
  const MIN_GAP = 0.3; // second
  const summonList = new Array<Summon>(numOfSummon).fill({ at: 0, type: '' }).map(() => ({
    at: Math.round((Math.random() * duration) / MIN_GAP) * MIN_GAP,
    type: summonRecipe.type,
  }));

  return summonList;
};

const createSummonList = (waveRecipe: WaveRecipe) => {
  const totalRatio = waveRecipe.summonRecipes.reduce((acc, cur) => acc + cur.ratio, 0);
  const numOfTotalSummon = waveRecipe.total;

  const wave = waveRecipe.summonRecipes.reduce<Summon[]>((acc, summonRecipe) => {
    const numOfSummon = Math.ceil(numOfTotalSummon * (summonRecipe.ratio / totalRatio));
    const summonList = createSummon(summonRecipe, numOfSummon, waveRecipe.duration);
    return [...acc, ...summonList];
  }, []);

  return wave.sort(compareSummon);
};

export const waveRecipes: WaveRecipe[] = [
  {
    total: 5, // point: 15
    duration: 5,
    summonRecipes: [{ type: EnemyName.G4, ratio: 1 }],
  },
  {
    total: 10, // point: 23
    duration: 5,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 3 },
      { type: EnemyName.G2, ratio: 2 },
    ],
  },
  {
    total: 14, // point: 45
    duration: 7,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 1 },
      { type: EnemyName.G2, ratio: 3 },
    ],
  },
  {
    total: 14, // point: 52
    duration: 7,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 2 },
      { type: EnemyName.G2, ratio: 4 },
      { type: EnemyName.A1, ratio: 1 },
    ],
  },
  {
    total: 15, // Wave5, point: 80
    duration: 7,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 4 },
      { type: EnemyName.G2, ratio: 8 },
      { type: EnemyName.B1, ratio: 1 },
      { type: EnemyName.A1, ratio: 2 },
    ],
  },
  {
    total: 14, // point: 63
    duration: 7,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 1 },
      { type: EnemyName.G3, ratio: 1 },
    ],
  },
  {
    total: 14, // point: 66
    duration: 7,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 2 },
      { type: EnemyName.G3, ratio: 4 },
      { type: EnemyName.A1, ratio: 1 },
    ],
  },
  {
    total: 10, // point: 82
    duration: 7,
    summonRecipes: [
      { type: EnemyName.G3, ratio: 5 },
      { type: EnemyName.B1, ratio: 1 },
      { type: EnemyName.A1, ratio: 2 },
    ],
  },
  {
    total: 25, // point: 100
    duration: 7,
    summonRecipes: [
      { type: EnemyName.G2, ratio: 4 },
      { type: EnemyName.A1, ratio: 1 },
    ],
  },
  {
    total: 24, // Wave 10, point: 230
    duration: 7,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 4 },
      { type: EnemyName.G2, ratio: 10 },
      { type: EnemyName.G3, ratio: 6 },
      { type: EnemyName.B2, ratio: 1 },
      { type: EnemyName.A1, ratio: 3 },
    ],
  },
  {
    total: 6, // point: 120
    duration: 7,
    summonRecipes: [{ type: EnemyName.G4, ratio: 1 }],
  },
  {
    total: 12, // point: 168
    duration: 7,
    summonRecipes: [
      { type: EnemyName.G3, ratio: 1 },
      { type: EnemyName.G4, ratio: 1 },
    ],
  },
  {
    total: 12, // point: 264
    duration: 7,
    summonRecipes: [
      { type: EnemyName.G4, ratio: 3 },
      { type: EnemyName.B1, ratio: 1 },
    ],
  },
  {
    total: 40, // point: 358
    duration: 15,
    summonRecipes: [
      { type: EnemyName.G2, ratio: 30 },
      { type: EnemyName.A1, ratio: 3 },
      { type: EnemyName.G4, ratio: 4 },
      { type: EnemyName.B1, ratio: 2 },
      { type: EnemyName.B2, ratio: 1 },
    ],
  },
  {
    total: 8, // Wave: 15, point: 584
    duration: 5,
    summonRecipes: [
      { type: EnemyName.A1, ratio: 7 },
      { type: EnemyName.B3, ratio: 1 },
    ],
  },
  {
    total: 18, // point: 360
    duration: 10,
    summonRecipes: [
      { type: EnemyName.A1, ratio: 1 },
      { type: EnemyName.G4, ratio: 1 },
      { type: EnemyName.B1, ratio: 1 },
    ],
  },
  {
    total: 6, // point: 328
    duration: 4,
    summonRecipes: [
      { type: EnemyName.G4, ratio: 1 },
      { type: EnemyName.B1, ratio: 1 },
      { type: EnemyName.B2, ratio: 1 },
    ],
  },
  {
    total: 9, // point: 492
    duration: 6,
    summonRecipes: [
      { type: EnemyName.G4, ratio: 1 },
      { type: EnemyName.B1, ratio: 1 },
      { type: EnemyName.B2, ratio: 1 },
    ],
  },
  {
    total: 65, // point: 1124
    duration: 15,
    summonRecipes: [
      { type: EnemyName.G2, ratio: 50 },
      { type: EnemyName.G4, ratio: 8 },
      { type: EnemyName.B1, ratio: 4 },
      { type: EnemyName.B2, ratio: 2 },
      { type: EnemyName.B3, ratio: 1 },
    ],
  },
  {
    total: 110, // Wave: 20
    duration: 20,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 20 },
      { type: EnemyName.G2, ratio: 20 },
      { type: EnemyName.G3, ratio: 20 },
      { type: EnemyName.G4, ratio: 20 },
      { type: EnemyName.A1, ratio: 20 },
      { type: EnemyName.B1, ratio: 4 },
      { type: EnemyName.B2, ratio: 3 },
      { type: EnemyName.B3, ratio: 2 },
      { type: EnemyName.B4, ratio: 1 },
    ],
  },
];

export default class GameWave {
  waveRecipeList: WaveRecipe[];
  summonList: Summon[];
  level: number = 0;
  summonTimer: number;

  constructor(waveRecipeList: WaveRecipe[]) {
    this.waveRecipeList = [...waveRecipeList];
    this.summonList = [];
    this.summonTimer = 0;
  }

  isWavesDone() {
    return this.waveRecipeList.length === 0 && this.summonList.length === 0;
  }

  isWaveDone() {
    return this.summonList.length === 0;
  }

  isReadyToSummon() {
    if (this.isWaveDone()) return false;
    const summonAt = this.summonList[this.summonList.length - 1].at;

    return summonAt < this.summonTimer;
  }

  next() {
    if (this.isWavesDone()) return;

    const [waveRecipe] = this.waveRecipeList.splice(0, 1);
    this.level += 1;
    this.summonList = createSummonList(waveRecipe);
    this.summonTimer = 0;

    const banner = document.querySelector('.banner');

    if (banner) {
      banner.innerHTML = `Wave ${this.level}`;
      banner.classList.add('show');

      window.setTimeout(() => {
        banner.classList.remove('show');
      }, 2000);
    }
  }

  update(dt: number) {
    this.summonTimer += dt;
  }

  summon() {
    return this.summonList.pop();
  }
}
