import { paths, devMode, settings, smartGrid } from './esbuild.options.js';
import esbuild from 'esbuild';
import esbuildServe from './plugins/serve.js';
import smartgrid from 'smart-grid';

// Plugins import
import copyStaticFilesPlugin from './plugins/copy-static-files.js';
import compileViewsPlugin from './plugins/compile-views.js';
import svgSpritePlugin from './plugins/svg-sprite.js';
import clearDirPlugin from './plugins/clear-dir.js';
import imgMinPlugin from './plugins/image-min.js';
import cssPlugin from './plugins/sass-compile.js';
// import csslintPlugin from './plugins/style-lint.js';
// import eslintPlugin from './plugins/es-lint.js';
import babelPlugin from './plugins/babel.js';

const devPlugins = [
  clearDirPlugin,
  compileViewsPlugin,
  svgSpritePlugin,
  // csslintPlugin,
  // eslintPlugin,
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
  loader: {'.woff': 'dataurl', '.woff2': 'dataurl'},
  outdir: paths.dist,
  target: !devMode ? settings.support : [],
  sourcemap: devMode,
  bundle: true,
  minify: !devMode,
  plugins: devMode ? devPlugins : prodPlugins
}

if (devMode) {
  if (smartGrid) {
    smartgrid(`${paths.getCSS().src}base`, settings.smartGrid);
  }
  esbuildServe(config)
  .then(() => console.log('⚡ Serve! ⚡'));
} else {
  esbuild
  .build(config)
  .then(() => console.log('⚡ Build complete! ⚡'))
  .catch(() => process.exit(1));
}

