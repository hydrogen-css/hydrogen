// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Themes} Themes
 * @typedef {import('../../../../data/config-data').Theme} Theme
 * @typedef {import('../../../../data/config-data').Typography} Typography
 * @typedef {import('../../../../data/config-data').Color} Color
 * @typedef {import('../../../../data/config-data').ParsedThemes} ParsedThemes
 * @typedef {import('../../../../data/config-data').ParsedTheme} ParsedTheme
 * @typedef {import('../../../../data/config-data').ParsedTypography} ParsedTypography
 * @typedef {import('../../../../data/config-data').ParsedColor} ParsedColor
 */

// Data imports

// Local functions
const { parse_theme_typography } = require('./01-parse-theme-typography');
const { parse_theme_color } = require('./02-parse-theme-color');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Transforms a configured theme array into an object of parsed themes, including parsed typography and color values.
 *
 * Requires:
 * - config.modes
 * - config.media
 * - config.themes
 *
 * @param {Config} defaults Hydrogen's default configuration data
 * @param {Config} config The user's configuration file data
 * @returns {ParsedThemes}
 */
function configure_themes(defaults, config) {
  try {
    // Create a variable to store parsed themes
    /** @type {ParsedThemes} */
    let parsed_themes = {};
    // Assign the default theme first, to ensure that there's always a theme loaded
    /** @type {Themes} */
    let themes = defaults.themes;
    // Overwrite the default theme if the user has set a custom theme
    if (config.themes && config.themes.length > 0) {
      themes = config.themes;
    }
    // Double check to ensure a theme exists
    if (themes && themes.length > 0) {
      // Loop through each theme and assemble the parsed type and colors
      /** @type {Theme} */
      themes.forEach((theme, theme_index) => {
        // Check for and assemble typography
        if (theme.typography && theme.typography.length > 0) {
          /** @type {Typography} */
          theme.typography.forEach((type_config, type_config_index) => {
            /** @type {ParsedTypography} */
            themes[theme_index].typography[type_config_index] = parse_theme_typography(
              config,
              type_config
            );
          });
        }
        // Check color settings to ensure that the runtime object contains variable export data slots, including modifiers
        if (theme.colors && theme.colors.length > 0) {
          /** @type {Color} */
          theme.colors.forEach((color_config, color_config_index) => {
            /** @type {ParsedColor} */
            themes[theme_index].colors[color_config_index] = parse_theme_color(
              config,
              color_config
            );
          });
        }
        // Add the theme to the new object using its key string as its key value
        if (!theme.key || theme.key === 'default' || theme.key === null) {
          parsed_themes['default'] = theme;
        } else {
          parsed_themes[theme.key] = theme;
        }
      });
      return parsed_themes;
    } else {
      throw new Error('No themes were loaded. this is likely a problem with Hydrogen.');
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Configuring themes',
        error: error,
      };
    }
  }
}

module.exports = {
  configure_themes,
};
