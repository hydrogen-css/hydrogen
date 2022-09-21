// Hydrogen: Get user directories
'use strict';

// Vendor dependencies
var path = require('path');

// Hydrogen dependencies
var { log_info } = require('./logs/logs');

/**
 * Generates a value containing the relative path to the user's input directory from the configuration file
 * @param {object} settings - The user's settings
 * @param {string} type - array | string | glob
 * @returns {array | string} - The formatted input directories
 */
function get_input_path(settings, type) {
  try {
    // Because settings.input is an array, loop through the array and sanitize each item
    var sanitizedArray = [];
    for (let i in settings.input) {
      var sanitizedPath = settings.input[i];
      // Check for prefixed / and remove it
      if (
        sanitizedPath.slice(0, 1) == '/' ||
        sanitizedPath.slice(0, 1) == '\\'
      ) {
        sanitizedPath = sanitizedPath.substring(1);
      }
      // Check for suffixed / and remove it
      if (sanitizedPath.slice(-1) == '/' || sanitizedPath.slice(-1) == '\\') {
        sanitizedPath = sanitizedPath.slice(0, -1);
      }
      sanitizedArray = sanitizedArray.concat(sanitizedPath);
    }
    // Return the requested type
    if (type === 'array') {
      var inputArray = [];
      for (let i in sanitizedArray) {
        inputArray = inputArray.concat(
          path.resolve(settings.dir, sanitizedArray[i])
        );
      }
      return inputArray;
    } else if (type === 'string') {
      var inputString = '';
      for (let i in sanitizedArray) {
        inputString =
          inputString + path.resolve(settings.dir, sanitizedArray[i]) + ',';
      }
      return inputString;
    } else if (type === 'glob') {
      var inputGlob = '';
      for (let i in sanitizedArray) {
        inputGlob =
          inputGlob +
          path.resolve(settings.dir, sanitizedArray[i] + '/**/*') +
          ',';
      }
      return inputGlob;
    }
  } catch (error) {
    // Catch any errors
    log_info(
      'error',
      'Unknown error',
      'Parsing user input path',
      null,
      null,
      null,
      [settings.path],
      error
    );
    return false;
  }
}

/**
 * Generates a value containing the relative path to the user's output directory from the configuration file
 * @param {object} settings - The user's settings
 * @param {string} type - array | string | glob
 * @returns {array | string} - The formatted output directory
 */
function get_output_path(settings, type) {
  try {
    var sanitizedPath = settings.output;
    // Check for prefixed / and remove it
    if (sanitizedPath.slice(0, 1) == '/' || sanitizedPath.slice(0, 1) == '\\') {
      sanitizedPath = sanitizedPath.substring(1);
    }
    // Check for suffixed / and remove it
    if (sanitizedPath.slice(-1) == '/' || sanitizedPath.slice(-1) == '\\') {
      sanitizedPath = sanitizedPath.slice(0, -1);
    }
    // Return the requested type
    if (type === 'array') {
      var outputArray = [path.resolve(settings.dir, sanitizedPath)];
      return outputArray;
    } else if (type === 'string') {
      var outputString = path.resolve(settings.dir, sanitizedPath);
      return outputString;
    } else if (type === 'glob') {
      var outputGlob = path.resolve(settings.dir, sanitizedPath + '/**/*');
      return outputGlob;
    }
  } catch (error) {
    // Catch any errors
    log_info(
      'error',
      'Unknown error',
      'Parsing user output path',
      null,
      null,
      null,
      [settings.path],
      error
    );
    return false;
  }
}

module.exports = {
  get_input_path,
  get_output_path,
};
