// Hydrogen: Parse color
'use strict';

// Vendor dependencies
var Color = require('color');
var colors = require('colors');

// Hydrogen dependencies
var { h2_load_settings } = require('./load-settings');
var { h2_error_detail } = require('./logs');

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
      throw 'The tint_shade function was incorrectly called';
    }
  } catch (error) {
    return error;
  }
}

/**
 * Parse a color value and return a usable color
 * @param {{file: string, attribute: string}} instance the instance object, passed from the property data model
 * @param {string} property the property's property
 * @param {string} color_string the color value to be parsed
 * @returns {{type: string, color: string, fallback: string}} returns an object with color information, including the usable color string
 */
function parse_color_value(instance, property, color_string) {
  try {
    // Load the settings
    var settings = h2_load_settings();
    // Split the color string value
    var colorArray = color_string.split('.');
    // Get configured colors
    var userColors = settings.colors;
    // Get configured gradients
    var userGradients = settings.gradients;
    // Check to see if the string contains a configured color
    for (const color of userColors) {
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
            color.modifiers.forEach(function (config_modifier, config_index) {
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
    // No matching configured color exists, so check for a configured gradient
    if (
      property == 'bg-color' ||
      property == 'background-color' ||
      property == 'overlay' ||
      property == 'font-color' ||
      property == 'color'
    ) {
      for (const gradient of userGradients) {
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
    // The color wasn't a configured color or gradient, so use original value as a CSS value
    if (color_string.includes('.')) {
      h2_error_detail(
        'syntax',
        instance.attribute,
        instance.files,
        "this color value contains an invalid dot. If you were trying to use a modifier on a configured color, check to make sure you're using the correct key."
      );
      return null;
    } else {
      var final_color = {
        type: 'solid',
        color: color_string,
      };
      return final_color;
    }
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error_detail('generic', instance.attribute, instance.files, error);
    return null;
  }
}

module.exports = {
  base_modifiers,
  tint_shade,
  parse_color_value,
};
