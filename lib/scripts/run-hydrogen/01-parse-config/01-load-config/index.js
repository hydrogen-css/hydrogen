// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports
var fs = require('fs');
var path = require('path');
const cloneDeep = require('lodash.clonedeep');

// Script ==========================================================================================

/**
 * Finds a Hydrogen config file by checking command line arguments, the process directory, and the process' parent directories.
 *
 * @param {object} argv
 * @returns {Config}
 */
function load_config(argv) {
  try {
    // Verify the arguments and their types
    if (argv && typeof argv === 'object') {
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
                path.resolve(process.cwd(), argv.h2_config_path, 'hydrogen.config.json')
              )
            )
          );
          if (user_config) {
            // Set the path and directory values
            user_config.path = {
              directory: path.resolve(process.cwd(), argv.h2_config_path),
              path: path.resolve(process.cwd(), argv.h2_config_path, 'hydrogen.config.json'),
            };
            return user_config;
          } else {
            // Something failed when parsing the configuration JSON
            throw new Error('Your configuration file likely contains invalid JSON.');
          }
        } else {
          // A settings file couldn't be found in the directory it was passed
          throw new Error(
            "Hydrogen couldn't find a configuration file in the directory you passed as a command line argument."
          );
        }
      } else {
        // Set a path string that can be recursively checked
        let check_path = path.resolve(process.cwd());
        let status = false;
        do {
          if (fs.existsSync(path.resolve(process.cwd(), 'hydrogen.config.json'))) {
            status = true;
          } else {
            if (fs.existsSync(path.resolve(check_path, 'hydrogen.config.json'))) {
              status = true;
            } else {
              if (path.resolve(check_path, '..') === check_path) {
                status = true;
                throw new Error(
                  'A configuration file couldn\'t be found. Please use "npx h2-init" to create one.'
                );
              } else {
                check_path = path.resolve(check_path, '..');
              }
            }
          }
        } while (status === false);
        try {
          // A configuration file was found in the process directory
          let user_config = cloneDeep(
            JSON.parse(fs.readFileSync(path.resolve(check_path, 'hydrogen.config.json')))
          );
          // Set the path and directory values
          user_config.path = {
            directory: path.resolve(process.cwd(), check_path),
            path: path.resolve(check_path, 'hydrogen.config.json'),
          };
          return user_config;
        } catch (error) {
          // Something failed when parsing the configuration JSON
          throw {
            step: 'Parsing JSON while loading settings',
            error: error,
          };
        }
      }
    } else {
      throw new Error('No command line arguments were passed or the object was invalid.');
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Loading config',
        error: error,
      };
    }
  }
}

module.exports = {
  load_config,
};
