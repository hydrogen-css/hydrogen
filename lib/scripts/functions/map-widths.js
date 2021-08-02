// Hydrogen.css / Width Map Generation

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

function loadWidthMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var widthMapStringStart = '$h2-map-width: ("auto": "auto",';
  var widthMapStringContent = '';
  var widthMapStringEnd = ');';
  var widthConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.widths != null && config.widths != undefined && config.widths.length > 0) {
    widthConfig = config.widths;
  } else {
    widthConfig = defaults.widths;
  }
  // Loop through each option and build the map.
  widthConfig.forEach(function(width) {
    var widthString = '"' + width.key + '": "' + width.value + '",';
    widthMapStringContent = widthMapStringContent.concat(widthString);
  });
  // Assemble the map.
  var widthMap = widthMapStringStart + widthMapStringContent + widthMapStringEnd;
  // Return the map.
  return widthMap;
}

function setWidthMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var widthMap = '';
  widthMap = loadWidthMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-width.scss')
      .pipe(footer(widthMap))
      .pipe(dest('./lib/stage/' + config.folders.styles + '/hydrogen/maps')); 
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-width.scss')
      .pipe(footer(widthMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

// Export the map function for use.
module.exports = setWidthMap;