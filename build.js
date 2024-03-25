// Requires Node.js 12.x or higher
const esbuild = require('esbuild');

// Define an async function to perform the build process
async function build() {
  // Dynamically import the ES module plugin
  const babelPlugin = (await import('esbuild-plugin-babel')).default;

  // Use `process.env.BUILD_ENV` to set the environment
  const buildEnv = process.env.BUILD_ENV || 'mjs'; // Default to 'mjs'

  await esbuild
    .build({
      entryPoints: ['src/index.js'],
      bundle: true,
      outdir: `dist/.esbuild/${buildEnv}`,
      format: buildEnv === 'cjs' ? 'cjs' : 'esm',
      sourcemap: true,
      plugins: [
        babelPlugin({
          // Configure Babel options here if necessary
          // This will use your .babelrc.js configuration by default
        }),
      ],
    })
    .catch(() => process.exit(1));
}

// Call the build function
build();
