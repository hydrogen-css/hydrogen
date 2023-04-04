// Hydrogen logs: Messages
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { flourish, headers } = require('./log-labels');
const { fit_message } = require('./log-fit-message');
const { build_file_message } = require('./log-build-files');
const { build_stack_message } = require('./log-build-stack');
const { build_test_errors_message } = require('./log-build-test-errors');
// Vendor imports
var colors = require('colors');

/**
 * @typedef {object} Options
 * @prop {"system" | "info" | "warning" | "error" | "success"} type
 * @prop {Settings} [settings]
 * @prop {string} [message]
 * @prop {string} [step]
 * @prop {string} [attribute]
 * @prop {string} [query]
 * @prop {string} [css]
 * @prop {string} [test]
 * @prop {string[]} [files]
 * @prop {{top: boolean, bottom: boolean}} [buffers]
 * @prop {string} [setting]
 */

/**
 * Logs a Hydrogen-branded message to the console
 * @param {Options} options { type, settings, setting, message, step, attribute, query, css, test, files }
 * @returns {boolean}
 */
function log_message(options) {
  try {
    // Create a highlight function to get the message color by type
    function highlight(string) {
      if (options.type === 'system' || options.type === 'test') {
        return string.magenta;
      } else if (options.type === 'info') {
        return string.blue;
      } else if (options.type === 'warning') {
        return string.yellow;
      } else if (options.type === 'error' || options.type === 'failure') {
        return string.red;
      } else if (options.type === 'success') {
        return string.green;
      }
    }
    // Build the build step message if requested
    let step_message = '';
    if (options.step) {
      step_message = ' - '.dim + highlight(options.step);
    }
    // Build error and warning messages if requested
    let warning_message = '';
    let error_message = '';
    if (options.warnings && options.warnings > 0) {
      let label = 'warnings';
      if (options.warnings === 1) {
        label = 'warning';
      }
      // prettier-ignore
      warning_message = '\n\n' +'  Warnings > '.dim + colors.yellow(options.warnings + ' ' + label);
    }
    if (options.errors && options.errors > 0) {
      let label = 'errors';
      if (options.errors === 1) {
        label = 'error';
      }
      // prettier-ignore
      error_message = '\n\n' +'  Errors   > '.dim + colors.red(options.errors + ' ' + label);
    }
    // Build the setting message if requested
    let setting_message = '';
    if (options.setting) {
      setting_message = '\n\n' + '  Setting  > '.dim + fit_message(options.setting);
    }
    // Build the attribute message if requested
    let attribute_message = '';
    if (options.attribute) {
      attribute_message = '\n\n' + '  Attr     > '.dim + fit_message(options.attribute);
    }
    // Build the query message if requested
    let query_message = '';
    if (options.query) {
      query_message = '\n\n' + '  Query    > '.dim + fit_message(options.query);
    }
    // Build the CSS message if requested
    let css_message = '';
    if (options.css) {
      css_message = '\n\n' + '  CSS      > '.dim + fit_message(options.css);
    }
    // Build the contextual message
    let context_message = '';
    if (options.message) {
      context_message = '\n\n' + '  Message  > '.dim + fit_message(options.message);
    }
    // Build the files message if requested
    let files_message = '';
    if (options.files) {
      files_message = build_file_message(options.files);
    }
    // If there's a stack, add it
    let stack = '';
    if (options.error && options.error.stack) {
      stack = build_stack_message(options.error.stack);
    }
    // If the type is error or warning, add it to the total count in the settings object
    if (options.settings && options.type && options.type === 'error') {
      options.settings.logging.errors.count = options.settings.logging.errors.count + 1;
    } else if (options.settings && options.type && options.type === 'warning') {
      options.settings.logging.warnings.count = options.settings.logging.warnings.count + 1;
    }
    // Check for test functions and names
    let function_message = '';
    if (options.function) {
      function_message = '\n\n' + '  Function > '.dim + fit_message(options.function);
    }
    let test_message = '';
    if (options.test) {
      test_message = '\n\n' + '  Test     > '.dim + fit_message(options.test);
    }
    // Log errors
    let test_errors_message = '';
    if (options.test_errors && options.test_errors.length > 0) {
      test_errors_message = build_test_errors_message(options.test_errors);
    }
    // Set console buffers to account for spacing
    let buffer_top = '\n';
    let buffer_bottom = '';
    if (options.buffers && options.buffers.top == false) {
      buffer_top = '';
    }
    if (options.buffers && options.buffers.bottom) {
      buffer_bottom = '\n';
    }
    // Build and log the final message
    console.log(
      buffer_top +
        headers[options.type] +
        step_message +
        test_message +
        context_message +
        test_errors_message +
        warning_message +
        error_message +
        setting_message +
        attribute_message +
        query_message +
        css_message +
        files_message +
        function_message +
        stack +
        buffer_bottom
    );
    return true;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    return false;
  }
}

module.exports = {
  log_message,
};
