import { emptyDirSync } from 'fs-extra';

const clearDirPlugin = {
  name: 'clear-dir-plugin',
  setup(build) {
    build.onStart(() => {
      emptyDirSync(build.initialOptions.outdir);

      console.log('\x1b[32m', '⚡ Directory is cleared! ⚡', '\x1b[0m');
    })
  },
};

export default clearDirPlugin;
