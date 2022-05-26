import { paths, utils } from '../esbuild.options.js';
import Twig from 'twig';
import fs from 'fs';
import path from 'path';

Twig.cache(false);

const compileViewsPlugin = {
  name: 'compile-views',
  setup(build) {
    build.onEnd(() => {
      let twigArr = [];
      let vars = fs.readFileSync(`${paths.src}/views/twig-vars.json`, { encoding: 'utf8' });

      if (utils.isJson(vars)) {
        let files = fs.readdirSync(`${paths.src}/views`);

        files.forEach(file => {
          if (path.extname(file) == '.twig')
            twigArr.push(file);
        });

        twigArr.forEach((filename) => {
          Twig.renderFile(`${paths.src}/views/${filename}`, JSON.parse(vars), (err, html) => {
            if (err) {
              console.error('\x1b[31m', err, '\x1b[0m');
              return;
            }
            let file = path.parse(filename).name + '.html';
            fs.writeFileSync(`${paths.dist}/${file}`, html);
          });
        });
      } else {
        console.error('\x1b[31m', '💣 Error with JSON string! 💣', '\x1b[0m');
      }
    })
  },
};


export default compileViewsPlugin;
