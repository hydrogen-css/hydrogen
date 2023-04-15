// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('./data/config-data').Config} Config
 * @typedef {import('./data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('./data/media-array-data').MediaArray} MediaArray
 * @typedef {import('./data/media-array-data').QueryData} QueryData
 */

// Data imports
const package_data = require('../package.json');

// Local functions

// Helper functions
const { log_message } = require('./scripts/console-logging/log-message');
const { run_hydrogen_core, run_hydrogen_full } = require('./scripts/run-hydrogen');

// Vendor imports
const chokidar = require('chokidar');

// Script ==========================================================================================

/**
 * Runs a Chokidar watcher and builds Hydrogen when changes are detected.
 *
 * @returns {{config: ParsedConfig, media_array: MediaArray}}
 */
function hydrogen_watch() {
  try {
    // Run an initial instance of Hydrogen before watching
    let results = run_hydrogen_full();
    if (results.config.logging.errors.count > 0) {
      log_message({
        type: 'failure',
        step: 'Watching for changes...',
        message: 'Hydrogen completed with ' + results.config.logging.errors.count + ' errors',
      });
    } else {
      log_message({
        type: 'success',
        step: 'Watching for changes...',
      });
    }
    // Build the watch list from the initial run
    let watch_list = [results.config.path.path];
    results.config.input.parsed.array.forEach((input) => {
      watch_list = watch_list.concat(input);
    });
    const watcher = chokidar.watch(watch_list, {
      ignored: ['hydrogen.css', 'hydrogen.raw.css', 'hydrogen.vars.css', '**/hydrogen-logs/**'],
      persistent: true,
    });
    watcher.on('ready', function (event, path) {
      watcher.on('all', function (event, path) {
        if (path === results.config.path.path) {
          results = run_hydrogen_full();
        } else {
          // Log that the script has started
          log_message({
            type: 'system',
            step: 'Starting the build...',
            message: 'Hydrogen v' + package_data.version,
          });
          // Initiate the total build timer
          const timer_start_total_build = process.hrtime.bigint();
          // Reset error and warning counts
          results.config.logging.errors.count = 0;
          results.config.logging.warnings.count = 0;
          // Run only Hydrogen's core, using the foundation data
          let new_results = run_hydrogen_core(
            results.config,
            results.media_array,
            timer_start_total_build
          );
          if (new_results.config.logging.errors.count > 0) {
            log_message({
              type: 'failure',
              step: 'Watching for changes...',
              message:
                'Hydrogen completed with ' + new_results.config.logging.errors.count + ' errors',
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
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      log_message({
        type: 'error',
        step: error.step,
        error: error.error,
        buffers: {
          bottom: true,
        },
      });
      throw error.error;
    } else {
      log_message({
        type: 'error',
        step: 'Hydrogen watch',
        error: error,
        buffers: {
          bottom: true,
        },
      });
      throw error;
    }
  }
}

module.exports = {
  hydrogen_watch,
};
