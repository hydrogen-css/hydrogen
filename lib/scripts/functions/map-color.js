// Hydrogen.css / Color Map Generation

'use strict';

// Import Gulp and its dependencies
const { src, dest } = require('gulp');
const Color = require('color');
var footer = require('gulp-footer');

// ---

// Import Hydrogen's configuration scripts
var {
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Import Hydrogen's utility modules
var { createUniqueColorArray } = require('../functions/utility-generation');

// ---

// Set the utility's name values
var utilityConfigKey = 'colors';

// ---

// Default settings
var utilityDefaults = [];

// Legacy color-specific opacity map
// This opacity map is used to automatically generate an opacity scale; it has since been deprecated in favor of user-set opacity values
var colorOpacityMap = {
  '[1]': '1',
  '[.9]': '-.1',
  '[.8]': '-.2',
  '[.7]': '-.3',
  '[.6]': '-.4',
  '[.5]': '-.5',
  '[.4]': '-.6',
  '[.3]': '-.7',
  '[.2]': '-.8',
  '[.1]': '-.9',
  '[0]': '-1',
};

// Auto variation settings
var darkColorValue = 40;
var lightColorValue = 80;

// ---

/**
 * Calls a custom utility array for colors and gradients to generate a unique list of variables for either CSS or Sass
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} format Either 'css' or 'sass'
 * @returns {string} Returns a string of usable variables that are to be appended to the final variable file
 */
function setColorVariables(env, format) {
  try {
    // To do: create a centralized, custom utility array script for colors and gradients that detects and removes duplicates.
    var colorSettings = createUniqueColorArray(
      env,
      'vars',
      utilityConfigKey,
      utilityDefaults
    );
    var colorVariables = '/* Colors */\n';
    // Set the variable prefix depending on the format requested
    var formatPrefix = '';
    if (format == 'css') {
      formatPrefix = '--';
    } else if (format == 'sass') {
      formatPrefix = '$';
    } else {
      throw "You haven't specified a format for your variable export.";
    }
    // Loop through each color setting and build the list
    colorSettings.forEach(function (color) {
      // Set and add the default color variable
      var colorVariable =
        formatPrefix + 'h2-color-' + color.key + ': ' + color.color + ';\n';
      colorVariables = colorVariables.concat(colorVariable);
      // Check for color variants
      // Note that variable exports only support the new variant syntax
      var colorVariantVariables = '';
      // Check to see if the user has enabled variants for this color
      if (
        color.variants &&
        color.variants.enabled != 'false' &&
        color.variants.enabled != false
      ) {
        // Check to see if the user has defined a light variant
        if (color.variants.light) {
          // Use their definition
          colorVariantVariables = colorVariantVariables.concat(
            formatPrefix +
              'h2-color-' +
              color.key +
              '-light: ' +
              color.variants.light +
              ';\n'
          );
        } else {
          // Create the color variant
          var newLightColor = Color(color.color)
            .lightness(lightColorValue)
            .rgb();
          // Set the generated definition
          colorVariantVariables = colorVariantVariables.concat(
            formatPrefix +
              'h2-color-' +
              color.key +
              '-light: ' +
              newLightColor +
              ';\n'
          );
        }
        // Check to see if the user has defined a dark variant
        if (color.variants.dark) {
          // Use their definition
          colorVariantVariables = colorVariantVariables.concat(
            formatPrefix +
              'h2-color-' +
              color.key +
              '-dark: ' +
              color.variants.dark +
              ';\n'
          );
        } else {
          // Create the color variant
          var newDarkColor = Color(color.color).lightness(darkColorValue).rgb();
          // Set the generated definition
          colorVariantVariables = colorVariantVariables.concat(
            formatPrefix +
              'h2-color-' +
              color.key +
              '-dark: ' +
              newDarkColor +
              ';\n'
          );
        }
      }
      // Add the variant variables to the list
      colorVariables = colorVariables.concat(colorVariantVariables);
    });
    // Return the variable set
    return colorVariables;
  } catch (err) {
    return err;
  }
}

// ---

function loadColorMap(env) {
  // Create string.
  var colorMapStringStart = '@use "sass:color"; $h2-map-color: (';
  var colorMapStringContent = '';
  var colorMapStringEnd = ');';
  var colorSettings = createUniqueColorArray(
    env,
    'maps',
    utilityConfigKey,
    utilityDefaults
  );
  // Loop through available colors and create the color map.
  colorSettings.forEach(function (color) {
    var colorString = '"' + color.key + '": ' + color.color + ',';

    var colorLightString = '';
    var colorDarkString = '';
    if (color.variants) {
      if (
        (color.variants.enabled && color.variants.enabled == 'false') ||
        (color.variants.enabled && color.variants.enabled == false)
      ) {
        // The user has disabled variants entirely.
      } else {
        if (color.variants.light) {
          // They've set their own light value, so use it.
          colorLightString =
            '"[light]' + color.key + '":' + color.variants.light + ',';
        } else {
          // Create the color variant
          var newLightColor = Color(color.color)
            .lightness(lightColorValue)
            .rgb();
          // Set the generated definition
          colorLightString =
            '"[light]' + color.key + '": ' + newLightColor + ',';
        }
        if (color.variants.dark) {
          // They've set their own dark value, so use it.
          colorDarkString =
            '"[dark]' + color.key + '":' + color.variants.dark + ',';
        } else {
          // Create the color variant
          var newDarkColor = Color(color.color).lightness(darkColorValue).rgb();
          // Set the generated definition
          colorDarkString = '"[dark]' + color.key + '": ' + newDarkColor + ',';
        }
      }
    } else {
      // The user is likely using legacy config syntax, so enable the original light/dark variants.
      // Create the color variant
      var newLightColor = Color(color.color).lightness(lightColorValue).rgb();
      colorLightString = '"[light]' + color.key + '": ' + newLightColor + ',';
      // Create the color variant
      var newDarkColor = Color(color.color).lightness(darkColorValue).rgb();
      colorDarkString = '"[dark]' + color.key + '": ' + newDarkColor + ',';
    }

    var colorOpacityString = '';
    if (
      color.opacities != null &&
      color.opacities != undefined &&
      color.opacities != '[]'
    ) {
      for (let opacity in color.opacities) {
        var opacityValue = color.opacities[opacity];
        if (color.opacities[opacity].includes('%')) {
          opacityValue = parseFloat(color.opacities[opacity]) / 100.0;
        }
        colorOpacityString =
          colorOpacityString +
          '"' +
          color.key +
          '[' +
          color.opacities[opacity] +
          ']": rgba(' +
          color.color +
          ', ' +
          opacityValue +
          '),';
        // Create opacity options for the color's variants.
        if (color.variants) {
          if (
            (color.variants.enabled && color.variants.enabled == 'false') ||
            (color.variants.enabled && color.variants.enabled == false)
          ) {
            // The user has disabled variants entirely.
          } else {
            if (color.variants.light) {
              // They've set their own light value, so use it.
              colorOpacityString =
                colorOpacityString +
                '"[light]' +
                color.key +
                '[' +
                color.opacities[opacity] +
                ']": rgba(' +
                color.variants.light +
                ', ' +
                opacityValue +
                '),';
            } else {
              // They're using variants, but not this one, so set the default variant.
              // Create the color variant
              var newLightColor = Color(color.color)
                .lightness(lightColorValue)
                .rgb();
              // Set the value
              colorOpacityString =
                colorOpacityString +
                '"[light]' +
                color.key +
                '[' +
                color.opacities[opacity] +
                ']": rgba(' +
                newLightColor +
                ', ' +
                opacityValue +
                '),';
            }
            if (color.variants.dark) {
              // They've set their own dark value, so use it.
              colorDarkString =
                '"[dark]' + color.key + '":' + color.variants.dark + ',';
              colorOpacityString =
                colorOpacityString +
                '"[dark]' +
                color.key +
                '[' +
                color.opacities[opacity] +
                ']": rgba(' +
                color.variants.dark +
                ', ' +
                opacityValue +
                '),';
            } else {
              // They're using variants, but not this one, so set the default variant.
              // Create the color variant
              var newDarkColor = Color(color.color)
                .lightness(darkColorValue)
                .rgb();
              // Set the value
              colorOpacityString =
                colorOpacityString +
                '"[dark]' +
                color.key +
                '[' +
                color.opacities[opacity] +
                ']": rgba(' +
                newDarkColor +
                ', ' +
                opacityValue +
                '),';
            }
          }
        } else {
          // The user is likely using legacy config syntax, so enable the original light/dark variants.
          // Create the color variant
          var newLightColor = Color(color.color)
            .lightness(lightColorValue)
            .rgb();
          colorOpacityString =
            colorOpacityString +
            '"[light]' +
            color.key +
            '[' +
            color.opacities[opacity] +
            ']": rgba(' +
            newLightColor +
            ', ' +
            opacityValue +
            '),';
          // Create the color variant
          var newDarkColor = Color(color.color).lightness(darkColorValue).rgb();
          colorOpacityString =
            colorOpacityString +
            '"[dark]' +
            color.key +
            '[' +
            color.opacities[opacity] +
            ']": rgba(' +
            newDarkColor +
            ', ' +
            opacityValue +
            '),';
        }
      }
    } else if (
      color.opacity != null &&
      color.opacity != undefined &&
      color.opacity == true
    ) {
      // This is legacy support code.
      // console.log('Color:', color.key, 'has opacity set to true!');
      for (let opacity in colorOpacityMap) {
        colorOpacityString =
          colorOpacityString +
          '"' +
          color.key +
          opacity +
          '": color.adjust(' +
          color.color +
          ', $alpha: ' +
          colorOpacityMap[opacity] +
          '),';
        // console.log('Color Opacity String: ', colorOpacityString);
        // Create the color variant
        var newLightColor = Color(color.color).lightness(lightColorValue).rgb();
        colorOpacityString =
          colorOpacityString +
          '"[light]' +
          color.key +
          opacity +
          '": color.adjust(' +
          newLightColor +
          ', $alpha: ' +
          colorOpacityMap[opacity] +
          '),';
        // Create the color variant
        var newDarkColor = Color(color.color).lightness(darkColorValue).rgb();
        colorOpacityString =
          colorOpacityString +
          '"[dark]' +
          color.key +
          opacity +
          '": color.adjust(' +
          newDarkColor +
          ', $alpha: ' +
          colorOpacityMap[opacity] +
          '),';
      }
    }
    colorMapStringContent = colorMapStringContent
      .concat(colorString)
      .concat(colorLightString)
      .concat(colorDarkString)
      .concat(colorOpacityString);
  });
  var colorMap =
    colorMapStringStart + colorMapStringContent + colorMapStringEnd;
  // Pass the color map.
  return colorMap;
}

// ---

/**
 * Generate the utility Sass map
 * @param {string} env Either 'dev' or 'prod'
 * @returns Gulp src() - the utility's Sass map file
 */
function setColorMap(env) {
  var sourceDir = getH2SourcePath(env);
  var destRoot = getH2DestinationPath(env);
  var outputDir = getH2OutputDirectory(env);
  var destPath = destRoot + outputDir;
  var colorMap = loadColorMap(env);
  return src(sourceDir + 'lib/styles/maps/_map-color.scss')
    .pipe(footer(colorMap))
    .pipe(dest(destPath + '/hydrogen/maps'));
}

// Export the utility's scripts for use
module.exports = {
  setColorVariables,
  setColorMap,
};
