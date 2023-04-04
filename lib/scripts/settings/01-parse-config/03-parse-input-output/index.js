// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Input} Input
 * @typedef {import('../../../../data/config-data').Output} Output
 * @typedef {import('../../../../data/config-data').ParsedConfig} ParsedConfig
 * @typedef {import('../../../../data/config-data').ParsedInput} ParsedInput
 * @typedef {import('../../../../data/config-data').ParsedOutput} ParsedOutput
 */

// Data imports

// Local functions
const { parse_input } = require('./01-parse-input');
const { parse_output } = require('./02-parse-output');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Takes the configured input and output values and generates parsed variations in array, string, and glob formats.
 *
 * Requires:
 * - config.path
 * - config.input
 * - config.output
 *
 * @param {Config} config The user's configuration file data
 * @returns {{input: ParsedInput, output: ParsedOutput}}
 */
function parse_input_output(config) {
  try {
    let directories = {};
    // Create usable data for the input
    let input_data = parse_input(config);
    // Assign the data for export
    /** @type {ParsedInput} */
    directories.input = {
      raw: config.input,
      parsed: {
        array: input_data.array,
        string: input_data.string,
        glob: input_data.glob,
      },
    };
    // Create usable data for the output
    let output_data = parse_output(config);
    // Assign the data for export
    /** @type {ParsedOutput} */
    directories.output = {
      raw: config.output,
      parsed: {
        array: output_data.array,
        string: output_data.string,
        glob: output_data.glob,
      },
    };
    return directories;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing input and output',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_input_output,
};
