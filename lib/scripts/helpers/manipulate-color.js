// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/config-data').ParsedConfig} ParsedConfig
 */

// Data imports
const { get_color_modifier_data } = require('../../data/color-modifiers-data');

// Local functions

// Helper functions
const { log_message } = require('../logging/log-message');

// Vendor imports
var Color = require('color');

// Script ==========================================================================================

/**
 * Tints or shades a color value
 * @param {ParsedConfig} settings The user's settings
 * @param {string} mode The mode requested for the color
 * @param {string} color The color to be manipulated
 * @param {string} key The modifier key, used to access the base modifier data
 * @returns {string | false}
 */
function manipulate_color(settings, mode, color, key) {
  try {
    let modifiedColor;
    let match = false;
    let modifier_data = get_color_modifier_data();
    modifier_data.forEach((modifier) => {
      if (modifier.key === key) {
        match = true;
        let alpha = Color(color).alpha();
        if (mode === 'dark' && settings.modes.dark.swap_default_modifiers === true) {
          modifiedColor = Color(color)
            .saturate(0.2)
            .mix(Color('rgba(' + modifier.dark.mixer + ',' + alpha + ')'), modifier.value) // Modify the saturation and hue
            .rgb()
            .string(); // Convert the color to RGBA
        } else {
          modifiedColor = Color(color)
            .saturate(0.2)
            .mix(Color('rgba(' + modifier.mixer + ',' + alpha + ')'), modifier.value) // Modify the saturation and hue
            .rgb()
            .string(); // Convert the color to RGBA
        }
      }
    });
    if (match === true) {
      return modifiedColor;
    } else {
      throw new Error(
        'There was an invalid modifier when trying to manipulate a color value: ' + key
      );
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    log_message({
      type: 'error',
      settings: settings,
      step: 'Color manipulation',
      error: error,
    });
    return false;
  }
}

module.exports = {
  manipulate_color,
};
