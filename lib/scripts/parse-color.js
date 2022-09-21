// Hydrogen: Parse color
'use strict';

// Vendor dependencies
var Color = require('color');
var colors = require('colors');

// Hydrogen dependencies
var { log_info } = require('./logs/logs');

var base_modifiers = [
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

function tint_shade(base_modifiers, color, key) {
  try {
    var modifiedColor;
    var match = false;
    base_modifiers.forEach(function (modifier, index) {
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
      log_info(
        'error',
        'Automated color modifier error',
        'Generating automated color modifiers',
        null,
        null,
        null,
        null,
        'The tint/shade function was incorrectly called on a color value.'
      );
      return false;
    }
  } catch (error) {
    log_info(
      'error',
      'Unknown error',
      'Generating automated color modifiers',
      null,
      null,
      null,
      null,
      error
    );
    return false;
  }
}

/**
 * Parse a color value and return a usable color
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} color_string the color value to be parsed
 * @returns {{type: string, color: string, fallback: string}} returns an object with color information, including the usable color string
 */
function parse_color_value(settings, instance, property, color_string) {
  try {
    if (color_string == null || color_string === 'null') {
      log_info(
        'error',
        'Unknown error',
        'Parsing color values',
        instance.attribute,
        null,
        null,
        instance.files,
        'The color parser has been passed a null value as a color.'
      );
      return null;
    } else {
      // Split the color string for modifiers ==================================
      // The dot notation is used to separate modifiers and opacities
      var colorArray = color_string.split('.');
      // Check for and return user-set colors ==================================
      var color_settings = null;
      if (
        settings.styles.tokens != null &&
        settings.styles.tokens.colors != null &&
        settings.styles.tokens.colors.length != 0
      ) {
        // Get configured colors
        color_settings = settings.styles.tokens.colors;
        // Check to see if the string contains a configured color
        for (const color of color_settings) {
          // Check to see if the color is a configured color
          if (colorArray.includes(color.key) === true) {
            var modifiedColor = color.color;
            // Check for automated modifiers
            colorArray.forEach(function (set_modifier, set_index) {
              base_modifiers.forEach(function (base_modifier, base_index) {
                if (set_modifier === base_modifier.key) {
                  modifiedColor = tint_shade(
                    base_modifiers,
                    modifiedColor,
                    set_modifier
                  );
                }
              });
            });
            // Check for manual modifiers (and overwrite auto modifiers if necessary)
            if (color.modifiers != null && color.modifiers.length != 0) {
              colorArray.forEach(function (set_modifier, set_index) {
                color.modifiers.forEach(function (
                  config_modifier,
                  config_index
                ) {
                  if (set_modifier === config_modifier.key) {
                    modifiedColor = config_modifier.color;
                  }
                });
              });
            }
            // Check for opacity modifiers
            colorArray.forEach(function (set_modifier, set_index) {
              if (/^\d+$/.test(set_modifier) === true) {
                modifiedColor = Color(modifiedColor)
                  .alpha('.' + set_modifier)
                  .rgb()
                  .string();
              }
            });
            // Everything has been checked, return the color object
            var final_color = {
              type: 'solid',
              color: modifiedColor,
            };
            return final_color;
          }
        }
      }
      // Check for and return user-set gradients ===============================
      var gradient_settings = null;
      if (
        settings.styles.tokens != null &&
        settings.styles.tokens.gradients != null &&
        settings.styles.tokens.gradients.length != 0
      ) {
        // Get configured gradients
        gradient_settings = settings.styles.tokens.gradients;
        // No matching configured color exists, so check for a configured gradient
        if (
          property == 'bg-color' ||
          property == 'background-color' ||
          property == 'overlay' ||
          property == 'font-color' ||
          property == 'color'
        ) {
          for (const gradient of gradient_settings) {
            if (color_string == gradient.key) {
              color_string = gradient.gradient;
              var fallbackColor = gradient.fallback;
              var final_color = {
                type: 'gradient',
                color: color_string,
                fallback: fallbackColor,
              };
              return final_color;
            }
          }
        }
      }
      // Assume a CSS color value ==============================================
      var final_color = {
        type: 'solid',
        color: color_string,
      };
      return final_color;
    }
  } catch (error) {
    // Catch any errors ========================================================
    log_info(
      'error',
      'Unknown error',
      'Parsing color values',
      instance.attribute,
      null,
      null,
      instance.files,
      error
    );
    return null;
  }
}

module.exports = {
  base_modifiers,
  tint_shade,
  parse_color_value,
};
