"use strict";

const fs = require('fs');

function loadH2Defaults(env) {
  var defaults;
  if (env == "dev") {
    defaults = JSON.parse(fs.readFileSync('./lib/hydrogen.default.json'));
  } else if (env == "prod") {

  }
  return defaults;
}

function loadH2Config(env) {
  var config;
  if (env == "dev") {
    config = JSON.parse(fs.readFileSync('./lib/stage/hydrogen.config.json'));
  } else if (env == "prod") {

  }
  return config;
}

module.exports = {
  loadH2Defaults,
  loadH2Config
}