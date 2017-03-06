# React Redux Boilerplate

The boilerplate based on [react](https://facebook.github.io/react), [redux](https://github.com/reactjs/redux), [react router](https://github.com/ReactTraining/react-router), [redux saga](https://github.com/redux-saga/redux-saga), [webpack](https://webpack.js.org/), [nprogress](http://ricostacruz.com/nprogress/), [fetch API](https://fetch.spec.whatwg.org) for rapid project development

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
'use strict';

const config = {
  title: 'React boilerplate',
  output: './dist', // 构建输出目录
  port: 8091,
  mock: {
    contentBase: './mock', // mock数据目录
    port: 8092 // mock服务器端口
  }
}

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
```
