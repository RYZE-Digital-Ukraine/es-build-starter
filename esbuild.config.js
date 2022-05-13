import { paths, devMode, settings } from './esbuild.options.js';
import esbuild from 'esbuild';
import esbuildServe from './plugins/serve.js';

// Plugins import
import copyStaticFilesPlugin from './plugins/copy-static-files.js';
import compileViewsPlugin from './plugins/compile-views.js';
import svgSpritePlugin from './plugins/svg-sprite.js';
import clearDirPlugin from './plugins/clear-dir.js';
import imgMinPlugin from './plugins/image-min.js';
import cssPlugin from './plugins/sass-compile.js';
import eslintPlugin from './plugins/es-lint.js';
import babelPlugin from './plugins/babel.js';

const devPlugins = [
  clearDirPlugin,
  compileViewsPlugin,
  svgSpritePlugin,
  eslintPlugin,
  cssPlugin,
  copyStaticFilesPlugin,
];

const prodPlugins = [
  clearDirPlugin,
  compileViewsPlugin,
  svgSpritePlugin,
  babelPlugin,
  imgMinPlugin,
  cssPlugin,
  copyStaticFilesPlugin,
];

const config = {
  logLevel: 'debug',
  define: {
    DEBUG: devMode,
    window: 'globalThis'
  },
  color: true,
  entryPoints: [`${paths.getJS().src}index.js`, `${paths.getCSS().src}main.scss`],
  outdir: paths.dist,
  target: !devMode ? settings.support : [],
  sourcemap: devMode,
  bundle: true,
  minify: !devMode,
  plugins: devMode ? devPlugins : prodPlugins
}

if (devMode) {
  esbuildServe(config)
  .then(() => console.log('⚡ Serve! ⚡'));
} else {
  esbuild
  .build(config)
  .then(() => console.log('⚡ Build complete! ⚡'))
  .catch(() => process.exit(1));
}

