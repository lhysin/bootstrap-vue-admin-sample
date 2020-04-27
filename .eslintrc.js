// .eslintrc.js
module.exports = {
  root: true,
  env: {
    'es6': true,
    'node': true,
    'browser': true,
  },
  extends: [
    'eslint:recommended',

    // https://eslint.vuejs.org/rules/
    'plugin:vue/recommended',
  ],
  rules: {
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': ['error', 'always'],
    'indent': ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    'block-spacing': ['error', 'always'],
    'no-trailing-spaces': ['error'],
    'eqeqeq': ['error', 'always'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'curly': ['error', 'all'],
    'object-curly-spacing': ['error', 'always', { 'objectsInObjects': false }],
    'key-spacing': ['error', { 'mode': 'strict' }],
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 1, 'maxEOF': 1 }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'func-style': ['error'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
};