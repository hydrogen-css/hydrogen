// Hydrogen.css / Development Scripts

"use strict";

// Requirements
const { series } = require('gulp');
const importDevInit = require('./lib/scripts/tests/init');
const importDevCompile = require('./lib/scripts/tests/compile');
const importDevWatch = require('./lib/scripts/tests/watch');
const importDevBuild = require('./lib/scripts/tests/build');

// Exports
  // Init
  exports.devInit = series(importDevInit.init);
  // Compile
  exports.devCompile = series(importDevCompile.compile);
  // Watch
  // exports.devWatch = series(importDevWatch.watch);
  // Build
  exports.devBuild = series(importDevBuild.build);