import { Grid, Scene, Text } from 'kontra';

const COMMON_INFO_TEXT_OPTIONS = {
    color: 'white',
}

const renderCurrentResource = (value: number) =>
  Text({
    x: 0,
    y: 0,
    text: `👻 ${value}`,
    color: 'white',
  });

const renderCurrentWaveAndGeneration = (wave: number, generation: number) =>
  Text({
    x: 900,
    y: 0,
    text: `Wave ${wave}\n(Generation ${generation})`,
    color: 'white',
    textAlign: 'center',
  });

const infoScene = (resource: number, wave: number, generation: number) =>
  Scene({
    id: 'info',
    objects: [
      Grid({
        x: 0,
        y: 0,
        flow: 'row',
        justify: ['start', 'end'],
        children: [
          renderCurrentResource(resource),
          renderCurrentWaveAndGeneration(wave, generation),
        ],
      }),
    ],
  });

export default infoScene;
