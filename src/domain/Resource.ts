import { updateResource } from '../controller/Info';
import { $ } from '../util';

class Resource {
  protected static $resource = $('.info .resource');
  protected resource: number;

  constructor(value: number) {
    this.resource = value;
    this.update(value);
  }

  getResource() {
    return this.resource;
  }

  update(value: number) {
    this.resource = value;
    updateResource(value);
  }
}

export default Resource;
