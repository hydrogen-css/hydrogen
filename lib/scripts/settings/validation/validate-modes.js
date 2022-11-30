// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 */

// Data imports

// Logging
const { log_message } = require('../../logs/log-message');

// Functions

// Vendor imports

// Script
/**
 * Validates the user's mode settings
 * @param {Settings} settings
 * @returns {boolean}
 */
function validate_modes(settings) {
  try {
    if (settings.modes.dark) {
      if (
        !settings.modes.dark.automatic ||
        typeof settings.modes.dark.automatic != 'boolean'
      ) {
        throw new Error(
          'The dark mode defined in your configuration requires that "automatic" be set to either true or false.'
        );
      } else {
        if (
          !settings.modes.dark.method ||
          typeof settings.modes.dark.method != 'string' ||
          (settings.modes.dark.method != 'preference' &&
            settings.modes.dark.method != 'toggle')
        ) {
          throw new Error(
            'The dark mode defined in your configuration requires that "method" be set to either "preference" or "toggle".'
          );
        }
      }
    }
    if (settings.modes.contrast) {
      if (
        !settings.modes.contrast.automatic ||
        typeof settings.modes.contrast.automatic != 'boolean'
      ) {
        throw new Error(
          'The contrast mode defined in your configuration requires that "automatic" be set to either true or false.'
        );
      } else {
        if (
          !settings.modes.contrast.method ||
          typeof settings.modes.contrast.method != 'string' ||
          (settings.modes.contrast.method != 'preference' &&
            settings.modes.contrast.method != 'toggle')
        ) {
          throw new Error(
            'The contrast mode defined in your configuration requires that "method" be set to either "preference" or "toggle".'
          );
        }
      }
    }
    return true;
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Validating mode settings',
      error: error,
    });
    throw error;
  }
}

module.exports = {
  validate_modes,
};
