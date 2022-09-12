import { Sprite } from 'kontra';
import { getSpriteAnimation } from '../component/spriteSheet';
import { EnemyName } from './Enemy';

const KNOCKBACK_SPEED = 1;

export type UnitProps = {
  x: number;
  y: number;
  HP: number;
  name: EnemyName;
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
  protected name: EnemyName;
  protected speed: number;
  protected soulPoint: number;
  protected attackPower: number;
  protected attackRange: number;
  protected defensePower: number;
  protected fireCooltime: number;
  protected fireTimer: number;
  protected isStop: boolean;

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
    this.speed = speed;
    this.soulPoint = soulPoint;
    this.attackPower = attackPower;
    this.attackRange = attackRange;
    this.defensePower = defensePower;
    this.fireCooltime = fireCooltime;

    this.fireTimer = 0;
    this.HPMax = HP;
    this.isStop = false;

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
      y: -10,
      width,
      height: 7,
      color: '#fff',
    });

    this.HPWrapSprite.addChild(this.HPSprite);
    this.Sprite.addChild(this.HPWrapSprite);
  }

  hit(value: number) {
    const damage = value === 0 ? 0 : Math.max(value - this.defensePower, 1);
    let isDead = false;

    // check death
    if (this.HP > 0 && this.HP - damage <= 0) {
      this.Sprite.playAnimation('smoke');
      this.Sprite.dx = 0;

      this.Sprite.removeChild(this.HPSprite, this.HPWrapSprite);
      isDead = true;
    }

    this.HP -= damage;
    (this.HPSprite.width = Math.max((this.Sprite.width - 2) * this.HP) / this.HPMax), 0;

    // knockback
    if (damage > 0) {
      this.isStop = false;
      if (!isDead) this.Sprite.dx = KNOCKBACK_SPEED;
    }

    return isDead;
  }

  setSpeed(speed: number) {
    this.speed = -Math.abs(speed);
    this.Sprite.dx = -Math.abs(speed);
  }

  getName() {
    return this.name;
  }

  isAlive() {
    return this.HP > 0;
  }

  isDone() {
    // @ts-ignore
    return !this.isAlive() && this.Sprite.currentAnimation._f === this.Sprite.currentAnimation.frames.length - 1;
  }

  isReadyToAttack() {
    return this.fireTimer >= this.fireCooltime;
  }

  cooldownAttack() {
    this.fireTimer = 0;
  }

  getAttackPower() {
    return this.attackPower;
  }

  getSoulPoint() {
    return this.soulPoint;
  }

  stop() {
    if (this.Sprite.dx < 0) {
      this.isStop = true;
    }
  }

  render() {
    this.Sprite.render();
  }

  handleSpeed() {
    if (this.isStop) {
      this.Sprite.dx = 0;
      return;
    }
    if (Math.abs(this.Sprite.dx - this.speed) > 0.2) this.Sprite.dx -= Math.sign(this.Sprite.dx - this.speed) * 0.1;
  }

  update(dt: number) {
    this.HPWrapSprite.update();
    this.HPSprite.update();
    this.Sprite.update();

    this.handleSpeed();

    this.fireTimer += dt;
  }
}
