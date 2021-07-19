// Hydrogen.css / Whitespace Map Generation

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

function loadWhitespaceMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  // Create the map string.
  var whitespaceMapStringStart = '$h2-map-whitespace: ("none": 0,';
  var whitespaceMapStringContent = '';
  var whitespaceMapStringEnd = ');';
  var whitespaceScaleConfig;
  // Check to see if the user has defined any options in their config, and if not, load the defaults.
  if (config.whitespaceScale != null && config.whitespaceScale != undefined && config.whitespaceScale.length > 0) {
    whitespaceScaleConfig = config.whitespaceScale;
  } else {
    whitespaceScaleConfig = defaults.whitespaceScale;
  }
  // Create the whitespace values.
  var smallest = '"xxs": ' + (1 / whitespaceScaleConfig) / whitespaceScaleConfig + 'rem,';
  var smaller = '"xs": ' + 1 / whitespaceScaleConfig + 'rem,';
  var small = '"s": 1rem,';
  var medium = '"m": ' + 1 * whitespaceScaleConfig + 'rem,';
  var large = '"l": ' + (1 * whitespaceScaleConfig) * whitespaceScaleConfig + 'rem,';
  var larger = '"xl": ' + ((1 * whitespaceScaleConfig) * whitespaceScaleConfig) * whitespaceScaleConfig + 'rem,';
  var largest = '"xxl": ' + (((1 * whitespaceScaleConfig) * whitespaceScaleConfig) * whitespaceScaleConfig) * whitespaceScaleConfig + 'rem,';
  whitespaceMapStringContent = whitespaceMapStringContent + smallest + smaller + small + medium + large + larger + largest;
  // Assemble the map.
  var whitespaceMap = whitespaceMapStringStart + whitespaceMapStringContent + whitespaceMapStringEnd;
  // Return the map.
  return whitespaceMap;
}

function setWhitespaceVariable(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  if (config.whitespaceScale != null && config.whitespaceScale != undefined && config.whitespaceScale.length > 0) {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-whitespace-scale: $H2WHITESPACESCALE;', '$h2-whitespace-scale: ' + config.whitespaceScale + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  } else {
    return src('./' + config.folders.styles + '/hydrogen/core.scss')
      .pipe(replace('$h2-whitespace-scale: $H2WHITESPACESCALE;', '$h2-whitespace-scale: ' + defaults.whitespaceScale + ';'))
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  }
}

function setWhitespaceMap(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var whitespaceMap = loadWhitespaceMap(env);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-whitespace.scss')
      .pipe(footer(whitespaceMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));  
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-whitespace.scss')
      .pipe(footer(whitespaceMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

module.exports = {
  setWhitespaceVariable,
  setWhitespaceMap
}