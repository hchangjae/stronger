import {
  GameObject,
  GameObjectClass,
  collides,
  Sprite,
  imageAssets,
} from 'kontra';
import { TOWER_POSITION } from '../main';

type BulletProps = {
  x: number;
  y: number;
  image: string;
  ttl?: number;
  rotation?: number;
  target: GameObject;
  speed: number;
  attackPower: number;
  splashRadius: number;
};
class Bullet extends GameObjectClass {
  target: GameObject;
  speed: number;
  image: string;
  attackPower: number;
  splashRadius: number;
  isCollided: boolean;

  constructor({
    x,
    y,
    image,
    ttl,
    rotation,
    target,
    speed,
    attackPower,
    splashRadius,
  }: BulletProps) {
    super({
      x,
      y,
      ttl,
      rotation,
    });
    this.image = image;
    this.speed = speed;
    this.attackPower = attackPower;
    this.splashRadius = splashRadius;
    this.target = target;
    this.isCollided = false;
  }

  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getIsCollides() {
    return collides(this, this.target);
  }

  setTtl(value: number) {
    this.ttl = value;
  }

  getDistanceFromTarget() {
    return Math.sqrt(
      Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2)
    );
  }

  setRotation(value: number) {
    this.rotation = value;
  }

  setIsCollided(value: boolean) {
    this.isCollided = value;
  }

  render() {
    Sprite({
      image: imageAssets[this.image],
      x: TOWER_POSITION + 40,
      y: 170,
      width: 20,
      height: 33,
      anchor: { x: 0.5, y: 0.5 },
    }).render();
  }
}

export default Bullet;
