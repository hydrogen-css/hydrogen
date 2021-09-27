// Hydrogen.css / Radius Map Generation

// =============================================================================

"use strict";

// Requirements
const { src, dest } = require('gulp');
var footer = require('gulp-footer');

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// =============================================================================

// Exporting Variables Based on User Config ------------------------------------

// Generate a list of Sass variables from the config files.
function createRadiusSassVariables(env) {
  // Load the config files, along with the defaults.
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Set the string and prefix it with a helpful comment.
  var radiusVariables = "// Radius\n";
  // Set an empty variable for the config to be populated based on whether the user has set their own settings.
  var radiusConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (
    config.radius != null &&
    config.radius != undefined &&
    config.radius.length > 0
  ) {
    radiusConfig = config.radius;
  } else {
    radiusConfig = defaults.radius;
  }
  // TBD Deprecated Legacy Defaults
  radiusVariables = radiusVariables.concat('$h2-radius-square: 0;\n$h2-radius-none: 0;\n')
  // Loop through each config option and build the list.
  radiusConfig.forEach(function (radius) {
    var radiusVariable =
      "$h2-radius-" +
      radius.key +
      ": " +
      radius.value +
      ";\n";
    radiusVariables = radiusVariables.concat(radiusVariable);
  });
  // Return the variable set.
  return radiusVariables;
}

// Set the variables in the variable file.
function setRadiusSassVariables(env) {
  // Load the user's config file.
  var config = loadH2Config(env);
  // Fetch the variable list.
  var radiusVars = createRadiusSassVariables(env);
  // Add the generated variables to the Sass file.
  if (env == "dev") {
    return src(
      "./lib/stage/" + config.folders.styles + "/hydrogen-variables.scss"
    )
      .pipe(footer(radiusVars))
      .pipe(dest("./lib/stage/" + config.folders.styles));
  } else if (env == "prod") {
    return src("./" + config.folders.styles + "/hydrogen-variables.scss")
      .pipe(footer(radiusVars))
      .pipe(dest("./" + config.folders.styles));
  }
}

// Exporting a Sass Map Based on User Config -----------------------------------

function loadRadiusMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
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
    var radiusString = '"' + radius.key + '": "' + radius.value + '",';
    radiusMapStringContent = radiusMapStringContent.concat(radiusString);
  });
  // Assemble the map.
  var radiusMap = radiusMapStringStart + radiusMapStringContent + radiusMapStringEnd;
  // Return the map.
  return radiusMap;
}

function setRadiusMap(env) {
  var config = loadH2Config(env);
  var radiusMap = '';
  radiusMap = loadRadiusMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-radius.scss')
      .pipe(footer(radiusMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps')); 
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-radius.scss')
      .pipe(footer(radiusMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = {
  setRadiusSassVariables,
  setRadiusMap
}