
/* eslint no-console: 0 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');

const config = require('./config');
const webpackBaseConfig = require('./webpack.base.config');

const port = process.env.PORT || config.dev.port;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.dev.env;
}

const compiler = webpack(merge.smart(webpackBaseConfig, {
  entry: {
    main: [
      'webpack-dev-server/client?/',
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: 'chunk.[id].js'
  },
  cache: true,
  debug: true,
  devtool: 'cheap-module-inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      title: config.title,
      template: path.join(config.inputBase, 'index.html'),
      filename: 'index.html',
      chunksSortMode: 'dependency'
    })
  ]
}));

const server = new WebpackDevServer(compiler, {
  historyApiFallback: {
    index: '/'
  },
  hot: true,
  compress: true,
  stats: {
    colors: true,
    chunks: false,
    children: false
  },
  proxy: config.dev.proxy || {}
});

server.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error(chalk.red(err));
    return;
  }

  console.log(chalk.green(`\nWebpack dev server listening at http://localhost:${port}\n`));
});
