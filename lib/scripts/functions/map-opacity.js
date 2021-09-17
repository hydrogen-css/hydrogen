// Hydrogen.css / Opacity Map Generation

// =============================================================================

"use strict";

// Requirements
const { series, parallel, src, dest, watch } = require('gulp');
var footer = require('gulp-footer');

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// =============================================================================

function loadOpacityMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var opacityMapStringStart = '$h2-map-opacity: (';
  var opacityMapStringContent = '';
  var opacityMapStringEnd = ');';
  var opacityConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.opacities != null && config.opacities != undefined && config.opacities.length > 0) {
    opacityConfig = config.opacities;
  } else {
    opacityConfig = defaults.opacities;
  }
  // Loop through each option and build the map.
  opacityConfig.forEach(function(opacity) {
    var opacityString = '"' + opacity.key + '": "' + opacity.value + '",';
    opacityMapStringContent = opacityMapStringContent.concat(opacityString);
  });
  // Assemble the map.
  var opacityMap = opacityMapStringStart + opacityMapStringContent + opacityMapStringEnd;
  // Return the map.
  return opacityMap;
}

function setOpacityMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var opacityMap = '';
  opacityMap = loadOpacityMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-opacity.scss')
      .pipe(footer(opacityMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps')); 
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-opacity.scss')
      .pipe(footer(opacityMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = setOpacityMap;