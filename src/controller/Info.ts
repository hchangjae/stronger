import { GameObjectClass } from 'kontra';
import { $ } from '../util';
import GameWave from '../wave/Wave';

let update = ($el: Element | null, value: string, template: (value: string) => string) => {
  if ($el) {
    $el.textContent = template(value);
  }
};

export let updateResource = (value: number) => update($('.info .resource'), `${value}`, (value) => `👻 ${value}`);

type InfoProps = {
  wave: GameWave;
  generation: number;
};

class Info extends GameObjectClass {
  // @ts-ignore
  wave: GameWave;
  // @ts-ignore
  generation: number;
  static $wave = $('.info .wg .wave');
  static $generation = $('.info .wg .generation');

  constructor({ wave, generation }: InfoProps) {
    super();
    let T = this;
    T.wave = wave;
    T.generation = generation;
  }

  update() {
    update(Info.$wave, `${this.wave.level}`, (value) => `Wave ${value}`);
    update(Info.$generation, `${this.generation}`, (value) => {
      let th = value === '1' ? 'st' : value === '2' ? 'nd' : value === '3' ? 'rd' : 'th';
      return `${value}${th} Generation`;
    });
  }
}

export default Info;
