import { Sprite } from 'kontra';
import { getSpriteAnimation, gSD } from '../component/spriteSheet';
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
  // @ts-ignore
  HP: number;
  // @ts-ignore
  name: EnemyName;
  // @ts-ignore
  sp: number;
  // @ts-ignore
  sP: number;
  // @ts-ignore
  aP: number;
  // @ts-ignore
  aR: number;
  // @ts-ignore
  dP: number;
  // @ts-ignore
  fCT: number;
  // @ts-ignore
  fireTimer: number;
  // @ts-ignore
  isStop: boolean;
  // @ts-ignore
  HPWrapSprite: Sprite;
  // @ts-ignore
  HPSprite: Sprite;
  // @ts-ignore
  HPMax: number;
  // @ts-ignore
  Sprite: Sprite;

  constructor({ x, y, HP, name, sp, width, height, sP, aP, aR, dP, fCT, spriteAnimationKey }: UnitProps) {
    let T = this;
    T.HP = HP;
    T.name = name;
    T.sp = sp;
    T.sP = sP;
    T.aP = aP;
    T.aR = aR;
    T.dP = dP;
    T.fCT = fCT;

    T.fireTimer = 0;
    T.HPMax = HP;
    T.isStop = false;

    T.Sprite = Sprite({
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
      render() {
        let T = this;
        let ctx = T.context;
        let image = T.currentAnimation.spriteSheet.image;
        let { width, height } = T.currentAnimation.spriteSheet.frame;
        if (!ctx || !image || !T.width || !T.height || !T.scaleX || !T.scaleY) return;
        if (T.deg < -ROTATE_DEG || T.deg > ROTATE_DEG) {
          T.ddeg *= -1;
        }
        T.deg += T.ddeg;
        //@ts-ignore
        let gap = width * gSD(spriteAnimationKey)[3];
        ctx.translate(T.width / 2, T.height);
        ctx.rotate(T.deg);
        ctx.translate(-T.width / 2, -T.height);
        ctx.drawImage(image, gap, 0, width, height, 0, 0, T.width * T.scaleX, T.height * T.scaleY);
        ctx.translate(T.width / 2, T.height);
        ctx.rotate(-T.deg);
        ctx.translate(-T.width / 2, -T.height);
      },
    });

    T.HPSprite = Sprite({
      x: 1,
      y: 1,
      width: width - 2,
      height: 5,
      color: 'red',
    });

    T.HPWrapSprite = Sprite({
      x: 0,
      y: -10,
      width,
      height: 7,
      color: '#fff',
    });

    T.HPWrapSprite.addChild(T.HPSprite);
    T.Sprite.addChild(T.HPWrapSprite);
  }

  hit(value: number) {
    let T = this;
    let damage = value === 0 ? 0 : Math.max(value - T.dP, 1);
    let isDead = false;

    // check death
    if (T.HP > 0 && T.HP - damage <= 0) {
      T.Sprite.playAnimation('smoke');
      T.Sprite.dx = 0;

      T.Sprite.removeChild(T.HPSprite, T.HPWrapSprite);
      isDead = true;
    }

    T.HP -= damage;
    (T.HPSprite.width = Math.max((T.Sprite.width - 2) * T.HP) / T.HPMax), 0;

    // knockback
    if (damage > 0) {
      T.isStop = false;
      if (!isDead) T.Sprite.dx = KNOCKBACK_SPEED;
    }

    return isDead;
  }

  setSpeed(sp: number) {
    let T = this;
    T.sp = -Math.abs(sp);
    T.Sprite.dx = -Math.abs(sp);
  }

  isAlive() {
    return this.HP > 0;
  }

  isDone() {
    // @ts-ignore
    return !this.isAlive() && T.Sprite.currentAnimation._f === T.Sprite.currentAnimation.frames.length - 1;
  }

  isReadyToAttack() {
    return this.fireTimer >= this.fCT;
  }

  cooldownAttack() {
    this.fireTimer = 0;
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
    let T = this;
    if (T.isStop) {
      T.Sprite.dx = 0;
      return;
    }
    if (Math.abs(T.Sprite.dx - T.sp) > 0.2) T.Sprite.dx -= Math.sign(T.Sprite.dx - T.sp) * 0.1;
  }

  update(dt: number) {
    let T = this;
    T.HPWrapSprite.update();
    T.HPSprite.update();
    T.Sprite.update();

    T.handleSpeed();

    T.fireTimer += dt;
  }
}
