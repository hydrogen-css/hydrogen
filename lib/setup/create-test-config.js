// Hydrogen: Build development configuration file
'use strict';

// Hydrogen data models

// Hydrogen data imports
let settings = require('../data/settings-model');

// Vendor dependencies
var fs = require('fs');
var path = require('path');

// Hydrogen dependencies
const { log_message } = require('../scripts/logs/log-message');

/**
 * Loads Hydrogen's default settings and manipulates them to produce a customized settings output
 * @param {string} test The name of the test
 * @param {Promise} modification A function that modifies the settings object based on the needs of the environment
 * @returns {Promise}
 */
function create_test_config(test, modification) {
  return new Promise((resolve, reject) => {
    try {
      // Log the test is being set up
      log_message({
        type: 'system',
        step: test,
        message: 'Setting up...',
      });
      // Manipulate the settings for this environment
      modification(settings)
        .then((result) => {
          // Write the configuration file
          fs.writeFile(
            path.resolve(process.cwd(), 'hydrogen.config.json'),
            JSON.stringify(result, null, 2),
            function (error) {
              if (error) {
                log_message({
                  type: 'error',
                  step: test,
                  error: error,
                });
                reject();
              } else {
                log_message({
                  type: 'success',
                  step: test,
                  message: 'Successfully created a custom configuration file.',
                });
                resolve();
              }
            }
          );
        })
        .catch((error) => {
          log_message({
            type: 'error',
            step: test,
            error: error,
          });
          reject();
        });
    } catch (error) {
      log_message({
        type: 'error',
        step: test,
        error: error,
      });
      reject();
    }
  });
}

module.exports = {
  create_test_config,
};
