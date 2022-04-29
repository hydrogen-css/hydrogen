// Hydrogen: Load settings

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');

/**
 * This script will load the user's settings from their hydrogen.config.json file and pass those settings on.
 * @param {string} env Either 'dev' or 'prod'
 * @returns {object} Settings object from the user's configuration file
 */
function loadSettings() {
  try {
    var settings = JSON.parse(fs.readFileSync('./tests/hydrogen.config.json'));
    return settings;
  } catch (err) {
    return err;
  }
}

module.exports = {
  loadSettings
};