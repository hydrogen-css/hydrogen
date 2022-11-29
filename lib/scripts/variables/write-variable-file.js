// Hydrogen: Write variable file
'use strict';

// Hydrogen data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */

// Hydrogen data imports

// Hydrogen function imports
const { log_message } = require('../logs/log-message');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Scripts

/**
 * Loads build_variables and then writes them to a unique CSS file that can be imported on the user's project.
 * @param {Settings} settings The user's settings
 * @returns {boolean} CSS file containing CSS variables
 */
function write_variable_file(settings) {
  try {
    // Start the timer
    const timer_start_export_variables = process.hrtime.bigint();
    // Load the variables
    let css_variables = settings.variables.css;
    // Delete existing files
    if (
      fs.existsSync(
        path.join(settings.output.parsed.string + '/hydrogen.vars.css')
      ) == true
    ) {
      fs.unlinkSync(
        path.join(settings.output.parsed.string + '/hydrogen.vars.css')
      );
    }
    // Write the new file
    fs.writeFileSync(
      path.join(settings.output.parsed.string + '/hydrogen.vars.css'),
      css_variables
    );
    // End the timer and print results
    const timer_end_export_variables = process.hrtime.bigint();
    log_timer({
      settings: settings,
      step: 'CSS variable export',
      times: {
        start: timer_start_export_variables,
        end: timer_end_export_variables,
      },
    });
  } catch (error) {
    if (typeof error === Error) {
      log_message({
        type: 'error',
        settings: settings,
        step: 'Exporting variables',
        error: error,
      });
    } else {
      log_message({
        type: 'warning',
        settings: settings,
        step: 'Exporting variables',
        message: error,
      });
    }
    return false;
  }
}

module.exports = {
  write_variable_file,
};
