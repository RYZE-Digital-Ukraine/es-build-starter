import { paths, devMode } from '../esbuild.options.js';
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

const config = {
  loadPaths: ['./']
};

if (devMode) {
  config.transform = async (source) => {
    const { css } = await postcss([autoprefixer]).process(source, {
      from: `${paths.getCSS().src}main.scss`
    });
    return css;
  }
}

const cssPlugin = sassPlugin(config);

export default cssPlugin;
