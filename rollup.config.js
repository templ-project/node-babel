const babel = require('@rollup/plugin-babel');
const {nodeResolve} = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

const extensions = ['.js'];

// Use `process.env.BUILD_ENV` to set the environment
const buildEnv = process.env.BUILD_ENV || 'mjs'; // Default to 'mjs'

// Define environment-specific overrides here
const envTargets = {
  cjs: {node: 'current'},
  mjs: {esmodules: true},
  browser: '> 0.25%, not dead, last 2 versions',
};

module.exports = {
  input: 'src/index.js',
  output: {
    dir: `dist/.rollup/${buildEnv}`,
    format: buildEnv === 'cjs' ? 'cjs' : 'es',
    // sourcemap: true,
  },
  plugins: [
    nodeResolve({extensions}),
    commonjs(),
    // not using babel for cjs builds, not sure how to solve error yet
    ...(buildEnv !== 'cjs'
      ? [
          babel({
            babelHelpers: 'bundled',
            extensions,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: envTargets[buildEnv],
                  modules: buildEnv === 'cjs' ? 'commonjs' : false, // Specify module transformation based on the environment
                },
              ],
            ],
          }),
        ]
      : []),
  ],
};
