// Hydrogen: Get user directories

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { parseENV } = require('./parse-env');
var { loadSettings } = require('./load-settings');
var { h2Error } = require('./logs');

/**
 * This function reads the user's configured input array, sanitizes it, and returns it in the requested format
 * @param {string} argv The arguments passed from the CLI
 * @param {string} type 'array', 'string', or 'glob'
 * @returns a sanitized array, string, or glob, depending on the requested type
 */
function getUserInput(argv, type) {
  try {
    var envObject = parseENV(argv);
    var envSrc = envObject.src;
    var settings = loadSettings(argv);
    // Because settings.input is an array, loop through the array and sanitize each item
    var sanitizedArray = [];
    for (let i in settings.input) {
      var sanitizedPath = settings.input[i];
      // Check for prefixed / and remove it
      if (sanitizedPath.slice(0, 1) == '/' || sanitizedPath.slice(0, 1) == '\\') {
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
        inputArray = inputArray.concat(envSrc + sanitizedArray[i]);
      }
      return inputArray;
    } else if (type === 'string') {
      var inputString = '';
      for (let i in sanitizedArray) {
        inputString = inputString + envSrc + sanitizedArray[i] + ',';
      }
      return inputString;
    } else if (type === 'glob') {
      var inputGlob = '';
      for (let i in sanitizedArray) {
        inputGlob = inputGlob + envSrc + sanitizedArray[i] + '/**/*,';
      }
      return inputGlob;
    }
  } catch (error) {
    h2Error(error);
    return false;
  }
}

/**
 * This function reads the user's configured output string, sanitizes it, and returns it in the requested format
 * @param {string} argv The arguments passed from the CLI
 * @param {string} type 'array', 'string', or 'glob'
 * @returns a sanitized array, string, or glob, depending on the requested type
 */
function getUserOutput(argv, type) {
  try {
    var envObject = parseENV(argv);
    var envSrc = envObject.src;
    var settings = loadSettings(argv);
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
      var outputArray = [envSrc + sanitizedPath];
      return outputArray;
    } else if (type === 'string') {
      var outputString = envSrc + sanitizedPath;
      return outputString;
    } else if (type === 'glob') {
      var outputGlob = envSrc + sanitizedPath + '/**/*';
      return outputGlob;
    }
  } catch (error) {
    h2Error(error);
    return false;
  }
}

module.exports = {
  getUserInput,
  getUserOutput,
};
