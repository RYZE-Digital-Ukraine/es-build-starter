import fs from 'fs';
import path from 'path';
import copyStaticFilesPlugin from 'esbuild-copy-static-files';
import { devMode, paths } from '../esbuild.options.js';

const copyStaticFilesOptions = {
  src: paths.src,
  dest: paths.dist,
  filter(staticPath) {
    const exts = ['.ttf'];
    const folders = ['src', 'fonts'];
    if (devMode) {
      exts.push(...['.jpg', '.jpeg', '.png']);
      folders.push('imgs');
    }
    let curDir = staticPath.split(path.sep);

    curDir = curDir[curDir.length - 1];

    if (exts.includes(path.extname(staticPath)) || (fs.lstatSync(staticPath).isDirectory() && folders.includes(curDir))) {
      return true;
    }
    return false;
  },
};

export default copyStaticFilesPlugin(copyStaticFilesOptions);
