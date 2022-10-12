// Hydrogen: Watch script
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('./scripts/logs/log-message');
const { parse_settings } = require('./scripts/settings/settings-parser');
const { h2_compile_hydrogen } = require('./scripts/build-hydrogen');
// Vendor imports
const chokidar = require('chokidar');

/**
 * Runs a Chokidar watcher and builds Hydrogen when changes are detected
 * @returns {boolean} an assembled Hydrogen CSS file
 */
function h2_watch_files() {
  try {
    // Log that the script has started
    log_message({
      type: 'system',
      step: 'Starting build...',
    });
    // Load settings so that Hydrogen know which input folders to watch
    let settings = parse_settings(process.argv);
    if (settings) {
      // Build the input array to be watched
      let watchInput = [settings.config.path];
      for (let input of settings.input.parsed.array) {
        watchInput = watchInput.concat(input);
      }
      // Run Hydrogen
      h2_compile_hydrogen('watch', process.argv);
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
          // Log that a change has been detected
          log_message({
            type: 'system',
            step: 'Rebuilding...',
          });
          // Rerun Hydrogen
          h2_compile_hydrogen('watch', process.argv);
        });
      });
    } else {
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Watch initiation',
    });
    return false;
  }
}

module.exports = {
  h2_watch_files,
};
