// Hydrogen.css / Layer Count Settings

// =============================================================================

'use strict';

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// =============================================================================

// Gets the configured flexgrid column value.
function getLayerCount(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  if (config.layerCount != null && config.layerCount != undefined) {
    return config.layerCount;
  } else {
    return defaults.layerCount;
  }
}

module.exports = {
  getLayerCount,
};
