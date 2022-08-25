import {init, GameLoop, Sprite} from 'kontra';

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

const arrayFactory = (length: number) => Array.from({length});

const smallEnemies = arrayFactory(50).map(() =>
  enemyFactory({
    scale: 2,
    speed: -2 * Math.random(),
  })
);

const middleEnemies = arrayFactory(20).map(() =>
  enemyFactory({
    scale: 4,
    speed: -4 * Math.random(),
    y: 150,
    color: 'green',
  })
)

const allEnemies = [...smallEnemies, ...middleEnemies];

const loop = GameLoop({
  update: () => {
    allEnemies.forEach(enemy => {
      if (enemy.x <= 0 || enemy.x > canvas.width) {
        enemy.dx = -enemy.dx;
      }
      enemy.update();
    });
  },
  render: () => {
    allEnemies.forEach(enemy => enemy.render());
  },
});

loop.start();
