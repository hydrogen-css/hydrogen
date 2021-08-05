// Hydrogen.css / Development Build Script

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

// Load Hydrogen Core Scripts
var { cleanH2, cleanH2Cache, createH2Cache, cacheH2Core, cacheStaticMaps, cacheH2Build, cacheH2Partials, compileCore, compileUtility, compressCore, preCleanCompress, postCleanCompress } = require('../functions/core');

// Load Hydrogen Modules
var { setMediaMap } = require('../functions/map-media');
var setColorMap = require('../functions/map-color');
var setBorderWeightMap = require('../functions/map-border-weight');
var setContainerMap = require('../functions/map-containers');
var { setFontFamilyMap, setFontBaseSize, setCoreFontScale, setUtilityFontScale } = require('../functions/set-fonts');
var setGradientMap = require('../functions/map-gradients');
var setRadiusMap = require('../functions/map-radius');
var setShadowMap = require('../functions/map-shadows');
var { setWhitespaceVariable, setWhitespaceMap } = require('../functions/map-whitespace');
var setWidthMap = require('../functions/map-widths');
var { createUserMarkup } = require('../functions/set-markup');
var createCleanCSS = require('../functions/clean-css');
const { config } = require('yargs');

// =============================================================================

// Start Message
function compileStartMessage(done) {
  console.time('H2 ' + '[TIMELOG]'.magenta + ' Total build time was', 'buildTime');
  console.log('H2', '[WORKING]'.blue, 'Building the production file...');
  done();
}

// NOTE: It's required to have these wrapper functions because there is some weird script order things happening with Gulp. Essentially, "loadH2Config" doesn't technically run until after the series, and so Gulp tries to run the series with the variables set to undefined and fails. By wrapping the functions with Gulp tasks, it includes them in the order properly, and so they receive the configs as expected. Not sure why this is... but it's necessary to include the loading of the config files inside its own function so that it can be called on things like watch.

function devCleanH2() {
  console.log('H2', '[WORKING]'.blue, 'Preparing workspace...');
  return cleanH2('dev');
}
function devCleanH2Cache() {
  return cleanH2Cache('dev');
}
function devCreateH2Cache() {
  return createH2Cache('dev');
}
function devCacheH2Core() {
  console.log('H2', '[WORKING]'.blue, 'Caching files...');
  return cacheH2Core('dev');
}
function devCacheStaticMaps() {
  return cacheStaticMaps('dev');
}
function devCacheH2Build() {
  return cacheH2Build('dev', 'build');
}
function devCacheH2Partials() {
  return cacheH2Partials('dev');
}
function devSetMediaMap() {
  console.log('H2', '[WORKING]'.blue, 'Creating style maps from the config...');
  return setMediaMap('dev');
}
function devSetColorMap() {
  return setColorMap('dev');
}
function devSetBorderWeightMap() {
  return setBorderWeightMap('dev');
}
function devSetContainerMap() {
  return setContainerMap('dev');
}
function devSetFontFamilyMap() {
  return setFontFamilyMap('dev');
}
function devSetFontBaseSize() {
  return setFontBaseSize('dev');
}
function devSetCoreFontScale() {
  return setCoreFontScale('dev');
}
function devSetUtilityFontScale() {
  return setUtilityFontScale('dev', 'build');
}
function devSetGradientMap() {
  return setGradientMap('dev');
}
function devSetRadiusMap() {
  return setRadiusMap('dev');
}
function devSetShadowMap() {
  return setShadowMap('dev');
}
function devSetWhitespaceVariable() {
  return setWhitespaceVariable('dev');
}
function devSetWhitespaceMap() {
  return setWhitespaceMap('dev');
}
function devSetWidthMap() {
  return setWidthMap('dev');
}
function devCompileCore() {
  console.log('H2', '[WORKING]'.blue, 'Compiling Sass...');
  return compileCore('dev');
}
function devCompileUtility() {
  return compileUtility('dev', 'build');
}
function devCompressCore() {
  return compressCore('dev', 'build');
}
function devPreCleanCompress() {
  return preCleanCompress('dev', 'build');
}
function devCreateUserMarkup() {
  console.log('H2', '[WORKING]'.blue, 'Scraping code and building CSS...');
  return createUserMarkup('dev');
}
function devCreateCleanCSS() {
  return createCleanCSS('dev');
}
function devPostCleanCompress() {
  console.log('H2', '[WORKING]'.blue, 'Compressing final CSS...');
  return postCleanCompress('dev', 'build');
}

// Success Message
function successMessage(done) {
  var defaults = loadH2Defaults('dev');
  var config = loadH2Config('dev');
  console.timeEnd('H2 ' + '[TIMELOG]'.magenta + ' Total build time was', 'buildTime');
  console.log('H2', '[SUCCESS]'.green, 'You\'ve successfully built a production version of Hydrogen in the ' + config.folders.styles.bold + '/'.bold + ' folder.');
  console.log('H2', '[WATCHING]'.rainbow, 'Hydrogen is now watching for changes to your code...');
  done();
}

// Watch Success Message
function watchSuccessMessage(done) {
  var defaults = loadH2Defaults('dev');
  var config = loadH2Config('dev');
  console.log('H2', '[SUCCESS]'.green, 'You\'ve successfully built a production version of Hydrogen in the ' + config.folders.styles.bold + '/'.bold + ' folder.');
  console.log('H2', '[WATCHING]'.rainbow, 'Hydrogen is now watching for changes to your code...');
  done();
}

const buildSeries = series(
  compileStartMessage, 
  devCleanH2,
  devCleanH2Cache,
  devCreateH2Cache,
  devCacheH2Core, 
  devCacheStaticMaps,
  devCacheH2Build, 
  devCacheH2Partials,
  devSetMediaMap, 
  devSetColorMap, 
  devSetBorderWeightMap, 
  devSetContainerMap, 
  devSetFontFamilyMap, 
  devSetFontBaseSize, 
  devSetCoreFontScale, 
  devSetUtilityFontScale, 
  devSetGradientMap, 
  devSetRadiusMap, 
  devSetShadowMap, 
  devSetWhitespaceVariable, 
  devSetWhitespaceMap, 
  devSetWidthMap,
  devCompileCore, 
  devCompileUtility,
  devCompressCore,
  devPreCleanCompress,
  devCreateUserMarkup,
  devCreateCleanCSS,
  devPostCleanCompress,
  successMessage
);

const watchSeries = series(
  devCreateUserMarkup,
  devCreateCleanCSS,
  devPostCleanCompress,
  watchSuccessMessage
);

// Watch the config files for changes.
function enableWatch() {
  var defaults = loadH2Defaults('dev');
  var config = loadH2Config('dev');
  watch(['./lib/stage/hydrogen.config.json'], series(buildSeries));
  var codeArray = [];
  function getWatchUserMarkup() {
    if (Array.isArray(config.folders.markup) == true) {
      config.folders.markup.forEach(function(path, index, array) {
        codeArray = codeArray.concat('./lib/stage/' + path + '/**/*');
      });
    } else {
      codeArray = codeArray.concat('./lib/stage/' + config.folders.markup + '/**/*');
    }
    if (Array.isArray(config.folders.scripts) == true) {
      config.folders.scripts.forEach(function(path, index, array) {
        codeArray = codeArray.concat('./lib/stage/' + path + '/**/*');
      });
    } else {
      codeArray = codeArray.concat('./lib/stage/' + config.folders.scripts + '/**/*');
    }
  }
  getWatchUserMarkup();
  // console.log(codeArray);
  watch(codeArray, series(
    watchSeries
  ));
}

exports.watch = series(
  buildSeries,
  parallel(enableWatch)
);