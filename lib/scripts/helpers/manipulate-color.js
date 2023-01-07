// Hydrogen: Manipulate color
'use strict';

// Hydrogen data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */

// Hydrogen data imports
const { get_modifier_data } = require('../../data/modifiers-model');

// Hydrogen function imports
const { log_message } = require('../logging/log-message');

// Vendor imports
var Color = require('color');

// Scripts

/**
 * Tints or shades a color value
 * @param {Settings} settings The user's settings
 * @param {string} color The color to be manipulated
 * @param {string} key The modifier key, used to access the base modifier data
 * @returns {string | false}
 */
function manipulate_color(settings, color, key) {
  try {
    let modifiedColor;
    let match = false;
    let modifier_data = get_modifier_data();
    modifier_data.forEach(function (modifier) {
      if (modifier.key === key) {
        match = true;
        let alpha = Color(color).alpha();
        modifiedColor = Color(color)
          .saturate(0.2)
          .mix(
            Color('rgba(' + modifier.mixer + ',' + alpha + ')'),
            modifier.value
          ) // Modify the saturation and hue
          .rgb()
          .string(); // Convert the color to RGBA
      }
    });
    if (match === true) {
      return modifiedColor;
    } else {
      throw new Error(
        'There was an invalid modifier when trying to manipulate a color value: ' +
          key
      );
    }
  } catch (error) {
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
