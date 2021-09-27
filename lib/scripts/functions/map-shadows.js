// Hydrogen.css / Shadow Map Generation

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
function createShadowSassVariables(env) {
  // Load the config files, along with the defaults.
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Set the string and prefix it with a helpful comment.
  var shadowVariables = "// Shadows\n";
  // Set an empty variable for the config to be populated based on whether the user has set their own settings.
  var shadowConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (
    config.shadows != null &&
    config.shadows != undefined &&
    config.shadows.length > 0
  ) {
    shadowConfig = config.shadows;
  } else {
    shadowConfig = defaults.shadows;
  }
  // Loop through each config option and build the list.
  shadowConfig.forEach(function (shadows) {
    var shadowVariable =
      "$h2-shadow-" +
      shadows.key +
      ": " +
      shadows.value +
      ";\n";
    shadowVariables = shadowVariables.concat(shadowVariable);
  });
  // Return the variable set.
  return shadowVariables;
}

// Set the variables in the variable file.
function setShadowSassVariables(env) {
  // Load the user's config file.
  var config = loadH2Config(env);
  // Fetch the variable list.
  var shadowVars = createShadowSassVariables(env);
  // Add the generated variables to the Sass file.
  if (env == "dev") {
    return src(
      "./lib/stage/" + config.folders.styles + "/hydrogen-variables.scss"
    )
      .pipe(footer(shadowVars))
      .pipe(dest("./lib/stage/" + config.folders.styles));
  } else if (env == "prod") {
    return src("./" + config.folders.styles + "/hydrogen-variables.scss")
      .pipe(footer(shadowVars))
      .pipe(dest("./" + config.folders.styles));
  }
}

// Exporting a Sass Map Based on User Config -----------------------------------

function loadShadowMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var shadowMapStringStart = '$h2-map-shadow: (';
  var shadowMapStringContent = '';
  var shadowMapStringEnd = ');';
  var shadowConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.shadows != null && config.shadows != undefined && config.shadows.length > 0) {
    shadowConfig = config.shadows;
  } else {
    shadowConfig = defaults.shadows;
  }
  // Loop through each option and build the map.
  shadowConfig.forEach(function(shadow) {
    var shadowString = '"' + shadow.key + '": "' + shadow.value + '",';
    shadowMapStringContent = shadowMapStringContent.concat(shadowString);
  });
  // Assemble the map.
  var shadowMap = shadowMapStringStart + shadowMapStringContent + shadowMapStringEnd;
  // Return the map.
  return shadowMap;
}

function setShadowMap(env) {
  var config = loadH2Config(env);
  var shadowMap = '';
  shadowMap = loadShadowMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-shadow.scss')
      .pipe(footer(shadowMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-shadow.scss')
      .pipe(footer(shadowMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = {
  setShadowSassVariables,
  setShadowMap
}