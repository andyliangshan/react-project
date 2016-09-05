'use strict';

const express = require('express');
const chalk = require('chalk');
const path = require('path');
const requireDir = require('require-dir');

const app = express();
const router = express.Router();

const config = require('./config').dev.mock;
const port = config.port;

const routeModules = requireDir(path.resolve(config.contentBase), {recurse: true});
for (let moduleName in routeModules) {
  if (
    routeModules.hasOwnProperty(moduleName)
    && typeof routeModules[moduleName] === 'function'
  ) {
    routeModules[moduleName](router);
  }
}

app.use(router);

app.listen(port, '0.0.0.0', function(err) {

  if (err) {
    console.error(chalk.red(err));
    return;
  }

  console.log(chalk.green('\nMock server listening at http://localhost:%s.\n'), port);
});
