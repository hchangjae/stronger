import { imageAssets, SpriteSheet } from 'kontra';

const spriteSheetMap = new Map<string, SpriteSheet>();

// Initializes spritesheets for the enemies.
export const initUnitSpriteSheets = () => {
  spriteSheetMap.set(
    'slime',
    SpriteSheet({
      image: imageAssets['assets/slime.png'],
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
      image: imageAssets['assets/slime2.png'],
      frameWidth: 24,
      frameHeight: 20,
      animations: {
        move: {
          frames: '0..3',
          frameRate: 4,
        },
      },
    })
  );

  spriteSheetMap.set(
    'slime3',
    SpriteSheet({
      image: imageAssets['assets/slime3.png'],
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
    'bat',
    SpriteSheet({
      image: imageAssets['assets/bat.png'],
      frameWidth: 12,
      frameHeight: 13,
      animations: {
        move: {
          frames: '0..3',
          frameRate: 4,
        },
      },
    })
  );

  spriteSheetMap.set(
    'smoke',
    SpriteSheet({
      image: imageAssets['assets/smoke.png'],
      frameWidth: 16,
      frameHeight: 16,
      animations: {
        smoke: {
          frames: '0..7',
          frameRate: 10,
          loop: false,
        },
      },
    })
  );
};

export const getSpriteAnimation = (key: string) => spriteSheetMap.get(key)?.animations;
