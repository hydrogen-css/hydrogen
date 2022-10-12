// Hydrogen: Get user directories
'use strict';

// Hydrogen type imports
let Settings = require('../data/settings-model-definition');
/**
 * @typedef {import('../data/settings-model-definition').Settings} Settings
 */
// Hydrogen function imports
const { log_message } = require('../scripts/logs/log-message');
// Vendor imports
var path = require('path');

/**
 * Generates a value containing the relative path to the user's input directory from the configuration file
 * @param {Settings} settings - The user's settings
 * @param {"array" | "string" | "glob"} format - The structure of the returned value
 * @returns {array | string} - The formatted input directories
 */
function get_input_path(settings, format) {
  try {
    // Create an array for the sanitized paths
    let sanitized_path_array = [];
    // Because settings.input is an array, loop through the array and sanitize each item
    for (let i in settings.input) {
      // Create a variable to store the current path
      let working_path = settings.input[i];
      // Check for prefixed slash characters and remove them
      if (working_path.slice(0, 1) == '/' || working_path.slice(0, 1) == '\\') {
        working_path = working_path.substring(1);
      }
      // Check for suffixed slash characters and remove them
      if (working_path.slice(-1) == '/' || working_path.slice(-1) == '\\') {
        working_path = working_path.slice(0, -1);
      }
      // Sanitize "\"" characters for the glob plugin
      working_path = working_path.replace(/\\/g, '/');
      // Add the path to the array
      sanitized_path_array = sanitized_path_array.concat(working_path);
    }
    // Now that an array of paths has been created, return them based on the format requested
    if (format === 'array') {
      // Create an empty array to store the final paths
      let input_array = [];
      // Loop through the sanitized paths and add each one to the array, then return it
      for (let i in sanitized_path_array) {
        input_array = input_array.concat(
          path.resolve(settings.config.directory, sanitized_path_array[i])
        );
      }
      return input_array;
    } else if (format === 'string') {
      // Create an empty string to store the final paths
      let input_string = '';
      // Loop through the sanitized paths and add each one to the string, then return it
      for (let i in sanitized_path_array) {
        input_string =
          input_string +
          path.resolve(settings.config.directory, sanitized_path_array[i]) +
          ',';
      }
      return input_string;
    } else if (format === 'glob') {
      // Create an empty string to store the final paths
      let input_glob = '';
      // Loop through the sanitized paths and add each one to the string, then return it
      for (let i in sanitized_path_array) {
        input_glob =
          input_glob +
          path.resolve(
            settings.config.directory,
            sanitized_path_array[i] + '/**/*'
          ) +
          ',';
      }
      return input_glob;
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Parsing user input paths',
      files: [settings.config.path],
    });
    return false;
  }
}

/**
 * Generates a value containing the relative path to the user's output directory from the configuration file
 * @param {Settings} settings - The user's settings
 * @param {"array" | "string" | "glob"} format - The structure of the returned value
 * @returns {array | string} - The formatted output directory
 */
function get_output_path(settings, format) {
  try {
    // Create a variable to store the current path
    var working_path = settings.output;
    // Check for prefixed slash characters and remove them
    if (working_path.slice(0, 1) == '/' || working_path.slice(0, 1) == '\\') {
      working_path = working_path.substring(1);
    }
    // Check for suffixed slash characters and remove them
    if (working_path.slice(-1) == '/' || working_path.slice(-1) == '\\') {
      working_path = working_path.slice(0, -1);
    }
    // Sanitize "\"" characters for the glob plugin
    working_path = working_path.replace(/\\/g, '/');
    // Now that a sanitized string has been created, return it based on the format requested
    if (format === 'array') {
      // Store the path in an array and return it
      let output_array = [
        path.resolve(settings.config.directory, working_path),
      ];
      return output_array;
    } else if (format === 'string') {
      // Resolve the string and return it
      let output_string = path.resolve(settings.config.directory, working_path);
      return output_string;
    } else if (format === 'glob') {
      // Concatenate the glob to the string and return it
      let output_glob = path.resolve(
        settings.config.directory,
        working_path + '/**/*'
      );
      return output_glob;
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Parsing user output path',
      files: [settings.config.path],
    });
    return false;
  }
}

module.exports = {
  get_input_path,
  get_output_path,
};
