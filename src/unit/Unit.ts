import { Sprite } from 'kontra';
import { getSpriteAnimation } from '../component/spriteSheet';

export type UnitProps = {
  x: number;
  y: number;
  HP: number;
  name: string;
  speed: number;
  scale: number;
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
    scale,
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
      y,
      dx: speed,
      scaleX: scale,
      scaleY: scale,
      animations: getSpriteAnimation(spriteAnimationKey),
    });

    this.HPSprite = Sprite({
      x,
      y: y + this.Sprite.height * scale + 5,
      dx: speed,
      scaleX: scale,
      scaleY: scale,
      width: this.Sprite.height,
      height: 5,
      color: 'red',
    });

    const padding = 1 * scale;

    this.HPWrapSprite = Sprite({
      x: x - padding,
      y: y + this.Sprite.height * scale + 5 - padding,
      dx: speed,
      scaleX: scale,
      scaleY: scale,
      width: this.Sprite.height + padding * 2,
      height: 7,
      color: '#fff',
    });
  }

  hit(value: number) {
    this.HP -= Math.max(value - this.defensePower, 0);
    this.HPSprite.width = (this.Sprite.height * this.HP) / this.HPMax;
  }

  isAlive() {
    return this.HP > 0;
  }

  stop() {
    this.HPWrapSprite.dx = 0;
    this.HPSprite.dx = 0;
    this.Sprite.dx = 0;
  }

  render() {
    this.HPWrapSprite.render();
    this.HPSprite.render();
    this.Sprite.render();
  }

  update() {
    this.HPWrapSprite.update();
    this.HPSprite.update();
    this.Sprite.update();
  }
}
