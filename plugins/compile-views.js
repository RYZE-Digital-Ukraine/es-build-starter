import Twig from 'twig';
import fs from 'fs';
import path from 'path';
import { paths, utils } from '../esbuild.options.js';

Twig.cache(false);

const compileViewsPlugin = {
  name: 'compile-views',
  setup(build) {
    build.onEnd(() => {
      const twigArr = [];
      const vars = fs.readFileSync(`${paths.getViews().src}twig-vars.json`, { encoding: 'utf8' });

      if (utils.isJson(vars)) {
        const files = fs.readdirSync(paths.getViews().src);

        files.forEach((file) => {
          if (path.extname(file) == '.twig') { twigArr.push(file); }
        });

        twigArr.forEach((filename) => {
          Twig.renderFile(`${paths.getViews().src}${filename}`, JSON.parse(vars), (err, html) => {
            if (err) {
              console.error('\x1b[31m', err, '\x1b[0m');
              return;
            }
            const file = `${path.parse(filename).name}.html`;
            fs.writeFileSync(`${paths.dist}/${file}`, html);
          });
        });
        console.log('\x1b[32m', '⚡ Views were compiled! ⚡', '\x1b[0m');
      } else {
        console.error('\x1b[31m', '💣 Error with JSON string! 💣', '\x1b[0m');
      }
    });
  },
};

export default compileViewsPlugin;
