module.exports = {
  root: true,
  extends: [
    'expo',
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:functional/external-vanilla-recommended',
    'plugin:functional/recommended',
    'plugin:functional/stylistic',
    'prettier'
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'react-native',
    'functional'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  env: {
    'react-native/react-native': true,
    es2022: true,
    node: true
  },
  rules: {
    // React
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // TypeScript
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    
    // React Native
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'off',
    
    // Functional Programming
    'functional/no-let': 'error',
    'functional/prefer-readonly-type': 'warn',
    'functional/no-mixed-type': 'warn',
    'functional/immutable-data': [
      'error',
      {
        ignoreImmediateMutation: true,
        ignoreAccessorPattern: ['**.current.**', '**.style.**']
      }
    ],
    'functional/no-method-signature': 'off', // React Componentのため
    'functional/functional-parameters': 'off', // React Hooksのため
    
    // Import
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    
    // General
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-param-reassign': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      // React Componentファイルでは一部のfunctionalルールを緩和
      files: ['**/components/**/*.tsx', '**/app/**/*.tsx'],
      rules: {
        'functional/no-expression-statement': 'off',
        'functional/no-return-void': 'off'
      }
    },
    {
      // 設定ファイルでは制限を緩和
      files: ['*.config.js', '*.config.ts'],
      rules: {
        'functional/immutable-data': 'off',
        'functional/no-expression-statement': 'off'
      }
    }
  ],
  ignorePatterns: [
    'node_modules/',
    '.expo/',
    'dist/',
    '*.config.js'
  ]
};