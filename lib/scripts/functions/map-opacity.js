// Hydrogen.css / Opacity Map Generation

// =============================================================================

'use strict';

// Requirements
const { src, dest } = require('gulp');
var footer = require('gulp-footer');

// Load Hydrogen's Configuration
var {
  loadH2Defaults,
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Load Hydrogen modules
var {
  loadUtilityMap,
  createUtilitySassVariables,
  loadUtilityMap,
} = require('../functions/utility-generation');

// =============================================================================

// Set the utility's string values.
var utilityName = 'Opacities';
var utilityConfigKey = 'opacities';
var utilityConfigValue = 'value';
var utilityMapLabel = 'opacity';
var utilityVariableLabel = 'opacity';

// Legacy defaults
var utilityDefaults = [];

// Exporting Variables Based on User Config ------------------------------------

// Set the variables in the variable file.
function setOpacitySassVariables(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
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
  return src(destPath + '/hydrogen-variables.scss')
    .pipe(footer(utilityVars))
    .pipe(dest(destPath));
}

// Exporting a Sass Map Based on User Config -----------------------------------

function setOpacityMap(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var utilityMap = loadUtilityMap(
    env,
    utilityDefaults,
    utilityConfigKey,
    utilityConfigValue,
    utilityMapLabel
  );
  return src(sourceDir + 'lib/styles/maps/_map-opacity.scss')
    .pipe(footer(utilityMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

// Export the map function for use.
module.exports = {
  setOpacitySassVariables,
  setOpacityMap,
};
