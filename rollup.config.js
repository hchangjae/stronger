import kontra from 'rollup-plugin-kontra';

export default {
  entry: 'ts-out/main.js',
  dest: 'bundle.js',
  plugins: [
    kontra({
      gameObject: {
        // enable only velocity and rotation functionality
        velocity: true,
        rotation: true,
      },
    }),
  ],
};
