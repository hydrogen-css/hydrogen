// Hydrogen: Watch script

// This script is designed to use fs.watch to watch the user's target input files for changes and run Hydrogen's build script when a change is detected

'use strict';

// Third party dependencies
var watch = require('node-watch');

// Local dependencies
var { loadSettings } = require('./scripts/load-settings');
var { buildHydrogen } = require('./scripts/build-hydrogen');
var { processCSS } = require('./scripts/process-css');

function watchFiles() {
  try {
    // Load the user's settings and generate an array of their 
    var settings = loadSettings();
    var input = [];
    for (const dir of settings.input) {
      input = input.concat('./tests/' + dir);
    }
    console.log(
      'Hydrogen',
      '[WORKING]'.blue,
      'Starting the watch script...'
    );
    buildHydrogen();
    processCSS();
    console.log(
      'Hydrogen',
      '[SUCCESS]'.green,
      'A production-ready CSS file was built in ' +
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
      buildHydrogen();
      processCSS();
      console.log(
        'Hydrogen',
        '[SUCCESS]'.green,
        'A production-ready CSS file was built in ' +
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