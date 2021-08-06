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
    var colorLightString = '"[light]' + color.key + '": color.scale(' + color.color + ', $lightness: 25%),';
    var colorDarkString = '"[dark]' + color.key + '": color.scale(' + color.color + ', $lightness: -15%, $saturation: -10%),';
    var colorOpacityString = '';
    if (color.opacity != null && color.opacity != undefined && color.opacity == true) {
      // console.log('Color:', color.key, 'has opacity set to true!');
      for (let opacity in colorOpacityMap) {
        colorOpacityString = colorOpacityString + '"' + color.key + opacity + '": color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '),';
        // console.log('Color Opacity String: ', colorOpacityString);
        colorOpacityString = colorOpacityString + '"[light]' + color.key + opacity + '": color.scale(color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '), $lightness: 25%),';
        colorOpacityString = colorOpacityString + '"[dark]' + color.key + opacity + '": color.scale(color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '), $lightness: -15%, $saturation: -10%),';
      }
    } else if (color.opacities != null && color.opacities != undefined && color.opacities != "[]") {
      // console.log(color.opacities);
      for (let opacity in color.opacities) {
        // console.log(color.key);
        // console.log(color.opacities[opacity]);
        if (color.opacities[opacity].includes('%')) {
          // console.log("the opacity has a percentage...");
          // console.log(parseFloat(color.opacities[opacity]) / 100.0);
          var decimal = parseFloat(color.opacities[opacity]) / 100.0;
          colorOpacityString = colorOpacityString + '"' + color.key + '[' + color.opacities[opacity] + ']": color.adjust(' + color.color + ', $alpha: ' + decimal + '),';
        } else {
          colorOpacityString = colorOpacityString + '"' + color.key + '[' + color.opacities[opacity] + ']": color.adjust(' + color.color + ', $alpha: ' + color.opacities[opacity] + '),';
        }
      }
    }
    colorMapStringContent = colorMapStringContent.concat(colorString).concat(colorLightString).concat(colorDarkString).concat(colorOpacityString);
  });
  var colorMap = colorMapStringStart + colorMapStringContent + colorMapStringEnd;
  // Pass the color map.
  return colorMap;
}

function setColorMap(env) {
  var defaults = loadH2Defaults(env);
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

module.exports = setColorMap;