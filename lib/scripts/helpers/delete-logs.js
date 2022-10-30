// Hydrogen: Delete log directory
'use strict';

// Hydrogen data models
let Settings = require('../../data/settings-model-definition');
/** @typedef {import('../../data/settings-model-definition').Settings} Settings */

// Hydrogen data imports

// Hydrogen core functions

// Hydrogen helper functions

// Hydrogen log functions
const { log_message } = require('../logs/log-message');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script

/**
 * @typedef {object} Args
 * @prop {Settings} settings
 */

/**
 * Deletes the log directory
 * @param {Args} args { setting }
 * @returns {Promise}
 */
function delete_logs(args) {
  return new Promise((resolve, reject) => {
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
              resolve();
            } else {
              // No folder exists, so it's as good as deleted
              resolve();
            }
          } else {
            throw new Error(
              'The settings argument contains an invalid parsed output string.'
            );
          }
        } else {
          // The user hasn't asked for it
          resolve();
        }
      } else {
        throw new Error(
          "The settings argument was omitted or isn't an object."
        );
      }
    } catch (error) {
      log_message({
        type: 'error',
        step: 'Deleting log directory',
        error: error,
      });
      reject();
    }
  });
}

module.exports = {
  delete_logs,
};
