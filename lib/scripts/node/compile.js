// Hydrogen.css / Production Compile Script

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
var { cleanH2, cleanH2Cache, createH2Cache, cacheH2Core, cacheStaticMaps, cacheH2Build, cacheH2Partials, compileCore, compileUtility, compressCompiledLibrary, deleteCache } = require('../functions/core');

// Load Hydrogen Modules
var { setMediaMap } = require('../functions/map-media');
var setColorMap = require('../functions/map-color');
var setBorderWeightMap = require('../functions/map-border-weight');
var setContainerMap = require('../functions/map-containers');
var { setFontFamilyMap, setFontBaseSize, setCoreFontScale, setUtilityFontScale } = require('../functions/set-fonts');
var setGradientMap = require('../functions/map-gradients');
var setOpacityMap = require('../functions/map-opacity');
var setRadiusMap = require('../functions/map-radius');
var setShadowMap = require('../functions/map-shadows');
var { setWhitespaceVariable, setWhitespaceMap } = require('../functions/map-whitespace');
var setWidthMap = require('../functions/map-widths');
var buildDevCSS = require('../functions/build-development-css');

// =============================================================================

// Start Message
function compileStartMessage(done) {
  console.time('H2 ' + '[TIMELOG]'.magenta + ' Total build time was', 'buildTime');
  console.log('H2', '[WORKING]'.blue, 'Compiling the entire library...');
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
  return cacheH2Build('prod', 'compile');
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
  return setUtilityFontScale('prod', 'compile');
}
function devSetGradientMap() {
  return setGradientMap('prod');
}
function devSetOpacityMap() {
  return setOpacityMap('prod');
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
  return compileUtility('prod', 'compile');
}
function devBuildDevCSS() {
  console.log('H2', '[WORKING]'.blue, 'Building the development CSS...');
  return buildDevCSS('prod');
}
function devCompressCompiledLibrary(){
  console.log('H2', '[WORKING]'.blue, 'Compressing the library...');
  return compressCompiledLibrary('prod');
}
function devDeleteCache() {
  return deleteCache('prod', 'compile');
}

// Success Message
function successMessage(done) {
  var defaults = loadH2Defaults('prod');
  var config = loadH2Config('prod');
  console.timeEnd('H2 ' + '[TIMELOG]'.magenta + ' Total build time was', 'buildTime');
  console.log('H2', '[SUCCESS]'.green, 'You\'ve successfully compiled a development version of Hydrogen in the ' + config.folders.styles.bold + '/'.bold + ' folder.');
  console.log('H2', '[WARNING]'.yellow, 'Please note that the full library should not be used in production. Please run npx h2-build to generate a production-ready file.');
  done();
}

// Exports
exports.compile = series(
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
  devSetOpacityMap,
  devSetRadiusMap, 
  devSetShadowMap, 
  devSetWhitespaceVariable, 
  devSetWhitespaceMap, 
  devSetWidthMap,
  devCompileCore, 
  devCompileUtility,
  devBuildDevCSS,
  devCompressCompiledLibrary,
  devDeleteCache,
  successMessage
);