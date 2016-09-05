'use strict';

// 强制设置环境变量NODE_ENV为开发环境
process.env.NODE_ENV = 'development';

const path = require('path');
const WebpackDevServer = require("webpack-dev-server");
const merge = require('webpack-merge');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');

const config = require('./config');
const webpackBaseConfig = require('./webpack.base.config');

const port = process.env.PORT || config.dev.port;
const mockPort = process.env.MOCK_PORT || config.dev.mock.port;

const compiler = webpack(merge.smart(webpackBaseConfig, {
  entry: {
    main: [
      'webpack-dev-server/client?/',
      'webpack/hot/only-dev-server'
    ]
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
  proxy: {
    '/api/*': {
      target: `http://localhost:${mockPort}/`,
      secure: false
    }
  }
});

server.listen(port, '0.0.0.0', function(err) {
  if (err) {
    console.error(chalk.red(err));
    return;
  }

  console.log(chalk.green(`\nWebpack dev server listening at http://localhost:${port}\n`));
});