// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/config-data').ParsedConfig} ParsedConfig
 */

// Data imports

// Local functions

// Helper functions
const { log_message } = require('../../console-logging/log-message');
const { log_timer } = require('../../console-logging/log-timer');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script ==========================================================================================

/**
 * Loads build_variables and then writes them to a unique CSS file that can be imported on the user's project.
 *
 * @param {ParsedConfig} config The user's settings
 * @returns {boolean} CSS file containing CSS variables
 */
function write_variable_file(config) {
  try {
    // Start the timer
    const timer_start_export_variables = process.hrtime.bigint();
    // Load the variables
    let css_variables = config.variables.css;
    // Delete existing files
    if (fs.existsSync(path.join(config.output.parsed.string + '/hydrogen.vars.css')) == true) {
      fs.unlinkSync(path.join(config.output.parsed.string + '/hydrogen.vars.css'));
    }
    // Write the new file
    fs.writeFileSync(path.join(config.output.parsed.string + '/hydrogen.vars.css'), css_variables);
    // End the timer and print results
    const timer_end_export_variables = process.hrtime.bigint();
    log_timer({
      settings: config,
      step: 'CSS variable export',
      times: {
        start: timer_start_export_variables,
        end: timer_end_export_variables,
      },
    });
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    log_message({
      type: 'error',
      settings: config,
      step: 'Exporting variables',
      error: error,
    });
    return false;
  }
}

module.exports = {
  write_variable_file,
};
