// rollup.config.js
import vue from 'rollup-plugin-vue'; // Gère les fichiers .vue
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';

// This is required to read package.json file when
// using Native ES modules in Node.js
// https://rollupjs.org/command-line-interface/#importing-package-json
import { createRequire } from 'node:module';
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile('./package.json');
const version = packageJson.version;

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: `dist/astrea-design-system-${version}.cjs.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `dist/astrea-design-system-${version}.esm.js`,
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      vue(),
      css({
        output: `assets/astrea-design-system-${version}.css`,
      }),
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx'],
      }),
      commonjs(),
      babel({
        extensions: ['.js', '.jsx'],
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
      terser(),
    ],
    external: ['vue'],
  },
];
