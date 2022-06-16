import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
// import imageminWebp from 'imagemin-webp';
import imageminPngquant from 'imagemin-pngquant';
import { paths } from '../esbuild.options.js';

const imgMinPlugin = {
  name: 'img-min-plugin',
  setup(build) {
    build.onEnd(() => {
      imagemin([`${paths.getImgs().src}**/*.{jpg,jpeg,png}`], {
        destination: paths.getImgs().dist,
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
          // imageminWebp(),
        ]
      });
    })
  },
};

export default imgMinPlugin;
