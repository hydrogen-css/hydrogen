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
 * Generates an object containing different formats of the relative path to the user's output directory from the configuration file
 * @param {{settings: Settings}} args
 * @returns {{array: string[], string: string, glob: string}}
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
            throw error;
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
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing output settings',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_output,
};
