import { TextClass } from 'kontra';

const RANDOM_SPEED_MAX = 5;
const ACC_SPEED = 0.1;
const TARGET_X = 20;
const TARGET_Y = 10;

export default class Soul extends TextClass {
  constructor(props: any) {
    super({
      ...props,
      text: '👻',
    });
    super.dx = (Math.random() - 0.5) * RANDOM_SPEED_MAX;
    super.dy = (Math.random() - 0.5) * RANDOM_SPEED_MAX;
  }

  getDistance() {
    return Math.sqrt(Math.pow(super.x - TARGET_X, 2) + Math.pow(super.y - TARGET_Y, 2));
  }

  isDone() {
    if (this.getDistance() < 10) return true;
    return false;
  }

  update() {
    super.dx += super.ddx;
    super.dy += super.ddy;

    const distance = this.getDistance();
    super.ddx = -((super.x - TARGET_X) / distance) * ACC_SPEED;
    super.ddy = -((super.y - TARGET_Y) / distance) * ACC_SPEED;

    if (super.x < 50) super.dx *= 0.8;
    if (super.y < 50) super.dy *= 0.8;

    super.update();
  }

  render() {
    super.render();
  }
}
