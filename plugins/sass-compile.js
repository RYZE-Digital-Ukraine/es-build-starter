import { paths, devMode } from '../esbuild.options.js';
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';


const config = {
  async transform(source) {
    const { css } = await postcss([autoprefixer]).process(source, {
      from: `${paths.getCSS().src}main.scss`
    });
    return css;
  }
};

const cssPlugin = !devMode ? sassPlugin(config) : sassPlugin();

export default cssPlugin;
