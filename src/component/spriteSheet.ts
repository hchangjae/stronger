import { imageAssets, SpriteSheet } from 'kontra';

const spriteSheetMap = new Map<string, SpriteSheet>();

// Initializes spritesheets for the enemies.
export const initUnitSpriteSheets = () => {
  spriteSheetMap.set(
    'slime',
    SpriteSheet({
      image: imageAssets['assets/Slime.png'],
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
};

export const getSpriteAnimation = (key: string) =>
  spriteSheetMap.get(key)?.animations;
