import { imageAssets, Sprite, SpriteSheet } from 'kontra';

export type CreateUnitProps = {
  scale: number;
  speed: number;
  x?: number;
  y?: number;
  color?: string;
};

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

export const createUnit = (props: CreateUnitProps) => {
  const { scale, speed, x, y, color } = props;

  return Sprite({
    dx: speed,
    x,
    y,
    animations: spriteSheetMap.get('slime')?.animations,
  });
};
