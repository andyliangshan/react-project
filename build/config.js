const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const _ = require('lodash');
const config = require('./config.default');

const argv = minimist(process.argv.slice(2));
const custom = {
  file: argv.buildfile,
  config: null
};

if (custom.file == null) {
  custom.file = path.join(process.cwd(), 'build.config.js');
} else if (!path.isAbsolute(custom.file)) {
  custom.file = path.join(process.cwd(), custom.file);
}

if (fs.existsSync(custom.file)) {
  custom.config = require(custom.file);

  _.merge(config, custom.config || {});
}

module.exports = config;
