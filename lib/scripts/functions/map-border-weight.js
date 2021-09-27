// Hydrogen.css / Border Weight Map Generation

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
function createBorderWeightSassVariables(env) {
  // Load the config files, along with the defaults.
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Set the string and prefix it with a helpful comment.
  var borderWeightVariables = '// Border Weights\n';
  // Set an empty variable for the config to be populated based on whether the user has set their own settings.
  var borderWeightConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (
    config.borderWeights != null &&
    config.borderWeights != undefined &&
    config.borderWeights.length > 0
  ) {
    borderWeightConfig = config.borderWeights;
  } else {
    borderWeightConfig = defaults.borderWeights;
  }
  // Loop through each config option and build the list.
  borderWeightConfig.forEach(function (borderWeights) {
    var borderWeightVariable =
      '$h2-border-weight-' +
      borderWeights.key +
      ': ' +
      borderWeights.weight +
      ';\n';
    borderWeightVariables = borderWeightVariables.concat(borderWeightVariable);
  });
  // Return the variable set.
  return borderWeightVariables;
}

// Set the variables in the variable file.
function setBorderWeightSassVariables(env) {
  // Load the user's config file.
  var config = loadH2Config(env);
  // Fetch the variable list.
  var borderWeightVars = createBorderWeightSassVariables(env);
  // Add the generated variables to the Sass file.
  if (env == 'dev') {
    return src(
      './lib/stage/' + config.folders.styles + '/hydrogen-variables.scss'
    )
      .pipe(footer(borderWeightVars))
      .pipe(dest('./lib/stage/' + config.folders.styles));
  } else if (env == 'prod') {
    return src('./' + config.folders.styles + '/hydrogen-variables.scss')
      .pipe(footer(borderWeightVars))
      .pipe(dest('./' + config.folders.styles));
  }
}

// Exporting a Sass Map Based on User Config -----------------------------------

// Generate the map.
function loadBorderWeightMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var borderWeightMapStringStart = '$h2-map-border-weight: (';
  var borderWeightMapStringContent = '';
  var borderWeightMapStringEnd = ');';
  var borderWeightConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (
    config.borderWeights != null &&
    config.borderWeights != undefined &&
    config.borderWeights.length > 0
  ) {
    borderWeightConfig = config.borderWeights;
  } else {
    borderWeightConfig = defaults.borderWeights;
  }
  // Loop through each option and build the map.
  borderWeightConfig.forEach(function (borderWeights) {
    var borderWeightsString =
      '"' + borderWeights.key + '": ' + borderWeights.weight + ',';
    borderWeightMapStringContent =
      borderWeightMapStringContent.concat(borderWeightsString);
  });
  // Assemble the map.
  var borderWeightMap =
    borderWeightMapStringStart +
    borderWeightMapStringContent +
    borderWeightMapStringEnd;
  // Return the map.
  return borderWeightMap;
}

// Set the map.
function setBorderWeightMap(env) {
  var config = loadH2Config(env);
  var borderWeightMap = '';
  borderWeightMap = loadBorderWeightMap(env);
  if (env == 'dev') {
    return src('./lib/styles/maps/_map-border-weight.scss')
      .pipe(footer(borderWeightMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == 'prod') {
    return src(
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-border-weight.scss'
    )
      .pipe(footer(borderWeightMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = {
  setBorderWeightSassVariables,
  setBorderWeightMap,
};
