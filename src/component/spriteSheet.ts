import { imageAssets, SpriteSheet } from 'kontra';

let spriteSheetMap = new Map<string, SpriteSheet>();

let add = (
  name: string,
  frameWidth: number,
  frameHeight: number,
  animationName: string,
  frames: string,
  frameRate: number,
  loop = true
) => {
  spriteSheetMap.set(
    name,
    SpriteSheet({
      image: imageAssets[`images/${name}.png`],
      frameWidth,
      frameHeight,
      animations: {
        [animationName]: {
          frames,
          frameRate,
          loop,
        },
      },
    })
  );
};

// Initializes spritesheets for the es.
export let initUnitSpriteSheets = () => {
  add('slime', 32, 32, 'move', '0..3', 4);
  add('slime2', 20, 16, 'move', '0..1', 4);
  add('slime3', 20, 20, 'move', '0..1', 2);
  add('bat', 12, 13, 'move', '0..1', 4);
  add('golem', 12, 12, 'move', '0', 4);
  add('smoke', 12, 12, 'smoke', '0..2', 10, false);
};

export let getSpriteAnimation = (key: string) => spriteSheetMap.get(key)?.animations;
