// Hydrogen: Watch script

// This script is designed to use fs.watch to watch the user's target input files for changes and run Hydrogen's build script when a change is detected

'use strict';

// Third party dependencies
const chokidar = require('chokidar');
var path = require('path');

// Local dependencies
var { getUserInput } = require('./scripts/generate-paths');
var { h2_compile_hydrogen } = require('./scripts/build-hydrogen');
var { h2_error } = require('./scripts/logs');

function h2_watch_files() {
  try {
    // Load configured input and output
    var userInput = getUserInput('array');
    // Build the input array to be watched
    var watchInput = [path.join(process.cwd() + '/hydrogen.config.json')];
    for (let input of userInput) {
      watchInput = watchInput.concat(input);
    }
    console.log(
      '😼 [' + 'Hydrogen'.magenta + ']',
      'Starting the watch script...'
    );
    // Run Hydrogen
    h2_compile_hydrogen();
    console.log(
      '👀 [' + 'Hydrogen'.magenta + ']',
      'Watching for changes to your code...'
    );
    // Watch the directories
    const watcher = chokidar.watch(watchInput, {
      ignored: [
        /hydrogen\.css$/,
        /hydrogen\.logs\.attributes\.json$/,
        /hydrogen\.logs\.media\.json$/,
        /hydrogen\.logs\.values\.json$/,
        /hydrogen\.raw\.css$/,
        /hydrogen\.vars\.css$/,
        /hydrogen\.vars\.scss$/,
      ],
      persistent: true,
    });
    watcher.on('ready', function (event, path) {
      watcher.on('all', function (event, path) {
        console.log(
          '👀 [' + 'Hydrogen'.magenta + ']',
          "We've noticed a change in",
          path.green + '. Rebuilding...'
        );
        h2_compile_hydrogen();
        console.log(
          '👀 [' + 'Hydrogen'.magenta + ']',
          'Watching for changes to your code...'
        );
      });
    });
  } catch (error) {
    h2_error(error);
    return error;
  }
}

module.exports = {
  h2_watch_files,
};
