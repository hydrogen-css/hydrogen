// Hydrogen.css / Set Fonts and Font Scale

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

// Load Fony Family Map
var loadFontFamilyMap = require('../functions/map-font-family');

// Load Hydrogen modules
var { createUtilityArray } = require('../functions/utility-generation');

//

// Set the utility's string values.
var utilityConfigKey = 'fonts';

// Legacy defaults
var utilityDefaults = [];

// Exporting Variables Based on User Config

// Generate a list of Sass variables from the config files.
function createFontScaleSassVariables(env) {
  // Load the config files, along with the defaults.
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Set the string and prefix it with a helpful comment.
  var fontScaleVariables = '// Typography Scale\n';
  // Set an empty variable for the config to be populated based on whether the user has set their own settings.
  var fontScaleConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (
    config.fontScale != null &&
    config.fontScale != undefined &&
    config.fontScale.length > 0
  ) {
    fontScaleConfig = config.fontScale;
  } else {
    fontScaleConfig = defaults.fontScale;
  }
  // Because the font scale is generated in Sass natively, this function is more complex as it needs to perform the same task.
  var fontScaleBase = 1;
  var fontScaleBaseString = '$h2-font-size-base: ' + fontScaleBase + 'rem;\n';
  var fontScaleCaption = fontScaleBase / fontScaleConfig;
  var fontScaleCaptionString =
    '$h2-font-size-caption: ' + fontScaleCaption + 'rem;\n';
  var fontScaleH6 = fontScaleBase * fontScaleConfig;
  var fontScaleH6String = '$h2-font-size-h6: ' + fontScaleH6 + 'rem;\n';
  var fontScaleH5 = fontScaleH6 * fontScaleConfig;
  var fontScaleH5String = '$h2-font-size-h5: ' + fontScaleH5 + 'rem;\n';
  var fontScaleH4 = fontScaleH5 * fontScaleConfig;
  var fontScaleH4String = '$h2-font-size-h4: ' + fontScaleH4 + 'rem;\n';
  var fontScaleH3 = fontScaleH4 * fontScaleConfig;
  var fontScaleH3String = '$h2-font-size-h3: ' + fontScaleH3 + 'rem;\n';
  var fontScaleH2 = fontScaleH3 * fontScaleConfig;
  var fontScaleH2String = '$h2-font-size-h2: ' + fontScaleH2 + 'rem;\n';
  var fontScaleH1 = fontScaleH2 * fontScaleConfig;
  var fontScaleH1String = '$h2-font-size-h1: ' + fontScaleH1 + 'rem;\n';
  fontScaleVariables =
    fontScaleVariables +
    fontScaleH1String +
    fontScaleH2String +
    fontScaleH3String +
    fontScaleH4String +
    fontScaleH5String +
    fontScaleH6String +
    fontScaleBaseString +
    fontScaleCaptionString;
  // Return the variable set.
  return fontScaleVariables;
}

// Set the variables in the variable file.
function setFontScaleSassVariables(env) {
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  // Fetch the variable list.
  var fontScaleVars = createFontScaleSassVariables(env);
  // Add the generated variables to the Sass file.
  return src(destPath + '/hydrogen-variables.scss')
    .pipe(footer(fontScaleVars))
    .pipe(dest(destPath));
}

// Exporting a Sass Map Based on User Config -----------------------------------

function setFontFaceCSS(env) {
  var fontFaceCSSStringStart = '@font-face {';
  var fontFaceCSSStringContent = '';
  var fontFaceCSSStringEnd = '}';
  var fontFamilyConfig = createUtilityArray(
    env,
    'maps',
    utilityConfigKey,
    utilityDefaults
  );
  // console.log(fontFamilyConfig);
  // Font Face Styles
  fontFamilyConfig.forEach(function (fontFamily) {
    if (
      fontFamily.loadType == 'font-face' ||
      fontFamily.loadType == 'fontFace'
    ) {
      fontFaceCSSStringContent =
        'font-family: ' +
        fontFamily.key +
        '; src: url(' +
        fontFamily.url +
        ');';
    }
  });
  // Assemble the variable.
  var fontFaceCSS =
    fontFaceCSSStringStart + fontFaceCSSStringContent + fontFaceCSSStringEnd;
  // Return the map.
  return fontFaceCSS;
}

function setFontFamilyMap(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var fontFamilyMap = loadFontFamilyMap(env);
  return src(sourceDir + 'lib/styles/maps/_map-font-families.scss')
    .pipe(footer(fontFamilyMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

// Font Size
function setFontBaseSize(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  if (config.fontBaseSize != null && config.fontBaseSize != undefined) {
    return src(destPath + '/hydrogen/core.scss')
      .pipe(
        replace(
          '$h2-font-base-size: $H2FONTBASESIZE;',
          '$h2-font-base-size: ' + config.fontBaseSize + ';'
        )
      )
      .pipe(dest(destPath + '/hydrogen'));
  } else {
    return src(destPath + '/hydrogen/core.scss')
      .pipe(
        replace(
          '$h2-font-base-size: $H2FONTBASESIZE;',
          '$h2-font-base-size: ' + defaults.fontBaseSize + ';'
        )
      )
      .pipe(dest(destPath + '/hydrogen'));
  }
}

// Font Scale
function setCoreFontScale(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  if (
    config.fontScale != null &&
    config.fontScale != undefined &&
    config.fontScale > 0
  ) {
    return src(destPath + '/hydrogen/core.scss')
      .pipe(
        replace(
          '$h2-font-scale: $H2FONTSCALE;',
          '$h2-font-scale: ' + config.fontScale + ';'
        )
      )
      .pipe(dest(destPath + '/hydrogen'));
  } else {
    return src(destPath + '/hydrogen/core.scss')
      .pipe(
        replace(
          '$h2-font-scale: $H2FONTSCALE;',
          '$h2-font-scale: ' + defaults.fontScale + ';'
        )
      )
      .pipe(dest(destPath + '/hydrogen'));
  }
}

function setUtilityFontScale(env, task) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  if (task == 'build') {
    if (
      config.fontScale != null &&
      config.fontScale != undefined &&
      config.fontScale > 0
    ) {
      return src(destPath + '/hydrogen/maps/_map-font-size.scss')
        .pipe(
          replace(
            '$h2-font-scale: $H2FONTSCALE;',
            '$h2-font-scale: ' + config.fontScale + ';'
          )
        )
        .pipe(dest(destPath + '/hydrogen/maps'));
    } else {
      return src(destPath + '/hydrogen/maps/_map-font-size.scss')
        .pipe(
          replace(
            '$h2-font-scale: $H2FONTSCALE;',
            '$h2-font-scale: ' + defaults.fontScale + ';'
          )
        )
        .pipe(dest(destPath + '/hydrogen/maps'));
    }
  } else if (task == 'compile') {
    if (
      config.fontScale != null &&
      config.fontScale != undefined &&
      config.fontScale > 0
    ) {
      return src(destPath + '/hydrogen/maps/_map-font-size.scss')
        .pipe(
          replace(
            '$h2-font-scale: $H2FONTSCALE;',
            '$h2-font-scale: ' + config.fontScale + ';'
          )
        )
        .pipe(dest(destPath + '/hydrogen/maps'));
    } else {
      return src(destPath + '/hydrogen/maps/_map-font-size.scss')
        .pipe(
          replace(
            '$h2-font-scale: $H2FONTSCALE;',
            '$h2-font-scale: ' + defaults.fontScale + ';'
          )
        )
        .pipe(dest(destPath + '/hydrogen/maps'));
    }
  }
}

module.exports = {
  setFontScaleSassVariables,
  setFontFaceCSS,
  setFontFamilyMap,
  setFontBaseSize,
  setCoreFontScale,
  setUtilityFontScale,
};
