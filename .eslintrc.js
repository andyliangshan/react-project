
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  plugins: [
    'react'
  ],
  extends: ['eslint-config-airbnb'],
  rules: {
    'quote-props': OFF,
    'prefer-const': OFF,
    'func-names': OFF,
    'max-len': OFF,
    'no-param-reassign': OFF,
    'no-return-assign': OFF,
    'comma-dangle': [ERROR, 'only-multiline'],
    'import/no-extraneous-dependencies': OFF,
    'import/extensions': OFF,
    'import/no-unresolved': OFF,
    'react/jsx-filename-extension': OFF
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    worker: true,
    serviceworker: true
  }
}
