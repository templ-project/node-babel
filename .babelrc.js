// .babelrc.js
const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          // targets environments that support ES Modules, which helps Babel decide which
          // transformations/plugins to use
          esmodules: true,
        },
        // tells Babel not to transform modules—thus preserving import and export statements
        modules: false,
        // `useBuildIns` and `corejs` configure Babel to only include polyfills for features
        // used in your code that are missing in the target environment, requiring
        useBuiltIns: 'usage',
        corejs: 3,
        // ensures that Babel attempts to transpile all JavaScript features to comply with your
        // specified target. This might not be strictly necessary for targeting ES11, but it's
        // a safety net to ensure compatibility.
        forceAllTransforms: true,
      },
    ],
  ],
};

if (process.env.BABEL_ENV === 'cjs') {
  const custom = config.presets[0][1];
  //  This option tells Babel to transform ES modules (import/export) into CommonJS
  // (require/module.exports). This is the critical change for making your code compatible with
  // Node.js environments that only support CommonJS module syntax.
  custom.modules = 'commonjs';
  custom.useBuiltIns = 'usage';

  // While this remains unchanged from the reference configuration, it's worth highlighting that
  // targeting the current Node.js version ensures the output is optimized for that specific runtime
  // environment, taking advantage of native support for ES11 features where available.
  const {targets} = custom;
  delete targets.esmodules;
  targets.node = 'current';
}

if (process.env.BABEL_ENV === 'browser') {
  const custom = config.presets[0][1];
  // The value "> 0.25%, not dead, last 2 versions" tells Babel to target browsers used by more than
  // 0.25% of global users, that are not "dead" (browsers without official support or updates for 24
  // months), and the last 2 versions of all browsers. This ensures your JavaScript code is transpiled
  // to be compatible with the vast majority of users' browsers. Adjust this string to fit the specific
  // needs and audience of your project.
  custom.targets = '> 0.25%, not dead, last 2 versions';
  // "useBuiltIns": "usage" and "corejs": 3: These options configure Babel to automatically include
  // necessary polyfills (using core-js) based on the usage in your code and the browser targets. This
  // helps ensure that modern JavaScript features work in older browsers.
  custom.useBuiltIns = 'usage';
}

module.exports = config;
