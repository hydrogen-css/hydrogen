// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('./data/settings-model-definition').Settings} Settings
 */

// Data imports

// Logging
const { log_message } = require('./scripts/logs/log-message');

// Functions
const { run_hydrogen_full } = require('./scripts/run/run-hydrogen-full');
const { run_hydrogen_core } = require('./scripts/run/run-hydrogen-core');

// Vendor imports
const chokidar = require('chokidar');

// Script
/**
 * Runs a Chokidar watcher and builds Hydrogen when changes are detected
 * @returns {boolean}
 */
function hydrogen_watch() {
  try {
    // Run an initial instance of Hydrogen before watching
    let foundation_data = run_hydrogen_full();
    // Build the watch list from the initial run
    let watch_list = [foundation_data.settings_data.config.path];
    foundation_data.settings_data.input.parsed.array.forEach(function (input) {
      watch_list = watch_list.concat(input);
    });
    const watcher = chokidar.watch(watch_list, {
      ignored: [
        'hydrogen.css',
        'hydrogen.raw.css',
        'hydrogen.vars.css',
        '**/hydrogen-logs/**',
      ],
      persistent: true,
    });
    log_message({
      type: 'system',
      step: 'Watching for changes...',
    });
    watcher.on('ready', function (event, path) {
      watcher.on('all', function (event, path) {
        if (path === foundation_data.settings_data.config.path) {
          foundation_data = run_hydrogen_full();
        } else {
          // Log that the script has started
          console.log('');
          log_message({
            type: 'system',
            step: 'Starting the build...',
          });
          // Initiate the total build timer
          const timer_start_total_build = process.hrtime.bigint();
          // Reset error and warning counts
          foundation_data.settings_data.logging.errors.count = 0;
          foundation_data.settings_data.logging.warnings.count = 0;
          // Run only Hydrogen's core, using the foundation data
          run_hydrogen_core({
            settings_data: foundation_data.settings_data,
            media_data: foundation_data.media_data,
            timer: timer_start_total_build,
          });
          log_message({
            type: 'system',
            step: 'Watching for changes...',
          });
          return true;
        }
      });
    });
  } catch (error) {
    log_message({
      type: 'error',
      step: error.step,
      error: error.error,
    });
    throw error;
  }
}

module.exports = {
  hydrogen_watch,
};
