/* eslint no-console: 0 */

'use strict';

const express = require('express');
const chalk = require('chalk');
const path = require('path');
const requireDir = require('require-dir');
const config = require('./config').mock;

const app = express();
const router = express.Router();

const port = config.port;
const toString = Object.prototype.toString;

(function resolveRouteModules(routeModules, directory) {
  Object.keys(routeModules).forEach((name) => {
    let route = routeModules[name];

    if (
      toString.call(route) === '[object Object]'
      && Object.keys(route).length > 0
    ) {
      resolveRouteModules(route, path.join(directory, name));
    } else if (toString.call(route) === '[object Function]') {
      route(router);
    } else {
      console.error(
        chalk.red('[mock] expected a function being exported in %s/%s.js'),
        path.resolve(directory),
        name
      );
    }
  });
}(requireDir(path.resolve(config.contentBase), { recurse: true }), config.contentBase));

app.use(router);

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error(chalk.red(err));
    return;
  }

  console.log(`\nMock server is running here: ${chalk.cyan(`http://127.0.0.1:${chalk.bold(port)}`)}\n`);
});
