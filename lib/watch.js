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

// Local functions

// Helper functions
const { log_message } = require('./scripts/console-logging/log-message');
const { run_hydrogen_full } = require('./scripts/run-hydrogen');

// Vendor imports
const chokidar = require('chokidar');

// Script ==========================================================================================

/**
 * Runs a Chokidar watcher and builds Hydrogen when changes are detected.
 *
 * @returns {{config: ParsedConfig, media_array: QueryData[]}}
 */
function hydrogen_watch() {
  try {
    // Run an initial instance of Hydrogen before watching
    let timer_start_total_build = process.hrtime.bigint();
    let results = run_hydrogen_full();
    if (results.config.logging.errors.count > 0) {
      log_message({
        type: 'system',
        step: 'Watching for changes...',
        times: {
          start: timer_start_total_build,
          end: process.hrtime.bigint(),
        },
        message:
          'The Hydrogen build completed with ' +
          results.config.logging.errors.count.toString() +
          ' errors.',
        success: 'false',
        buffers: {
          bottom: true,
        },
      });
    } else {
      log_message({
        type: 'system',
        step: 'Watching for changes...',
        times: {
          start: timer_start_total_build,
          end: process.hrtime.bigint(),
        },
        message: 'The Hydrogen build completed successfully.',
        success: 'true',
        buffers: {
          bottom: true,
        },
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
        let timer_start_watch_build = process.hrtime.bigint();
        results = run_hydrogen_full();
        if (results.config.logging.errors.count > 0) {
          log_message({
            type: 'system',
            step: 'Watching for changes...',
            times: {
              start: timer_start_watch_build,
              end: process.hrtime.bigint(),
            },
            message:
              'The Hydrogen build completed with ' +
              results.config.logging.errors.count.toString() +
              ' errors.',
            success: 'false',
            buffers: {
              bottom: true,
            },
          });
        } else {
          log_message({
            type: 'system',
            step: 'Watching for changes...',
            times: {
              start: timer_start_watch_build,
              end: process.hrtime.bigint(),
            },
            message: 'The Hydrogen build completed successfully.',
            success: 'true',
            buffers: {
              bottom: true,
            },
          });
        }
        return results;
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
      process.exitCode = 1;
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
      process.exitCode = 1;
      throw error;
    }
  }
}

module.exports = {
  hydrogen_watch,
};
