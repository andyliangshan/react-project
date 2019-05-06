const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const imagemin = require('imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const optipng = require('imagemin-optipng');
const gifsicle = require('imagemin-gifsicle');
const pngquant = require('imagemin-pngquant');
const baseConfig = require('./webpack.base.config');
const config = require('./config');
const postcssLoader = require('./postcss-loader.config');

const imageOptimizeOptions = {
  mozjpeg: {
    progressive: true
  },
  optipng: {
    optimizationLevel: 7
  },
  gifsicle: {
    interlaced: false
  },
  pngquant: {
    quality: '65-90',
    speed: 4
  }
};

module.exports = merge.smartStrategy({
  plugins: 'prepend'
})(baseConfig, {
  output: {
    filename: '[name]-[chunkhash:10].js',
    chunkFilename: '[name].chunk-[chunkhash:10].js'
  },
  module: {
    rules: [
      {
        test: /\.(?:woff2?|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name]-[hash:10].[ext]'
        }
      },
      {
        test: /\.(?:png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name]-[hash:10].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: imageOptimizeOptions
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: true,
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
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: 'public/',
        ignore: ['.*'],
        transform(content, filePath) {
          if (/\.(?:png|jpe?g|gif)$/.test(filePath)) {
            return imagemin.buffer(content, {
              plugins: [
                mozjpeg(imageOptimizeOptions.mozjpeg),
                optipng(imageOptimizeOptions.optipng),
                gifsicle(imageOptimizeOptions.gifsicle),
                pngquant(imageOptimizeOptions.pngquant)
              ]
            });
          }

          return content;
        }
      }
    ]),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:10].css'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      title: config.title,
      template: 'index.html',
      chunksSortMode: 'dependency',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true
      }
    })
  ]
});
