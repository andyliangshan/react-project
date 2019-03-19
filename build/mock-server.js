/* eslint no-console: 0 */


const express = require('express');
const chalk = require('chalk');
const path = require('path');
const requireDir = require('require-dir');
const _ = require('lodash');
const config = require('./config');

const app = express();
const router = express.Router();

const PORT = config.mockPort;
const MOCK_DIRECTORY = './mock';

(function invokeRoute(routes, directory) {
  Object.keys(routes).forEach((name) => {
    const route = routes[name];

    if (_.isPlainObject(route) && Object.keys(route).length > 0) {
      invokeRoute(route, path.join(directory, name));
    } else if (_.isFunction(route)) {
      route(router);
    } else {
      console.error(
        chalk.red('[mock] expected a function being exported in %s/%s.js'),
        path.resolve(directory),
        name
      );
    }
  });
}(requireDir(path.resolve(MOCK_DIRECTORY), { recurse: true }), MOCK_DIRECTORY));

app.use(router);

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error(chalk.red(err));
    return;
  }

  console.log(`Mock server is running here: ${chalk.cyan(`http://127.0.0.1:${chalk.bold(PORT)}`)}\n`);
});
