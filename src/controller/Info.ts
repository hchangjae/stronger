import {$} from '../util';

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
