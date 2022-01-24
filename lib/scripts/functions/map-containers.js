// Hydrogen.css / Container Map Generation

// =============================================================================

'use strict';

// Requirements
const { src, dest } = require('gulp');
const path = require('path');
var footer = require('gulp-footer');

// Load Hydrogen's Configuration
var { loadH2Config } = require('../functions/config-load');

// Load Hydrogen modules
var {
  loadUtilityMap,
  createUtilitySassVariables,
  loadUtilityMap,
} = require('../functions/utility-generation');

// =============================================================================

// Set the utility's string values.
var utilityName = 'Containers';
var utilityConfigKey = 'containers';
var utilityConfigValue = 'maxWidth';
var utilityMapLabel = 'containers';
var utilityVariableLabel = 'container-width';

// Legacy defaults
var utilityDefaults = [
  {
    key: 'full',
    maxWidth: 'none',
  },
];

// Exporting Variables Based on User Config ------------------------------------

// Set the variables in the variable file.
function setContainerSassVariables(env) {
  // Load the user's config file.
  var config = loadH2Config(env);
  // Fetch the variable list.
  var utilityVars = createUtilitySassVariables(
    env,
    utilityDefaults,
    utilityConfigKey,
    utilityConfigValue,
    utilityName,
    utilityVariableLabel
  );
  // Add the generated variables to the Sass file.
  if (env == 'dev') {
    return src(
      './lib/stage/' + config.folders.styles + '/hydrogen-variables.scss'
    )
      .pipe(footer(utilityVars))
      .pipe(dest('./lib/stage/' + config.folders.styles));
  } else if (env == 'prod') {
    return src('./' + config.folders.styles + '/hydrogen-variables.scss')
      .pipe(footer(utilityVars))
      .pipe(dest('./' + config.folders.styles));
  }
}

// Exporting a Sass Map Based on User Config -----------------------------------

// Set the map.
function setContainerMap(env) {
  var config = loadH2Config(env);
  var utilityMap = loadUtilityMap(
    env,
    utilityDefaults,
    utilityConfigKey,
    utilityConfigValue,
    utilityMapLabel
  );
  if (env == 'dev') {
    return src(path.resolve(__dirname, '../../styles/maps/_map-containers.scss'))
      .pipe(footer(utilityMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == 'prod') {
    return src(
      path.resolve(__dirname, '../../styles/maps/_map-containers.scss')
    )
      .pipe(footer(utilityMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = {
  setContainerSassVariables,
  setContainerMap,
};
