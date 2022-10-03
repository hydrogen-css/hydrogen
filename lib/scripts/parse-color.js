// Hydrogen: Parse color
'use strict';

// Hydrogen type imports
let Settings = require('../data/settings-model-definition');
/**
 * @typedef {import('../data/settings-model-definition').Settings} Settings
 */
let Properties = require('../data/property-model-definition');
/**
 * @typedef {import('../data/property-model-definition').PropertyKeyInstances} Instance
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('./logs/log-message');
// Vendor imports
var Color = require('color');
var colors = require('colors');

/**
 * @typedef {{key: string, mixer: string, value: float}} Modifier
 */

/**
 * @typedef {Modifier[]} BaseModifiers
 */
let base_modifiers = [
  {
    key: 'light',
    mixer: 'white',
    value: 0.25,
  },
  {
    key: 'lighter',
    mixer: 'white',
    value: 0.5,
  },
  {
    key: 'lightest',
    mixer: 'white',
    value: 0.75,
  },
  {
    key: 'dark',
    mixer: 'black',
    value: 0.25,
  },
  {
    key: 'darker',
    mixer: 'black',
    value: 0.5,
  },
  {
    key: 'darkest',
    mixer: 'black',
    value: 0.75,
  },
];

/**
 * Tints or shades a color value
 * @param {BaseModifiers} base_modifiers
 * @param {string} color
 * @param {string} key
 * @returns {string | false} A modified color value
 */
function tint_shade(base_modifiers, color, key) {
  try {
    let modifiedColor;
    let match = false;
    base_modifiers.forEach(function (modifier) {
      if (modifier.key === key) {
        match = true;
        modifiedColor = Color(color)
          .saturate(0.2)
          .mix(Color(modifier.mixer), modifier.value) // Modify the saturation and hue
          .rgb()
          .string(); // Convert the color to RGBA
      }
    });
    if (match === true) {
      return modifiedColor;
    } else {
      log_message({
        type: 'error',
        step: 'Building automatic color modifiers',
        message:
          'The tint/shade function was incorrectly called on a color value.',
      });
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Building automatic color modifiers',
      message: error,
    });
    return false;
  }
}

/**
 * @typedef {{type: string, color: string, fallback?: string}} ColorOutput
 */

/**
 * Parse a color value and return a usable color
 * @param {Settings} settings The user's settings
 * @param {Instance} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} color_string the color value to be parsed
 * @returns {ColorOutput | false} returns an object with color information, including the usable color string
 */
function parse_color_value(settings, instance, property, color_string) {
  try {
    /**
     * @type {ColorOutput}
     */
    let final_color = {};
    // Check to see if the color string that was passed is null, and if it is throw an error
    if (color_string == null || color_string === 'null') {
      log_message({
        type: 'error',
        step: 'Parsing color values',
        attribute: instance.attribute,
        files: instance.files,
        message: 'The color parser has been passed a null value as a color.',
      });
      return false;
    } else {
      // Split the color string for modifiers
      // The dot notation is used to separate modifiers and opacities
      let color_array = color_string.split('.');
      // Check for and return user-set colors
      let color_settings = null;
      if (
        settings.styles.tokens &&
        settings.styles.tokens.colors &&
        settings.styles.tokens.colors.length > 0
      ) {
        // Get configured colors
        color_settings = settings.styles.tokens.colors;
        // Check to see if the string contains a configured color
        for (const color of color_settings) {
          // Check to see if the color is a configured color
          if (color_array.includes(color.key) === true) {
            let modifier_color = color.color;
            // Check for automated modifiers
            color_array.forEach(function (set_modifier) {
              base_modifiers.forEach(function (base_modifier) {
                if (set_modifier === base_modifier.key) {
                  modifier_color = tint_shade(
                    base_modifiers,
                    modifier_color,
                    set_modifier
                  );
                }
              });
            });
            // Check for manual modifiers (and overwrite auto modifiers if necessary)
            if (color.modifiers != null && color.modifiers.length != 0) {
              color_array.forEach(function (set_modifier) {
                color.modifiers.forEach(function (config_modifier) {
                  if (set_modifier === config_modifier.key) {
                    modifier_color = config_modifier.color;
                  }
                });
              });
            }
            // Check for opacity modifiers
            color_array.forEach(function (set_modifier) {
              if (/^\d+$/.test(set_modifier) === true) {
                modifier_color = Color(modifier_color)
                  .alpha('.' + set_modifier)
                  .rgb()
                  .string();
              }
            });
            // Everything has been checked, return the color object
            final_color.type = 'solid';
            final_color.color = modifier_color;
            return final_color;
          }
        }
      }
      // Check for and return user-set gradients
      if (
        settings.styles.tokens &&
        settings.styles.tokens.gradients &&
        settings.styles.tokens.gradients.length > 0
      ) {
        // Get configured gradients
        let gradient_settings = settings.styles.tokens.gradients;
        // Ensure that the property supports gradients
        if (
          property == 'bg-color' ||
          property == 'background-color' ||
          property == 'overlay' ||
          property == 'font-color' ||
          property == 'color'
        ) {
          // Loop through the gradient settings to check for a matching key
          for (const gradient of gradient_settings) {
            if (color_string === gradient.key) {
              // A matching key was found, so set the final color values and return it
              final_color.type = 'gradient';
              final_color.color = gradient.gradient;
              final_color.fallback = gradient.fallback;
              return final_color;
            }
          }
        }
      }
      // Neither a configured color or gradient matched, so assume a CSS color value
      (final_color.type = 'solid'), (final_color.color = color_string);
      return final_color;
    }
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Parsing color values',
      attribute: instance.attribute,
      files: instance.files,
      message: error,
    });
    return false;
  }
}

module.exports = {
  base_modifiers,
  tint_shade,
  parse_color_value,
};
