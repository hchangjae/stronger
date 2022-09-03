import { Sprite } from 'kontra';
import { getSpriteAnimation } from '../component/spriteSheet';

export type UnitProps = {
  x: number;
  y: number;
  HP: number;
  name: string;
  speed: number;
  width: number;
  height: number;
  attackPower: number;
  attackRange: number;
  defensePower: number;
  fireCooltime: number;
  spriteAnimationKey: string;
};

export default class Unit {
  protected HP: number;
  protected name: string;
  protected attackPower: number;
  protected attackRange: number;
  protected defensePower: number;
  protected fireCooltime: number;
  protected fireTimer: number;

  private HPWrapSprite: Sprite;
  private HPSprite: Sprite;
  private HPMax: number;

  public Sprite: Sprite;

  constructor({
    x,
    y,
    HP,
    name,
    speed,
    width,
    height,
    attackPower,
    attackRange,
    defensePower,
    fireCooltime,
    spriteAnimationKey,
  }: UnitProps) {
    this.HP = HP;
    this.name = name;
    this.attackPower = attackPower;
    this.attackRange = attackRange;
    this.defensePower = defensePower;
    this.fireCooltime = fireCooltime;

    this.fireTimer = 0;
    this.HPMax = HP;

    this.Sprite = Sprite({
      x,
      y: y - height,
      width,
      height,
      dx: speed,
      animations: {
        ...getSpriteAnimation(spriteAnimationKey),
        ...getSpriteAnimation('smoke'),
      },
    });

    this.HPSprite = Sprite({
      x: 1,
      y: 1,
      width: width - 2,
      height: 5,
      color: 'red',
    });

    this.HPWrapSprite = Sprite({
      x: 0,
      y: height + 15,
      width,
      height: 7,
      color: '#fff',
    });

    this.HPWrapSprite.addChild(this.HPSprite);
    this.Sprite.addChild(this.HPWrapSprite);
  }

  hit(value: number) {
    this.HP -= Math.max(value - this.defensePower, 0);
    this.HPSprite.width = Math.max(
      (this.Sprite.height * this.HP) / this.HPMax,
      0
    );

    if (this.HP <= 0) {
      this.Sprite.playAnimation('smoke');
      this.Sprite.dx = 0;

      this.Sprite.removeChild(this.HPSprite, this.HPWrapSprite);
    }
  }

  isAlive() {
    return this.HP > 0;
  }

  isDone() {
    return (
      !this.isAlive() &&
      this.Sprite.currentAnimation._f ===
        this.Sprite.currentAnimation.frames.length - 1
    );
  }

  stop() {
    this.Sprite.dx = 0;
  }

  render() {
    this.Sprite.render();
  }

  update() {
    this.HPWrapSprite.update();
    this.HPSprite.update();
    this.Sprite.update();
  }
}
