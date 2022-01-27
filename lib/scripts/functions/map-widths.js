// Hydrogen.css / Width Map Generation

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
var utilityName = 'Widths';
var utilityConfigKey = 'widths';
var utilityConfigValue = 'value';
var utilityMapLabel = 'width';
var utilityVariableLabel = 'width';

// ---

// Default settings
var utilityDefaults = [
  {
    key: 'none',
    value: '0px',
  },
  {
    key: 'auto',
    value: 'auto',
  },
];

// ---

/**
 * Create utility specific variables
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} format Either 'css' or 'sass'
 * @returns {string} A stringified list of CSS or Sass variables for this utility
 */
function setWidthVariables(env, format) {
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
function setWidthMap(env) {
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
  return src(path.resolve(__dirname, '../../styles/maps/_map-width.scss'))
    .pipe(footer(utilityMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

// Export the utility's scripts for use
module.exports = {
  setWidthVariables,
  setWidthMap,
};
