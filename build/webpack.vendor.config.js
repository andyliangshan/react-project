const webpack = require('webpack');
const path = require('path');
const config = require('./config');

module.exports = {
  entry: {
    vendor: config.vendor.modules
  },
  output: {
    filename: '[name]_dll_[chunkhash:10].js',
    path: path.resolve(config.vendor.path),
    library: '[name]_dll_[chunkhash:10]'
  },
  resolve: {
    alias: {
      'babel-polyfill': 'babel-polyfill/browser.js'
    }
  },
  module: {
    noParse: /(?:babel-polyfill|(?:nprogress)$)/
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.DllPlugin({
      context: process.cwd(),
      path: path.join(config.vendor.path, '[name].json'),
      name: '[name]_dll_[chunkhash:10]'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
};
