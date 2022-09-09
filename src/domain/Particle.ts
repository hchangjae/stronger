import { SpriteClass } from 'kontra';

class ParticleClass extends SpriteClass {
  protected initialTtl?: number;

  init(props: any) {
    super.init(props);

    this.initialTtl = this.ttl;
  }

  update() {
    this.advance();

    if (this.ttl && this.initialTtl) {
      this.opacity = this.ttl / this.initialTtl;
    }
  }
}

const Particle = (props: any) => new ParticleClass(props);

export default Particle;
