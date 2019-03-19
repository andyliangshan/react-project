

const PORT = 8080;
const MOCK_PORT = 8081;

module.exports = {
  title: 'React boilerplate',
  output: './dist',
  vendor: {
    path: './node_modules/__react-vendor-bundle__',
    // 打包到dll文件中，按需加载的模块不要写在这里
    modules: [
      '@babel/polyfill',
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
    }
  }
};
