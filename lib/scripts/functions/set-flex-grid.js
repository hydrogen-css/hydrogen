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
function setFlexgridConfig(env) {
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
function setFlexgridColumns(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  if (config.flexgrid != null && config.flexgrid != undefined && config.flexgrid.columns != null && config.flexgrid.columns != undefined) {
    // console.log('Hydrogen: you\'ve set a custom grid column value!');
    return config.flexgrid.columns;
  } else {
    return defaults.flexgrid.columns;
  }
}

// Move the flexgrid core file.
function moveFlexgridCore(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var flexgridEnabled = setFlexgridConfig(env);
  if (flexgridEnabled == true) {
    if (env == "dev") {
      return src('./lib/styles/utilities/_core-flex-grid.scss')
        .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
    } else if (env == "prod") {
      return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_core-flex-grid.scss')
        .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
    }
  }
}

// Modify the cached version of H2's core.
function enableFlexgridCore(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var flexgridEnabled = setFlexgridConfig(env);
  if (flexgridEnabled == true) {
    if (env == "dev") {
      return src('./' + config.folders.styles + '/hydrogen/core.scss')
        .pipe(replace('// @use "utilities/core-flex-grid";', '@use "utilities/core-flex-grid";'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    } else if (env == "prod") {
      return src('./' + config.folders.styles + '/hydrogen/core.scss')
        .pipe(replace('// @use "utilities/core-flex-grid";', '@use "utilities/core-flex-grid";'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    }
  }
}

// Move the flexgrid utility file.
function moveFlexgrid(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var flexgridEnabled = setFlexgridConfig(env);
  var flexgridColumns = setFlexgridColumns(env);
  if (flexgridEnabled == true) {
    if (env == "dev") {
      return src('./lib/styles/utilities/_utility-flex-grid.scss')
        // Set the column variable to the user's specification, or use the default.
        .pipe(replace('$h2GridColumns: 12;', '$h2GridColumns: ' + flexgridColumns + ';'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
    } else if (env == "prod") {
      return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-flex-grid.scss')
        // Set the column variable to the user's specification, or use the default.
        .pipe(replace('$h2GridColumns: 12;', '$h2GridColumns: ' + flexgridColumns + ';'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
    }
  }
}

// Modify the cached version of H2.
function enableFlexgrid(env, task) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var flexgridEnabled = setFlexgridConfig(env);
  if (flexgridEnabled == true) {
    if (task == "build") {
      return src('./' + config.folders.styles + '/hydrogen/utility.scss')
        .pipe(replace('// @use "utilities/utility-flex-grid" as flexGridStyles;', '@use "utilities/utility-flex-grid" as flexGridStyles;'))
        .pipe(replace('// @include flexGridStyles.h2-utility-flex-grid($mediaKey: "MEDIAKEY");', '@include flexGridStyles.h2-utility-flex-grid($mediaKey: "MEDIAKEY");'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    } else if (task == "compile") {
      return src('./' + config.folders.styles + '/hydrogen/compile.scss')
        .pipe(replace('// @use "utilities/utility-flex-grid" as flexGridStyles;', '@use "utilities/utility-flex-grid" as flexGridStyles;'))
        .pipe(replace('// @include flexGridStyles.h2-utility-flex-grid($mediaKey: $mediaKey);', '@include flexGridStyles.h2-utility-flex-grid($mediaKey: $mediaKey);'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    }
  }
}

module.exports = {
  moveFlexgridCore,
  enableFlexgridCore,
  moveFlexgrid,
  enableFlexgrid
}