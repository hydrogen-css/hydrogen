"use strict";

// Loaded in the event we need to console.log.
var colors = require('colors');

function loadBorderWeightMap(defaults, config) {
  // Create the map string.
  var borderWeightMapStringStart = '$h2-map-border-weight: (';
  var borderWeightMapStringContent = '';
  var borderWeightMapStringEnd = ');';
  var borderWeightConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.borderWeights != null && config.borderWeights != undefined && config.borderWeights.length > 0) {
    borderWeightConfig = config.borderWeights;
  } else {
    borderWeightConfig = defaults.borderWeights;
  }
  // Loop through each option and build the map.
  borderWeightConfig.forEach(function(borderWeights) {
    var borderWeightsString = '"' + borderWeights.name + '": ' + borderWeights.weight + ',';
    borderWeightMapStringContent = borderWeightMapStringContent.concat(borderWeightsString);
  });
  // Assemble the map.
  var borderWeightMap = borderWeightMapStringStart + borderWeightMapStringContent + borderWeightMapStringEnd;
  // Return the map.
  return borderWeightMap;
}

function setBorderWeightMap(defaults, config, env) {
  var borderWeightMap = '';
  borderWeightMap = loadBorderWeightMap(defaults, config);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-border-weight.scss')
      .pipe(footer(borderWeightMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-border-weight.scss')
      .pipe(footer(borderWeightMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = setBorderWeightMap;