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
  const summonList = new Array<Summon>(numOfSummon).fill({ at: 0, type: '' }).map(() => ({
    at: Math.floor(Math.random() * duration),
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
    total: 10,
    duration: 10,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 3 },
      { type: EnemyName.G2, ratio: 1 },
      { type: EnemyName.A1, ratio: 1 },
    ],
  },
  {
    total: 15,
    duration: 15,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 1 },
      { type: EnemyName.G2, ratio: 1 },
    ],
  },
  {
    total: 20,
    duration: 15,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 1 },
      { type: EnemyName.G2, ratio: 1 },
      { type: EnemyName.G3, ratio: 0.5 },
    ],
  },
];

export default class GameWave {
  waveRecipeList: WaveRecipe[];
  summonList: Summon[];
  level: number = 0;
  summonTimer: number;

  constructor(waveRecipeList: WaveRecipe[]) {
    this.waveRecipeList = waveRecipeList;
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
