"use strict";

// Loaded in the event we need to console.log.
var colors = require('colors');

function loadRadiusMap(defaults, config) {
  // Create the map string.
  var radiusMapStringStart = '$h2-map-radius: ("square": "0", "none": "0",';
  var radiusMapStringContent = '';
  var radiusMapStringEnd = ');';
  var radiusConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.radius != null && config.radius != undefined && config.radius.length > 0) {
    radiusConfig = config.radius;
  } else {
    radiusConfig = defaults.radius;
  }
  // Loop through each option and build the map.
  radiusConfig.forEach(function(radius) {
    var radiusString = '"' + radius.name + '": "' + radius.value + '",';
    radiusMapStringContent = radiusMapStringContent.concat(radiusString);
  });
  // Assemble the map.
  var radiusMap = radiusMapStringStart + radiusMapStringContent + radiusMapStringEnd;
  // Return the map.
  return radiusMap;
}

function setRadiusMap(defaults, config, env) {
  var radiusMap = '';
  radiusMap = loadRadiusMap(defaults, config);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-radius.scss')
      .pipe(footer(radiusMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps')); 
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-radius.scss')
      .pipe(footer(radiusMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = setRadiusMap;