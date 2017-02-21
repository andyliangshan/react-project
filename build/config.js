'use strict';

const fs = require('fs');
const path = require('path');

const config = {
  title: 'React boilerplate',
  output: './dist',
  port: 8091,
  mock: {
    contentBase: './mock',
    port: 8092
  }
}

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

// const config = {
//   title: '管理系统',
//   inputBase: './src',
//   outputBase: './dist',
//   prod: {
//     env: 'production',
//     publicPath: '/assets/'
//   },
//   dev: {
//     env: 'development',
//     publicPath: '/',
//     port: 8091,
//     mock: {
//       contentBase: './mock',
//       port: 8092
//     }
//   }
// };

// // 开发环境代理配置
// config.dev.proxy = {
  // '/api/*': {
  //   // 代理到mock server
  //   target: `http://localhost:${config.dev.mock.port}/`,
  //   secure: false
  // }
// };

// module.exports = config;
