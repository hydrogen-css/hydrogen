// Hydrogen.css / Whitespace Map Generation

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
function setWhitespaceVariables(env, format) {
  try {
    // Load the config files, along with the defaults.
    var defaults = loadH2Defaults(env);
    var config = loadH2Config(env);
    // Set the string and prefix it with a helpful comment.
    var whitespaceVariables = '/* Whitespace */\n';
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
    var whitespaceScaleConfig;
    // Check to see if the user has defined any options in their config, and if not, load the defaults.
    if (
      config.whitespaceScale != null &&
      config.whitespaceScale != undefined &&
      config.whitespaceScale.length > 0
    ) {
      whitespaceScaleConfig = config.whitespaceScale;
    } else {
      whitespaceScaleConfig = defaults.whitespaceScale;
    }
    // Add the default settings for margins
    whitespaceVariables = whitespaceVariables.concat(
      formatPrefix +
        'h2-margin-none: 0;\n' +
        formatPrefix +
        'h2-margin-auto: auto;\n'
    );
    // Create the margin variables
    var marginXXS =
      formatPrefix +
      'h2-margin-xxs: ' +
      1 / whitespaceScaleConfig / whitespaceScaleConfig +
      'rem;\n';
    var marginXS =
      formatPrefix + 'h2-margin-xs: ' + 1 / whitespaceScaleConfig + 'rem;\n';
    var marginS = formatPrefix + 'h2-margin-s: 1rem;\n';
    var marginM =
      formatPrefix + 'h2-margin-m: ' + 1 * whitespaceScaleConfig + 'rem;\n';
    var marginL =
      formatPrefix +
      'h2-margin-l: ' +
      1 * whitespaceScaleConfig * whitespaceScaleConfig +
      'rem;\n';
    var marginXL =
      formatPrefix +
      'h2-margin-xl: ' +
      1 *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig +
      'rem;\n';
    var marginXXL =
      formatPrefix +
      'h2-margin-xxl: ' +
      1 *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig +
      'rem;\n';
    whitespaceVariables =
      whitespaceVariables +
      marginXXS +
      marginXS +
      marginS +
      marginM +
      marginL +
      marginXL +
      marginXXL;
    // Create the negative margin variables
    var negativeMarginXXS =
      formatPrefix +
      'h2-negative-margin-xxs: ' +
      (1 / whitespaceScaleConfig / whitespaceScaleConfig) * -1 +
      'rem;\n';
    var negativeMarginXS =
      formatPrefix +
      'h2-negative-margin-xs: ' +
      (1 / whitespaceScaleConfig) * -1 +
      'rem;\n';
    var negativeMarginS = formatPrefix + 'h2-negative-margin-s: -1rem;\n';
    var negativeMarginM =
      formatPrefix +
      'h2-negative-margin-m: ' +
      1 * whitespaceScaleConfig * -1 +
      'rem;\n';
    var negativeMarginL =
      formatPrefix +
      'h2-negative-margin-l: ' +
      1 * whitespaceScaleConfig * whitespaceScaleConfig * -1 +
      'rem;\n';
    var negativeMarginXL =
      formatPrefix +
      'h2-negative-margin-xl: ' +
      1 *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        -1 +
      'rem;\n';
    var negativeMarginXXL =
      formatPrefix +
      'h2-negative-margin-xxl: ' +
      1 *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        -1 +
      'rem;\n';
    whitespaceVariables =
      whitespaceVariables +
      negativeMarginXXS +
      negativeMarginXS +
      negativeMarginS +
      negativeMarginM +
      negativeMarginL +
      negativeMarginXL +
      negativeMarginXXL;
    // Add the default settings for padding
    whitespaceVariables = whitespaceVariables.concat(
      formatPrefix + 'h2-padding-none: 0;\n'
    );
    // Create the padding variables
    var paddingXXS =
      formatPrefix +
      'h2-padding-xxs: ' +
      1 / whitespaceScaleConfig / whitespaceScaleConfig +
      'rem;\n';
    var paddingXS =
      formatPrefix + 'h2-padding-xs: ' + 1 / whitespaceScaleConfig + 'rem;\n';
    var paddingS = formatPrefix + 'h2-padding-s: 1rem;\n';
    var paddingM =
      formatPrefix + 'h2-padding-m: ' + 1 * whitespaceScaleConfig + 'rem;\n';
    var paddingL =
      formatPrefix +
      'h2-padding-l: ' +
      1 * whitespaceScaleConfig * whitespaceScaleConfig +
      'rem;\n';
    var paddingXL =
      formatPrefix +
      'h2-padding-xl: ' +
      1 *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig +
      'rem;\n';
    var paddingXXL =
      formatPrefix +
      'h2-padding-xxl: ' +
      1 *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig +
      'rem;\n';
    whitespaceVariables =
      whitespaceVariables +
      paddingXXS +
      paddingXS +
      paddingS +
      paddingM +
      paddingL +
      paddingXL +
      paddingXXL;
    // Return the variable set.
    return whitespaceVariables;
  } catch (err) {
    return err;
  }
}

// ---

/**
 * Sets the whitespace scale value in the core file so that it can compile whitespace values
 * @param {string} env Either 'dev' or 'prod'
 * @returns Gulp src() - Updates the core.scss file with the user's whitespace scale setting
 */
function setWhitespaceScaleValue(env) {
  try {
    var defaults = loadH2Defaults(env);
    var config = loadH2Config(env);
    var destRoot = getH2DestinationPath(env);
    var outputDir = getH2OutputDirectory(env);
    var destPath = destRoot + outputDir;
    if (
      config.whitespaceScale != null &&
      config.whitespaceScale != undefined &&
      config.whitespaceScale.length > 0
    ) {
      return src(destPath + '/hydrogen/core.scss')
        .pipe(
          replace(
            '$h2-whitespace-scale: $H2WHITESPACESCALE;',
            '$h2-whitespace-scale: ' + config.whitespaceScale + ';'
          )
        )
        .pipe(dest(destPath + '/hydrogen'));
    } else {
      return src(destPath + '/hydrogen/core.scss')
        .pipe(
          replace(
            '$h2-whitespace-scale: $H2WHITESPACESCALE;',
            '$h2-whitespace-scale: ' + defaults.whitespaceScale + ';'
          )
        )
        .pipe(dest(destPath + '/hydrogen'));
    }
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
function loadWhitespaceMap(env) {
  try {
    var defaults = loadH2Defaults(env);
    var config = loadH2Config(env);
    // Create the map string.
    var whitespaceMapStringStart = '$h2-map-whitespace: ("none": 0,';
    var whitespaceMapStringContent = '';
    var whitespaceMapStringEnd = ');';
    var whitespaceScaleConfig;
    // Check to see if the user has defined any options in their config, and if not, load the defaults.
    if (
      config.whitespaceScale != null &&
      config.whitespaceScale != undefined &&
      config.whitespaceScale.length > 0
    ) {
      whitespaceScaleConfig = config.whitespaceScale;
    } else {
      whitespaceScaleConfig = defaults.whitespaceScale;
    }
    // Create the whitespace values.
    var smallest =
      '"xxs": ' + 1 / whitespaceScaleConfig / whitespaceScaleConfig + 'rem,';
    var smaller = '"xs": ' + 1 / whitespaceScaleConfig + 'rem,';
    var small = '"s": 1rem,';
    var medium = '"m": ' + 1 * whitespaceScaleConfig + 'rem,';
    var large =
      '"l": ' + 1 * whitespaceScaleConfig * whitespaceScaleConfig + 'rem,';
    var larger =
      '"xl": ' +
      1 *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig +
      'rem,';
    var largest =
      '"xxl": ' +
      1 *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig +
      'rem,';
    whitespaceMapStringContent =
      whitespaceMapStringContent +
      smallest +
      smaller +
      small +
      medium +
      large +
      larger +
      largest;
    // Assemble the map.
    var whitespaceMap =
      whitespaceMapStringStart +
      whitespaceMapStringContent +
      whitespaceMapStringEnd;
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
function setWhitespaceMap(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var whitespaceMap = loadWhitespaceMap(env);
  return src(path.resolve(__dirname, '../../styles/maps/_map-whitespace.scss'))
    .pipe(footer(whitespaceMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

// Export the utility's scripts for use
module.exports = {
  setWhitespaceVariables,
  setWhitespaceScaleValue,
  setWhitespaceMap,
};
