// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../data/settings-model-definition').Typography} Typography
 */

// Data imports

// Logging

// Functions
const { build_typography_variables } = require('./build-typography-variables');
const { get_default_line_height } = require('../../data/config-data');

// Vendor imports

// Scripts
/**
 * Takes a typography configuration and generates core rhythm units along with typography variables for font size and line height
 * @param {Settings} settings The complete settings object
 * @param {Typography} type_config The target typography configuration being used to generate the type units
 * @returns {{type_units: string, type_vars: string}} An object containing two strings; the first of which specifies vertical rhythm units, the second containing typography variables
 */
function generate_type_units(settings, type_config) {
  try {
    // Set working variables
    let type_units = '/* Core units */\n';
    let type_vars = '/* Font sizes and line heights */\n';
    // Create core rhythm units
    type_units = type_units + '--h2-base-font-size: ' + type_config.size + ';\n';
    // Set the default line height (dlh) to the Hydrogen generic value to start
    let dlh = get_default_line_height();
    // Determine how the dlh is being set and create the base line height and base whitespace values accordingly
    if (type_config.line_heights && type_config.line_heights.copy) {
      type_units = type_units + '--h2-base-line-height: ' + type_config.line_heights.copy + ';\n';
      type_units = type_units + '--h2-base-whitespace: ' + type_config.line_heights.copy + ';\n';
    } else if (type_config.line_heights) {
      type_units = type_units + '--h2-base-line-height: ' + dlh + ';\n';
      type_units = type_units + '--h2-base-whitespace: ' + dlh + ';\n';
    } else if (type_config.line_height) {
      type_units = type_units + '--h2-base-line-height: ' + type_config.line_height + ';\n';
      type_units = type_units + '--h2-base-whitespace: ' + type_config.line_height + ';\n';
    } else {
      type_units = type_units + '--h2-base-line-height: ' + dlh + ';\n';
      type_units = type_units + '--h2-base-whitespace: ' + dlh + ';\n';
    }
    // Generate font sizes and line heights
    type_vars = type_vars + build_typography_variables(settings, type_config);
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
