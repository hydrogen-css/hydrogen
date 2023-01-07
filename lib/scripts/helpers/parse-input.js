// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */

// Data imports

// Logging

// Functions

// Vendor imports
var path = require('path');

// Script
/**
 * Generates an object containing different formats of the relative path to the user's input directories from the configuration file
 * @param {{settings: Settings}} args
 * @returns {{array: string[], string: string, glob: string}}
 */
function parse_input(args) {
  try {
    // Check to ensure key values exist and are the right type
    if (args.settings && typeof args.settings === 'object') {
      if (args.settings.input && Array.isArray(args.settings.input)) {
        if (
          args.settings.config &&
          args.settings.config.directory &&
          typeof args.settings.config.directory === 'string'
        ) {
          try {
            // Create local variable references
            let settings = args.settings;
            let working_array = settings.input;
            let config_directory = settings.config.directory;
            // Create the input object
            let input = {};
            // Create an array for the sanitized paths
            let sanitized_path_array = [];
            // Because settings.input is an array, loop through the array and sanitize each item
            working_array.forEach((path) => {
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
              input_array = input_array.concat(
                path.resolve(config_directory, item)
              );
            });
            input.array = input_array;
            let input_string = [];
            sanitized_path_array.forEach((item) => {
              input_string =
                input_string + path.resolve(config_directory, item) + ',';
            });
            input.string = input_string;
            let input_glob = [];
            sanitized_path_array.forEach((item) => {
              input_glob =
                input_glob +
                path.resolve(config_directory, item + '/**/*') +
                ',';
            });
            input.glob = input_glob;
            // Return the object
            return input;
          } catch (error) {
            throw error;
          }
        } else {
          throw new Error(
            "The settings parser didn't properly generate a directory value for the configuration file."
          );
        }
      } else {
        throw new Error(
          "The input configuration was missing or wasn't an array."
        );
      }
    } else {
      throw new Error("The settings value is missing or wasn't an object.");
    }
  } catch (error) {
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing input settings',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_input,
};
