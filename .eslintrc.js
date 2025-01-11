module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:node/recommended'],
    plugins: ['@typescript-eslint', 'prettier'],
    env: {
      node: true,
      es6: true,
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error'],
      'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
    },
    settings: {
      node: {
        tryExtensions: ['.ts', '.js', '.json', '.node'],
      },
    },
  }