"use strict";

const fs = require('fs');

function loadDefaultConfig() {
  var defaults = JSON.parse(fs.readFileSync('./node_modules/@hydrogen-design-system/hydrogen.css/lib/hydrogen.default.json'));
  return defaults;
}

module.exports = loadDefaultConfig;