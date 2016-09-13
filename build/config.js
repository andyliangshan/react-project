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
    env: 'development',
    publicPath: '/',
    port: 8091,
    mock: {
      contentBase: './mock',
      port: 8092
    },
    proxy: {
      '/api/*': {
        target: `http://localhost:8092/`,
        secure: false
      }
    }
  }
}
