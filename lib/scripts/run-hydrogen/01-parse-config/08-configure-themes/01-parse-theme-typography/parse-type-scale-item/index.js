// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Typography} Typography
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Transforms a type-scale item's line-height into a usable value.
 *
 * Requires:
 * - config.themes.typography
 *
 * @param {Typography} type_config
 * @param {"caption" | "copy" | "h6" | "h5" | "h4" | "h3" | "h2" | "h1" | "display"} scale
 * @param {string | number} line_height
 * @returns {string | number}
 */
function parse_type_scale_item(type_config, scale, line_height) {
  try {
    // Check to see if the line_heights setting is set
    if (type_config.line_heights && type_config.line_heights[scale]) {
      let type = type_config.line_heights[scale];
      // Check to see if the setting is auto (if it is, keep the value the same), otherwise overwrite it
      if (type != 'auto') {
        if (typeof type === 'number') {
          line_height = type;
        } else if (typeof type === 'string') {
          line_height = parseFloat(type);
        }
      }
    }
    // Return the line_height
    return line_height;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing theme type scale setting',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_type_scale_item,
};
