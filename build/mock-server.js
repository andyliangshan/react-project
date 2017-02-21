/* eslint no-console: 0 */

'use strict';

const express = require('express');
const chalk = require('chalk');
const path = require('path');
const requireDir = require('require-dir');

const app = express();
const router = express.Router();

const config = require('./config').mock;
const port = config.port;

const routeModules = requireDir(path.resolve(config.contentBase), {recurse: true});

(function resolveRouteModules(routes, directory = config.contentBase) {
  for (let name in routes) {
    if (routes.hasOwnProperty(name)) {
      let route = routes[name];

      if (
        Object.prototype.toString.call(route) === '[object Object]'
        && Object.keys(route).length > 0
      ) {
        resolveRouteModules(route, path.join(directory, name));
      } else if (typeof route === 'function') {
        route(router);
      } else {
        console.error(
          chalk.red('[mock] expected a function being exported in %s/%s.js'),
          path.resolve(directory),
          name
        );
      }
    }
  }
}(routeModules));

app.use(router);

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error(chalk.red(err));
    return;
  }

  console.log(chalk.green('\nMock server listening at http://localhost:%s.\n'), port);
});
