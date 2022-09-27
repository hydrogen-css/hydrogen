// Hydrogen logs: Error message
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { console_flourish, error_header } = require('./log-labels');
var { build_file_message } = require('./log-build-files');

/**
 * Logs a Hydrogen-branded error message to the console
 * @param {object} options Options passed to the message
 * @param {string} options.message The actual content of the message
 * @param {string} [options.step] An optional build step
 * @param {string} [options.attribute] An attribute related to the message
 * @param {array} [options.files] An optional array of files
 * @returns {boolean}
 */
function log_error_message(options) {
  try {
    // Build the message header
    let header_message = error_header;
    // Build the build step message if requested
    let step_message = '';
    if (options.step) {
      step_message =
        '\n' + console_flourish + 'Build step: '.red + options.step;
    }
    // Build the attribute message if requested
    let attribute_message = '';
    if (options.attribute) {
      attribute_message =
        '\n' + console_flourish + 'Attribute: '.red + options.attribute;
    }
    // Build the contextual message
    let context_message =
      '\n' + console_flourish + 'Message: '.red + options.message;
    // Build the files message if requested
    let files_message = '';
    if (options.files) {
      files_message = build_file_message(options.files, 'error');
    }
    // Build and log the final message
    console.log(
      header_message +
        step_message +
        attribute_message +
        context_message +
        files_message
    );
  } catch (error) {
    // Catch any errors
    console.log(error);
    return false;
  }
}

module.exports = {
  log_error_message,
};
