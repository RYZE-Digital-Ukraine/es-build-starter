import { devMode, settings } from '../esbuild.options.js';
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

const config = {
  type: settings.inlineCSS ? 'style' : 'css',
  cssImports: true,
};

if (!devMode) {
  config.transform = async (source) => {
    const { css } = await postcss([autoprefixer]).process(source, { from: undefined });
    return css;
  }
}

const cssPlugin = sassPlugin(config);

export default cssPlugin;
