// Hydrogen: Load configuration
'use strict';

// Hydrogen data models
let Settings = require('../../data/settings-model-definition');
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../data/settings-model-definition').TempLogging} TempLogging
 */

// Hydrogen data imports

// Hydrogen core functions

// Hydrogen helper functions

// Hydrogen log functions

// Vendor imports
var fs = require('fs');
var path = require('path');
const cloneDeep = require('lodash.clonedeep');

// Script

/**
 * Loads the user's configuration by checking command line arguments, the process directory, and the process' parent directory
 * @param {object} argv
 * @param {TempLogging} temp_logging
 * @returns {Promise<Settings>}
 */
function load_configuration(argv, temp_logging) {
  return new Promise((resolve, reject) => {
    // Verify the arguments and their types
    if (argv && typeof argv === 'object') {
      if (temp_logging && typeof temp_logging === 'object') {
        // Locate the configuration file by checking the following:
        // - command line arguments
        // - the process directory
        // - the process' parent directory
        if (argv.h2_config_path) {
          // The user passed a configuration path via the command line, so check to see if it exists and parse it to JSON
          if (
            // prettier-ignore
            fs.existsSync(path.resolve(process.cwd(), argv.h2_config_path, 'hydrogen.config.json')) === true
          ) {
            // Collect the settings object
            let user_config = cloneDeep(
              JSON.parse(
                fs.readFileSync(
                  path.resolve(
                    process.cwd(),
                    argv.h2_config_path,
                    'hydrogen.config.json'
                  )
                )
              )
            );
            if (user_config) {
              // Set the path and directory values
              user_config.config = {
                directory: path.resolve(process.cwd(), argv.h2_config_path),
                path: path.resolve(
                  process.cwd(),
                  argv.h2_config_path,
                  'hydrogen.config.json'
                ),
              };
              resolve(user_config);
            } else {
              // Something failed when parsing the configuration JSON
              reject({
                type: 'error',
                settings: temp_logging,
                // prettier-ignore
                message: "Your configuration file likely contains invalid JSON.",
                step: 'Loading settings',
                files: [
                  path.resolve(
                    process.cwd(),
                    argv.h2_config_path,
                    'hydrogen.config.json'
                  ),
                ],
              });
            }
          } else {
            // A settings file couldn't be found in the directory it was passed
            reject({
              type: 'error',
              settings: temp_logging,
              // prettier-ignore
              message: "Hydrogen couldn't find a configuration file in the directory you passed as a command line argument.",
              step: 'Loading settings',
              files: [
                path.resolve(
                  process.cwd(),
                  argv.h2_config_path,
                  'hydrogen.config.json'
                ),
              ],
            });
          }
        } else {
          // Set a path string that can be recursively checked
          let check_path = path.resolve(process.cwd());
          let status = false;
          do {
            if (
              fs.existsSync(path.resolve(process.cwd(), 'hydrogen.config.json'))
            ) {
              status = true;
            } else {
              if (
                fs.existsSync(path.resolve(check_path, 'hydrogen.config.json'))
              ) {
                status = true;
              } else {
                if (path.resolve(check_path, '..') === check_path) {
                  status = true;
                  reject({
                    type: 'error',
                    settings: temp_logging,
                    message:
                      'A configuration file couldn\'t be found. Please use "npx h2-init" to create one.',
                    step: 'Loading settings',
                    files: [
                      path.resolve(
                        process.cwd(),
                        check_path,
                        'hydrogen.config.json'
                      ),
                    ],
                  });
                } else {
                  check_path = path.resolve(check_path, '..');
                }
              }
            }
          } while (status === false);
          try {
            // A configuration file was found in the process directory
            let user_config = cloneDeep(
              JSON.parse(
                fs.readFileSync(
                  path.resolve(check_path, 'hydrogen.config.json')
                )
              )
            );
            // Set the path and directory values
            user_config.config = {
              directory: path.resolve(process.cwd(), check_path),
              path: path.resolve(check_path, 'hydrogen.config.json'),
            };
            resolve(user_config);
          } catch (error) {
            // Something failed when parsing the configuration JSON
            reject({
              type: 'error',
              settings: temp_logging,
              message: 'Your configuration file likely contains invalid JSON.',
              step: 'Loading settings',
              error: error,
              files: [path.resolve(check_path, 'hydrogen.config.json')],
            });
          }
        }
      } else {
        reject({
          type: 'error',
          message:
            'The temporary error and warning log was omitted or is not an object.',
          step: 'Loading configuration',
        });
      }
    } else {
      reject({
        type: 'error',
        message:
          'No command line arguments were passed or the object was invalid.',
        step: 'Loading configuration',
      });
    }
  });
}

module.exports = {
  load_configuration,
};
