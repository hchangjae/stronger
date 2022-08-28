type SummonRecipe = {
  type: any
  ratio: number // 0 ~ 1
}

type WaveRecipe = {
  total: number
  duration: number
  summonRecipes: SummonRecipe[]
}

type Summon = {
  at: number // ms
  type: any
}

type Wave = Summon[]

const compareSummon = (a: Summon, b: Summon) => b.at - a.at

const createSummon = (summonRecipe: SummonRecipe, numOfSummon: number, duration: number) => {
  const summonList = new Array<Summon>(numOfSummon).fill({
    at: Math.floor(Math.random() * duration),
    type: summonRecipe.type
  })

  return summonList
}

const createWave = (waveRecipe: WaveRecipe) => {
  const totalRatio = waveRecipe.summonRecipes.reduce((acc, cur) => acc + cur.ratio, 0)
  const numOfTotalSummon = waveRecipe.total

  const wave = waveRecipe.summonRecipes.reduce<Wave>((acc, summonRecipe) => {
    const numOfSummon = Math.ceil(numOfTotalSummon * (summonRecipe.ratio / totalRatio))
    const summonList = createSummon(summonRecipe, numOfSummon, waveRecipe.duration)
    return [...acc, ...summonList]
  }, [])

  return wave.sort(compareSummon)
}

const createWaves = (waveRecipes: WaveRecipe[]) => waveRecipes.flatMap(createWave)

const waveRecipes: WaveRecipe[] =[
  {
    total: 5,
    duration: 5 * 1000,
    summonRecipes: [
      { type: 'E1', ratio: 0.5 },
      { type: 'E2', ratio: 0.5 },
    ]
  },
  {
    total: 10,
    duration: 5 * 1000,
    summonRecipes: [
      { type: 'E1', ratio: 0.5 },
      { type: 'E2', ratio: 0.5 },
    ]
  }
]

const waves = createWaves(waveRecipes)

export default waves