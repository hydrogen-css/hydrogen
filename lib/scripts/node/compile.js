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
var { cleanH2, cleanH2Cache, createH2Cache, cacheH2Core, cacheH2Utility, cacheH2Partials, compileCore, compileUtility, deleteCache } = require('../functions/core');

// Load Hydrogen Modules
var { setMediaMap } = require('../functions/map-media');
var setColorMap = require('../functions/map-color');
var setBorderWeightMap = require('../functions/map-border-weight');
var setContainerMap = require('../functions/map-containers');
var { moveFlexgridCore, enableFlexgridCore, moveFlexgrid, enableFlexgrid } = require('../functions/set-flex-grid');
var { setFontFamilyMap, setFontBaseSize, setCoreFontScale, setUtilityFontScale } = require('../functions/set-fonts');
var setGradientMap = require('../functions/map-gradients');
var setRadiusMap = require('../functions/map-radius');
var setShadowMap = require('../functions/map-shadows');
var { setWhitespaceVariable, setWhitespaceMap } = require('../functions/map-whitespace');
var setWidthMap = require('../functions/map-widths');
var buildDevCSS = require('../functions/build-development-css');

// =============================================================================

// Start Message
function compileStartMessage(done) {
  console.time('Hydrogen: Sass Compile Time');
  console.time('Hydrogen: Total Build Time');
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Compiling the library...');
  done();
}

// NOTE: It's required to have these wrapper functions because there is some weird script order things happening with Gulp. Essentially, "loadH2Config" doesn't technically run until after the series, and so Gulp tries to run the series with the variables set to undefined and fails. By wrapping the functions with Gulp tasks, it includes them in the order properly, and so they receive the configs as expected. Not sure why this is... but it's necessary to include the loading of the config files inside its own function so that it can be called on things like watch.

function devCleanH2() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Preparing workspace...');
  return cleanH2('prod');
}
function devCleanH2Cache() {
  return cleanH2Cache('prod');
}
function devCreateH2Cache() {
  return createH2Cache('prod');
}
function devCacheH2Core() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Caching files...');
  return cacheH2Core('prod');
}
function devCacheH2Utility() {
  return cacheH2Utility('prod', 'compile');
}
function devCacheH2Partials() {
  return cacheH2Partials('prod');
}
function devSetMediaMap() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Creating utility maps...');
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
function devMoveFlexgridCore() {
  return moveFlexgridCore('prod');
}
function devMoveFlexgrid() {
  return moveFlexgrid('prod');
}
function devEnableFlexgridCore() {
  return enableFlexgridCore('prod');
}
function devEnableFlexgrid() {
  return enableFlexgrid('prod', 'compile');
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
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Compiling Sass...');
  return compileCore('prod');
}
function devCompileUtility() {
  return compileUtility('prod', 'compile');
}
function devBuildDevCSS() {
  console.log('[WORKING]'.blue, 'Hydrogen: ⚙ Building development CSS...');
  return buildDevCSS('prod', 'compile');
}
function devDeleteCache() {
  return deleteCache('prod', 'compile');
}

// Success Message
function successMessage(done) {
  var defaults = loadH2Defaults('prod');
  var config = loadH2Config('prod');
  console.timeEnd('Hydrogen: Total Build Time');
  console.log('[SUCCESS]'.green, 'Hydrogen: you\'ve successfully compiled a development version of Hydrogen in the ' + config.folders.styles.green + '/'.green + ' folder.');
  done();
}

// Exports
exports.compile = series(
  compileStartMessage, 
  devCleanH2,
  devCleanH2Cache,
  devCreateH2Cache,
  devCacheH2Core, 
  devCacheH2Utility, 
  devCacheH2Partials,
  devSetMediaMap, 
  devSetColorMap, 
  devSetBorderWeightMap, 
  devSetContainerMap, 
  devMoveFlexgridCore, 
  devEnableFlexgridCore, 
  devMoveFlexgrid, 
  devEnableFlexgrid, 
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
  devBuildDevCSS,
  devDeleteCache,
  successMessage
);