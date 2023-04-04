// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/config-data').ParsedConfig} ParsedConfig
 * @typedef {import('../../data/config-data').ParsedOutput} ParsedOutput
 * @typedef {import('../../data/config-data').ParsedLogging} ParsedLogging
 */

// Data imports

// Local functions

// Helper functions
const { log_message } = require('../logging/log-message');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script ==========================================================================================

/**
 * Deletes the log directory
 * @param {ParsedConfig} config
 * @returns {boolean}
 */
function delete_logs(config) {
  try {
    // Check to see if the user has requested that the logs be deleted, otherwise just resolve
    if (config.logging && config.logging.clean && config.logging.clean === true) {
      // Check that the output has been parsed properly
      if (
        config.output &&
        config.output.parsed &&
        config.output.parsed.string &&
        typeof config.output.parsed.string === 'string'
      ) {
        // Check if the logs directory exists and delete it
        if (fs.existsSync(path.resolve(config.output.parsed.string + '/hydrogen-logs')) === true) {
          fs.rmSync(path.resolve(config.output.parsed.string + '/hydrogen-logs'), {
            recursive: true,
            force: true,
          });
          log_message({
            type: 'success',
            step: 'Deleting log directory',
            message: "Hydrogen's log files were successfully removed from your output directory.",
          });
          return true;
        } else {
          // No folder exists, so it's as good as deleted
          return true;
        }
      } else {
        throw new Error('The settings argument contains an invalid parsed output string.');
      }
    } else {
      // The user hasn't asked for it
      return true;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Deleting log files',
        error: error,
      };
    }
  }
}

module.exports = {
  delete_logs,
};
