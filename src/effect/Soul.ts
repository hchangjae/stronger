import { TextClass } from 'kontra';

const RANDOM_SPEED_MAX = 5;
const ACC_SPEED = 0.1;

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
    return Math.sqrt(Math.pow(super.x - 0, 2) + Math.pow(super.y - 0, 2));
  }

  isDone() {
    if (this.getDistance() < 10) return true;
    return false;
  }

  update() {
    super.dx += super.ddx;
    super.dy += super.ddy;

    const distance = this.getDistance();
    super.ddx = -((super.x - 0) / distance) * ACC_SPEED;
    super.ddy = -((super.y - 0) / distance) * ACC_SPEED;

    if (super.x < 50) super.dx *= 0.8;
    if (super.y < 50) super.dy *= 0.8;

    super.update();
  }

  render() {
    super.render();
  }
}
