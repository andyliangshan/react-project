const PORT = 8881;
const MOCK_PORT = 8882;

module.exports = {
  title: 'React boilerplate',
  output: './dist',
  vendor: {
    // 打包到dll文件中，按需加载的模块不要写在这里
    modules: [
      'core-js/stable',
      '@loadable/component',
      'axios',
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'redux',
      'react-redux',
      'redux-saga',
      'redux-actions',
      'nprogress'
    ]
  },
  port: PORT,
  mockPort: MOCK_PORT,
  proxy: {
    // 以/api开头的请求代理到数据模拟服务
    '/api/*': {
      target: `http://localhost:${MOCK_PORT}/`,
      secure: false
    },
    '/github/api/*': {
      target: 'https://api.github.com',
      changeOrigin: true,
      pathRewrite: {
        '^/github/api': ''
      }
    }
  }
};
