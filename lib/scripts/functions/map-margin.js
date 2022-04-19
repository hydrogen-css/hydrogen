// Hydrogen / Margin whitespace map generation

'use strict';

// Import Gulp and its dependencies
const { src, dest } = require('gulp');
const path = require('path');
var footer = require('gulp-footer');
const replace = require('gulp-replace');

// ---

// Import Hydrogen's configuration scripts
var {
  loadH2Defaults,
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// ---

/**
 * Generates a list of CSS or Sass variables of whitespace values for both margin and padding
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} format Either 'css' or 'sass'
 * @returns {string} A list of whitespace variables generated using the whitespace scale setting
 */
function setMarginVariables(env, format) {
  try {
    // Load the config files, along with the defaults.
    var defaults = loadH2Defaults(env);
    var config = loadH2Config(env);
    // Set the string and prefix it with a helpful comment.
    var marginVars = '/* Margins */\n';
    // Set the variable prefix depending on the format requested
    var formatPrefix = '';
    if (format == 'css') {
      formatPrefix = '--';
    } else if (format == 'sass') {
      formatPrefix = '$';
    } else {
      throw "You haven't specified a format for your variable export.";
    }
    // Set an empty variable for the config to be populated based on whether the user has set their own settings.
    var lineHeightSetting;
    // Check to see if the user has defined any options in their config, and if not, load the defaults.
    if (
      config.fontBaseLineHeight != null &&
      config.fontBaseLineHeight != undefined &&
      config.fontBaseLineHeight.length > 0
    ) {
      lineHeightSetting = config.fontBaseLineHeight;
    } else {
      lineHeightSetting = defaults.fontBaseLineHeight;
    }
    // Add the default settings for margin
    marginVars = marginVars.concat(formatPrefix + 'h2-margin-none: 0;\n');
    marginVars = marginVars.concat(formatPrefix + 'h2-margin-auto: auto;\n');
    // Create the margin variables
    var margin_xquarter = formatPrefix + 'h2-margin-xquarter: ' + (lineHeightSetting * 0.25) + 'rem;\n';
    var margin_xhalf = formatPrefix + 'h2-margin-xhalf: ' + (lineHeightSetting * 0.5) + 'rem;\n';
    var margin_x1 = formatPrefix + 'h2-margin-x1: ' + (lineHeightSetting * 1) + 'rem;\n';
    var margin_x2 = formatPrefix + 'h2-margin-x2: ' + (lineHeightSetting * 2) + 'rem;\n';
    var margin_x3 = formatPrefix + 'h2-margin-x3: ' + (lineHeightSetting * 3) + 'rem;\n';
    var margin_x4 = formatPrefix + 'h2-margin-x4: ' + (lineHeightSetting * 4) + 'rem;\n';
    var margin_x5 = formatPrefix + 'h2-margin-x5: ' + (lineHeightSetting * 5) + 'rem;\n';
    // Create the negative margin variables
    var nega_margin_xquarter = formatPrefix + 'h2-negative-margin-xquarter: ' + ((lineHeightSetting * 0.25) * -1) + 'rem;\n';
    var nega_margin_xhalf = formatPrefix + 'h2-negative-margin-xhalf: ' + ((lineHeightSetting * 0.5) * -1) + 'rem;\n';
    var nega_margin_x1 = formatPrefix + 'h2-negative-margin-x1: ' + ((lineHeightSetting * 1) * -1) + 'rem;\n';
    var nega_margin_x2 = formatPrefix + 'h2-negative-margin-x2: ' + ((lineHeightSetting * 2) * -1) + 'rem;\n';
    var nega_margin_x3 = formatPrefix + 'h2-negative-margin-x3: ' + ((lineHeightSetting * 3) * -1) + 'rem;\n';
    var nega_margin_x4 = formatPrefix + 'h2-negative-margin-x4: ' + ((lineHeightSetting * 4) * -1) + 'rem;\n';
    var nega_margin_x5 = formatPrefix + 'h2-negative-margin-x5: ' + ((lineHeightSetting * 5) * -1) + 'rem;\n';
    marginVars = marginVars + margin_xquarter + margin_xhalf + margin_x1 + margin_x2 + margin_x3 + margin_x4 + margin_x5 + nega_margin_xquarter + nega_margin_xhalf + nega_margin_x1 + nega_margin_x2 + nega_margin_x3 + nega_margin_x4 + nega_margin_x5;
    // Return the variable set.
    return marginVars;
  } catch (err) {
    return err;
  }
}

// ---

/**
 * Creates a Sass map that is used to generate margin and padding values
 * @param {string} env Either 'dev' or 'prod'
 * @returns {string} A Sass map of whitespace values
 */
function loadMarginMap(env) {
  try {
    var defaults = loadH2Defaults(env);
    var config = loadH2Config(env);
    // Create the map string.
    var whitespaceMapStringStart = '$h2-map-margin: ("none": 0, "auto": auto,';
    var whitespaceMapStringContent = '';
    var whitespaceMapStringEnd = ');';
    var lineHeightSetting;
    // Check to see if the user has defined any options in their config, and if not, load the defaults.
    if (
      config.fontBaseLineHeight != null &&
      config.fontBaseLineHeight != undefined &&
      config.fontBaseLineHeight.length > 0
    ) {
      lineHeightSetting = config.fontBaseLineHeight;
    } else {
      lineHeightSetting = defaults.fontBaseLineHeight;
    }
    // Create the whitespace values.
    var xquarter = '"x.25": ' + (lineHeightSetting * 0.25) + 'rem,';
    var xhalf = '"x.5": ' + (lineHeightSetting * 0.5) + 'rem,';
    var x1 = '"x1": ' + (lineHeightSetting * 1) + 'rem,';
    var x2 = '"x2": ' + (lineHeightSetting * 2) + 'rem,';
    var x3 = '"x3": ' + (lineHeightSetting * 3) + 'rem,';
    var x4 = '"x4": ' + (lineHeightSetting * 4) + 'rem,';
    var x5 = '"x5": ' + (lineHeightSetting * 5) + 'rem,';
    var negaxquarter = '"-x.25": ' + ((lineHeightSetting * 0.25) * -1) + 'rem,';
    var negaxhalf = '"-x.5": ' + ((lineHeightSetting * 0.5) * -1) + 'rem,';
    var negax1 = '"-x1": ' + ((lineHeightSetting * 1) * -1) + 'rem,';
    var negax2 = '"-x2": ' + ((lineHeightSetting * 2) * -1) + 'rem,';
    var negax3 = '"-x3": ' + ((lineHeightSetting * 3) * -1) + 'rem,';
    var negax4 = '"-x4": ' + ((lineHeightSetting * 4) * -1) + 'rem,';
    var negax5 = '"-x5": ' + ((lineHeightSetting * 5) * -1) + 'rem,';
    whitespaceMapStringContent = whitespaceMapStringContent + xquarter + xhalf + x1 + x2 + x3 + x4 + x5 + negaxquarter + negaxhalf + negax1 + negax2 + negax3 + negax4 + negax5;
    // Assemble the map.
    var whitespaceMap = whitespaceMapStringStart + whitespaceMapStringContent + whitespaceMapStringEnd;
    // Return the map.
    return whitespaceMap;
  } catch (err) {
    return err;
  }
}

/**
 * Generate the utility Sass map
 * @param {string} env Either 'dev' or 'prod'
 * @returns Gulp src() - the utility Sass map file
 */
function setMarginMap(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var whitespaceMap = loadMarginMap(env);
  return src(path.resolve(__dirname, '../../styles/maps/_map-margin.scss'))
    .pipe(footer(whitespaceMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

// Export the utility's scripts for use
module.exports = {
  setMarginVariables,
  setMarginMap,
};
