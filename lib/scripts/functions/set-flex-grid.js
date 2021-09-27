// Hydrogen.css / Flex Grid Settings and Map Generation

// =============================================================================

'use strict';

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// =============================================================================

// Determines if the the flexgrid has been enabled.
function getFlexgridStatus(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  if (
    config.flexgrid != null &&
    config.flexgrid != undefined &&
    config.flexgrid.enabled == true
  ) {
    // console.log('Hydrogen: you\'ve successfully enabled flexgrid!');
    return true;
  } else {
    return false;
  }
}

// Gets the configured flexgrid column value.
function getFlexgridColumns(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  if (
    config.flexgrid != null &&
    config.flexgrid != undefined &&
    config.flexgrid.columns != null &&
    config.flexgrid.columns != undefined
  ) {
    // console.log('Hydrogen: you\'ve set a custom grid column value!');
    return config.flexgrid.columns;
  } else {
    return defaults.flexgrid.columns;
  }
}

module.exports = {
  getFlexgridStatus,
  getFlexgridColumns,
};
