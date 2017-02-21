const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const config = require('./config');
const postcssLoader = require('./postcss-loader.config');

module.exports = merge.smartStrategy({
  entry: 'prepend'
})(baseConfig, {
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server'
    ]
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
    stats: 'normal',
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
    new HtmlWebpackPlugin({
      inject: false,
      title: config.title,
      template: 'index.html',
      chunksSortMode: 'dependency'
    })
  ],
});
