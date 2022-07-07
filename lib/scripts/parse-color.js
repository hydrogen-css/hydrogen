// Hydrogen: Parse color

'use strict';

// Third party dependencies
var Color = require('color');
var colors = require('colors');

// Local dependencies
var { h2_load_settings } = require('./load-settings');
var { h2_error } = require('./logs');

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

function parseColor(property, colorString) {
  try {
    // Load the settings
    var settings = h2_load_settings();
    // Split the color string value
    var colorArray = colorString.split('.');
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
        var finalColor = {
          type: 'solid',
          color: modifiedColor,
        };
        return finalColor;
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
        if (colorString == gradient.key) {
          colorString = gradient.gradient;
          var fallbackColor = gradient.fallback;
          var finalColor = {
            type: 'gradient',
            color: colorString,
            fallback: fallbackColor,
          };
          return finalColor;
        }
      }
    }
    // The color wasn't a configured color or gradient, so use original value as a CSS value
    if (colorString.includes('.')) {
      var error =
        '"data-h2-'.red +
        property[0].red +
        '"'.red +
        ' is using a color (' +
        colorString.red +
        ") that contains an invalid dot. If you were trying to use a modifier on a configured color, check to make sure you're using the correct key.";
      h2_error(error);
      return null;
    } else {
      var finalColor = {
        type: 'solid',
        color: colorString,
      };
      return finalColor;
    }
  } catch (error) {
    h2_error(error);
    return null;
  }
}

module.exports = {
  base_modifiers,
  tint_shade,
  parseColor,
};
