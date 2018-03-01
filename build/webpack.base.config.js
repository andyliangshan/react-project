'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('./config');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const vendorManifestPath = path.resolve(config.vendor.path, 'vendor.json');

if (!fs.existsSync(vendorManifestPath)) {
  console.error(chalk.red('[Webpack] The vendor manifest is missing. Please run `npm run build:vendor`\n'));
  process.exit(1);
}

const vendorManifest = require(vendorManifestPath);
const vendorPath = path.resolve(config.vendor.path, vendorManifest.name + '.js');

if (!vendorPath) {
  console.error(chalk.red('[Webpack] The vendor file is missing. Please run `npm run build:vendor`\n'));
  process.exit(1);
}

module.exports = {
  entry: {
    main: ['./main.js']
  },
  context: path.resolve('src'),
  output: {
    path: path.resolve(config.output),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve('node_modules'),
      path.resolve('src')
    ]
  },
  module: {
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
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: vendorManifest
    }),
    new AddAssetHtmlPlugin({
      filepath: vendorPath,
      includeSourcemap: false
    })
  ]
};
