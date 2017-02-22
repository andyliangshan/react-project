'use strict';

const cssnext = require('postcss-cssnext');

module.exports = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [
        cssnext({
          features: {
            autoprefixer: {
              browsers: [
                'last 3 versions',
                '> 1% in CN',
                'Firefox ESR',
                'opera 12.1',
                'ie >= 9',
                'edge >= 12',
                'safari >= 7'
              ]
            }
          }
        })
      ];
    }
  }
};
