import { imageAssets, SpriteSheet } from 'kontra';

const spriteSheetMap = new Map<string, SpriteSheet>();

// Initializes spritesheets for the enemies.
export const initUnitSpriteSheets = () => {
  spriteSheetMap.set(
    'slime',
    SpriteSheet({
      image: imageAssets['images/slime.png'],
      frameWidth: 32,
      frameHeight: 32,
      animations: {
        move: {
          frames: '0..3',
          frameRate: 4,
        },
      },
    })
  );

  spriteSheetMap.set(
    'slime2',
    SpriteSheet({
      image: imageAssets['images/slime2.png'],
      frameWidth: 20,
      frameHeight: 16,
      animations: {
        move: {
          frames: '0..1',
          frameRate: 4,
        },
      },
    })
  );

  spriteSheetMap.set(
    'slime3',
    SpriteSheet({
      image: imageAssets['images/slime3.png'],
      frameWidth: 20,
      frameHeight: 20,
      animations: {
        move: {
          frames: '0..1',
          frameRate: 2,
        },
      },
    })
  );

  spriteSheetMap.set(
    'bat',
    SpriteSheet({
      image: imageAssets['images/bat.png'],
      frameWidth: 12,
      frameHeight: 13,
      animations: {
        move: {
          frames: '0..1',
          frameRate: 4,
        },
      },
    })
  );

  spriteSheetMap.set(
    'golem',
    SpriteSheet({
      image: imageAssets['images/golem.png'],
      frameWidth: 12,
      frameHeight: 12,
      animations: {
        move: {
          frames: '0..1',
          frameRate: 4,
        },
      },
    })
  );

  spriteSheetMap.set(
    'smoke',
    SpriteSheet({
      image: imageAssets['images/smoke.png'],
      frameWidth: 12,
      frameHeight: 12,
      animations: {
        smoke: {
          frames: '0..2',
          frameRate: 10,
          loop: false,
        },
      },
    })
  );
};

export const getSpriteAnimation = (key: string) => spriteSheetMap.get(key)?.animations;
