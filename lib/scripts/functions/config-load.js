'use strict';

const fs = require('fs');
const path = require('path');

function loadH2Defaults() {
  var defaults = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../../hydrogen.default.json')
    )
  );
  return defaults;
}

function loadH2Config(env) {
  var config;
  if (env == 'dev') {
    config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../stage/hydrogen.config.json')));
  } else if (env == 'prod') {
    config = JSON.parse(fs.readFileSync('./hydrogen.config.json'));
  }
  return config;
}

module.exports = {
  loadH2Defaults,
  loadH2Config,
};
