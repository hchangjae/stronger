import { init, initPointer, Scene, Text } from 'kontra';
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

  let tower = Text({
    text: '🛖',
    x: towerLeft,
    y: 171,
    scaleX: 2.4,
    scaleY: 2.4,
  });

  let slime = Text({
    text: '👾',
    x: towerLeft + 160,
    y: 190,
  });

  let plasma1 = Text({
    text: '⚽️',
    x: towerLeft + 90,
    y: 186,
    rotation: 1.8,
  });

  let plasma2 = Text({
    text: '⚽️',
    x: towerLeft + 130,
    y: 195,
    rotation: 1.8,
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
