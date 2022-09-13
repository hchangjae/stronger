import kontra from 'rollup-plugin-kontra';

/** @type {import('vite').UserConfig} */
export default {
  server: {
    port: 8080,
  },
  //   build: {
  //     rollupOptions: {
  //       input: 'src/main.ts',
  //       output: {
  //         dir: 'dist2',
  //       },
  //       plugins: [
  //         kontra({
  //           gameObject: {
  //             // enable only velocity and rotation functionality
  //             velocity: true,
  //             rotation: true,
  //           },
  //         }),
  //       ],
  //     },
  //   },
};
