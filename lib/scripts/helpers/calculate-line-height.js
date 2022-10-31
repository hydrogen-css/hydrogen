// Hydrogen: Calculate line height
'use strict';

// Hydrogen data models
let Settings = require('../../data/settings-model-definition');
/** @typedef {import('../../data/settings-model-definition').Settings} Settings */

// Hydrogen data imports

// Hydrogen core functions

// Hydrogen helper functions

// Hydrogen log functions
const { log_message } = require('../logs/log-message');

// Vendor imports

// Script

/**
 * @typedef {object} Args
 * @prop {Settings} settings
 * @prop {number} font_size
 * @prop {number} base_line_height
 */

/**
 * Calculates consistent line heights based on a vertical rhythm unit for a font size
 * @param {Args} args { settings, font_size, base_line_height }
 * @returns {number | false} number | false
 */
function calculate_line_height(args) {
  try {
    if (args.settings && typeof args.settings === 'object') {
      if (args.font_size && typeof args.font_size === 'number') {
        if (
          args.base_line_height &&
          typeof args.base_line_height === 'number'
        ) {
          try {
            // Create local variable references
            let font_size = args.font_size;
            let base_line_height = args.base_line_height;
            // Create storage variables to track line height counters
            let line_height_multiple = 0;
            let line_height_counter = 1;
            let line_height = base_line_height;
            // Multiply the base line height by the counter until it exceeds the font size
            do {
              line_height_multiple = base_line_height * line_height_counter;
              if (line_height_multiple < font_size) {
                line_height_counter = line_height_counter + 1;
              } else {
                line_height = line_height_multiple / font_size;
                return line_height;
              }
            } while (line_height_multiple < font_size);
          } catch (error) {
            log_message({
              type: 'error',
              settings: args.settings,
              step: 'Line height calculation',
              error: error,
            });
            return false;
          }
        } else {
          throw new Error(
            'The "base_line_height" option was missing or not a number.'
          );
        }
      } else {
        throw new Error('The "font_size" option was missing or not a number.');
      }
    } else {
      throw new Error('The settings object was missing or not an object.');
    }
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Line height calculation',
      error: error,
    });
    return false;
  }
}

module.exports = {
  calculate_line_height,
};
