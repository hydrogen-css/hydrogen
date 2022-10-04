// Hydrogen logs: Messages
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { flourish, headers } = require('./log-labels');
const { fit_message } = require('./log-fit-message');
const { build_file_message } = require('./log-build-files');
// Vendor imports
var colors = require('colors');

/**
 * Logs a Hydrogen-branded message to the console
 * @param {{type: "system" | "info" | "warning" | "error" | "success", message?: string, step?: string, attribute?: string, query?: string, css?: string, files?: string[], setting? string}} options Options passed to the message
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
      } else if (options.type === 'error') {
        return string.red;
      } else if (options.type === 'success') {
        return string.green;
      }
    }
    // Build the build step message if requested
    let step_message = '';
    if (options.step) {
      // step_message =
      //   '\n' + flourish + 'Step     - '.dim + fit_message(options.step);
      step_message = ' - ' + highlight(options.step);
    }
    // Build the setting message if requested
    let setting_message = '';
    if (options.setting) {
      setting_message =
        // '\n' + flourish + highlight('Setting: ') + options.setting;
        '\n' + flourish + 'Setting  '.dim + fit_message(options.setting);
    }
    // Build the attribute message if requested
    let attribute_message = '';
    if (options.attribute) {
      attribute_message =
        // '\n' + flourish + highlight('Attribute: ') + options.attribute;
        '\n' + flourish + 'Attribute  '.dim + fit_message(options.attribute);
    }
    // Build the query message if requested
    let query_message = '';
    if (options.query) {
      query_message =
        // '\n' + flourish + highlight('Query: ') + options.query;
        '\n' + flourish + 'Query .... '.dim + fit_message(options.query);
    }
    // Build the CSS message if requested
    let css_message = '';
    if (options.css) {
      // css_message = '\n' + flourish + highlight('CSS value: ') + options.css;
      css_message =
        '\n' + flourish + 'CSS ...... '.dim + fit_message(options.css);
    }
    // Build the contextual message
    let context_message = '';
    if (options.message) {
      context_message =
        // '\n' + flourish + highlight('Message: ') + options.message;
        '\n' + flourish + 'Message .. '.dim + fit_message(options.message);
    }
    // Build the files message if requested
    let files_message = '';
    if (options.files) {
      files_message = build_file_message(options.files, options.type);
    }
    // Build and log the final message
    console.log(
      headers[options.type] +
        step_message +
        context_message +
        setting_message +
        attribute_message +
        query_message +
        css_message +
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
