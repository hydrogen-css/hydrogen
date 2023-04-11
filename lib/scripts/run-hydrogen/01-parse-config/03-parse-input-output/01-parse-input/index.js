// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').Input} Input
 * @typedef {import('../../../../../data/config-data').ParsedPath} ParsedPath
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports
var path = require('path');

// Script ==========================================================================================

/**
 * Generates an object containing different formats of the relative path to the user's input directories from the configuration file.
 *
 * Requires:
 * - config.input
 * - config.path
 *
 * @param {Config} config
 * @returns {{array: string[], string: string, glob: string}}
 */
function parse_input(config) {
  try {
    // Create the input object
    let input = {};
    // Create an array for the sanitized paths
    let sanitized_path_array = [];
    // Because config.input is an array, loop through the array and sanitize each item
    config.input.forEach((path) => {
      // Check for prefixed slash characters and remove them
      if (path.slice(0, 1) == '/' || path.slice(0, 1) == '\\') {
        path = path.substring(1);
      }
      // Check for suffixed slash characters and remove them
      if (path.slice(-1) == '/' || path.slice(-1) == '\\') {
        path = path.slice(0, -1);
      }
      // Sanitize "\"" characters for the glob plugin
      path = path.replace(/\\/g, '/');
      // Add the path to the array
      sanitized_path_array = sanitized_path_array.concat(path);
    });
    // Create and store the array version, string version, and glob version
    let input_array = [];
    sanitized_path_array.forEach((item) => {
      input_array = input_array.concat(path.resolve(config.path.directory, item));
    });
    input.array = input_array;
    let input_string = [];
    sanitized_path_array.forEach((item) => {
      input_string = input_string + path.resolve(config.path.directory, item) + ',';
    });
    input.string = input_string;
    let input_glob = [];
    sanitized_path_array.forEach((item) => {
      input_glob = input_glob + path.resolve(config.path.directory, item + '/**/*') + ',';
    });
    input.glob = input_glob;
    // Return the object
    return input;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing input paths',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_input,
};
