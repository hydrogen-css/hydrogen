// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */

// Data imports

// Logging
const { log_message } = require('../logging/log-message');

// Functions

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script
/**
 * Deletes the log directory
 * @param {{settings: Settings}} args
 * @returns {boolean}
 */
function delete_logs(args) {
  try {
    // Check the validity of the arguments passed
    if (args.settings && typeof args.settings === 'object') {
      // Check to see if the user has requested that the logs be deleted, otherwise just resolve
      if (
        args.settings.logging &&
        args.settings.logging.clean &&
        args.settings.logging.clean === true
      ) {
        // Check that the output has been parsed properly
        if (
          args.settings.output &&
          args.settings.output.parsed &&
          args.settings.output.parsed.string &&
          typeof args.settings.output.parsed.string === 'string'
        ) {
          // Check if the logs directory exists and delete it
          if (
            fs.existsSync(
              path.resolve(
                args.settings.output.parsed.string + '/hydrogen-logs'
              )
            ) === true
          ) {
            fs.rmSync(
              path.resolve(
                args.settings.output.parsed.string + '/hydrogen-logs'
              ),
              {
                recursive: true,
                force: true,
              }
            );
            log_message({
              type: 'success',
              step: 'Deleting log directory',
              message:
                "Hydrogen's log files were successfully removed from your output directory.",
            });
            return true;
          } else {
            // No folder exists, so it's as good as deleted
            return true;
          }
        } else {
          throw new Error(
            'The settings argument contains an invalid parsed output string.'
          );
        }
      } else {
        // The user hasn't asked for it
        return true;
      }
    } else {
      throw new Error("The settings argument was omitted or isn't an object.");
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
