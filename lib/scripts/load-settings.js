// Hydrogen: Load settings

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');

// Local dependencies
var { parseENV } = require('./parse-env');

/**
 * This script will load the user's settings from their hydrogen.config.json file and pass those settings on.
 * @param {string} env Either 'dev' or 'prod'
 * @returns {object} Settings object from the user's configuration file
 */
function loadSettings(argv) {
  try {
    var envObject = parseENV(argv);
    var envState = envObject.state;
    var envSrc = envObject.src;
    var settings = JSON.parse(fs.readFileSync(envSrc + 'hydrogen.config.json'));
    return settings;
  } catch (err) {
    console.log('⛔ [' + 'Hydrogen'.magenta + ']', err);
    return false;
  }
}

module.exports = {
  loadSettings,
};
