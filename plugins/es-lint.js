import eslint from 'esbuild-plugin-eslint';

const config = {
  filter: /\.(jsx?|tsx?|vue|svelte)$/,
  useEslintrc: true, // If set to false, ESLint will not respect any configuration files it finds.
  throwOnWarning: false, // Instructs the plugin to forward warnings found by ESLint to esbuild and throw an error.
  fix: false, // Controls whether to enable or disable the autofix feature of ESLint.
};

const eslinterPlugin = eslint(config);

export default eslinterPlugin;

