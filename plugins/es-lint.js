import { eslintPlugin } from 'esbuild-plugin-eslinter';

const config = { 
  persistLintIssues: true 
};

const eslinterPlugin = eslintPlugin(config);

export default eslinterPlugin;