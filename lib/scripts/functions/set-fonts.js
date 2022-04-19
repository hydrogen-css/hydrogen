// Hydrogen.css / Set Fonts and Font Scale

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

// Import Hydrogen's utility modules
var { createUtilityArray } = require('../functions/utility-generation');

// Import the font family mapping script
var loadFontFamilyMap = require('../functions/map-font-family');

// ---

// Set the utility's name values
var utilityConfigKey = 'fonts';

// ---

// Default settings
var utilityDefaults = [];

// ---

/**
 * Generates a list of font scale variables (e.g. h1-h6, p, caption) as well as computed line height variables
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} format Either 'css' or 'sass'
 * @returns {string} A complete list of font scale variables for use.
 */
function setFontScaleVariables(env, format) {
  try {
    // Load the config files, along with the defaults.
    var defaults = loadH2Defaults(env);
    var config = loadH2Config(env);
    // Set the string and prefix it with a helpful comment.
    var fontScaleVariables = '/* Typography Scale */\n';
    // Set an empty variable for the config to be populated based on whether the user has set their own settings.
    var fontScaleConfig;
    var lineHeightSetting;
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
    if (
      config.fontBaseLineHeight != null &&
      config.fontBaseLineHeight != undefined &&
      config.fontBaseLineHeight.length > 0
    ) {
      lineHeightSetting = config.fontBaseLineHeight;
    } else {
      lineHeightSetting = defaults.fontBaseLineHeight;
    }
    // Set the variable prefix depending on the format requested
    var formatPrefix = '';
    if (format == 'css') {
      formatPrefix = '--';
    } else if (format == 'sass') {
      formatPrefix = '$';
    } else {
      throw "You haven't specified a format for your variable export.";
    }
    // Because the font scale is generated in Sass natively, this function is more complex as it needs to perform the same task.
    var fontScaleBase = 1;
    var fontScaleBaseString = formatPrefix + 'h2-font-size-base: ' + fontScaleBase + 'rem;\n';
    var fontScaleCaption = fontScaleBase / fontScaleConfig;
    var fontScaleCaptionString = formatPrefix + 'h2-font-size-caption: ' + fontScaleCaption + 'rem;\n';
    var fontScaleH6 = fontScaleBase * fontScaleConfig;
    var fontScaleH6String = formatPrefix + 'h2-font-size-h6: ' + fontScaleH6 + 'rem;\n';
    var fontScaleH5 = fontScaleH6 * fontScaleConfig;
    var fontScaleH5String = formatPrefix + 'h2-font-size-h5: ' + fontScaleH5 + 'rem;\n';
    var fontScaleH4 = fontScaleH5 * fontScaleConfig;
    var fontScaleH4String = formatPrefix + 'h2-font-size-h4: ' + fontScaleH4 + 'rem;\n';
    var fontScaleH3 = fontScaleH4 * fontScaleConfig;
    var fontScaleH3String = formatPrefix + 'h2-font-size-h3: ' + fontScaleH3 + 'rem;\n';
    var fontScaleH2 = fontScaleH3 * fontScaleConfig;
    var fontScaleH2String = formatPrefix + 'h2-font-size-h2: ' + fontScaleH2 + 'rem;\n';
    var fontScaleH1 = fontScaleH2 * fontScaleConfig;
    var fontScaleH1String = formatPrefix + 'h2-font-size-h1: ' + fontScaleH1 + 'rem;\n';
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
    // Calculate the line heights based on the config - the premise here is that the line height for headings needs to be the closest multiple of the line height setting that is larger than the calculated font size.
    var h1LineHeight = '';
    var h2LineHeight = '';
    var h3LineHeight = '';
    var h4LineHeight = '';
    var h5LineHeight = '';
    var h6LineHeight = '';
    var baseLineHeight = formatPrefix + 'h2-base-line-height: ' + lineHeightSetting + ';\n';
    // When updating this calculation, be sure to do so in the following places:
    // - set-fonts.js (setFontScaleVariables)
    // - set-fonts.js (setHeadingLineHeights)
    // - core.scss (variables)
    // - _map-font-size.scss (variables)
    var lineHeightMultiple;
    var lineHeightCounter;
    // H1
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH1) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h1LineHeight = formatPrefix + 'h2-line-height-h1: ' +  lineHeightMultiple/fontScaleH1 + ';\n';
      } 
    } while (lineHeightMultiple < fontScaleH1);
    // H2
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH2) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h2LineHeight = formatPrefix + 'h2-line-height-h2: ' +  lineHeightMultiple/fontScaleH2 + ';\n';
      } 
    } while (lineHeightMultiple < fontScaleH2);
    // H3
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH3) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h3LineHeight = formatPrefix + 'h2-line-height-h3: ' +  lineHeightMultiple/fontScaleH3 + ';\n';
      } 
    } while (lineHeightMultiple < fontScaleH3);
    // H4
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH4) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h4LineHeight = formatPrefix + 'h2-line-height-h4: ' +  lineHeightMultiple/fontScaleH4 + ';\n';
      } 
    } while (lineHeightMultiple < fontScaleH4);
    // H5
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH5) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h5LineHeight = formatPrefix + 'h2-line-height-h5: ' +  lineHeightMultiple/fontScaleH5 + ';\n';
      } 
    } while (lineHeightMultiple < fontScaleH5);
    // H6
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH6) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h6LineHeight = formatPrefix + 'h2-line-height-h6: ' +  lineHeightMultiple/fontScaleH6 + ';\n';
      } 
    } while (lineHeightMultiple < fontScaleH6);
    fontScaleVariables = fontScaleVariables + h1LineHeight + h2LineHeight + h3LineHeight + h4LineHeight + h5LineHeight + h6LineHeight + baseLineHeight;
    // Return the variable set.
    return fontScaleVariables;
  } catch (err) {
    return err;
  }
}

/**
 * Setting heading line heights in core.scss
 * @param {string} env Either 'dev' or 'prod'
 * @returns A modified core.scss file
 */
function setHeadingLineHeights(env) {
  try {
    // Load in the configurations
    var defaults = loadH2Defaults(env);
    var config = loadH2Config(env);
    var destRoot = getH2DestinationPath(env);
    var outputDir = getH2OutputDirectory(env);
    var destPath = destRoot + outputDir;
    // Set an empty variable for the config to be populated based on whether the user has set their own settings
    var fontScaleConfig;
    var lineHeightSetting;
    // Check to see if the user has defined any options in their config, and if not, load the defaults
    if (
      config.fontScale != null &&
      config.fontScale != undefined &&
      config.fontScale.length > 0
    ) {
      fontScaleConfig = config.fontScale;
    } else {
      fontScaleConfig = defaults.fontScale;
    }
    if (
      config.fontBaseLineHeight != null &&
      config.fontBaseLineHeight != undefined &&
      config.fontBaseLineHeight.length > 0
    ) {
      lineHeightSetting = config.fontBaseLineHeight;
    } else {
      lineHeightSetting = defaults.fontBaseLineHeight;
    }
    // Because the font scale is generated in Sass natively, this function is more complex as it needs to perform the same task.
    var fontScaleBase = 1;
    var fontScaleH6 = fontScaleBase * fontScaleConfig;
    var fontScaleH5 = fontScaleH6 * fontScaleConfig;
    var fontScaleH4 = fontScaleH5 * fontScaleConfig;
    var fontScaleH3 = fontScaleH4 * fontScaleConfig;
    var fontScaleH2 = fontScaleH3 * fontScaleConfig;
    var fontScaleH1 = fontScaleH2 * fontScaleConfig;
    // Calculate the line heights based on the config - the premise here is that the line height for headings needs to be the closest multiple of the line height setting that is larger than the calculated font size.
    var h1LineHeight = '';
    var h2LineHeight = '';
    var h3LineHeight = '';
    var h4LineHeight = '';
    var h5LineHeight = '';
    var h6LineHeight = '';
    // When updating this calculation, be sure to do so in the following places:
    // - set-fonts.js (setFontScaleVariables)
    // - set-fonts.js (setHeadingLineHeights)
    // - core.scss (variables)
    // - _map-font-size.scss (variables)
    var lineHeightMultiple;
    var lineHeightCounter;
    // H1
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH1) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h1LineHeight = lineHeightMultiple/fontScaleH1;
      } 
    } while (lineHeightMultiple < fontScaleH1);
    // H2
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH2) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h2LineHeight = lineHeightMultiple/fontScaleH2;
      } 
    } while (lineHeightMultiple < fontScaleH2);
    // H3
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH3) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h3LineHeight = lineHeightMultiple/fontScaleH3;
      } 
    } while (lineHeightMultiple < fontScaleH3);
    // H4
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH4) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h4LineHeight = lineHeightMultiple/fontScaleH4;
      } 
    } while (lineHeightMultiple < fontScaleH4);
    // H5
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH5) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h5LineHeight = lineHeightMultiple/fontScaleH5;
      } 
    } while (lineHeightMultiple < fontScaleH5);
    // H6
    lineHeightMultiple = 0;
    lineHeightCounter = 1;
    do {
      lineHeightMultiple = lineHeightSetting * lineHeightCounter;
      if (lineHeightMultiple < fontScaleH6) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        h6LineHeight = lineHeightMultiple/fontScaleH6;
      } 
    } while (lineHeightMultiple < fontScaleH6);
    // Load the file and replace the placeholders with the computed values
    return src(destPath + '/hydrogen/core.scss')
      .pipe(
        replace(
          '$H2LINEHEIGHTH6',
          h6LineHeight
        )
      )
      .pipe(
        replace(
          '$H2LINEHEIGHTH5',
          h5LineHeight
        )
      )
      .pipe(
        replace(
          '$H2LINEHEIGHTH4',
          h4LineHeight
        )
      )
      .pipe(
        replace(
          '$H2LINEHEIGHTH3',
          h3LineHeight
        )
      )
      .pipe(
        replace(
          '$H2LINEHEIGHTH2',
          h2LineHeight
        )
      )
      .pipe(
        replace(
          '$H2LINEHEIGHTH1',
          h1LineHeight
        )
      )
      .pipe(dest(destPath + '/hydrogen'));
  } catch(err) {
    return err;
  }
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
  return src(path.resolve(__dirname, '../../styles/maps/_map-font-families.scss'))
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

// Export the utility's scripts for use
module.exports = {
  setFontScaleVariables,
  setHeadingLineHeights,
  setFontFaceCSS,
  setFontFamilyMap,
  setFontBaseSize,
  setCoreFontScale,
  setUtilityFontScale,
};
