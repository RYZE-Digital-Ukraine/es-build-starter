import stylelint from 'stylelint';

const config = {
  cache: true,
};

const stylelintPlugin = (config) => ({
  name: 'style-lint',
  setup(build) {
    const formatter = stylelint.formatters;

    if (['info', 'debug', 'verbose'].includes(build.initialOptions.logLevel)) {
      console.log('Building initial Stylelint cache...');
    }

    build.onLoad({ filter: /\.(s(a|c)ss|less)$/ }, async ({ path }) => {
      const isNodeModule = /node_modules/.test(path);
      const input = isNodeModule ? 0 : path;

      if (input) {
        config.files = input;
        const contents = isNodeModule ? null : await stylelint.lint(config);

        const hasLintIssues = contents ? contents.errored : contents;

        if (hasLintIssues) {
          console.log(formatter.verbose(contents.results));
        }
      }
      return null;
    });
  },
});

const stylelinterPlugin = stylelintPlugin(config);

export default stylelinterPlugin;
