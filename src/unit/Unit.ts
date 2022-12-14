import { Sprite } from 'kontra';
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
  text: string;
};

export default class Unit {
  HP: number;
  name: EnemyName;
  sp: number;
  sP: number;
  aP: number;
  aR: number;
  dP: number;
  fCT: number;
  fireTimer: number;
  isStop: boolean;

  HPWrapSprite: Sprite;
  HPSprite: Sprite;
  HPMax: number;

  Sprite: Sprite;

  constructor({ x, y, HP, name, sp, width, height, sP, aP, aR, dP, fCT, text }: UnitProps) {
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

    this.Sprite = Sprite({
      x,
      y: y,
      ddeg: ROTATE_SPEED,
      deg: 0,
      width,
      height,
      dx: sp,
      render() {
        let ctx = this.context;
        if (!ctx || !this.width || !this.height || !this.scaleX || !this.scaleY) return;
        if (this.deg < -ROTATE_DEG || this.deg > ROTATE_DEG) {
          this.ddeg *= -1;
        }
        this.deg += this.ddeg;
        //@ts-ignore
        ctx.translate(this.width / 2, this.height);
        ctx.rotate(this.deg);
        ctx.translate(-this.width / 2, -this.height);
        ctx.fillText(text, 0, 0, this.width);
        ctx.translate(this.width / 2, this.height);
        ctx.rotate(-this.deg);
        ctx.translate(-this.width / 2, -this.height);
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
      y: -40,
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

  isAlive() {
    return this.HP > 0;
  }

  isDone() {
    // @ts-ignore
    return !this.isAlive();
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
