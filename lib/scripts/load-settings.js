// Hydrogen: Load settings

'use strict';

// Third party dependencies
var fs = require('fs');
var path = require('path');

// Local dependencies
var { h2_error } = require('./logs');

/**
 * This script will load the user's settings from their hydrogen.config.json file and pass those settings on.
 * @returns {object} Settings object from the user's configuration file
 */
function h2_load_settings() {
  try {
    var settings = JSON.parse(
      fs.readFileSync(path.join(process.cwd() + '/hydrogen.config.json'))
    );
    return settings;
  } catch (error) {
    h2_error(error);
    return false;
  }
}

module.exports = {
  h2_load_settings,
};
