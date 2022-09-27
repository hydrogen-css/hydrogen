// Hydrogen logs: Messages
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { flourish, headers } = require('./log-labels');
const { build_file_message } = require('./log-build-files');
// Vendor imports
var colors = require('colors');

/**
 * Logs a Hydrogen-branded message to the console
 * @param {{type: "info" | "warning" | "error" | "success", message: string, step?: string, attribute?: string, selector?: string, css?: string, files?: string[]}} options Options passed to the message
 * @returns {boolean}
 */
function log_message(options) {
  try {
    // Set the highlight based on the message type
    function highlight(string) {
      if (options.type === 'error') {
        return string.red;
      } else if (options.type === 'warning') {
        return string.yellow;
      } else if (options.type === 'info') {
        return string.blue;
      } else if (options.type === 'success') {
        return string.green;
      }
    }
    // Build the build step message if requested
    let step_message = '';
    if (options.step) {
      step_message = '\n' + flourish + highlight('Build step: ') + options.step;
    }
    // Build the attribute message if requested
    let attribute_message = '';
    if (options.attribute) {
      attribute_message =
        '\n' + flourish + highlight('Attribute: ') + options.attribute;
    }
    // Build the selector message if requested
    let selector_message = '';
    if (options.selector) {
      selector_message =
        '\n' + flourish + highlight('Selector: ') + options.selector;
    }
    // Build the CSS message if requested
    let css_message = '';
    if (options.css) {
      css_message = '\n' + flourish + highlight('CSS value: ') + options.css;
    }
    // Build the contextual message
    let context_message =
      '\n' + flourish + highlight('Message: ') + options.message;
    // Build the files message if requested
    let files_message = '';
    if (options.files) {
      files_message = build_file_message(options.files, options.type);
    }
    // Build and log the final message
    console.log(
      headers[options.type] +
        step_message +
        attribute_message +
        selector_message +
        css_message +
        context_message +
        files_message
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  log_message,
};
