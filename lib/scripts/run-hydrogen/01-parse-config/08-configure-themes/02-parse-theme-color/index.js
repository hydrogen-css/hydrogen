// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').Color} Color
 * @typedef {import('../../../../../data/config-data').Modifier} Modifier
 * @typedef {import('../../../../../data/config-data').ParsedColor} ParsedColor
 */
/**
 * @typedef {import('../../../../../data/default-mode-data').DefaultModes} DefaultModes
 */
/**
 * @typedef {import('../../../../../data/color-modifiers-data').DefaultColorModifiers} DefaultColorModifiers
 * @typedef {import('../../../../../data/color-modifiers-data').DefaultColorModifier} DefaultColorModifier
 */

// Data imports
const { get_default_mode_data } = require('../../../../../data/default-mode-data');
const { get_color_modifier_data } = require('../../../../../data/color-modifiers-data');

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Transforms configured colors and generates useful variable data.
 *
 * Requires:
 * - config.modes
 * - config.themes.colors
 *
 * @param {Config} config
 * @param {Color} color_config
 * @returns {ParsedColor}
 */
function parse_theme_color(config, color_config) {
  try {
    // Set the modifier data for reuse
    const modifier_data = get_color_modifier_data();
    // Set default values for the var_data
    color_config.var_data = {
      name: null,
      value: null,
    };
    // Loop through each mode and parse colors
    /** @type {DefaultModes} */
    get_default_mode_data().forEach((mode) => {
      // Add the base modifiers and their own variable data, but check to see if the user has overwritten them first
      if (
        color_config[mode] &&
        color_config[mode].modifiers &&
        color_config[mode].modifiers.length > 0
      ) {
        /** @type {DefaultColorModifier} */
        modifier_data.forEach((base_modifier) => {
          let overwritten = false;
          /** @type {Modifier} */
          color_config[mode].modifiers.forEach((modifier_setting) => {
            if (modifier_setting.key === base_modifier.key) {
              overwritten = true;
              modifier_setting.default = true;
              modifier_setting.overwritten = true;
              modifier_setting.var_data = {
                name: null,
                value: null,
              };
            }
          });
          if (overwritten === false) {
            color_config[mode].modifiers = color_config[mode].modifiers.concat({
              key: base_modifier.key,
              default: true,
              overwritten: false,
              color: false,
              var_data: {
                name: null,
                value: null,
              },
            });
          }
        });
        // Now check for any non base-modifiers and do the same
        /** @type {Modifier} */
        color_config[mode].modifiers.forEach((modifier_setting) => {
          if (modifier_setting.var_data === undefined) {
            modifier_setting.default = false;
            modifier_setting.overwritten = false;
            modifier_setting.var_data = {
              name: null,
              value: null,
            };
          }
        });
      } else if (color_config[mode]) {
        color_config[mode].modifiers = [];
        /** @type {DefaultColorModifier} */
        modifier_data.forEach((base_modifier) => {
          color_config[mode].modifiers = color_config[mode].modifiers.concat({
            key: base_modifier.key,
            default: true,
            overwritten: false,
            color: false,
            var_data: {
              name: null,
              value: null,
            },
          });
        });
      } else if (config.modes.dark.swap_default_modifiers === true && mode === 'dark') {
        // This added else/if accounts for automated color modifier generation in instances where there is no dark mode set for a color configuration (it creates one for the color so that the automated modifiers are placed properly)
        color_config['dark'] = {
          color: color_config['default'].color,
          modifiers: [],
        };
        /** @type {DefaultColorModifier} */
        modifier_data.forEach((base_modifier) => {
          color_config[mode].modifiers = color_config[mode].modifiers.concat({
            key: base_modifier.key,
            default: true,
            overwritten: false,
            color: false,
            var_data: {
              name: null,
              value: null,
            },
          });
        });
      }
    });
    return color_config;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing theme colors',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_theme_color,
};
