// Hydrogen.css / Opacity Map Generation

'use strict';

// Import Gulp and its dependencies
const { src, dest } = require('gulp');
const path = require('path');
var footer = require('gulp-footer');

// ---

// Import Hydrogen's configuration scripts
var {
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Import Hydrogen's utility modules
var {
  loadUtilityMap,
  createUtilityVariables,
} = require('../functions/utility-generation');

// ---

// Set the utility's name values
var utilityName = 'Opacities';
var utilityConfigKey = 'opacities';
var utilityConfigValue = 'value';
var utilityMapLabel = 'opacity';
var utilityVariableLabel = 'opacity';

// Default settings
var utilityDefaults = [];

// ---

/**
 * Create utility specific variables
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} format Either 'css' or 'sass'
 * @returns {string} A stringified list of CSS or Sass variables for this utility
 */
function setOpacityVariables(env, format) {
  // Fetch the variable list
  var utilityVars = createUtilityVariables(
    env,
    format,
    utilityDefaults,
    utilityConfigKey,
    utilityConfigValue,
    utilityName,
    utilityVariableLabel
  );
  // Return the variables
  return utilityVars;
}

// ---

/**
 * Generate the utility Sass map
 * @param {string} env Either 'dev' or 'prod'
 * @returns Gulp src() - the utility's Sass map file
 */
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
  return src(path.resolve(__dirname, '../../styles/maps/_map-opacity.scss'))
    .pipe(footer(utilityMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

// Export the map function for use.
module.exports = {
  setOpacityVariables,
  setOpacityMap,
};
