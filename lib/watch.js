// Hydrogen: Watch script

// This script is designed to use fs.watch to watch the user's target input files for changes and run Hydrogen's build script when a change is detected

'use strict';

// Third party dependencies
var { argv } = require('process');
var watch = require('node-watch');

// Local dependencies
var { parseENV } = require('./scripts/parse-env');
var { loadSettings } = require('./scripts/load-settings');
var { buildHydrogen } = require('./scripts/build-hydrogen');
var { processCSS } = require('./scripts/process-css');

function watchFiles() {
  try {
    var envObject = parseENV(argv);
    var envState = envObject.state;
    var envSrc = envObject.src;
    // Load the user's settings and generate an array of their 
    var settings = loadSettings(argv);
    var input = [];
    for (const dir of settings.input) {
      input = input.concat(envSrc + dir);
    }
    console.log(
      'Hydrogen',
      '[WORKING]'.blue,
      'Starting the watch script...'
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
    console.log('Hydrogen is watching for changes to your code...'.dim);
    // Watch the directories
    watch(input, { 
      recursive: true,
      filter: f => !/hydrogen.*\.css/.test(f)
    }, function(evt, name) {
      console.log(
        'Hydrogen',
        '[WORKING]'.blue,
        name.bold.blue,
        'has been changed - building Hydrogen...'
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
      console.log('Hydrogen is watching for changes to your code...'.dim);
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

exports.watch = watchFiles();