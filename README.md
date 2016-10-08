# React Redux Boilerplate

## Getting Started

```shell
# dev (Start the dev server, that contains startup mock server.)
$ npm run dev

# build
$ npm run build

# mock server
$ npm run mock

# lint
$ npm run lint
```

## Configuration

```shell
$ open build/config.js
```

### config.js

```js
const config = {
  title: '管理系统',
  inputBase: './src', // 源代码目录
  outputBase: './dist', // 构建输出目录
  prod: {
    env: 'production',
    publicPath: '/assets/' // 生产环境访问静态资源路径前缀
  },
  dev: {
    env: 'development',
    publicPath: '/',
    port: 8091, // 开发服务器端口
    mock: {
      contentBase: './mock', // mock数据目录
      port: 8092 // mock服务器端口
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
```
