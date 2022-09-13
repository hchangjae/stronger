import { GameObject, GameObjectClass } from 'kontra';

type BulletProps = {
  x: number;
  y: number;
  image: string;
  ttl?: number;
  rotation?: number;
  target: GameObject;
  sp: number;
  aP: number;
  slowPower?: number;
  sR: number;
};
class Bullet extends GameObjectClass {
  target: GameObject;
  sp: number;
  image: string;
  aP: number;
  slowPower?: number;
  sR: number;
  isCollided: boolean;

  constructor({ x, y, image, ttl, rotation, target, sp, aP, slowPower, sR }: BulletProps) {
    super({
      x,
      y,
      ttl,
      rotation,
    });
    this.image = image;
    this.sp = sp;
    this.aP = aP;
    this.slowPower = slowPower;
    this.sR = sR;
    this.target = target;
    this.isCollided = false;
  }
}

export default Bullet;
