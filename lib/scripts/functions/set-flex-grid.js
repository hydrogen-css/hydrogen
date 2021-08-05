// Hydrogen.css / Flex Grid Settings and Map Generation

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

// Determines if the the flexgrid has been enabled.
function getFlexgridStatus(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  if (config.flexgrid != null && config.flexgrid != undefined && config.flexgrid.enabled == true) {
    // console.log('Hydrogen: you\'ve successfully enabled flexgrid!');
    return true;
  } else {
    return false;
  }
}

// Gets the configured flexgrid column value.
function getFlexgridColumns(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  if (config.flexgrid != null && config.flexgrid != undefined && config.flexgrid.columns != null && config.flexgrid.columns != undefined) {
    // console.log('Hydrogen: you\'ve set a custom grid column value!');
    return config.flexgrid.columns;
  } else {
    return defaults.flexgrid.columns;
  }
}

module.exports = {
  getFlexgridStatus,
  getFlexgridColumns
}