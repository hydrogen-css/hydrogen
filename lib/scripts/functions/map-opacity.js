// Hydrogen.css / Opacity Map Generation

// =============================================================================

'use strict';

// Requirements
const { src, dest } = require('gulp');
var footer = require('gulp-footer');

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// =============================================================================

// Exporting Variables Based on User Config ------------------------------------

// Generate a list of Sass variables from the config files.
function createOpacitySassVariables(env) {
  // Load the config files, along with the defaults.
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Set the string and prefix it with a helpful comment.
  var opacityVariables = '// Opacities\n';
  // Set an empty variable for the config to be populated based on whether the user has set their own settings.
  var opacityConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (
    config.opacities != null &&
    config.opacities != undefined &&
    config.opacities.length > 0
  ) {
    opacityConfig = config.opacities;
  } else {
    opacityConfig = defaults.opacities;
  }
  // Loop through each config option and build the list.
  opacityConfig.forEach(function (opacities) {
    // Opacity keys need to be stripped of invalid variable characters before use.
    var cleanedOpacityKey = opacities.key.replace('.', '').replace('%', '');
    var opacityVariable =
      '$h2-opacity-' + cleanedOpacityKey + ': ' + opacities.value + ';\n';
    opacityVariables = opacityVariables.concat(opacityVariable);
  });
  // Return the variable set.
  return opacityVariables;
}

// Set the variables in the variable file.
function setOpacitySassVariables(env) {
  // Load the user's config file.
  var config = loadH2Config(env);
  // Fetch the variable list.
  var opacityVars = createOpacitySassVariables(env);
  // Add the generated variables to the Sass file.
  if (env == 'dev') {
    return src(
      './lib/stage/' + config.folders.styles + '/hydrogen-variables.scss'
    )
      .pipe(footer(opacityVars))
      .pipe(dest('./lib/stage/' + config.folders.styles));
  } else if (env == 'prod') {
    return src('./' + config.folders.styles + '/hydrogen-variables.scss')
      .pipe(footer(opacityVars))
      .pipe(dest('./' + config.folders.styles));
  }
}

// Exporting a Sass Map Based on User Config -----------------------------------

function loadOpacityMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var opacityMapStringStart = '$h2-map-opacity: (';
  var opacityMapStringContent = '';
  var opacityMapStringEnd = ');';
  var opacityConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (
    config.opacities != null &&
    config.opacities != undefined &&
    config.opacities.length > 0
  ) {
    opacityConfig = config.opacities;
  } else {
    opacityConfig = defaults.opacities;
  }
  // Loop through each option and build the map.
  opacityConfig.forEach(function (opacity) {
    var opacityString = '"' + opacity.key + '": "' + opacity.value + '",';
    opacityMapStringContent = opacityMapStringContent.concat(opacityString);
  });
  // Assemble the map.
  var opacityMap =
    opacityMapStringStart + opacityMapStringContent + opacityMapStringEnd;
  // Return the map.
  return opacityMap;
}

function setOpacityMap(env) {
  var config = loadH2Config(env);
  var opacityMap = '';
  opacityMap = loadOpacityMap(env);
  if (env == 'dev') {
    return src('./lib/styles/maps/_map-opacity.scss')
      .pipe(footer(opacityMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == 'prod') {
    return src(
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-opacity.scss'
    )
      .pipe(footer(opacityMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = {
  setOpacitySassVariables,
  setOpacityMap,
};
