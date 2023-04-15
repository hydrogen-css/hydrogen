// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Calculates consistent line heights based on a vertical rhythm unit for a font size
 * @param {number} font_size
 * @param {number} base_line_height
 * @returns {number}
 */
function calculate_line_height(font_size, base_line_height) {
  try {
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
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Calculating line height',
        error: error,
      };
    }
  }
}

module.exports = {
  calculate_line_height,
};
