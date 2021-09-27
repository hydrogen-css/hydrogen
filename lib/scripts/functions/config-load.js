'use strict';

const fs = require('fs');

function loadH2Defaults(env) {
  var defaults;
  if (env == 'dev') {
    defaults = JSON.parse(fs.readFileSync('./lib/hydrogen.default.json'));
  } else if (env == 'prod') {
    defaults = JSON.parse(
      fs.readFileSync(
        './node_modules/@hydrogen-design-system/hydrogen.css/lib/hydrogen.default.json'
      )
    );
  }
  return defaults;
}

function loadH2Config(env) {
  var config;
  if (env == 'dev') {
    config = JSON.parse(fs.readFileSync('./lib/stage/hydrogen.config.json'));
  } else if (env == 'prod') {
    config = JSON.parse(fs.readFileSync('./hydrogen.config.json'));
  }
  return config;
}

module.exports = {
  loadH2Defaults,
  loadH2Config,
};
