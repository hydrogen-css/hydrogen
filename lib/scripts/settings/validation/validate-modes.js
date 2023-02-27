// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../data/settings-model-definition').Modes} Modes
 * @typedef {import('../../../data/settings-model-definition').Mode} Mode
 */

// Data imports

// Logging

// Functions

// Vendor imports

// Script
/**
 * Validates the user's mode settings
 * @param {Settings} settings
 * @returns {true}
 */
function validate_modes(settings) {
  try {
    let errors = [];
    if (
      !settings.modes.method ||
      typeof settings.modes.method != 'string' ||
      (settings.modes.method != 'preference' &&
        settings.modes.method != 'toggle')
    ) {
      errors = errors.concat(
        new Error(
          'The "modes" configuration requires a "method" value be set to either "preference" or "toggle".'
        )
      );
    }
    if (settings.modes.dark) {
      if (
        !settings.modes.dark.auto_apply_styles ||
        typeof settings.modes.dark.auto_apply_styles != 'boolean'
      ) {
        errors = errors.concat(
          new Error(
            'The dark mode defined in your configuration requires that "auto_apply_styles" be set to either true or false.'
          )
        );
      } else {
        if (
          settings.modes.dark.swap_default_modifiers &&
          typeof settings.modes.dark.swap_default_modifiers != 'boolean'
        ) {
          errors = errors.concat(
            new Error(
              'The "swap_default_modifiers" option in the "modes" section of your configuration must either be "true" or "false".'
            )
          );
        }
      }
    }
    if (settings.modes.contrast) {
      if (
        !settings.modes.contrast.automatic ||
        typeof settings.modes.contrast.automatic != 'boolean'
      ) {
        errors = errors.concat(
          new Error(
            'The contrast mode defined in your configuration requires that "auto_apply_styles" be set to either true or false.'
          )
        );
      }
    }
    if (errors.length === 0) {
      return true;
    } else {
      throw errors;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    throw {
      step: 'Validating mode configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_modes,
};
