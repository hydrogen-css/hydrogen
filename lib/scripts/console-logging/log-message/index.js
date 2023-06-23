// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/config-data').ParsedConfig} ParsedConfig
 */

// Data imports

// Local functions
const { wrap_message } = require('./wrap-message');
const { build_file_list } = require('./build-file-list');
const { build_stack } = require('./build-stack');

// Helper functions
const { headers } = require('../log-styles');

// Vendor imports
var colors = require('colors');

// Script ==========================================================================================

/**
 * Logs a Hydrogen-branded message to the console.
 *
 * @param {object} args
 * @param {"system" | "info" | "warning" | "error" | "success"} args.type
 * @param {ParsedConfig} [args.config]
 * @param {string} [args.message]
 * @param {string} [args.step]
 * @param {string} [args.attribute]
 * @param {string} [args.query]
 * @param {string} [args.css]
 * @param {string} [args.test]
 * @param {string[]} [args.files]
 * @param {object} [args.buffers]
 * @param {boolean} [args.buffers.top]
 * @param {boolean} [args.buffers.bottom]
 * @param {string} [args.setting]
 * @returns {boolean}
 */
function log_message(args) {
  try {
    /**
     * Create a highlight function to get the message color by type.
     *
     * @param {string} string
     * @returns {string}
     */
    function highlight(string) {
      try {
        if (args.type === 'system' || args.type === 'test') {
          return colors.magenta(string);
        } else if (args.type === 'info') {
          return colors.blue(string);
        } else if (args.type === 'warning') {
          return colors.yellow(string);
        } else if (args.type === 'error' || args.type === 'failure') {
          return colors.red(string);
        } else if (args.type === 'success') {
          return colors.green(string);
        }
      } catch (error) {
        throw error;
      }
    }
    // Build the build step message if requested
    let step_message = '';
    if (args.step) {
      step_message = colors.dim(' - ') + highlight(args.step);
    }
    // Build error and warning messages if requested
    let warning_message = '';
    let error_message = '';
    if (args.warnings && args.warnings > 0) {
      let label = 'warnings';
      if (args.warnings === 1) {
        label = 'warning';
      }
      // prettier-ignore
      warning_message = '\n\n' + colors.dim('  Warnings > ') + colors.yellow(args.warnings + ' ' + label);
    }
    if (args.errors && args.errors > 0) {
      let label = 'errors';
      if (args.errors === 1) {
        label = 'error';
      }
      // prettier-ignore
      error_message = '\n\n' + colors.dim('  Errors   > ') + colors.red(args.errors + ' ' + label);
    }
    // Build the setting message if requested
    let setting_message = '';
    if (args.setting) {
      setting_message = '\n\n' + colors.dim('  Setting  > ') + wrap_message(args.setting);
    }
    // Build the attribute message if requested
    let attribute_message = '';
    if (args.attribute) {
      attribute_message = '\n\n' + colors.dim('  Attr     > ') + wrap_message(args.attribute);
    }
    // Build the query message if requested
    let query_message = '';
    if (args.query) {
      query_message = '\n\n' + colors.dim('  Query    > ') + wrap_message(args.query);
    }
    // Build the CSS message if requested
    let css_message = '';
    if (args.css) {
      css_message = '\n\n' + colors.dim('  CSS      > ') + wrap_message(args.css);
    }
    // Build the contextual message
    let context_message = '';
    if (args.message) {
      context_message = '\n\n' + colors.dim('  Message  > ') + wrap_message(args.message);
    }
    // Build the files message if requested
    let files_message = '';
    if (args.files) {
      files_message = build_file_list(args.files);
    }
    // If there's a stack, add it
    let stack = '';
    if (args.error && args.error.stack) {
      stack = build_stack(args.error.stack);
    }
    // If the type is error or warning, add it to the total count in the settings object
    if (args.config && args.type && args.type === 'error') {
      args.config.logging.errors.count += 1;
    } else if (args.config && args.type && args.type === 'warning') {
      args.config.logging.warnings.count += 1;
    }
    // Set console buffers to account for spacing
    let buffer_top = '\n';
    let buffer_bottom = '';
    if (args.buffers && args.buffers.top == false) {
      buffer_top = '';
    }
    if (args.buffers && args.buffers.bottom) {
      buffer_bottom = '\n';
    }
    // Build and log the final message
    console.log(
      buffer_top +
        headers[args.type] +
        step_message +
        context_message +
        warning_message +
        error_message +
        setting_message +
        attribute_message +
        query_message +
        css_message +
        files_message +
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
