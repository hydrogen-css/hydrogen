// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').Input} Output
 * @typedef {import('../../../../../data/config-data').ParsedPath} ParsedPath
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports
var path = require('path');

// Script ==========================================================================================

/**
 * Generates an object containing different formats of the relative path to the user's output directory from the configuration file.
 *
 * Requires:
 * - config.output
 * - config.path
 *
 * @param {Config} config
 * @returns {{array: string[], string: string, glob: string}}
 */
function parse_output(config) {
  try {
    // Create the output object
    let output = {};
    // Check for prefixed slash characters and remove them
    if (config.output.slice(0, 1) == '/' || config.output.slice(0, 1) == '\\') {
      config.output = config.output.substring(1);
    }
    // Check for suffixed slash characters and remove them
    if (config.output.slice(-1) == '/' || config.output.slice(-1) == '\\') {
      config.output = config.output.slice(0, -1);
    }
    // Sanitize "\"" characters for the glob plugin
    config.output = config.output.replace(/\\/g, '/');
    // Create and store the array version, string version, and glob version
    output.array = [path.resolve(config.path.directory, config.output)];
    output.string = path.resolve(config.path.directory, config.output);
    output.glob = path.resolve(config.path.directory, config.output + '/**/*');
    // Return the object
    return output;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing output paths',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_output,
};
