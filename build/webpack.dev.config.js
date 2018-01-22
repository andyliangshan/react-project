'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const config = require('./config');
const postcssLoader = require('./postcss-loader.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge.smartStrategy({
  entry: 'prepend'
})(baseConfig, {
  entry: {
    main: [
      'eventsource-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://127.0.0.1:8080',
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    port: 8080,
    host: '127.0.0.1',
    inline: true,
    historyApiFallback: {
      index: '/'
    },
    // enable HMR on the server
    hot: true,
    // enable gzip
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    proxy: config.proxy
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              camelCase: true
            }
          },
          postcssLoader
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      title: config.title,
      template: 'index.html',
      chunksSortMode: 'dependency'
    })
  ],
});
