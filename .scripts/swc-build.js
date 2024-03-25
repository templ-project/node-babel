const fs = require('fs');
const path = require('path');
const {spawn} = require('child_process');

const buildEnv = process.env.BUILD_ENV || 'mjs';

function generateSwcConfig(env) {
  const config = {
    module: {type: 'es6'},
    jsc: {
      parser: {syntax: 'ecmascript'},
      transform: null,
      target: 'es2020',
      loose: false,
    },
  };

  if (env === 'cjs') {
    config.module.type = 'commonjs';
  }

  fs.writeFileSync('.swcrc', JSON.stringify(config, null, 2));
}

generateSwcConfig(buildEnv);

const outputDir = `dist/.swc/${buildEnv}`;

// Import globby dynamically (since we're in a CommonJS module)
import('globby').then(({globby}) => {
  globby(['src/**/*.js']).then((files) => {
    files.forEach((file) => {
      // Calculate output path
      const outFile = path.join(outputDir, path.relative('src', file));
      const outDir = path.dirname(outFile);

      // Ensure the directory exists
      fs.mkdirSync(outDir, {recursive: true});

      console.log(`Compiling ${file} to ${outFile}`);

      // Use a Promise to handle the asynchronous nature of spawn
      const compile = () =>
        new Promise((resolve, reject) => {
          const proc = spawn('npx', ['swc', file, '-o', outFile], {stdio: 'inherit'});

          proc.on('close', (code) => {
            if (code === 0) {
              resolve();
            } else {
              reject(new Error(`SWC failed for ${file} with exit code ${code}`));
            }
          });
        });

      compile().catch((err) => {
        console.error(err.message);
        process.exit(1);
      });
    });
  });
});
