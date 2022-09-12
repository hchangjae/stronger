import { init, initPointer, Scene, Text } from 'kontra';

import Game from './controller/Game';
import { $ } from './util';

type Func = () => void;

const EndScene = (game: Game, onRestart: Func, onRestartFromScratch: Func) => {
  init();
  initPointer();
  game.end();

  const message = Text({
    x: 50,
    y: 90,
    font: '24px Monospace',
    text: `You're dead\n`,
    color: '#fff',
  });

  const subMessage = Text({
    x: 50,
    y: 140,
    font: '24px Monospace',
    text: `You can start with your next genneration.
      \nWill you inherit your everything to your descendant?`,
    color: '#fff',
  });

  return Scene({
    id: 'end',
    objects: [message, subMessage],
    onShow() {
      const yesButton = document.createElement('button');
      yesButton.classList.add('end-yes-button');
      yesButton.innerText = 'YES';
      yesButton.onclick = onRestart;

      const noButton = document.createElement('button');
      noButton.classList.add('end-no-button');
      noButton.innerText = 'NO';
      noButton.onclick = onRestartFromScratch;

      [yesButton, noButton].forEach(button => $('#app')?.appendChild(button));
    },
    onHide() {
      $('.end-yes-button')?.remove();
      $('.end-no-button')?.remove();
    }
  });
};

export default EndScene;
