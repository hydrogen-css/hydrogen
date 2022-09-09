// Hydrogen: Watch script
'use strict';

// Vendor dependencies
const chokidar = require('chokidar');

// Hydrogen dependencies
var { getUserInput } = require('./scripts/generate-paths');
var { h2_compile_hydrogen } = require('./scripts/build-hydrogen');
var { log_command, log_info } = require('./scripts/logs');
var { parse_settings } = require('./scripts/settings/settings-parser');

function h2_watch_files() {
  try {
    // Log that the script has started =========================================
    log_command('watch');
    // Load settings ===========================================================
    var settings = parse_settings(process.argv);
    // Load configured input and output
    var userInput = getUserInput(settings, 'array');
    // Build the input array to be watched =====================================
    var watchInput = [settings.path];
    for (let input of userInput) {
      watchInput = watchInput.concat(input);
    }
    // Run Hydrogen ============================================================
    h2_compile_hydrogen('watch', process.argv);
    // Watch the directories ===================================================
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
        // Log that a change has been detected
        log_command('changed');
        // Rerun Hydrogen
        h2_compile_hydrogen('watch', process.argv);
      });
    });
  } catch (error) {
    // Catch any errors ========================================================
    log_info(
      'error',
      'Unknown error',
      'Watch initiation',
      null,
      null,
      null,
      null,
      error
    );
    return error;
  }
}

module.exports = {
  h2_watch_files,
};
