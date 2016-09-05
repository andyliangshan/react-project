'use strict';

module.exports = {
  title: '管理系统',
  inputBase: './src',
  outputBase: './dist',
  prod: {
    env: 'production',
    publicPath: '/assets/'
  },
  dev: {
    env: 'production',
    publicPath: '/',
    port: 8091,
    mock: {
      contentBase: './mock',
      port: 8092
    }
  }
}