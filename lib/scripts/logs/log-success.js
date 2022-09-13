// Hydrogen logs: Generic message
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { console_flourish, success_header } = require('./log-labels');
var { build_file_message } = require('./log-build-files');

/**
 * Logs a generic Hydrogen-branded message to the console
 * @param {object} options - Options passed to the message
 * @param {string} options.message - The actual content of the message
 * @param {string} [options.step] - An optional build step
 * @param {string} [options.timer] - An optional timer value
 * @param {array} [options.files] - An optional array of files
 * @returns {boolean} true | false
 */
function log_success_message(options) {
  try {
    // Construct message strings ===============================================
    var header_message = success_header;
    var step_message = '';
    if (options.step) {
      step_message =
        '\n' + console_flourish + 'Build step: '.green + options.step;
    }
    var timer_message = '';
    if (options.timer) {
      timer_message =
        '\n' + console_flourish + 'Completion time: '.green + options.timer;
    }
    var context_message =
      '\n' + console_flourish + 'Message: '.green + options.message;
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
  log_success_message,
};
