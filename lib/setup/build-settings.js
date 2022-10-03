// Hydrogen: Build development configuration file
'use strict';

// Vendor dependencies
var fs = require('fs');
var path = require('path');

// Hydrogen dependencies
const { log_message } = require('../scripts/logs/log-message');
var { setup_header, test_header } = require('../scripts/logs/log-labels');
var { log_success_message } = require('../scripts/logs/log-success');

/**
 * Loads Hydrogen's default settings and manipulates them to produce a customized settings output
 * @param {string} script setup | test
 * @param {string} environment The name of the environment
 * @param {function} modification A function that modifies the settings object based on the needs of the environment
 * @returns {boolean} true | false
 */
function build_development_config(environment, modification) {
  try {
    // Log the test is being set up
    log_message({
      type: 'test',
      step: environment,
      message: 'Setting up this test...',
    });
    // Load the default configuration
    var settings = {};
    if (environment === 'Documentation setup') {
      settings = require(path.resolve(
        process.cwd(),
        '../lib/data/',
        'settings-model.js'
      ));
    } else {
      settings = require(path.resolve(
        process.cwd(),
        '../../lib/data/',
        'settings-model.js'
      ));
    }
    // Manipulate the settings for this environment
    var environment_settings = modification(settings);
    // Write the configuration file
    fs.writeFile(
      path.resolve(process.cwd() + '/hydrogen.config.json'),
      JSON.stringify(environment_settings, null, 2),
      function (error) {
        if (error) {
          throw error;
        } else {
          log_message({
            type: 'success',
            step: 'Test setup',
            message:
              'Successfully created a custom configuration file for this test.',
          });
          return true;
        }
      }
    );
  } catch (error) {
    // Catch any errors
    console.log(error);
    return false;
  }
}

module.exports = {
  build_development_config,
};
