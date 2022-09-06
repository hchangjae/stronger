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
  soulPoint: number;
  attackPower: number;
  attackRange: number;
  defensePower: number;
  fireCooltime: number;
  spriteAnimationKey: string;
};

export default class Unit {
  protected HP: number;
  protected name: string;
  protected soulPoint: number;
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
    soulPoint,
    attackPower,
    attackRange,
    defensePower,
    fireCooltime,
    spriteAnimationKey,
  }: UnitProps) {
    this.HP = HP;
    this.name = name;
    this.soulPoint = soulPoint;
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
      y: height + 5,
      width,
      height: 7,
      color: '#fff',
    });

    this.HPWrapSprite.addChild(this.HPSprite);
    this.Sprite.addChild(this.HPWrapSprite);
  }

  hit(value: number) {
    const damage = Math.max(value - this.defensePower, 0);
    let isDead = false;

    if (this.HP > 0 && this.HP - damage <= 0) {
      this.Sprite.playAnimation('smoke');
      this.Sprite.dx = 0;

      this.Sprite.removeChild(this.HPSprite, this.HPWrapSprite);
      isDead = true;
    }

    this.HP -= damage;
    this.HPSprite.width = Math.max((this.Sprite.height * this.HP) / this.HPMax, 0);
    return isDead;
  }

  isAlive() {
    return this.HP > 0;
  }

  isDone() {
    return !this.isAlive() && this.Sprite.currentAnimation._f === this.Sprite.currentAnimation.frames.length - 1;
  }

  getAttackPower() {
    return this.attackPower;
  }

  getSoulPoint() {
    return this.soulPoint;
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
