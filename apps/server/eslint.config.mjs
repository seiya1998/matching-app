import pluginImport from 'eslint-plugin-import';
import pluginFunctional from 'eslint-plugin-functional';
import baseConfig from './base.mjs';

const plugin = [
  { ignores: ['scripts/'] },
  ...baseConfig,
  {
    rules: {
      ...pluginImport.flatConfigs.recommended.rules,
      'import/no-unresolved': 'off'
    }
  },
  {
    files: [['!**/*test*', '**/*.ts']],
    plugins: { functional: pluginFunctional },
    rules: {
      ...pluginFunctional.configs.recommended.rules,
      'functional/prefer-immutable-types': 'off'
    }
  }
];

export default plugin;
