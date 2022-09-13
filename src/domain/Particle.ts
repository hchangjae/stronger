import { SpriteClass } from 'kontra';

class ParticleClass extends SpriteClass {
  // @ts-ignore
  protected initialTtl?: number;

  init(props: any) {
    super.init(props);

    this.initialTtl = this.ttl;
  }

  update() {
    let T = this;
    T.advance();

    if (T.ttl && T.initialTtl) {
      T.opacity = T.ttl / T.initialTtl;
    }
  }
}

let Particle = (props: any) => new ParticleClass(props);

export default Particle;
