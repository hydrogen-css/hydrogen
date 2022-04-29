// Hydrogen: Generate input glob

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');

// Local dependencies
var { loadSettings } = require('./load-settings');

/**
 * This script will load the user's settings and generate a string that contains globbed versions of the user's input paths.
 * @param {string} env Either 'dev' or 'prod'
 * @returns {string} Returns a string of comma separated globbed paths based on the user's input configuration
 */
function generateInputGlob() {
  try {
    var settings = loadSettings();
    if (Array.isArray(settings.input) == true) {
      var inputData = '{';
      settings.input.forEach(function (inputPath, index, array) {
        inputData = inputData + './tests/' + inputPath + '/**/*,';
      });
      inputData = inputData + '}';
      return inputData;
    } else {
      console.error(
        'Hydrogen',
        '[ERROR]'.red,
        'Please ensure your input settings in hydrogen.config.json are an array ([])'
      );
      throw err;
    }
  } catch (err) {
    return err;
  }
}

module.exports = {
  generateInputGlob
};