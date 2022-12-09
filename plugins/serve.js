import esbuild from 'esbuild';
import browserSync from 'browser-sync';
import { devMode, URL, paths } from '../esbuild.options.js';

const config = {
  server: paths.dist,
  port: 8000,
  proxy: URL
}

const esbuildServe = async (options = {}, bsOptions = {}) => {

  Object.assign(config, bsOptions);

  const bs = devMode ? browserSync.create() : null;

  const initBuild = async () => {
    await esbuild
      .build({...options})
      .then(() => bs.reload())
      .catch((err) => {
        const { text } = err.errors[0];
        console.log(`Error message: ${text}`);
      });
  };

  // Start the server
  if (bs) {
    initBuild().then(() => bs.init(config));
    bs.watch(`${paths.src}/**/*.*`).on('change', initBuild);
  }

};

export default esbuildServe;
