'use strict';

const config = {
  title: 'React boilerplate',
  output: './dist',
  vendor: {
    path: './node_modules/__react-vendor-bundle__',
    modules: [
      '@babel/polyfill',
      'axios',
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
  port: 8091,
  mock: {
    contentBase: './mock',
    port: 8092
  }
};

/**
 * http proxy options
 * @see https://github.com/chimurai/http-proxy-middleware#options
 */
config.proxy = {
  // 以/api开头的请求代理到数据模拟服务
  '/api/*': {
    target: `http://localhost:${config.mock.port}/`,
    secure: false
  },
  '/github/api/*': {
    target: 'https://api.github.com',
    changeOrigin: true,
    pathRewrite: {
      '^/github/api': ''
    }
  }
};

module.exports = config;
