// Hydrogen: Parse color
'use strict';

// Hydrogen data models
let Settings = require('../data/settings-model-definition');
/** @typedef {import('../data/settings-model-definition').Settings} Settings */
let Properties = require('../data/property-model-definition');
/**
 * @typedef {import('../data/property-model-definition').Property} Property
 * @typedef {import('../data/property-model-definition').Instance} Instance
 * @typedef {import('../data/property-model-definition').Value} Value
 */

// Hydrogen data imports

// Hydrogen function imports
const { log_message } = require('./logs/log-message');

// Vendor imports
var Color = require('color');

/**
 * @typedef {object} Modifier
 * @prop {string} key
 * @prop {string} mixer
 * @prop {float} value
 */

/** @typedef {Modifier[]} BaseModifiers */
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
 * @returns {string | false}
 */
function tint_shade(settings, base_modifiers, color, key) {
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
      log_message(settings, {
        type: 'error',
        step: 'Building automatic color modifiers',
        message:
          'The tint/shade function was incorrectly called on a color value.',
      });
      return false;
    }
  } catch (error) {
    log_message(settings, {
      type: 'error',
      step: 'Building automatic color modifiers',
      message: error,
    });
    return false;
  }
}

/** @typedef {{type: string, color: string, fallback?: string}} ColorOutput */

/**
 * Parse a color value and return a usable color
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @param {string} input The input to be parsed
 * @returns {ColorOutput | false}
 */
function parse_color_value(
  settings,
  property,
  prop_data,
  prop_instance,
  prop_value,
  color_string
) {
  try {
    // Create an object to store the final color data
    /** @type {ColorOutput} */
    let final_color = {};
    let mode = prop_value.modifiers.mode;
    let theme = prop_value.modifiers.theme;
    // Check to see if the color string that was passed is null, and if it is throw an error
    if (color_string) {
      // Split the color string for modifiers
      // The dot notation is used to separate modifiers and opacities
      let color_array = color_string.split('.');
      if (
        settings.themes[theme].colors &&
        settings.themes[theme].colors.length > 0
      ) {
        let match = false;
        settings.themes[theme].colors.forEach(function (color_setting) {
          color_array.forEach(function (color_item, index) {
            if (color_item === color_setting.key) {
              // You have a matching color
              match = color_setting;
              color_array.splice(index, 1);
            }
          });
        });
        if (match) {
          // now do stuff
          // If there's only one modifier value, skip all the hard stuff and apply the color variable
          if (color_array.length === 0) {
            if (mode === 'all') {
              final_color = {
                type: 'solid',
                color: 'rgba(var(' + match.var_data.name + '-locked), 1)',
              };
            } else {
              final_color = {
                type: 'solid',
                color: 'rgba(var(' + match.var_data.name + '), 1)',
              };
            }
            return final_color;
          } else {
            // Grab the relevant variable and only parse the color if it contains a opacity modifier
            // Check for an opacity modifier first
            let opacity_modifier = false;
            color_array.forEach(function (color_item, index) {
              if (/^\d+$/.test(color_item) === true) {
                opacity_modifier = color_item;
                color_array.splice(index, 1);
              }
            });
            let color_modifier = false;
            color_array.forEach(function (color_item) {
              // Check for matching modifiers
              if (
                match[mode] &&
                match[mode].modifiers &&
                match[mode].modifiers.length > 0
              ) {
                // The mode used by the query has modifiers, so check these first
                match[mode].modifiers.forEach(function (modifier) {
                  if (color_item === modifier.key) {
                    color_modifier = modifier;
                  }
                });
              }
              // No modifiers were found in the declared mode, so check the default mode
              if (
                !color_modifier &&
                match['default'] &&
                match['default'].modifiers &&
                match['default'].modifiers.length > 0
              ) {
                match['default'].modifiers.forEach(function (modifier) {
                  if (color_item === modifier.key) {
                    color_modifier = modifier;
                  }
                });
              }
            });
            if (color_modifier && !opacity_modifier) {
              // Simply return the color as is
              if (mode === 'all') {
                final_color = {
                  type: 'solid',
                  // prettier-ignore
                  color: 'rgba(var(' + color_modifier.var_data.name + '-locked), 1)',
                };
              } else {
                final_color = {
                  type: 'solid',
                  // prettier-ignore
                  color: 'rgba(var(' + color_modifier.var_data.name + '), 1)',
                };
              }
              return final_color;
            } else if (opacity_modifier) {
              // Check to see if a modifier was found
              let color_name = match.var_data.name;
              if (color_modifier) {
                color_name = color_modifier.var_data.name;
              }
              // Convert the stringified number to a number
              opacity_modifier = parseFloat(opacity_modifier);
              // Convert the number to a working opacity value
              if (opacity_modifier >= 100) {
                opacity_modifier = 1;
              } else if (opacity_modifier === 0) {
                opacity_modifier = 0;
              } else {
                opacity_modifier = opacity_modifier / 100;
              }
              // Apply the value to the RGBA function
              if (mode === 'all') {
                final_color = {
                  type: 'solid',
                  // prettier-ignore
                  color: 'rgba(var(' + color_name + '-locked), ' + opacity_modifier + ')',
                };
              } else {
                final_color = {
                  type: 'solid',
                  // prettier-ignore
                  color: 'rgba(var(' + color_name + '), ' + opacity_modifier + ')',
                };
              }
              return final_color;
            } else {
              // There were modifiers but none of them matched keys or opacity values
              if (mode === 'all') {
                final_color = {
                  type: 'solid',
                  color: 'rgba(var(' + match.var_data.name + '-locked), 1)',
                };
              } else {
                final_color = {
                  type: 'solid',
                  color: 'rgba(var(' + match.var_data.name + '), 1)',
                };
              }
              log_message({
                type: 'warning',
                settings: settings,
                step: 'Parsing color values',
                attribute: prop_instance.attribute,
                query: prop_value.query,
                files: prop_instance.files,
                message:
                  "This color is trying to use a modifier that isn't found in your configuration.",
              });
              return final_color;
            }
          }
        } else {
          // not a color token
        }
      }
      if (
        settings.themes[theme].gradients &&
        settings.themes[theme].gradients.length > 0
      ) {
        let match = false;
        // Ensure we're working with a property that supports gradient values
        if (
          property == 'bg-color' ||
          property == 'background-color' ||
          property == 'overlay' ||
          property == 'font-color' ||
          property == 'color'
        ) {
          settings.themes[theme].gradients.forEach(function (gradient_setting) {
            if (color_array.includes(gradient_setting.key) === true) {
              match = gradient_setting;
            }
          });
          if (match) {
            if (mode === 'all') {
              final_color = {
                type: 'gradient',
                color: 'var(--h2-gradient-' + match.key + '-locked)',
                fallback:
                  'var(--h2-gradient-fallback-' + match.key + '-locked)',
              };
            } else {
              final_color = {
                type: 'gradient',
                color: 'var(--h2-gradient-' + match.key + ')',
                fallback: 'var(--h2-gradient-fallback-' + match.key + ')',
              };
            }
            return final_color;
          } else {
            // Not a gradient token
          }
        }
      }
      // If it made it this far, the color is custom
      final_color = {
        type: 'solid',
        color: color_string,
      };
      return final_color;
    } else {
      log_message({
        type: 'error',
        settings: settings,
        step: 'Parsing color values',
        attribute: prop_instance.attribute,
        query: prop_value.query,
        files: prop_instance.files,
        message: 'The color parser has been passed a null value as a color.',
      });
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      settings: settings,
      step: 'Parsing color values',
      attribute: prop_instance.attribute,
      query: prop_value.query,
      files: prop_instance.files,
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
