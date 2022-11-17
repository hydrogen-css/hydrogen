// Hydrogen: Basic property parsing
'use strict';

// Hydrogen data models
let Settings = require('../../data/settings-model-definition');
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
let Properties = require('../../data/property-model-definition');
/**
 * @typedef {import('../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../data/property-model-definition').Property} Property
 * @typedef {import('../../data/property-model-definition').Instance} Instance
 * @typedef {import('../../data/property-model-definition').Value} Value
 */

// Hydrogen data imports
const color_props = require('../../data/properties-color');
const gradient_props = require('../../data/properties-gradient');
const space_props = require('../../data/properties-space');

// Hydrogen function imports

// Vendor imports

// Script

/**
 *
 * @param {Settings} settings
 * @param {Value} value
 * @param {{color: string, modifier: string, opacity: string}} groups
 */
function process_color_value(settings, value, groups) {
  try {
    let mode = value.modifiers.mode;
    let theme = value.modifiers.theme;
    if (
      settings.themes[theme] &&
      settings.themes[theme].colors &&
      settings.themes[theme].colors.length > 0
    ) {
      let color = false;
      settings.themes[theme].colors.forEach((color_setting) => {
        if (groups.color === color_setting.key) {
          let modifier = color_setting.var_data.name;
          let opacity = 1;
          if (groups.modifier) {
            if (!Array.isArray(groups.modifier)) {
              if (
                color_setting[mode] &&
                color_setting[mode].modifiers &&
                color_setting[mode].modifiers.length > 0
              ) {
                color_setting[mode].modifiers.forEach((modifier_setting) => {
                  if (groups.modifier.substring(1) === modifier_setting.key) {
                    modifier = modifier_setting.var_data.name;
                  }
                });
              } else {
                throw new Error(
                  "Modifiers haven't been defined for this mode."
                );
              }
            } else {
              throw new Error(
                "You're trying to use more than one modifier on a color."
              );
            }
          }
          if (groups.opacity) {
            opacity = parseFloat(groups.opacity.substring(1));
            // Convert the number to a working opacity value
            if (opacity >= 100) {
              opacity = 1;
            } else if (opacity === 0) {
              opacity = 0;
            } else {
              opacity = opacity / 100;
            }
          }
          if (mode === 'all') {
            color = 'rgba(var(' + modifier + '-locked), ' + opacity + ')';
          } else {
            color = 'rgba(var(' + modifier + '), ' + opacity + ')';
          }
        }
      });
      if (color) {
        return color;
      } else {
        throw new Error('No matching color was found in this theme.');
      }
    } else {
      throw new Error('No theme exists that matches this attribute.');
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 *
 * @param {Settings} settings
 * @param {Value} value
 * @param {{gradient: string}} groups
 * @returns {string | false}
 */
function process_gradient_value(settings, value, groups) {
  try {
    let mode = value.modifiers.mode;
    let theme = value.modifiers.theme;
    if (
      settings.themes[theme] &&
      settings.themes[theme].gradients &&
      settings.themes[theme].gradients.length > 0
    ) {
      let gradient = false;
      settings.themes[theme].gradients.forEach((gradient_setting) => {
        if (groups.gradient === gradient_setting.key) {
          let modifier = gradient_setting.key;
          if (mode === 'all') {
            gradient = 'var(--h2-gradient-' + modifier + '-locked)';
          } else {
            gradient = 'var(--h2-gradient-' + modifier + ')';
          }
        }
      });
      if (gradient) {
        return gradient;
      } else {
        throw new Error('No matching gradient was found in this theme.');
      }
    } else {
      throw new Error('No theme exists that matches this attribute.');
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 *
 * @param {Settings} settings
 * @param {Value} value
 * @param {{negative: '-', integer: number, float: number}} groups
 */
function process_space_value(settings, value, groups) {
  try {
    let negative = '';
    if (groups.negative) {
      negative = '-';
    }
    let integer = '';
    if (groups.integer) {
      integer = groups.integer.toString();
    }
    let float = '';
    if (groups.float) {
      float = '.' + groups.float.toString();
    }
    let number = negative + integer + float;
    // Do the math
    let processed_value =
      'calc((' + number + ' * var(--h2-base-whitespace)) * 1rem)';
    return processed_value;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Parse simple Hydrogen properties and return CSS
 * @param {Settings} settings The user's settings
 * @param {string} property The actual property key
 * @param {Property} prop_data The property's full data model
 * @param {Instance} prop_instance The attribute's instance
 * @param {Value} prop_value The query value's data
 * @returns {Promise<string[]>} An array of strings containing CSS selectors and their values
 */
function parse_property(
  settings,
  property,
  prop_data,
  prop_instance,
  prop_value
) {
  try {
    // TEMPORARY - create color and gradient settings
    let color_settings = [];
    let gradient_settings = [];
    let themes = settings.themes;
    Object.keys(themes).forEach((key) => {
      let theme = themes[key];
      if (theme.colors && theme.colors.length > 0) {
        theme.colors.forEach((theme_color) => {
          if (color_settings.length === 0) {
            color_settings = color_settings.concat(theme_color.key);
          } else {
            if (!color_settings.includes(theme_color.key)) {
              color_settings = color_settings.concat(theme_color.key);
            }
          }
        });
      }
      if (theme.gradients && theme.gradients.length > 0) {
        theme.gradients.forEach((theme_gradient) => {
          if (gradient_settings.length === 0) {
            gradient_settings = gradient_settings.concat(theme_gradient.key);
          } else {
            if (!gradient_settings.includes(theme_gradient.key)) {
              gradient_settings = gradient_settings.concat(theme_gradient.key);
            }
          }
        });
      }
    });
    // Create an empty array to store each selector and its CSS
    let attribute_css = [];
    // Create an empty string for the concatenated CSS to be assigned to each selector
    let css_string = '';
    // Create an alias for the selectors
    let selectors = prop_value.selectors;
    // Create an alias for the query options
    let option = prop_value.options[0];
    // Check to ensure there's an option
    if (option.length >= 1) {
      // Parse for color values and process them
      if (color_props.indexOf(property) !== -1) {
        let parsed_colors = [];
        let processed_colors = [];
        // Loop through the color settings to grab color keys for building the regex
        color_settings.forEach((color_setting) => {
          // Create the color expression
          let color_regex = new RegExp(
            '(' + color_setting + '(?![a-zA-Z]))(\\.+[a-zA-Z]+)*(\\.+[0-9]+)*',
            'gm'
          );
          // Find color matches
          let matches;
          while ((matches = color_regex.exec(option)) !== null) {
            if (matches.index === color_regex.lastIndex) {
              color_regex.lastIndex++;
            }
            parsed_colors.push({
              match: matches[0],
              groups: {
                color: matches[1],
                modifier: matches[2],
                opacity: matches[3],
              },
            });
          }
        });
        // Process color matches
        parsed_colors.forEach((parsed_color) => {
          let processed_color_data = {
            match: parsed_color.match,
            processed: process_color_value(
              settings,
              prop_value,
              parsed_color.groups
            ),
          };
          if (processed_color_data.processed) {
            processed_colors = processed_colors.concat(processed_color_data);
          } else {
            throw new Error('Something messed up while processing a color');
          }
        });
        // Replace color matches with processed values
        processed_colors.forEach((pair) => {
          option = option.replace(pair.match, pair.processed);
        });
      }
      // Parse for gradient values and process them
      if (gradient_props.indexOf(property) !== -1) {
        let parsed_gradients = [];
        let processed_gradients = [];
        // Loop through the gradient settings to grab gradient keys for building the regex
        gradient_settings.forEach((gradient_setting) => {
          // Create the gradient expression
          let gradient_regex = new RegExp(
            '(' + gradient_setting + '(?![a-zA-Z]))',
            'gm'
          );
          // Find gradient matches
          let matches;
          while ((matches = gradient_regex.exec(option)) !== null) {
            if (matches.index === gradient_regex.lastIndex) {
              gradient_regex.lastIndex++;
            }
            parsed_gradients.push({
              match: matches[0],
              groups: {
                gradient: matches[1],
              },
            });
          }
        });
        // Process gradient matches
        parsed_gradients.forEach((parsed_gradient) => {
          let processed_gradient_data = {
            match: parsed_gradient.match,
            processed: process_gradient_value(
              settings,
              prop_value,
              parsed_gradient.groups
            ),
          };
          if (processed_gradient_data.processed) {
            processed_gradients = processed_gradients.concat(
              processed_gradient_data
            );
          } else {
            throw new Error('Something messed up while processing a gradient');
          }
        });
        // Replace gradient matches with processed values
        processed_gradients.forEach((pair) => {
          option = option.replace(pair.match, pair.processed);
        });
      }
      // Parse for space values and process them
      if (space_props.indexOf(property) !== -1) {
        let parsed_space = [];
        let processed_space = [];
        // Create the multiplier expression
        // To note about this expression: it also matches the "x" in "px", so we have to check that the expression also matched a number before adding it to the processing array below
        let space_regex = new RegExp('(-?)(x{1})([0-9]*)(\\.?)([0-9]*)', 'gm');
        // Find space matches
        let matches;
        while ((matches = space_regex.exec(option)) !== null) {
          if (matches.index === space_regex.lastIndex) {
            space_regex.lastIndex++;
          }
          let negative = false;
          if (matches[1]) {
            negative = matches[1];
          }
          let integer = false;
          if (matches[3]) {
            integer = matches[3];
          }
          let float = false;
          if (matches[5]) {
            float = matches[5];
          }
          if (integer == false && float == false) {
            // Do nothing
          } else {
            parsed_space.push({
              match: matches[0],
              groups: {
                negative: negative,
                integer: integer,
                float: float,
              },
            });
          }
        }
        // Process space matches
        parsed_space.forEach((parsed_space) => {
          let processed_space_data = {
            match: parsed_space.match,
            processed: process_space_value(
              settings,
              prop_value,
              parsed_space.groups
            ),
          };
          if (processed_space_data.processed) {
            processed_space = processed_space.concat(processed_space_data);
          } else {
            throw new Error(
              'Something messed up while processing a space multiplier'
            );
          }
        });
        // Replace space matches with processed values
        processed_space.forEach((pair) => {
          option = option.replace(pair.match, pair.processed);
        });
      }
    }
    // Check option validity and build the CSS
    if (option) {
      // Create the CSS string
      css_string = '{' + property + ': ' + option + ';}';
    } else {
      throw new Error('Somewhere, the parsing failed');
    }
    // Assemble and return the CSS array
    selectors.forEach((selector) => {
      attribute_css = attribute_css.concat(selector + css_string);
    });
    return attribute_css;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  parse_property,
};
