'use strict';
var exec = require('child_process').execSync;
var path = require('path');

const stable = exec('npm view @hydrogen-css/hydrogen@latest version')
  .toString()
  .trim();

const beta = exec('npm view @hydrogen-css/hydrogen@beta version')
  .toString()
  .trim();

module.exports = {
  history: require(path.resolve('../releases')).releases(),
  latest: require(path.resolve('../releases/' + stable)),
  beta: require(path.resolve('../releases/' + beta)),
  featured: require(path.resolve('../releases')).featured(),
};
