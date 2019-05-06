const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  plugins: [
    'react'
  ],
  extends: 'airbnb',
  rules: {
    'no-continue': OFF,
    'consistent-return': OFF,
    'no-cond-assign': OFF,
    'no-plusplus': OFF,
    'quote-props': OFF,
    'prefer-const': OFF,
    'func-names': OFF,
    'max-len': OFF,
    'no-param-reassign': OFF,
    'no-return-assign': OFF,
    'comma-dangle': [ERROR, 'only-multiline'],
    'no-sequences': OFF,
    'import/no-extraneous-dependencies': OFF,
    'import/extensions': OFF,
    'import/no-unresolved': OFF,
    'import/prefer-default-export': OFF,
    'react/jsx-one-expression-per-line': OFF,
    'react/jsx-filename-extension': [WARN, { extensions: ['.jsx'] }],
    'react/prop-types': OFF,
    'react/forbid-prop-types': OFF
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    worker: true,
    serviceworker: true,
    jest: true
  }
}
