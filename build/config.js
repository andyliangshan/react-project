'use strict';

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
