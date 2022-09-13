import { imageAssets, SpriteSheet } from 'kontra';

let spriteSheetMap = new Map<string, SpriteSheet>();

const SPRITE_DATA = [
  ['slime', 15, 15, '7'],
  ['slime2', 15, 15, '0'],
  ['slime3', 15, 15, '3'],
  ['golem', 15, 15, '2'],
  ['bat', 15, 15, '1'],
  ['smoke', 15, 15, '4..6'],
  ['bullet1', 6, 15, '20'],
  ['bullet2', 6, 15, '21'],
];

export const gSD = (key: string) => SPRITE_DATA.find((v) => v[0] === key);

let gen = ([n, w, h, f]: any) =>
  spriteSheetMap.set(
    n,
    SpriteSheet({
      image: imageAssets['images/sprite.png'],
      frameWidth: w,
      frameHeight: h,
      animations: {
        ...(n === 'smoke'
          ? {
              smoke: {
                frames: f,
                frameRate: 10,
                loop: false,
              },
            }
          : {
              move: {
                frames: f,
                frameRate: 1,
              },
            }),
      },
    })
  );

// Initializes spritesheets for the es.
export let initUnitSpriteSheets = () => {
  [
    ['slime', 15, 15, '7'],
    ['slime2', 15, 15, '0'],
    ['slime3', 15, 15, '3'],
    ['golem', 15, 15, '2'],
    ['bat', 15, 15, '1'],
    ['smoke', 15, 15, '4..6'],
    ['bullet1', 6, 15, '21'],
    ['bullet2', 6, 15, '20'],
  ].map(gen);
};

export let getSpriteAnimation = (key: string) =>
  spriteSheetMap.get(key)?.animations || (gen(gSD(key)), spriteSheetMap.get(key)?.animations);
