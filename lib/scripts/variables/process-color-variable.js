// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../data/settings-model-definition').ColorSetting} ColorSetting
 */

// Data imports
const { get_color_modifier_data } = require('../../data/color-modifiers-data');

// Logging

// Functions
const { manipulate_color } = require('../helpers/manipulate-color');

// Vendor imports
var Color = require('color');

// Scripts
/**
 * Takes a color object and generates variable and value pairs that are then assigned to the color object, as well as concatenated into a single string to be returned as CSS output
 * @param {Settings} settings
 * @param {ColorSetting} color
 * @param {"default" | "dark"} mode
 * @returns {string}
 */
function process_color_variable(settings, color, mode) {
  try {
    let color_variables = '';
    // Default color variable
    // prettier-ignore
    let var_name = '--h2-color-' + color.key;
    let var_value =
      Color(color[mode].color).red() +
      ', ' +
      Color(color[mode].color).green() +
      ', ' +
      Color(color[mode].color).blue();
    // Get modifier data
    let modifier_data = get_color_modifier_data();
    // Add the variable and its value to the color object for later use
    color.var_data.name = var_name;
    color.var_data.value = var_value;
    // Check the unique variables list and add the color if it doesn't already exist
    if (!settings.variables.colors[color.key]) {
      settings.variables.colors[color.key] = {
        default: 'var(--h2-color-' + color.key + ')',
        all: 'var(--h2-color-' + color.key + '-locked)',
        modifiers: {},
      };
    }
    // Add the variable to the output
    // prettier-ignore
    color_variables = color_variables + var_name + ': ' + var_value + ';\n';
    // Add a locked value for use with the :all mode modifier
    if (mode === 'default') {
      // prettier-ignore
      color_variables = color_variables + var_name + '-locked: ' + var_value + ';\n';
    }
    // Color modifier variables
    if (color[mode] && color[mode].modifiers && color[mode].modifiers.length > 0) {
      color[mode].modifiers.forEach(function (modifier_setting) {
        let mod_color = false;
        modifier_data.forEach(function (base_modifier) {
          if (
            modifier_setting.key === base_modifier.key &&
            modifier_setting.default === true &&
            modifier_setting.overwritten === false
          ) {
            // Generate the automated color
            mod_color = manipulate_color(settings, mode, color[mode].color, base_modifier.key);
          }
        });
        if (!mod_color) {
          mod_color = modifier_setting.color;
        }
        // prettier-ignore
        let mod_var_name = '--h2-color-' + color.key + '-' + modifier_setting.key;
        let mod_var_value =
          Color(mod_color).red() + ', ' + Color(mod_color).green() + ', ' + Color(mod_color).blue();
        // Add the variable and its value to the color object for later use
        modifier_setting.var_data.name = mod_var_name;
        modifier_setting.var_data.value = mod_var_value;
        // Add the modifier to the color variables data
        if (!settings.variables.colors[color.key].modifiers[modifier_setting.key]) {
          settings.variables.colors[color.key].modifiers[modifier_setting.key] = {
            default: 'var(--h2-color-' + color.key + '-' + modifier_setting.key + ')',
            all: 'var(--h2-color-' + color.key + '-' + modifier_setting.key + '-locked)',
          };
        }
        // Add the variable to the output
        // prettier-ignore
        color_variables = color_variables + mod_var_name + ': ' + mod_var_value + ';\n';
        // Add a locked value for use with the :all mode modifier
        if (mode === 'default') {
          // prettier-ignore
          color_variables = color_variables + mod_var_name + '-locked: ' + mod_var_value + ';\n';
        }
      });
    }
    return color_variables;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Processing color variables',
        error: error,
      };
    }
  }
}

module.exports = {
  process_color_variable,
};
