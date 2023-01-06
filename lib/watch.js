// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('./data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('./data/media-model-definition').MediaObject} MediaObject
 */

// Data imports

// Logging
const { log_message } = require('./scripts/logging/log-message');

// Functions
const { run_hydrogen_full } = require('./scripts/run/run-hydrogen-full');
const { run_hydrogen_core } = require('./scripts/run/run-hydrogen-core');

// Vendor imports
const chokidar = require('chokidar');

// Script
/**
 * Runs a Chokidar watcher and builds Hydrogen when changes are detected
 * @returns {{settings_data: Settings, media_data: MediaObject[]}}
 */
function hydrogen_watch() {
  try {
    // Run an initial instance of Hydrogen before watching
    let results = run_hydrogen_full();
    if (results.settings_data.logging.errors.count > 0) {
      log_message({
        type: 'failure',
        step: 'Watching for changes...',
        message:
          'Hydrogen completed with ' +
          results.settings_data.logging.errors.count +
          ' errors',
      });
    } else {
      log_message({
        type: 'success',
        step: 'Watching for changes...',
      });
    }
    // Build the watch list from the initial run
    let watch_list = [results.settings_data.config.path];
    results.settings_data.input.parsed.array.forEach(function (input) {
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
    watcher.on('ready', function (event, path) {
      watcher.on('all', function (event, path) {
        if (path === results.settings_data.config.path) {
          results = run_hydrogen_full();
        } else {
          // Log that the script has started
          log_message({
            type: 'system',
            step: 'Starting the build...',
          });
          // Initiate the total build timer
          const timer_start_total_build = process.hrtime.bigint();
          // Reset error and warning counts
          results.settings_data.logging.errors.count = 0;
          results.settings_data.logging.warnings.count = 0;
          // Run only Hydrogen's core, using the foundation data
          let new_results = run_hydrogen_core({
            settings_data: results.settings_data,
            media_data: results.media_data,
            timer: timer_start_total_build,
          });
          if (new_results.settings_data.logging.errors.count > 0) {
            log_message({
              type: 'failure',
              step: 'Watching for changes...',
              message:
                'Hydrogen completed with ' +
                new_results.settings_data.logging.errors.count +
                ' errors',
            });
          } else {
            log_message({
              type: 'success',
              step: 'Watching for changes...',
            });
          }
          return results;
        }
      });
    });
  } catch (error) {
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Watch script',
        error: error,
      };
    }
  }
}

module.exports = {
  hydrogen_watch,
};
