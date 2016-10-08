'use strict';

const config = {
  title: '管理系统',
  inputBase: './src',
  outputBase: './dist',
  prod: {
    env: 'production',
    publicPath: '/assets/'
  },
  dev: {
    env: 'development',
    publicPath: '/',
    port: 8091,
    mock: {
      contentBase: './mock',
      port: 8092
    }
  }
};

// 开发环境代理配置
config.dev.proxy = {
  '/api/*': {
    // 代理到mock server
    target: `http://localhost:${config.dev.mock.port}/`,
    secure: false
  }
};

module.exports = config;
