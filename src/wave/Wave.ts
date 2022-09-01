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
  at: number; // ms
  type: any;
};

const compareSummon = (a: Summon, b: Summon) => b.at - a.at;

const createSummon = (
  summonRecipe: SummonRecipe,
  numOfSummon: number,
  duration: number
) => {
  const summonList = new Array<Summon>(numOfSummon)
    .fill({ at: 0, type: '' })
    .map(() => ({
      at: Math.floor(Math.random() * duration),
      type: summonRecipe.type,
    }));

  return summonList;
};

const createSummonList = (waveRecipe: WaveRecipe) => {
  const totalRatio = waveRecipe.summonRecipes.reduce(
    (acc, cur) => acc + cur.ratio,
    0
  );
  const numOfTotalSummon = waveRecipe.total;

  const wave = waveRecipe.summonRecipes.reduce<Summon[]>(
    (acc, summonRecipe) => {
      const numOfSummon = Math.ceil(
        numOfTotalSummon * (summonRecipe.ratio / totalRatio)
      );
      const summonList = createSummon(
        summonRecipe,
        numOfSummon,
        waveRecipe.duration
      );
      return [...acc, ...summonList];
    },
    []
  );

  return wave.sort(compareSummon);
};

export const waveRecipes: WaveRecipe[] = [
  {
    total: 5,
    duration: 5 * 1000,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 3 },
      { type: EnemyName.G2, ratio: 1 },
    ],
  },
  {
    total: 10,
    duration: 5 * 1000,
    summonRecipes: [
      { type: EnemyName.G1, ratio: 1 },
      { type: EnemyName.G2, ratio: 1 },
    ],
  },
];

export default class GameWave {
  waveRecipeList: WaveRecipe[];
  summonList: Summon[];
  level: number = 0;
  startAt: number;

  constructor(waveRecipeList: WaveRecipe[]) {
    this.waveRecipeList = waveRecipeList;
    this.summonList = [];
    this.startAt = Date.now();
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

    return summonAt < Date.now() - this.startAt;
  }

  next() {
    if (this.isWavesDone()) return;

    const [waveRecipe] = this.waveRecipeList.splice(0, 1);
    this.level += 1;
    this.summonList = createSummonList(waveRecipe);
    this.startAt = Date.now();
  }

  summon() {
    return this.summonList.pop();
  }
}
