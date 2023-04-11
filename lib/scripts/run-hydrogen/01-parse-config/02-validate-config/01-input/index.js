// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').Input} Input
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Validates the user's input settings.
 *
 * @param {Config} settings
 * @returns {boolean}
 */
function validate_input(settings) {
  try {
    let errors = [];
    if (!settings.input || !Array.isArray(settings.input) || settings.input.length === 0) {
      errors = errors.concat(
        new Error(
          'The "input" option in your configuration should be an array containing paths to the input directories that Hydrogen should parse.'
        )
      );
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
      step: 'Validating input configuration',
      errors: error,
    };
  }
}

module.exports = {
  validate_input,
};
