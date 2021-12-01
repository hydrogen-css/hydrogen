// Hydrogen.css / Whitespace Map Generation

//

'use strict';

// Requirements
const { src, dest } = require('gulp');
var footer = require('gulp-footer');
const replace = require('gulp-replace');

// Load Hydrogen's Configuration
var {
  loadH2Defaults,
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

//

// Exporting Variables Based on User Config

// Generate a list of Sass variables from the config files.
function createWhitespaceSassVariables(env) {
  // Load the config files, along with the defaults.
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Set the string and prefix it with a helpful comment.
  var whitespaceVariables = '// Whitespace\n';
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
  // TBD Deprecated Legacy Defaults
  whitespaceVariables = whitespaceVariables.concat(
    '$h2-margin-none: 0;\n$h2-margin-auto: auto;\n'
  );
  // Create the whitespace scale for both margin and padding.
  var marginXXS =
    '$h2-margin-xxs: ' +
    1 / whitespaceScaleConfig / whitespaceScaleConfig +
    'rem;\n';
  var marginXS = '$h2-margin-xs: ' + 1 / whitespaceScaleConfig + 'rem;\n';
  var marginS = '$h2-margin-s: 1rem;\n';
  var marginM = '$h2-margin-m: ' + 1 * whitespaceScaleConfig + 'rem;\n';
  var marginL =
    '$h2-margin-l: ' +
    1 * whitespaceScaleConfig * whitespaceScaleConfig +
    'rem;\n';
  var marginXL =
    '$h2-margin-xl: ' +
    1 * whitespaceScaleConfig * whitespaceScaleConfig * whitespaceScaleConfig +
    'rem;\n';
  var marginXXL =
    '$h2-margin-xxl: ' +
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
  var negativeMarginXXS =
    '$h2-negative-margin-xxs: ' +
    (1 / whitespaceScaleConfig / whitespaceScaleConfig) * -1 +
    'rem;\n';
  var negativeMarginXS =
    '$h2-negative-margin-xs: ' + (1 / whitespaceScaleConfig) * -1 + 'rem;\n';
  var negativeMarginS = '$h2-negative-margin-s: -1rem;\n';
  var negativeMarginM =
    '$h2-negative-margin-m: ' + 1 * whitespaceScaleConfig * -1 + 'rem;\n';
  var negativeMarginL =
    '$h2-negative-margin-l: ' +
    1 * whitespaceScaleConfig * whitespaceScaleConfig * -1 +
    'rem;\n';
  var negativeMarginXL =
    '$h2-negative-margin-xl: ' +
    1 *
      whitespaceScaleConfig *
      whitespaceScaleConfig *
      whitespaceScaleConfig *
      -1 +
    'rem;\n';
  var negativeMarginXXL =
    '$h2-negative-margin-xxl: ' +
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
  var paddingXXS =
    '$h2-padding-xxs: ' +
    1 / whitespaceScaleConfig / whitespaceScaleConfig +
    'rem;\n';
  var paddingXS = '$h2-padding-xs: ' + 1 / whitespaceScaleConfig + 'rem;\n';
  var paddingS = '$h2-padding-s: 1rem;\n';
  var paddingM = '$h2-padding-m: ' + 1 * whitespaceScaleConfig + 'rem;\n';
  var paddingL =
    '$h2-padding-l: ' +
    1 * whitespaceScaleConfig * whitespaceScaleConfig +
    'rem;\n';
  var paddingXL =
    '$h2-padding-xl: ' +
    1 * whitespaceScaleConfig * whitespaceScaleConfig * whitespaceScaleConfig +
    'rem;\n';
  var paddingXXL =
    '$h2-padding-xxl: ' +
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
}

// Set the variables in the variable file.
function setWhitespaceSassVariables(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  // Fetch the variable list.
  var whitespaceVars = createWhitespaceSassVariables(env);
  // Add the generated variables to the Sass file.
  return src(destPath + '/hydrogen-variables.scss')
    .pipe(footer(whitespaceVars))
    .pipe(dest(destPath));
}

// Exporting a Sass Map Based on User Config -----------------------------------

function loadWhitespaceMap(env) {
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
    1 * whitespaceScaleConfig * whitespaceScaleConfig * whitespaceScaleConfig +
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
}

function setWhitespaceVariable(env) {
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
}

function setWhitespaceMap(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var whitespaceMap = loadWhitespaceMap(env);
  return src(sourceDir + 'lib/styles/maps/_map-whitespace.scss')
    .pipe(footer(whitespaceMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

module.exports = {
  setWhitespaceSassVariables,
  setWhitespaceVariable,
  setWhitespaceMap,
};
