const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = require('./config');
const vendorManifestPath = path.resolve(config.vendor.path, 'vendor.json');

if (!fs.existsSync(vendorManifestPath)) {
  console.error(chalk.red('[Webpack] The vendor manifest is missing. Please run `npm run build:vendor`\n'));
  process.exit(1);
}

const vendorManifest = require(vendorManifestPath);
const vendorPath = path.resolve(config.vendor.path, `${vendorManifest.name}.js`);

if (!vendorPath) {
  console.error(chalk.red('[Webpack] The vendor file is missing. Please run `npm run build:vendor`\n'));
  process.exit(1);
}

module.exports = {
  entry: {
    main: ['@babel/polyfill', './main.js']
  },
  context: path.resolve('src'),
  output: {
    path: path.resolve(config.output),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve('src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  stats: {
    entrypoints: false,
    warningsFilter: 'Conflicting order between:'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /node_modules\//,
          name: 'common',
          priority: 10,
          chunks: 'all',
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'webpack-runtime'
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new WebpackBar(),
    // ignoring Moment Locales
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new webpack.EnvironmentPlugin({
      TITLE: config.title
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: vendorManifest
    }),
    new AddAssetHtmlPlugin({
      filepath: vendorPath,
      includeSourcemap: false
    })
  ].concat(process.env.ANALYZER === 'true' ? [new BundleAnalyzerPlugin()] : [])
};
