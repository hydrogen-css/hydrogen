// Hydrogen.css / Development Scripts

"use strict";

// Requirements
const { series } = require('gulp');
const importDevInit = require('./lib/scripts/gulp/init');
const importDevCompile = require('./lib/scripts/gulp/compile');
const importDevWatch = require('./lib/scripts/gulp/watch');
const importDevBuild = require('./lib/scripts/gulp/build');

// Exports
  // Init
  // exports.devInit = series(importDevInit.init);
  // Compile
  exports.devCompile = series(importDevCompile.compile);
  // Watch
  // exports.devWatch = series(importDevWatch.watch);
  // Build
  exports.devBuild = series(importDevBuild.build);