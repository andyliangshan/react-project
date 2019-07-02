const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const config = require('./config');
const postcssLoader = require('./postcss-loader.config');

module.exports = merge.smartStrategy({
  entry: 'prepend',
  plugins: 'prepend'
})(baseConfig, {
  entry: {
    main: ['event-source-polyfill']
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    clientLogLevel: 'warning',
    port: config.port,
    host: '0.0.0.0',
    disableHostCheck: true,
    inline: true,
    historyApiFallback: {
      index: '/'
    },
    hot: true,
    compress: true,
    quiet: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: config.proxy
  },
  module: {
    rules: [
      {
        test: /\.(?:woff2?|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
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
              camelCase: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
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
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: 'public/',
        ignore: ['.*']
      }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      clearConsole: false,
      compilationSuccessInfo: {
        messages: [`Webpack dev server is running here: ${chalk.cyan(`http://127.0.0.1:${chalk.bold(config.port)}`)}`]
      }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      title: config.title,
      template: 'index.html',
      chunksSortMode: 'dependency'
    })
  ],
});
