import { paths } from '../esbuild.options.js';
import fs from 'fs';
import path from 'path';
import SVGSpriter from 'svg-sprite';

const config = {
  dest: paths.getImgs().dist,
  mode: {
    stack: {
      sprite: './sprite.svg'
    }
  },
};

const svgSpritePlugin = {
  name: 'svg-sprite-plugin',
  setup(build) {
    build.onEnd(() => {
      let svgArr = [];
      let files = fs.readdirSync(paths.getImgs().src);
      let spriter = new SVGSpriter(config);

      files.forEach(file => {
        if (path.extname(file) == '.svg')
          svgArr.push(file);
      });

      for (let i = 0; i < svgArr.length; i++) {
        spriter.add(path.resolve(paths.getImgs().src + svgArr[i]), svgArr[i], fs.readFileSync(paths.getImgs().src + svgArr[i], 'utf-8'));
      };

      // Compile the sprite
      spriter.compile(function (error, result) {
        /* Write `result` files to disk (or do whatever with them ...) */
        for (const type in result.stack) {
          // Recursively create directories as needed
          fs.mkdirSync(path.dirname(result.stack[type].path), { recursive: true });
          // Write the generated resource to disk
          fs.writeFileSync(result.stack[type].path, result.stack[type].contents);

        }
      });
      console.log('\x1b[32m', '⚡ SVG sprite is created! ⚡', '\x1b[0m');
    })
  },
};

export default svgSpritePlugin;
