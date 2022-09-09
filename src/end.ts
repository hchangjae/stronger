import { Button, init, initPointer, Scene, Text } from 'kontra';

import Game from './controller/Game';

const EndScene = (game: Game, onRestart: () => void) => {
	init();
  initPointer();
  game.end();

  const message = Text({
    x: 512,
    y: 128,
    font: '24px Monospace',
    text: `You're dead\n\nScore: ${game.getUser().getResource().getResource()}`,
    textAlign: 'center',
    color: '#fff',
    anchor: {
      x: 0.5,
      y: 0.5,
    },
  });

	const restart = Button({
		x: 512,
		y: 240,
		text: {
			text: 'RESTART',
			color: '#fff',
      font: '24px Monospace',
      anchor: { x: 0.5, y: 0.5 }
		},
		padX: 20,
		padY: 10,

		onDown: onRestart,

		render() {
			if (this.hovered) {
        this.textNode.color = 'red';
      } else {
        this.textNode.color = '#fff';
      }
		}
	})

	return Scene({
    id: 'end',
    objects: [message, restart],
  })
};

export default EndScene;
