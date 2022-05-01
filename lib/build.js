// Hydrogen: Build script

'use strict';

// Third party dependencies
var { argv } = require('process');

// Local dependencies
var { parseENV } = require('./scripts/parse-env');
var { loadSettings } = require('./scripts/load-settings');
var { buildHydrogen } = require('./scripts/build-hydrogen');
var { processCSS } = require('./scripts/process-css');

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
