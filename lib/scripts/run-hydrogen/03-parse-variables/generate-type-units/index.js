// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').ParsedConfig} ParsedConfig
 * @typedef {import('../../../../data/config-data').ParsedTheme} ParsedTheme
 * @typedef {import('../../../../data/config-data').ParsedTypography} ParsedTypography
 */

// Data imports
const { get_default_line_height } = require('../../../../data/config-data');

// Local functions
const { build_typography_variables } = require('./build-type-variables');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Takes a typography configuration and generates core rhythm units along with typography variables for font size and line height.
 *
 * @param {ParsedConfig} config The complete settings object
 * @param {ParsedTypography} typography The target typography configuration being used to generate the type units
 * @returns {{type_units: string, type_vars: string}} An object containing two strings; the first of which specifies vertical rhythm units, the second containing typography variables
 */
function generate_type_units(config, typography) {
  try {
    // Set working variables
    let type_units = '/* Core units */\n';
    let type_vars = '/* Font sizes and line heights */\n';
    // Create core rhythm units
    type_units = type_units + '--h2-base-font-size: ' + typography.size + ';\n';
    // Set the default line height (dlh) to the Hydrogen generic value to start
    let dlh = get_default_line_height();
    // Determine how the dlh is being set and create the base line height and base whitespace values accordingly
    if (typography.line_heights) {
      if (typography.line_heights.body && typography.line_heights.body != 'auto') {
        type_units = type_units + '--h2-base-line-height: ' + typography.line_heights.body + ';\n';
        type_units = type_units + '--h2-base-whitespace: ' + typography.line_heights.body + ';\n';
      } else if (typography.line_heights.copy && typography.line_heights.copy != 'auto') {
        type_units = type_units + '--h2-base-line-height: ' + typography.line_heights.copy + ';\n';
        type_units = type_units + '--h2-base-whitespace: ' + typography.line_heights.copy + ';\n';
      } else {
        type_units = type_units + '--h2-base-line-height: ' + dlh + ';\n';
        type_units = type_units + '--h2-base-whitespace: ' + dlh + ';\n';
      }
    } else if (typography.line_heights) {
      type_units = type_units + '--h2-base-line-height: ' + dlh + ';\n';
      type_units = type_units + '--h2-base-whitespace: ' + dlh + ';\n';
    } else if (typography.line_height) {
      type_units = type_units + '--h2-base-line-height: ' + typography.line_height + ';\n';
      type_units = type_units + '--h2-base-whitespace: ' + typography.line_height + ';\n';
    } else {
      type_units = type_units + '--h2-base-line-height: ' + dlh + ';\n';
      type_units = type_units + '--h2-base-whitespace: ' + dlh + ';\n';
    }
    // Generate font sizes and line heights
    type_vars = type_vars + build_typography_variables(config, typography);
    // Return the generated values as an object
    return {
      type_units: type_units,
      type_vars: type_vars,
    };
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Generating type units',
        error: error,
      };
    }
  }
}

module.exports = {
  generate_type_units,
};
