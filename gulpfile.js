"use strict";

const { series, parallel, src, dest, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
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

// Load Hydrogen Core Scripts
const { cleanH2, cleanH2Cache, createH2Cache, cacheH2Core, cacheH2Utility, compileCore, compileUtility } = require('./lib/scripts/functions/core');

// Load Hydrogen Modules
var setMediaMap = require('./lib/scripts/functions/map-media');
var setColorMap = require('./lib/scripts/functions/map-color');
var setBorderWeightMap = require('./lib/scripts/functions/map-border-weight');
var setContainerMap = require('./lib/scripts/functions/map-containers');
var { moveFlexgridCore, enableFlexgridCore, moveFlexgrid, enableFlexgrid } = require('./lib/scripts/functions/set-flex-grid');
var { setFontFaceCSS, setFontFamilyMap, setFontBaseSize, setCoreFontScale, setUtilityFontScale } = require('./lib/scripts/functions/set-fonts');
var setGradientMap = require('./lib/scripts/functions/map-gradients');
var setRadiusMap = require('./lib/scripts/functions/map-radius');
var setShadowMap = require('./lib/scripts/functions/map-shadows');
var { setWhitespaceVariable, setWhitespaceMap } = require('./lib/scripts/functions/map-whitespace');
var buildDevCSS = require('./lib/scripts/functions/build-development-css');
var createCleanCSS = require('./lib/scripts/functions/clean-css');

// Load the config files.
var defaults;
var config;

function loadConfig(done) {
  console.time('Compile Time');
  // Reset the variables.
  defaults = undefined;
  config = undefined;
  // Import the default JSON config file.
  defaults = JSON.parse(fs.readFileSync('./lib/hydrogen.default.json'));
  // Import the user's JSON config file.
  config = JSON.parse(fs.readFileSync('./lib/stage/hydrogen.config.json'));
  done();
}

// Build the development CSS file.

function createDevelopmentCSS(done) {
  var fontFaceCSS = setFontFaceCSS(config, defaults);
  // Build the CSS.
  buildDevCSS(config, fontFaceCSS);
  // Signal completion.
  done();
}

// Compress
function compressCore() {
  return src('./' + config.folders.styles + '/hydrogen/compiled/core.css')
    .pipe(postcss([cssnano()]))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/compressed'));
}

function preCleanCompress() {
  return src('./' + config.folders.styles + '/hydrogen/compiled/utility.css')
    .pipe(postcss([cssnano({
      preset: ['lite']
    })]))
    .pipe(dest('./' + config.folders.styles + '/hydrogen/compressed'));
}

// Get Markup

var markupArray = [];

function getUserMarkup(done) {
  if (Array.isArray(config.folders.markup) == true) {
    config.folders.markup.forEach(function(path, index, array) {
      markupArray = markupArray.concat('./' + path + '/**/*');
    });
    // console.log(markupString);
    // console.timeLog('Compile Time');
    done();
  } else {
    markupArray = markupArray.concat('./' + config.folders.markup + '/**/*');
    // console.timeLog('Compile Time');
    done();
  }
}

function createUserMarkup() {
  return src(markupArray)
  // return src(['./lib/stage/markup/**/*', './lib/stage/multimarkup/**/*'])
    .pipe(concat('markup.txt'))
    // This destination will have to be the CSS folder the user specifies.
    .pipe(dest('./' + config.folders.styles + '/hydrogen/markup'));
}

function cleanUserMarkup() {
  return del('./' + config.folders.styles + '/hydrogen/markup/**/*');
}

function cleanCleanedFolder() {
  return del('./' + config.folders.styles + '/hydrogen/cleaned');
}

// Compress
function postCleanCompress() {
  return src('./' + config.folders.styles + '/hydrogen/cleaned/hydrogen.css')
    .pipe(postcss([cssnano()]))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(dest('./' + config.folders.styles));
}

function watchSuccessMessage(done) {
  // console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - ");
  console.log('[WATCHING]'.blue, 'Hydrogen: you\'ve successfully compiled Hydrogen. We\'re now watching for changes to your configuration file and markup.');
  console.timeEnd('Compile Time');
  done();
}

function compileSuccessMessage(done) {
  console.log('[SUCCESS]'.green, 'Hydrogen: you\'ve successfully compiled a development version of Hydrogen in the ' + config.folders.styles.green + '/'.green + ' folder.');
  done();
}

function buildSuccessMessage(done) {
  console.log('[SUCCESS]'.green, 'Hydrogen: you\'ve successfully built a production version of Hydrogen in the ' + config.folders.styles.green + '/'.green + ' folder.');
  done();
}

function watchCleanStartMessage(done) {
  console.log('[WORKING]'.blue, 'Hydrogen: we noticed some changes, so we\'re compiling...');
  done();
}

// Generic Tasks
const buildScripts = series(
  loadConfig, 
  cleanH2(config),
  cleanH2Cache(config), 
  createH2Cache(config), 
  cacheH2Core(config, "dev"), 
  cacheH2Utility(config, "dev"), 
  cacheH2Partials(config, "dev"),
  setMediaMap(defaults, config, "dev"), 
  setColorMap(defaults, config, "dev"), 
  setBorderWeightMap(defaults, config, "dev"), 
  setContainerMap(defaults, config, "dev"), 
  moveFlexgridCore(defaults, config, "dev"), 
  enableFlexgridCore(defaults, config, "dev"), 
  moveFlexgrid(defaults, config, "dev"), 
  enableFlexgrid(defaults, config, "dev"), 
  setFontFamilyMap(defaults, config, "dev"), 
  setFontBaseSize(defaults, config), 
  setCoreFontScale(defaults, config), 
  setUtilityFontScale(defaults, config, "build"), 
  setGradientMap(defaults, config, "dev"), 
  setRadiusMap(defaults, config, "dev"), 
  setShadowMap(defaults, config, "dev"), 
  setWhitespaceVariable(defaults, config), 
  setWhitespaceMap(defaults, config, "dev"), 
  compileCore(defaults, config), 
  compileUtility(defaults, config),
  compressCore, 
  preCleanCompress, 
  getUserMarkup, createUserMarkup,
  createCleanCSS (defaults, config), 
  postCleanCompress
)

const devWatchCleanSeries = series(
  watchCleanStartMessage,
  cleanUserMarkup,
  cleanCleanedFolder,
  getUserMarkup, createUserMarkup,
  createCleanCSS, 
  postCleanCompress,
  watchSuccessMessage
);

// Dev Prep Task
const devWatchSeries = series(
  buildScripts,
  createDevelopmentCSS,
  watchSuccessMessage
);

exports.compile = series(devWatchSeries, compileSuccessMessage);

// Watch the config files for changes.
function devWatchConfig() {
  watch('./lib/stage/hydrogen.config.json', series(devWatchSeries));
  var watchMarkupArray = [];
  function getWatchUserMarkup() {
    if (Array.isArray(config.folders.markup) == true) {
      config.folders.markup.forEach(function(path, index, array) {
        watchMarkupArray = watchMarkupArray.concat('./' + path + '/**/*');
      });
    } else {
      watchMarkupArray = watchMarkupArray.concat('./' + config.folders.markup + '/**/*');
    }
  }
  getWatchUserMarkup();
  // console.log(watchMarkupArray);
  watch(watchMarkupArray, series(devWatchCleanSeries));
}

exports.watch = series(
  devWatchSeries,
  parallel(devWatchConfig)
);

exports.build = series(
  buildScripts, 
  buildSuccessMessage
);