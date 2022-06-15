// Hydrogen: Watch script

// This script is designed to use fs.watch to watch the user's target input files for changes and run Hydrogen's build script when a change is detected

'use strict';

// Third party dependencies
var { argv } = require('process');
var watch = require('node-watch');

// Local dependencies
var { parseENV } = require('./scripts/parse-env');
var { getUserInput, getUserOutput } = require('./scripts/generate-paths');
var { buildHydrogen } = require('./scripts/build-hydrogen');
var { h2Error } = require('./scripts/logs');

function watchFiles() {
  try {
    var envObject = parseENV(argv);
    var envSrc = envObject.src;
    // Load configured input and output
    var userInput = getUserInput(argv, 'array');
    // Build the input array to be watched
    var watchInput = [envSrc + 'hydrogen.config.json'];
    for (let input of userInput) {
      watchInput = watchInput.concat(input);
    }
    console.log('😼 [' + 'Hydrogen'.magenta + ']', 'Starting the watch script...');
    // Run Hydrogen
    buildHydrogen(argv);
    console.log('👀 [' + 'Hydrogen'.magenta + ']', 'Watching for changes to your code...');
    // Watch the directories
    let watcher = watch(watchInput, { recursive: true, filter: (f) => !/hydrogen.*\.css/.test(f), delay: 500 });
    watcher.on('ready', function () {
      watcher.on('change', function (evt, name) {
        if (evt == 'update') {
          console.log('👀 [' + 'Hydrogen'.magenta + ']', "We've noticed a change in", name.green + '. Rebuilding...');
          // Run Hydrogen
          buildHydrogen(argv);
          console.log('👀 [' + 'Hydrogen'.magenta + ']', 'Watching for changes to your code...');
        }
      });
    });
  } catch (error) {
    h2Error(error);
    return error;
  }
}

module.exports = {
  watchFiles,
};
