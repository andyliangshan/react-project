'use strict';

const path = require('path');
const webpack = require('webpack');
const config = require('./config');

module.exports = {
  entry: {
    main: ['./main.js'],
    vendor: [
      'babel-polyfill',
      'whatwg-fetch',
      'react',
      'react-dom',
      'react-router',
      'react-router-redux',
      'react-redux',
      'redux',
      'redux-saga',
      'redux-actions',
      'nprogress'
    ]
  },
  context: path.resolve('src'),
  output: {
    path: path.resolve(config.output),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      'react': 'react/dist/react.min.js',
      'react-dom': 'react-dom/dist/react-dom.min.js',
      'babel-polyfill': 'babel-polyfill/browser.js'
    },
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ]
  },
  module: {
    noParse: /(?:babel-polyfill|whatwg-fetch|(?:nprogress)$)/,
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve('src')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    })
  ]
};
