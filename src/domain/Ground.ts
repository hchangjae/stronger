import { Sprite } from 'kontra';
import { GROUND_POSITION } from '../main';

export default class Ground {
  sprites: Sprite[] = [];
  bg: Sprite;

  constructor() {
    this.bg = Sprite({
      x: 0,
      y: 236,
      width: 1024,
      height: 30,
      color: '#4e3d45',
    });

    let numSprites = 1024 / 16;

    for (let i = 0; i < numSprites; i++) {
      let d = document.createElement('img');
      d.src =
        'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEWJWkdOPET/1GzSiRaJWUb/4pxvBUKCAAAAZklEQVQI1y3G0Q3DIAwA0SN4AFtiAtP809ABrCYTIGX/VQJSTvfx8HvM94G777cv9MNng8pUPZwmZ1/R+lZzJ8P3bP/6ESTAfxFslYQAuQVx6aQISQlIJRAUKZdCUUzNkhnY24IuPCgGDoN65swqAAAAAElFTkSuQmCC';
      this.sprites.push(
        Sprite({
          image: d,
          x: i * 16,
          y: GROUND_POSITION,
        })
      );
    }
  }

  render() {
    this.bg.render();

    this.sprites.forEach((sprite) => {
      sprite.render();
    });
  }
}
