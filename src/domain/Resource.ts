import { updateResource } from '../controller/Info';
import { $ } from '../util';

class Resource {
  static $resource = $('.info .resource');
  r: number;

  constructor(v: number) {
    this.r = v;
    this.update(v);
  }

  update(v: number) {
    this.r = v;
    updateResource(v);
  }
}

export default Resource;
