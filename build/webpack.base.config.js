'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cssnext = require('postcss-cssnext');

const config = require('./config');

const debug = process.env.NODE_ENV !== 'production';
const inputBase = config.inputBase;
const outputBase = config.outputBase;

let filename = `[name]${debug ? '' : '-[hash:10]'}.[ext]`;
let chunkhash = debug ? '' : '-[chunkhash:10]';

let extractCSS = new ExtractTextPlugin(`style${chunkhash}.css`, {
  allChunks: !debug
});

let extractVendorCSS = new ExtractTextPlugin(`vendor${chunkhash}.css`, {
  allChunks: !debug
});

module.exports = {
  entry: {
    main: [path.resolve(inputBase, 'main.js')],
    vendor: [
      'babel-polyfill',
      'whatwg-fetch',
      'react',
      'react-dom',
      'react-router',
      'react-router-redux',
      'react-redux',
      'redux',
      'redux-thunk',
      'nprogress'
    ]
  },
  output: {
    path: path.resolve(outputBase),
    publicPath: debug ? config.dev.publicPath : config.prod.publicPath
  },
  recordsPath: path.resolve('.webpack-records.json'),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(inputBase),
        loader: 'babel'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: extractCSS.extract('style', [
          `css?modules&camelCase${!debug ? '&minimize' : '&sourceMap'}`,
          'postcss'
        ])
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: extractVendorCSS.extract('style', [
          `css?${!debug ? 'minimize' : 'sourceMap'}`,
          'postcss'
        ])
      },
      {
        test: /\.(?:woff2?|eot|ttf)$/,
        loader: `file?name=${filename}`
      },
      {
        test: /\.(?:png|jpe?g|gif|svg)$/,
        loader: `url?limit=10000&name=${filename}`
      }
    ]
  },
  postcss() {
    return [
      cssnext({
        features: {
          autoprefixer: {
            browsers: ['last 3 versions', '> 1% in CN', 'Firefox ESR', 'opera 12.1', 'ie >= 9', 'edge >= 12', 'safari >= 7']
          }
        }
      })
    ];
  },
  resolve: {
    root: path.resolve(inputBase),
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CleanWebpackPlugin([config.outputBase], {
      root: path.resolve('./'),
      verbose: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    extractCSS,
    extractVendorCSS
  ]
}
