// Hydrogen: Build script

'use strict';

// Third party dependencies
var { argv } = require('process');

// Local dependencies
var { parseENV } = require('./scripts/parse-env');
var { loadSettings } = require('./scripts/load-settings');
var { buildHydrogen } = require('./scripts/build-hydrogen');
var { processCSS } = require('./scripts/process-css');

// Load settings
// Create input glob based on settings
// Loop through each file and store regex matches in an array
// Parse each match and get the attribute
// Pass the config and build attribute specific CSS

// Todo: add checks to ensure the correct minimum number of options have been passed to each attribute

// Todo: add CSS and Sass variable exports

// Todo: font family construction has been minimized, but should be built back up to properly construct working @fontface rules

// Todo: right now when the script finds an error in one of the values in an attribute, the whole attribute is discarded. It would be nice if only the value with the error was tossed intstead.

// Todo: gradient fallbacks for bg color, font color, and overlay should set the font color to the first color stop in the gradient - this will require a more complex gradient map that provides access to the fallback color.

// Todo: radial gradients should support keyword additives before the color stops

function build() {
  try {
    var envObject = parseENV(argv);
    var envState = envObject.state;
    var envSrc = envObject.src;
    // Load the user's settings and generate an array of their 
    var settings = loadSettings(argv);
    console.log(
      'Hydrogen',
      '[WORKING]'.blue,
      'Starting the build script...'
    );
    buildHydrogen(argv);
    processCSS(argv);
    console.log(
      'Hydrogen',
      '[SUCCESS]'.green,
      'A production-ready CSS file was built in ' +
      envSrc.bold.green +
      settings.output.bold.green +
      '/'.bold.green +
      '.'
    );
  } catch (err) {
    console.log(err);
    return err;
  }
}

exports.build = build();
