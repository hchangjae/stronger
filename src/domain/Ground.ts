import { imageAssets, Sprite } from 'kontra';
import { GROUND_POSITION } from '../main';

export default class Ground {
  // @ts-ignore
  sprites: Sprite[] = [];
  // @ts-ignore
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
      this.sprites.push(
        Sprite({
          image: imageAssets['images/ground.png'],
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
