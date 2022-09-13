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
  // @ts-ignore
  target: GameObject;
  // @ts-ignore
  sp: number;
  // @ts-ignore
  image: string;
  // @ts-ignore
  aP: number;
  // @ts-ignore
  slowPower?: number;
  // @ts-ignore
  sR: number;
  // @ts-ignore
  isCollided: boolean;
  
  constructor({ x, y, image, ttl, rotation, target, sp, aP, slowPower, sR }: BulletProps) {
    super({
      x,
      y,
      ttl,
      rotation,
    });
    let T = this;
    T.image = image;
    T.sp = sp;
    T.aP = aP;
    T.slowPower = slowPower;
    T.sR = sR;
    T.target = target;
    T.isCollided = false;
  }
}

export default Bullet;
