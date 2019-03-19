

const atImport = require('postcss-import');
const nested = require('postcss-nested');
const presetEnv = require('postcss-preset-env');

module.exports = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [
        atImport(),
        nested(),
        presetEnv({
          features: {
            'nesting-rules': true,
            'color-mod-function': true
          },
          browsers: [
            'last 3 versions',
            '> 1% in CN',
            'Firefox ESR',
            'opera 12.1',
            'ie >= 9',
            'edge >= 12',
            'safari >= 7'
          ]
        })
      ];
    }
  }
};
