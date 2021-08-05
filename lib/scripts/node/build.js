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
var { cleanH2, cleanH2Cache, createH2Cache, cacheH2Core, cacheStaticMaps, cacheH2Build, cacheH2Partials, compileCore, compileUtility, compressCore, preCleanCompress, postCleanCompress, deleteCache } = require('../functions/core');

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
  return cleanH2('prod');
}
function devCleanH2Cache() {
  return cleanH2Cache('prod');
}
function devCreateH2Cache() {
  return createH2Cache('prod');
}
function devCacheH2Core() {
  console.log('H2', '[WORKING]'.blue, 'Caching files...');
  return cacheH2Core('prod');
}
function devCacheStaticMaps() {
  return cacheStaticMaps('prod');
}
function devCacheH2Build() {
  return cacheH2Build('prod', 'build');
}
function devCacheH2Partials() {
  return cacheH2Partials('prod');
}
function devSetMediaMap() {
  console.log('H2', '[WORKING]'.blue, 'Creating style maps from the config...');
  return setMediaMap('prod');
}
function devSetColorMap() {
  return setColorMap('prod');
}
function devSetBorderWeightMap() {
  return setBorderWeightMap('prod');
}
function devSetContainerMap() {
  return setContainerMap('prod');
}
function devSetFontFamilyMap() {
  return setFontFamilyMap('prod');
}
function devSetFontBaseSize() {
  return setFontBaseSize('prod');
}
function devSetCoreFontScale() {
  return setCoreFontScale('prod');
}
function devSetUtilityFontScale() {
  return setUtilityFontScale('prod', 'build');
}
function devSetGradientMap() {
  return setGradientMap('prod');
}
function devSetRadiusMap() {
  return setRadiusMap('prod');
}
function devSetShadowMap() {
  return setShadowMap('prod');
}
function devSetWhitespaceVariable() {
  return setWhitespaceVariable('prod');
}
function devSetWhitespaceMap() {
  return setWhitespaceMap('prod');
}
function devSetWidthMap() {
  return setWidthMap('prod');
}
function devCompileCore() {
  console.log('H2', '[WORKING]'.blue, 'Compiling Sass...');
  return compileCore('prod');
}
function devCompileUtility() {
  return compileUtility('prod', 'build');
}
function devCompressCore() {
  return compressCore('prod', 'build');
}
function devPreCleanCompress() {
  return preCleanCompress('prod', 'build');
}
function devCreateUserMarkup() {
  console.log('H2', '[WORKING]'.blue, 'Scraping code and building CSS...');
  return createUserMarkup('prod');
}
function devCreateCleanCSS() {
  return createCleanCSS('prod');
}
function devPostCleanCompress() {
  console.log('H2', '[WORKING]'.blue, 'Compressing final CSS...');
  return postCleanCompress('prod', 'build');
}
function devDeleteCache() {
  return deleteCache('prod', 'build');
}

// Success Message
function successMessage(done) {
  var defaults = loadH2Defaults('prod');
  var config = loadH2Config('prod');
  console.timeEnd('H2 ' + '[TIMELOG]'.magenta + ' Total build time was', 'buildTime');
  console.log('H2', '[SUCCESS]'.green, 'You\'ve successfully built a production version of Hydrogen in the ' + config.folders.styles.bold + '/'.bold + ' folder.');
  done();
}

// Exports
exports.build = series(
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
  devDeleteCache,
  successMessage
);