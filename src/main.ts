import {init, GameLoop, Sprite, collides, GameObject} from 'kontra';
import { createUnit } from './component/unit';
import waves from './component/waves';

const {canvas} = init();

const renderList: GameObject[] = []

const addRender = (obj: GameObject) => renderList.push(obj)
const subRender = (obj: GameObject) => renderList.splice(renderList.indexOf(obj), 1)

const startAt = Date.now()
const getPlayTime = () => Date.now() - startAt

const loop = GameLoop({
  update: () => {
    if(waves[waves.length-1] && getPlayTime() > waves[waves.length-1].at) {
      const summon = waves.pop()
      addRender(createUnit({
        scale: 2,
        speed: 2,
        x: canvas.width-1,
        y: 180,
        color: 'red',
      }))
    }
    
    renderList.forEach(item => {
      if (item.x < 0 || item.x > canvas.width) {
        item.dx = -item.dx;
      }
      item.update();
    });
  },
  render: () => {
    renderList.forEach(item => item.render())
  },
});

loop.start();
