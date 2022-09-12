import { Sprite } from 'kontra';
import { getSpriteAnimation } from '../component/spriteSheet';
import { EnemyName } from './Enemy';

let KNOCKBACK_SPEED = 1;
let ROTATE_DEG = 0.2;
let ROTATE_SPEED = 0.01;

export type UnitProps = {
  x: number;
  y: number;
  HP: number;
  name: EnemyName;
  sp: number;
  width: number;
  height: number;
  sP: number;
  aP: number;
  aR: number;
  dP: number;
  fCT: number;
  spriteAnimationKey: string;
};

export default class Unit {
  protected HP: number;
  protected name: EnemyName;
  protected sp: number;
  protected sP: number;
  protected aP: number;
  protected aR: number;
  protected dP: number;
  protected fCT: number;
  protected fireTimer: number;
  protected isStop: boolean;

  private HPWrapSprite: Sprite;
  private HPSprite: Sprite;
  private HPMax: number;

  public Sprite: Sprite;

  constructor({ x, y, HP, name, sp, width, height, sP, aP, aR, dP, fCT, spriteAnimationKey }: UnitProps) {
    this.HP = HP;
    this.name = name;
    this.sp = sp;
    this.sP = sP;
    this.aP = aP;
    this.aR = aR;
    this.dP = dP;
    this.fCT = fCT;

    this.fireTimer = 0;
    this.HPMax = HP;
    this.isStop = false;

    let isSingleImage = ['golem', 'slime3'].includes(spriteAnimationKey);

    this.Sprite = Sprite({
      x,
      y: y - height,
      ddeg: ROTATE_SPEED,
      deg: 0,
      width,
      height,
      dx: sp,
      animations: {
        ...getSpriteAnimation(spriteAnimationKey),
        ...getSpriteAnimation('smoke'),
      },
      ...(isSingleImage
        ? {
            render() {
              let ctx = this.context;
              let image = this.currentAnimation.spriteSheet.image;
              if (!ctx || !image || !this.width || !this.height || !this.scaleX || !this.scaleY) return;
              if (this.deg < -ROTATE_DEG || this.deg > ROTATE_DEG) {
                this.ddeg *= -1;
              }
              this.deg += this.ddeg;
              ctx.translate(this.width / 2, this.height);
              ctx.rotate(this.deg);
              ctx.translate(-this.width / 2, -this.height);
              ctx.drawImage(image, 0, 0, this.width * this.scaleX, this.height * this.scaleY);
              ctx.translate(this.width / 2, this.height);
              ctx.rotate(-this.deg);
              ctx.translate(-this.width / 2, -this.height);
            },
          }
        : {}),
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
    let damage = value === 0 ? 0 : Math.max(value - this.dP, 1);
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

  setSpeed(sp: number) {
    this.sp = -Math.abs(sp);
    this.Sprite.dx = -Math.abs(sp);
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
    return this.fireTimer >= this.fCT;
  }

  cooldownAttack() {
    this.fireTimer = 0;
  }

  getAttackPower() {
    return this.aP;
  }

  getSoulPoint() {
    return this.sP;
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
    if (Math.abs(this.Sprite.dx - this.sp) > 0.2) this.Sprite.dx -= Math.sign(this.Sprite.dx - this.sp) * 0.1;
  }

  update(dt: number) {
    this.HPWrapSprite.update();
    this.HPSprite.update();
    this.Sprite.update();

    this.handleSpeed();

    this.fireTimer += dt;
  }
}
