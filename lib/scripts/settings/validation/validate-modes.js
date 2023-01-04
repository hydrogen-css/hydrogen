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
    if (settings.modes.dark) {
      if (
        !settings.modes.dark.automatic ||
        typeof settings.modes.dark.automatic != 'boolean'
      ) {
        errors = errors.concat(
          new Error(
            'The dark mode defined in your configuration requires that "automatic" be set to either true or false.'
          )
        );
      } else {
        if (
          !settings.modes.dark.method ||
          typeof settings.modes.dark.method != 'string' ||
          (settings.modes.dark.method != 'preference' &&
            settings.modes.dark.method != 'toggle')
        ) {
          errors = errors.concat(
            new Error(
              'The dark mode defined in your configuration requires that "method" be set to either "preference" or "toggle".'
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
            'The contrast mode defined in your configuration requires that "automatic" be set to either true or false.'
          )
        );
      } else {
        if (
          !settings.modes.contrast.method ||
          typeof settings.modes.contrast.method != 'string' ||
          (settings.modes.contrast.method != 'preference' &&
            settings.modes.contrast.method != 'toggle')
        ) {
          errors = errors.concat(
            new Error(
              'The contrast mode defined in your configuration requires that "method" be set to either "preference" or "toggle".'
            )
          );
        }
      }
    }
    if (errors.length === 0) {
      return true;
    } else {
      throw errors;
    }
  } catch (error) {
    throw {
      step: 'Validating mode configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_modes,
};
