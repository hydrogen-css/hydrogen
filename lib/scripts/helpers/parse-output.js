// Hydrogen: Parse output
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
var path = require('path');

// Script

/**
 * @typedef {object} Args
 * @prop {Settings} settings
 */

/**
 * @typedef {object} Output
 * @prop {array} array
 * @prop {string} string
 * @prop {string} glob
 */

/**
 * Generates an object containing different formats of the relative path to the user's output directory from the configuration file
 * @param {Args} args { settings }
 * @returns {Output | false} { array, string, glob } | false
 */
function parse_output(args) {
  try {
    // Check to ensure key values exist and are the right type
    if (args.settings && typeof args.settings === 'object') {
      if (args.settings.output && typeof args.settings.output === 'string') {
        if (
          args.settings.config &&
          args.settings.config.directory &&
          typeof args.settings.config.directory === 'string'
        ) {
          try {
            // Create local variable references
            let settings = args.settings;
            let working_path = settings.output;
            let config_directory = settings.config.directory;
            // Create the output object
            let output = {};
            // Check for prefixed slash characters and remove them
            if (
              working_path.slice(0, 1) == '/' ||
              working_path.slice(0, 1) == '\\'
            ) {
              working_path = working_path.substring(1);
            }
            // Check for suffixed slash characters and remove them
            if (
              working_path.slice(-1) == '/' ||
              working_path.slice(-1) == '\\'
            ) {
              working_path = working_path.slice(0, -1);
            }
            // Sanitize "\"" characters for the glob plugin
            working_path = working_path.replace(/\\/g, '/');
            // Create and store the array version, string version, and glob version
            output.array = [path.resolve(config_directory, working_path)];
            output.string = path.resolve(config_directory, working_path);
            output.glob = path.resolve(
              config_directory,
              working_path + '/**/*'
            );
            // Return the object
            return output;
          } catch (error) {
            log_message({
              type: 'error',
              settings: args.settings,
              step: 'Parsing user output path',
              error: error,
            });
            return false;
          }
        } else {
          throw new Error(
            "The settings parser didn't properly generate a directory value for the configuration file."
          );
        }
      } else {
        throw new Error(
          "The output configuration was missing or wasn't a string."
        );
      }
    } else {
      throw new Error("The settings value is missing or wasn't an object.");
    }
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Parsing user output path',
      error: error,
    });
    return false;
  }
}

module.exports = {
  parse_output,
};
