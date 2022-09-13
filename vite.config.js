import path from 'path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  server: { port: 8080 },
  build: {
    outDir: path.join(__dirname, 'dist'),
    polyfillModulePreload: false,
    assetsInlineLimit: 100000000,
    minify: 'terser',
    terserOptions: {
      mangle: {
        keep_fnames: false,
        // properties: true,
      },
    },
  },
  plugins: [createHtmlPlugin({}), viteSingleFile()],
});
