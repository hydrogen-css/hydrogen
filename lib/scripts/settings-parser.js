// Hydrogen: Load settings
'use strict';

// Vendor dependencies
var fs = require('fs');
var path = require('path');

// Hydrogen dependencies
var { log_info } = require('./logs');

/**
 * Loads the user's settings and modifies the object based on command line arguments
 * @param {array} user_args node location, process location, args...
 * @returns {object} a modified settings object
 */
function parse_settings(user_args) {
  try {
    // Create working variables ================================================
    var settings;
    var settings_path;
    // Load arguments into Yargs -----------------------------------------------
    const argv = require('yargs/yargs')(user_args.slice(2)).argv;
    // Locate the configuration file ===========================================
    if (argv.config) {
      if (
        // Look for config in argument path
        fs.existsSync(
          path.resolve(process.cwd(), argv.config, 'hydrogen.config.json')
        ) === true
      ) {
        settings = JSON.parse(
          fs.readFileSync(
            path.resolve(process.cwd(), argv.config, 'hydrogen.config.json')
          )
        );
        settings_path = path.resolve(
          process.cwd(),
          argv.config,
          'hydrogen.config.json'
        );
      } else {
        // Throw an error ------------------------------------------------------
        log_info(
          'error',
          'Configuration not found',
          'Loading settings',
          null,
          null,
          null,
          [path.resolve(process.cwd(), argv.config, 'hydrogen.config.json')],
          "Hydrogen couldn't find a configuration file in the directory you passed as a command line argument."
        );
        return false;
      }
    } else {
      if (
        // Look for config in CWD
        fs.existsSync(path.resolve(process.cwd(), 'hydrogen.config.json')) ===
        true
      ) {
        settings = JSON.parse(
          fs.readFileSync(path.resolve(process.cwd(), 'hydrogen.config.json'))
        );
        settings_path = path.resolve(process.cwd(), 'hydrogen.config.json');
      } else if (
        // Look for config in ../CWD
        fs.existsSync(
          path.resolve(process.cwd(), '..', 'hydrogen.config.json')
        ) === true
      ) {
        settings = JSON.parse(
          fs.readFileSync(
            path.resolve(process.cwd(), '..', 'hydrogen.config.json')
          )
        );
        settings_path = path.resolve(
          process.cwd(),
          '..',
          'hydrogen.config.json'
        );
      } else {
        // Throw an error ------------------------------------------------------
        log_info(
          'error',
          'Configuration not found',
          'Loading settings',
          null,
          null,
          null,
          [
            path.resolve(process.cwd(), 'hydrogen.config.json'),
            path.resolve(process.cwd(), '..', 'hydrogen.config.json'),
          ],
          "Hydrogen couldn't find a configuration file in your current directory or its parent. Please run npx h2-init to create one."
        );
        return false;
      }
    }
    // Make any modifications based on arguments ===============================
    // Add the configuration path for reference later
    settings.path = settings_path;
    // Check to see if the clean request has been passed
    if (argv.clean === true) {
      settings.clean = true;
    } else {
      settings.clean = false;
    }
    // Bulk environment settings -----------------------------------------------
    // Dev
    if (argv.dev === true) {
      settings.build.logs = false;
      settings.build.quiet = false;
      settings.build.validation = false;
      settings.build.prefixing = true;
      settings.build.minification = false;
    }
    // Prod
    if (argv.prod === true) {
      settings.build.logs = false;
      settings.build.quiet = true;
      settings.build.validation = false;
      settings.build.prefixing = true;
      settings.build.minification = true;
    }
    // Individual setting overrides --------------------------------------------
    // Logs
    if (argv.logs === true) {
      settings.build.logs = true;
    } else if (argv.logs === false || argv.logs === 'false') {
      settings.build.logs = false;
    }
    // Quiet
    if (argv.quiet === true) {
      settings.build.quiet = true;
    } else if (argv.quiet === false || argv.quiet === 'false') {
      settings.build.quiet = false;
    }
    // Validation
    if (argv.validate === true) {
      settings.build.validation = true;
    } else if (argv.validate === false || argv.validate === 'false') {
      settings.build.validation = false;
    }
    // Prefixing
    if (argv.prefix === true) {
      settings.build.prefixing = true;
    } else if (argv.prefix === false || argv.prefix === 'false') {
      settings.build.prefixing = false;
    }
    // Minification
    if (argv.minify === true) {
      settings.build.minification = true;
    } else if (argv.minify === false || argv.minify === 'false') {
      settings.build.minification = false;
    }
    // Return the final settings object ========================================
    return settings;
  } catch (error) {
    // Catch any errors ========================================================
    log_info(
      'error',
      'Unknown error',
      'Loading settings',
      null,
      null,
      null,
      [
        path.resolve(process.cwd(), 'hydrogen.config.json'),
        path.resolve(process.cwd(), '..', 'hydrogen.config.json'),
      ],
      error
    );
    return false;
  }
}

module.exports = {
  parse_settings,
};
