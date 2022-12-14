import { init, initPointer, Scene, Text } from 'kontra';

import Game from './controller/Game';
import { $ } from './util';

type Func = () => void;

let EndScene = (game: Game, onRestart: Func, onRestartFromScratch: Func) => {
  init();
  initPointer();
  game.end();

  let message = Text({
    x: 50,
    y: 90,
    font: '24px Monospace',
    text: `You've been swarmed by the incoming enemies.`,
    color: '#fff',
  });

  let subMessage = Text({
    x: 50,
    y: 140,
    font: '24px Monospace',
    text: `However, your remains will make your descendants stronger.
      \nWill your people rise up again?`,
    color: '#fff',
  });

  return Scene({
    id: 'end',
    objects: [message, subMessage],
    onShow() {
      let buttons = document.createElement('div');
      buttons.classList.add('ebs');

      let yesButton = document.createElement('button');
      yesButton.classList.add('eyb');
      yesButton.innerText = 'YES';
      yesButton.onclick = onRestart;

      let noButton = document.createElement('button');
      noButton.classList.add('enb');
      noButton.innerText = 'NO';
      noButton.onclick = onRestartFromScratch;

      [yesButton, noButton].forEach((button) => buttons.appendChild(button));
      $('#app')?.appendChild(buttons);
    },
    onHide() {
      $('.ebs')?.remove();
    },
  });
};

export default EndScene;
