// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').Theme} Theme
 */

// Local functions
const { validate_theme } = require('./theme-object');

/**
 * Validates the user's theme settings.
 * @param {Config} defaults
 * @param {Config} settings
 * @returns {true}
 */
function validate_themes(defaults, settings) {
  try {
    let errors = [];
    if (!Array.isArray(settings.themes) || settings.themes.length === 0) {
      errors = errors.concat(
        new Error(
          'The "themes" setting in your configuration must be an array containing at least one default theme object.'
        )
      );
    } else {
      // Check for a default theme
      let state = false;
      settings.themes.forEach((theme) => {
        // Theme key - checks for the existence of a default theme
        if (
          theme.key &&
          typeof theme.key === 'string' &&
          (theme.key === 'default' || theme.key == null)
        ) {
          state = true;
        }
      });
      if (!state) {
        errors = errors.concat(
          new Error(
            'Your Hydrogen theme configurations are missing a default theme. At least one theme must be defined before compiling.'
          )
        );
      }
      // Validate themes
      settings.themes.forEach((theme) => {
        try {
          validate_theme(defaults, settings, theme);
        } catch (error) {
          error.errors.forEach((i) => {
            errors = errors.concat(i);
          });
        }
      });
      if (errors.length === 0) {
        return true;
      } else {
        throw errors;
      }
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    throw {
      step: 'Validating theme configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_themes,
};
