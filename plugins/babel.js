import babel from 'esbuild-plugin-babel';

const config = {
  filter: /.js/,
}

export default babel(config);
