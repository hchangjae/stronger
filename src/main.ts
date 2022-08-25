import {init, GameLoop, Sprite, collides} from 'kontra';

const {canvas} = init();

type EnemyTrait = {
  scale: number;
  speed: number;
  x?: number;
  y?: number;
  color?: string;
};

const enemyFactory = ({scale, speed, x = 256, y = 160, color = 'red'}: EnemyTrait) => {
  return Sprite({
    width: scale,
    height: scale,
    dx: speed,
    x,
    y,
    color,
  });
};

const smallEnemies:Sprite[] = []

const middleEnemies:Sprite[] = []

const getAllEnemies = () => {
  const small = smallEnemies
  const middle = middleEnemies
  return [...small, ...middle]
};

setInterval(() => {
  if(smallEnemies.length < 50){
    smallEnemies.push(enemyFactory({
      scale: 2,
      speed: 2 * Math.random(),
      x: 0,
    }))
  }
  if(smallEnemies.length < 50){
    middleEnemies.push(enemyFactory({
      scale: 4,
      speed: -4 * Math.random(),
      color: 'green',
    }))
  }
}, 100)

const loop = GameLoop({
  update: () => {
    getAllEnemies().forEach(enemy => {
      if (enemy.x < 0 || enemy.x > canvas.width) {
        enemy.dx = -enemy.dx;
      }
      enemy.update();
    });

    // 충돌 확인
    smallEnemies.forEach(s => {
      middleEnemies.forEach(m => {
        if(collides(s, m)){
          const sIndex = smallEnemies.indexOf(s)
          const mIndex = middleEnemies.indexOf(m)
          smallEnemies.splice(sIndex, 1)
          middleEnemies.splice(mIndex, 1)
        }
      })
    })
  },
  render: () => {
    getAllEnemies().forEach(enemy => enemy.render());
  },
});

loop.start();
