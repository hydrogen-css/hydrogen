// Hydrogen logs: Generic message
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { console_flourish } = require('./log-labels');

/**
 * Logs a generic Hydrogen-branded message to the console
 * @param {object} options - Options passed to the message
 * @param {string} options.header - The header label
 * @param {string} options.message - The content of the message
 * @param {string} [options.step] - An optional build step
 * @param {array} [options.files] - An optional array of files
 * @returns {boolean} true | false
 */
function log_generic_message(options) {
  try {
    // Construct message strings ===============================================
    var header_message = options.header;
    var step_message = '';
    if (options.step) {
      step_message =
        '\n' + console_flourish + 'Build step: '.magenta + options.step;
    }
    var context_message =
      '\n' + console_flourish + 'Message: '.magenta + options.message;
    var files_message = '';
    if (options.files) {
      files_message = build_file_message(options.files, 'success');
    }
    // Log the message =========================================================
    console.log(
      header_message + step_message + context_message + files_message
    );
  } catch (error) {
    // Catch any errors
    console.log(error);
    return false;
  }
}

module.exports = {
  log_generic_message,
};
