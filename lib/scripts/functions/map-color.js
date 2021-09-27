// Hydrogen.css / Color Map Generation

// =============================================================================

"use strict";

// Requirements
const { series, parallel, src, dest, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
var colors = require('colors');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const del = require('del');
var footer = require('gulp-footer');
const fs = require('fs');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');

// Set the Sass compiler to Dart Sass.
sass.compiler = require('sass');

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// =============================================================================

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
  '[0]': '-1'
};

// Generate the variable list.
function loadColorVariables(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var colorVariables = '// Colors\n';
  var colorSettings;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.colors != null && config.colors != undefined && config.colors.length > 0) {
    colorSettings = config.colors;
  } else {
    colorSettings = defaults.colors;
  }
  // Loop through each option and build the list.
  colorSettings.forEach(function(color) {
    var colorVariable = '$h2-color-' + color.key + ': ' + color.color + ';\n';
    colorVariables = colorVariables.concat(colorVariable);
    // console.log(colorVariables);
    var colorVariantVariables = '';
    if (color.variants && color.variants.enabled != 'false') {
      if (color.variants.light) {
        colorVariantVariables = colorVariantVariables.concat('$h2-color-' + color.key + '-light: ' + color.variants.light + ';\n');
      } else {
        colorVariantVariables = colorVariantVariables.concat('$h2-color-' + color.key + '-light: ' + 'color.scale(' + color.color + ', $lightness: 25%)' + ';\n');
      }
      if (color.variants.dark) {
        colorVariantVariables = colorVariantVariables.concat('$h2-color-' + color.key + '-dark: ' + color.variants.dark + ';\n');
      } else {
        colorVariantVariables = colorVariantVariables.concat('$h2-color-' + color.key + '-dark: ' + 'color.scale(' + color.color + ', $lightness: -15%, $saturation: -10%)' + ';\n');
      }
    }
    // console.log(colorVariables);
    colorVariables = colorVariables.concat(colorVariantVariables);
    // var colorOpacityVariables = '';
    // if (color.opacities != null && color.opacities != undefined && color.opacities != "[]") {

    // }
    // colorVariables = colorVariables.concat(colorOpacityVariables);
  });
  // Return the variable set.
  return colorVariables;
}

// Set the variables in the variable file.
function setColorVariables(env) {
  var config = loadH2Config(env);
  var colorVars = loadColorVariables(env);
  if (env == "dev") {
    return src('./lib/stage/' + config.folders.styles + '/hydrogen-variables.scss')
      .pipe(footer(colorVars))
      .pipe(dest('./lib/stage/' + config.folders.styles));
  } else if (env == "prod") {
    return src('./' + config.folders.styles + '/hydrogen-variables.scss')
      .pipe(footer(colorVars))
      .pipe(dest('./' + config.folders.styles));
  }
}

function loadColorMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create string.
  var colorMapStringStart = '@use "sass:color"; $h2-map-color: (';
  var colorMapStringContent = '';
  var colorMapStringEnd = ');';
  var colorConfig;
  // Check to see if the user has set color options, and if not, load the defaults.
  if (config.colors != null && config.colors != undefined && config.colors.length > 0) {
    colorConfig = config.colors;
  } else {
    colorConfig = defaults.colors;
  }
  // Loop through available colors and create the color map.
  colorConfig.forEach(function(color) {

    var colorString = '"' + color.key + '": ' + color.color + ',';

    var colorLightString = "";
    var colorDarkString = "";
    if (color.variants) {
      if (color.variants.enabled && color.variants.enabled == 'false') {
        // The user has disabled variants entirely.
      } else {
        if (color.variants.light) {
          // They've set their own light value, so use it.
          colorLightString = '"[light]' + color.key + '":' + color.variants.light + ',';
        } else {  
          // They're using variants, but not this one, so set the default variant.
          colorLightString = '"[light]' + color.key + '": color.scale(' + color.color + ', $lightness: 25%),';
        }
        if (color.variants.dark) {
          // They've set their own dark value, so use it.
          colorDarkString = '"[dark]' + color.key + '":' + color.variants.dark + ',';
        } else {  
          // They're using variants, but not this one, so set the default variant.
          colorDarkString = '"[dark]' + color.key + '": color.scale(' + color.color + ', $lightness: -15%, $saturation: -10%),';
        }
      }
    } else {
      // The user is likely using legacy config syntax, so enable the original light/dark variants.
      colorLightString = '"[light]' + color.key + '": color.scale(' + color.color + ', $lightness: 25%),';
      colorDarkString = '"[dark]' + color.key + '": color.scale(' + color.color + ', $lightness: -15%, $saturation: -10%),';
    }

    var colorOpacityString = '';
    if (color.opacities != null && color.opacities != undefined && color.opacities != "[]") {
      // console.log(color.opacities);
      for (let opacity in color.opacities) {
        // console.log(color.key);
        // console.log(color.opacities[opacity]);
        var opacityValue = color.opacities[opacity];
        if (color.opacities[opacity].includes('%')) {
          opacityValue = parseFloat(color.opacities[opacity]) / 100.0;
        }
        colorOpacityString = colorOpacityString + '"' + color.key + '[' + color.opacities[opacity] + ']": rgba(' + color.color + ', ' + opacityValue + '),';
        // Create opacity options for the color's variants.
        if (color.variants) {
          if (color.variants.enabled && color.variants.enabled == 'false') {
            // The user has disabled variants entirely.
          } else {
            if (color.variants.light) {
              // They've set their own light value, so use it.
              colorOpacityString = colorOpacityString + '"[light]' + color.key + '[' + color.opacities[opacity] + ']": rgba(' + color.variants.light + ', ' + opacityValue + '),';
            } else {  
              // They're using variants, but not this one, so set the default variant.
              colorOpacityString = colorOpacityString + '"[light]' + color.key + '[' + color.opacities[opacity] + ']": color.scale(rgba(' + color.color + ', ' + opacityValue + '), $lightness: 25%),';
            }
            if (color.variants.dark) {
              // They've set their own dark value, so use it.
              colorDarkString = '"[dark]' + color.key + '":' + color.variants.dark + ',';
              colorOpacityString = colorOpacityString + '"[dark]' + color.key + '[' + color.opacities[opacity] + ']": rgba(' + color.variants.dark + ', ' + opacityValue + '),';
            } else {  
              // They're using variants, but not this one, so set the default variant.
              colorOpacityString = colorOpacityString + '"[dark]' + color.key + '[' + color.opacities[opacity] + ']": color.scale(rgba(' + color.color + ', ' + opacityValue + '), $lightness: -15%, $saturation: -10%),';
            }
          }
        } else {
          // The user is likely using legacy config syntax, so enable the original light/dark variants.
          colorOpacityString = colorOpacityString + '"[light]' + color.key + '[' + color.opacities[opacity] + ']": color.scale(rgba(' + color.color + ', ' + opacityValue + '), $lightness: 25%),';
          colorOpacityString = colorOpacityString + '"[dark]' + color.key + '[' + color.opacities[opacity] + ']": color.scale(rgba(' + color.color + ', ' + opacityValue + '), $lightness: -15%, $saturation: -10%),';
        }
      }
    } else if (color.opacity != null && color.opacity != undefined && color.opacity == true) {
      // This is legacy support code.
      // console.log('Color:', color.key, 'has opacity set to true!');
      for (let opacity in colorOpacityMap) {
        colorOpacityString = colorOpacityString + '"' + color.key + opacity + '": color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '),';
        // console.log('Color Opacity String: ', colorOpacityString);
        colorOpacityString = colorOpacityString + '"[light]' + color.key + opacity + '": color.scale(color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '), $lightness: 25%),';
        colorOpacityString = colorOpacityString + '"[dark]' + color.key + opacity + '": color.scale(color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '), $lightness: -15%, $saturation: -10%),';
      }
    }
    colorMapStringContent = colorMapStringContent.concat(colorString).concat(colorLightString).concat(colorDarkString).concat(colorOpacityString);
  });
  var colorMap = colorMapStringStart + colorMapStringContent + colorMapStringEnd;
  // Pass the color map.
  return colorMap;
}

function setColorMap(env) {
  var config = loadH2Config(env);
  var colorMap = '';
  colorMap = loadColorMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-color.scss')
      .pipe(footer(colorMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-color.scss')
      .pipe(footer(colorMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

module.exports = {
  setColorVariables,
  setColorMap
}