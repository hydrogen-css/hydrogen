// Hydrogen.css / Width Map Generation

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
function createWidthSassVariables(env) {
  // Load the config files, along with the defaults.
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Set the string and prefix it with a helpful comment.
  var widthVariables = '// Widths\n';
  // Set an empty variable for the config to be populated based on whether the user has set their own settings.
  var widthConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (
    config.widths != null &&
    config.widths != undefined &&
    config.widths.length > 0
  ) {
    widthConfig = config.widths;
  } else {
    widthConfig = defaults.widths;
  }
  // Loop through each config option and build the list.
  widthConfig.forEach(function (widths) {
    var widthVariable = '$h2-width-' + widths.key + ': ' + widths.value + ';\n';
    widthVariables = widthVariables.concat(widthVariable);
  });
  // Return the variable set.
  return widthVariables;
}

// Set the variables in the variable file.
function setWidthSassVariables(env) {
  // Load the user's config file.
  var config = loadH2Config(env);
  // Fetch the variable list.
  var widthVars = createWidthSassVariables(env);
  // Add the generated variables to the Sass file.
  if (env == 'dev') {
    return src(
      './lib/stage/' + config.folders.styles + '/hydrogen-variables.scss'
    )
      .pipe(footer(widthVars))
      .pipe(dest('./lib/stage/' + config.folders.styles));
  } else if (env == 'prod') {
    return src('./' + config.folders.styles + '/hydrogen-variables.scss')
      .pipe(footer(widthVars))
      .pipe(dest('./' + config.folders.styles));
  }
}

// Exporting a Sass Map Based on User Config -----------------------------------

function loadWidthMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var widthMapStringStart = '$h2-map-width: ("auto": "auto",';
  var widthMapStringContent = '';
  var widthMapStringEnd = ');';
  var widthConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (
    config.widths != null &&
    config.widths != undefined &&
    config.widths.length > 0
  ) {
    widthConfig = config.widths;
  } else {
    widthConfig = defaults.widths;
  }
  // Loop through each option and build the map.
  widthConfig.forEach(function (width) {
    var widthString = '"' + width.key + '": "' + width.value + '",';
    widthMapStringContent = widthMapStringContent.concat(widthString);
  });
  // Assemble the map.
  var widthMap =
    widthMapStringStart + widthMapStringContent + widthMapStringEnd;
  // Return the map.
  return widthMap;
}

function setWidthMap(env) {
  var config = loadH2Config(env);
  var widthMap = '';
  widthMap = loadWidthMap(env);
  if (env == 'dev') {
    return src('./lib/styles/maps/_map-width.scss')
      .pipe(footer(widthMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == 'prod') {
    return src(
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-width.scss'
    )
      .pipe(footer(widthMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = {
  setWidthSassVariables,
  setWidthMap,
};
