require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'plugin:vue/base',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-prettier',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  rules: {
    'no-console': 'warn',
    quotes: ['error', 'single'],
    'prefer-const': 'error',
    indent: ['warn', 2],
    'comma-dangle': ['error', 'only-multiline'],
    semi: 'off',
    'no-duplicate-imports': 'error',
    'no-template-curly-in-string': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    camelcase: ['error'],
    'func-style': ['error', 'expression'],
    'max-depth': ['error', 2],
    'no-alert': ['error'],
    'no-var': ['error'],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'off',
    'no-unused-vars': [
      1,
      { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }
    ],
    'no-constant-condition': ['error'],
    'no-obj-calls': 'error',
    'default-case': 'error',
    'init-declarations': ['error', 'always'],
    'no-lone-blocks': 'error',
    'no-magic-numbers': [
      'error',
      { ignore: [1], ignoreArrayIndexes: true, ignoreDefaultValues: true }
    ],
    'array-callback-return': 'error',

  },
  settings: {
    'import/resolver': {
      alias: [['@', './src']],
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
      }
    }
  }
}
