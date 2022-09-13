import { imageAssets, init, initPointer, Scene, Sprite, Text } from 'kontra';
import { getSpriteAnimation } from './component/spriteSheet';
import Ground from './domain/Ground';
import { $ } from './util';

let TitleScene = (onStart: () => void) => {
  init();
  initPointer();

  let title = Text({
    x: 360,
    y: 40,
    font: '62px Monospace',
    text: 'STRONGER',
    textAlign: 'center',
    color: '#fff',
  });

  let subtitle = Text({
    x: 360,
    y: 100,
    font: '25px Monospace',
    text: '(What does kill you)',
    textAlign: 'center',
    color: '#aaa',
  });

  let ground = new Ground();

  const towerLeft = 360;

  let tower = Sprite({
    image: imageAssets['images/tower.png'],
    x: towerLeft,
    y: 171,
    scaleX: 3,
    scaleY: 3,
    render() {
      let ctx = this.context as CanvasRenderingContext2D;
      if (!this.image) return;
      ctx.drawImage(this.image, 0, 0);
      ctx.scale(-1, 1);
      ctx.translate(-12, 0);
      ctx.drawImage(this.image, 0, 0);
    },
  });

  let slime = Sprite({
    x: towerLeft + 160,
    y: 190,
    animations: {
      ...getSpriteAnimation('slime'),
    },
  });

  let plasma1 = Sprite({
    x: towerLeft + 90,
    y: 186,
    rotation: 1.8,
    animations: {
      ...getSpriteAnimation('bullet1'),
    },
  });

  let plasma2 = Sprite({
    x: towerLeft + 130,
    y: 195,
    rotation: 1.8,
    animations: {
      ...getSpriteAnimation('bullet1'),
    },
  });

  let scene = Scene({
    id: 'title',
    objects: [title, subtitle, ground.bg, ...ground.sprites, tower, slime, plasma1, plasma2],
    onShow() {
      let startButton = document.createElement('button');
      startButton.classList.add('sb');
      startButton.innerText = 'START';
      startButton.onclick = onStart;
      $('#app')?.appendChild(startButton);
    },
    onHide() {
      $('.sb')?.remove();
    },
  });

  return scene;
};

export default TitleScene;
