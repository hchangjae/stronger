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
  protected wave: GameWave;
  protected generation: number;
  protected static $wave = $('.info .wg .wave');
  protected static $generation = $('.info .wg .generation');

  constructor({ wave, generation }: InfoProps) {
    super();
    this.wave = wave;
    this.generation = generation;
  }

  getWave() {
    return this.wave;
  }

  updateWave() {
    update(Info.$wave, `${this.wave.level}`, (value) => `Wave ${value}`);
  }

  updateGeneration() {
    update(Info.$generation, `${this.generation}`, (value) => {
      if (value === '1') {
        return `${value}st Generation`;
      } else if (value === '2') {
        return `${value}nd Generation`;
      } else if (value === '3') {
        return `${value}rd Generation`;
      } else {
        return `${value}th Generation`;
      }
    });
  }
}

export default Info;
