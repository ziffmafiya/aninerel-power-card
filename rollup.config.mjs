import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const isProduction = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/aninerel-power-card.ts',
  output: {
    file: 'dist/aninerel-power-card.js',
    format: 'es',
    sourcemap: !isProduction,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({ browser: true, preferBuiltins: false }),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: !isProduction,
    }),
    json(),
    isProduction &&
      terser({
        format: { comments: false },
      }),
  ],
};
