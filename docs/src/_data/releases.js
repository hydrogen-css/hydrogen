'use strict';
var exec = require('child_process').execSync;
var path = require('path');

var stable = exec('npm view @hydrogen-css/hydrogen@latest version')
  .toString()
  .trim();
var versions = stable.match(/\d+/g);
var stable_major = versions[0] + '.0.0';
var stable_minor = versions[0] + '.' + versions[1] + '.0';

var beta = exec('npm view @hydrogen-css/hydrogen@beta version')
  .toString()
  .trim();
var versions = beta.match(/\d+/g);
var beta_major = versions[0] + '.0.0';
var beta_minor = versions[0] + '.' + versions[1] + '.0';

module.exports = {
  latest: require(path.resolve(
    process.cwd(),
    'src/_data/changelog/' +
      stable_major +
      '/' +
      stable_minor +
      '/' +
      stable +
      '.json'
  )),
  beta: require(path.resolve(
    process.cwd(),
    'src/_data/changelog/' +
      beta_major +
      '/' +
      beta_minor +
      '/betas/' +
      beta +
      '.json'
  )),
};
