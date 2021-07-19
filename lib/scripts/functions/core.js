// Hydrogen.css / Core Scripts

// =============================================================================

"use strict";

// Requirements
const { series, parallel, src, dest, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
var colors = require('colors');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
var del = require('del');
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

// Clean Hydrogen.css.
function cleanH2(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  return del('./' + config.folders.styles + '/hydrogen.css');
}

// Remove the Hydrogen cache folder.
function cleanH2Cache(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  return del('./' + config.folders.styles + '/hydrogen', {force: true});
}

// Create the Hydrogen cache folder.
async function createH2Cache(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  if (fs.existsSync('./' + config.folders.styles + '/hydrogen') == true) {

  } else {
    fs.mkdirSync('./' + config.folders.styles + '/hydrogen');
  }
  await Promise.resolve('done?');
}

// Cache Hydrogen's files. These functions are passed a parameter than indicates whether the function is being called for Hydrogen's test stage, or production. Caching Hydrogen during the build process is required because the script needs to update the same cache file over and over to ensure changes to the file persist.
function cacheH2Core(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  if (env == "dev") {
    return src('./lib/styles/core.scss')
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/core.scss')
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
  }
}

function cacheH2Utility(env, task) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  if (env == "dev") {
    if (task == "compile") {
      return src('./lib/styles/compile.scss')
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    } else if (task == "build") {
      return src('./lib/styles/utility.scss')
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    }
  } else if (env == "prod") {
    if (task == "compile") {
      return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/compile.scss')
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    } else if (task == "build") {
      return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utility.scss')
      .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    }
  }
}

function cacheH2Partials(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  if (env == "dev") {
    return src([
      './lib/styles/utilities/_utility-align-content.scss',
      './lib/styles/utilities/_utility-align-items.scss',
      './lib/styles/utilities/_utility-align-self.scss',
      './lib/styles/utilities/_utility-bg-color.scss',
      './lib/styles/utilities/_utility-border.scss',
      './lib/styles/utilities/_utility-container.scss',
      './lib/styles/utilities/_utility-display.scss',
      './lib/styles/utilities/_utility-flex-direction.scss',
      './lib/styles/utilities/_utility-flex-wrap.scss',
      './lib/styles/utilities/_utility-font-color.scss',
      './lib/styles/utilities/_utility-font-family.scss',
      './lib/styles/utilities/_utility-font-size.scss',
      './lib/styles/utilities/_utility-font-style.scss',
      './lib/styles/utilities/_utility-font-weight.scss',
      './lib/styles/utilities/_utility-justify-content.scss',
      './lib/styles/utilities/_utility-location.scss',
      './lib/styles/utilities/_utility-margin.scss',
      './lib/styles/utilities/_utility-overflow.scss',
      './lib/styles/utilities/_utility-padding.scss',
      './lib/styles/utilities/_utility-position.scss',
      './lib/styles/utilities/_utility-radius.scss',
      './lib/styles/utilities/_utility-shadow.scss',
      './lib/styles/utilities/_utility-text-align.scss',
      './lib/styles/utilities/_utility-visibility.scss'
    ])
      .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
  } else if (env == "prod") {
    return src([
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-align-content.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-align-items.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-align-self.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-bg-color.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-border.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-container.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-display.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-flex-direction.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-flex-wrap.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-font-color.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-font-family.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-font-size.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-font-style.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-font-weight.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-justify-content.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-location.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-margin.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-overflow.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-padding.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-position.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-radius.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-shadow.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-text-align.scss',
      './node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-visibility.scss'
    ])
      .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
  }
}

// Compile
function compileCore(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  return src('./' + config.folders.styles + '/hydrogen/core.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/compiled'));
}

function compileUtility(env, task) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  console.timeEnd('Hydrogen: Sass Compile Time');
  if (task == 'build') {
    return src('./' + config.folders.styles + '/hydrogen/utility.scss')
      .pipe(sass())
      .pipe(postcss([ autoprefixer() ]))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/compiled'));
  } else if (task == 'compile') {
    return src('./' + config.folders.styles + '/hydrogen/compile.scss')
      .pipe(sass())
      .pipe(postcss([ autoprefixer() ]))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/compiled'));
  }
}

// Compress
function compressCore(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  return src('./' + config.folders.styles + '/hydrogen/compiled/core.css')
    .pipe(postcss([cssnano()]))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/compressed'));
}

function preCleanCompress(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  return src('./' + config.folders.styles + '/hydrogen/compiled/utility.css')
    .pipe(postcss([cssnano({
      preset: ['lite']
    })]))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/compressed'));
}

// Compress
function postCleanCompress(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  return src('./' + config.folders.styles + '/hydrogen/cleaned/hydrogen.css')
    .pipe(postcss([cssnano()]))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(dest('./' + config.folders.styles));
}

function cleanCleanedFolder(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  return del('./' + config.folders.styles + '/hydrogen/cleaned');
}

module.exports = {
  cleanH2,
  cleanH2Cache,
  createH2Cache,
  cacheH2Core,
  cacheH2Utility,
  cacheH2Partials,
  compileCore,
  compileUtility,
  compressCore,
  preCleanCompress,
  postCleanCompress,
  cleanCleanedFolder
};