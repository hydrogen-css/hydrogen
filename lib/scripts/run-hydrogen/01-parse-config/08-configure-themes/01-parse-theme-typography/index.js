// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').Query} Query
 * @typedef {import('../../../../../data/config-data').Typography} Typography
 * @typedef {import('../../../../../data/config-data').ParsedTypography} ParsedTypography
 */

// Data imports
const { get_default_line_height } = require('../../../../../data/config-data');

// Local functions
const { parse_type_scale_item } = require('./parse-type-scale-item');

// Helper functions
const { calculate_line_height } = require('./calculate-line-height');

// Vendor imports

// Script ==========================================================================================

/**
 * Parses individual typography configurations and generates helpful variable data for size and line-height.
 *
 * Requires:
 * - config.media
 * - config.themes.typography
 *
 * @param {Config} config
 * @param {Typography} type_config
 * @returns {ParsedTypography}
 */
function parse_theme_typography(config, type_config) {
  try {
    // Double check that queries exist in the config and loop through them to find the query that matches the type config's query_key
    if (config.media && config.media.queries && config.media.queries.length > 0) {
      /** @type {Query} */
      config.media.queries.forEach((query) => {
        if (type_config.query_key === query.key) {
          type_config.query = query.query;
        }
      });
    } else {
      throw new Error(
        'No media queries have been defined. This is likely a problem with Hydrogen.'
      );
    }
    // Grab the default line height setting
    let numeric_line_height = get_default_line_height();
    // Check for body setting syntax
    let body = 'body';
    // Check for the line_heights configuration and whether it includes a "body" or "copy" value, and if not, check for the deprecated line_height value and use that, then override Hydrogen's default if a value is found
    if (type_config.line_heights) {
      if (type_config.line_heights.body) {
        if (typeof type_config.line_heights.body === 'number') {
          numeric_line_height = type_config.line_heights.body;
        } else if (
          typeof type_config.line_heights.body === 'string' &&
          type_config.line_heights.body != 'auto'
        ) {
          numeric_line_height = parseFloat(type_config.line_heights.body);
        }
      } else if (type_config.line_heights.copy) {
        // This setting is deprecated in favor of "body"
        body = 'copy';
        if (typeof type_config.line_heights.copy === 'number') {
          numeric_line_height = type_config.line_heights.copy;
        } else if (
          typeof type_config.line_heights.copy === 'string' &&
          type_config.line_heights.copy != 'auto'
        ) {
          numeric_line_height = parseFloat(type_config.line_heights.copy);
        }
      }
    } else if (type_config.line_height) {
      // This setting is deprecated but is being kept for backwards compatibility; it can be a string or number value
      if (typeof type_config.line_height === 'number') {
        numeric_line_height = type_config.line_height;
      } else if (typeof type_config.line_height === 'string' && type_config.line_height != 'auto') {
        numeric_line_height = parseFloat(type_config.line_height);
      }
    }
    // Convert the type_scale to a number if it's a string
    let parsed_type_scale = 0;
    if (typeof type_config.type_scale === 'number') {
      parsed_type_scale = type_config.type_scale;
    } else if (typeof type_config.type_scale === 'string') {
      parsed_type_scale = parseFloat(type_config.type_scale);
    }
    // Calculate and set the caption scales
    let caption_size = 1 / parsed_type_scale;
    let default_caption_lh = 'calc(var(--h2-base-line-height) * 1rem)';
    let caption_lh = parse_type_scale_item(type_config, 'caption', default_caption_lh);
    type_config.caption = {
      size: 'calc(var(--h2-font-size-copy) / ' + parsed_type_scale + ')',
      line_height: caption_lh,
    };
    // Calculate and set the body/paragraph scales
    let copy_size = 1;
    let default_copy_lh = 'var(--h2-base-line-height)';
    let copy_lh = parse_type_scale_item(type_config, body, default_copy_lh);
    type_config.body = {
      size: copy_size + 'rem',
      line_height: copy_lh,
    };
    // Calculate and set the h6 scales
    let h6_size = 1 * parsed_type_scale;
    let default_h6_lh = calculate_line_height(h6_size, numeric_line_height);
    let h6_lh = parse_type_scale_item(type_config, 'h6', default_h6_lh);
    type_config.h6 = {
      size: 'calc(var(--h2-font-size-copy) * ' + parsed_type_scale + ')',
      line_height: h6_lh,
    };
    // Calculate and set the h5 scales
    let h5_size = h6_size * parsed_type_scale;
    let default_h5_lh = calculate_line_height(h5_size, numeric_line_height);
    let h5_lh = parse_type_scale_item(type_config, 'h5', default_h5_lh);
    type_config.h5 = {
      size: 'calc(var(--h2-font-size-h6) * ' + parsed_type_scale + ')',
      line_height: h5_lh,
    };
    // Calculate and set the h4 scales
    let h4_size = h5_size * parsed_type_scale;
    let default_h4_lh = calculate_line_height(h4_size, numeric_line_height);
    let h4_lh = parse_type_scale_item(type_config, 'h4', default_h4_lh);
    type_config.h4 = {
      size: 'calc(var(--h2-font-size-h5) * ' + parsed_type_scale + ')',
      line_height: h4_lh,
    };
    // Calculate and set the h3 scales
    let h3_size = h4_size * parsed_type_scale;
    let default_h3_lh = calculate_line_height(h3_size, numeric_line_height);
    let h3_lh = parse_type_scale_item(type_config, 'h3', default_h3_lh);
    type_config.h3 = {
      size: 'calc(var(--h2-font-size-h4) * ' + parsed_type_scale + ')',
      line_height: h3_lh,
    };
    // Calculate and set the h2 scales
    let h2_size = h3_size * parsed_type_scale;
    let default_h2_lh = calculate_line_height(h2_size, numeric_line_height);
    let h2_lh = parse_type_scale_item(type_config, 'h2', default_h2_lh);
    type_config.h2 = {
      size: 'calc(var(--h2-font-size-h3) * ' + parsed_type_scale + ')',
      line_height: h2_lh,
    };
    // Calculate and set the h1 scales
    let h1_size = h2_size * parsed_type_scale;
    let default_h1_lh = calculate_line_height(h1_size, numeric_line_height);
    let h1_lh = parse_type_scale_item(type_config, 'h1', default_h1_lh);
    type_config.h1 = {
      size: 'calc(var(--h2-font-size-h2) * ' + parsed_type_scale + ')',
      line_height: h1_lh,
    };
    // Calculate and set the display scales
    let display_size = h1_size * parsed_type_scale;
    let default_display_lh = calculate_line_height(display_size, numeric_line_height);
    let display_lh = parse_type_scale_item(type_config, 'display', default_display_lh);
    type_config.display = {
      size: 'calc(var(--h2-font-size-h1) * ' + parsed_type_scale + ')',
      line_height: display_lh,
    };
    // Return the parsed type config
    return type_config;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing theme typography',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_theme_typography,
};
