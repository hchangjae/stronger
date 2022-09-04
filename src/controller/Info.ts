import { GameObjectClass } from 'kontra';
import { $ } from '../util';
import GameWave from '../wave/Wave';

const update = (
  $el: Element | null,
  value: string,
  template: (value: string) => string
) => {
  if ($el) {
    $el.textContent = template(value);
  }
};

export const updateResource = (value: number) =>
  update($('.resource'), `${value}`, (value) => `👻 ${value}`);

export const updateWave = (value: number) =>
  update($('.wave'), `${value}`, (value) => `Wave ${value}`);

export const updateGeneration = (value: number) =>
  update($('.generation'), `${value}`, (value) => `(Generation ${value})`);

type InfoProps = {
  wave: GameWave;
  generation: number;
};
class Info extends GameObjectClass {
  protected wave: GameWave;
  protected generation: number;
  protected static $wave = $('.info .wave_generation .wave');
  protected static $generation = $('.info .wave_generation .generation');

  constructor({ wave, generation }: InfoProps) {
    super();
    this.wave = wave;
    this.generation = generation;
  }

  getWave() {
    return this.wave;
  }

  updateWave() {
    update(Info.$wave, `${this.wave.level}`, (value) => `Wave ${value}`)
  }
}

export default Info;
