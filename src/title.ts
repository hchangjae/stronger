import { imageAssets, init, initPointer, Scene, Sprite, Text } from 'kontra';
import Ground from './domain/Ground';
import { $ } from './util';

const TitleScene = (onStart: () => void) => {
  init();
  initPointer();

  const title = Text({
    x: 350,
    y: 90,
    font: '48px Monospace',
    text: 'STRONGER',
    textAlign: 'center',
    color: '#fff',
  });

  const subtitle = Text({
    x: 350,
    y: 140,
    font: '36px Monospace',
    text: '(What does kill you)',
    textAlign: 'center',
    color: '#aaa',
  });

  const ground = new Ground();
  const tower = Sprite({
    image: imageAssets['assets/tower.png'],
    x: 170,
    y: 52,
    scaleX: 1.8,
    scaleY: 1.8,
  });

  const scene = Scene({
    id: 'title',
    objects: [title, subtitle, ground.bg, ...ground.sprites, tower],
    onShow() {
      const startButton = document.createElement('button');
      startButton.classList.add('start-button');
      startButton.innerText = 'START';
      startButton.onclick = onStart;
      $('#app')?.appendChild(startButton);
    },
    onHide() {
      $('.start-button')?.remove();
    },
  });

  return scene;
};

export default TitleScene;
