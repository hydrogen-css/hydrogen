// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../../../data/settings-model-definition').Output} Output
 * @typedef {import('../../../../../data/settings-model-definition').ParsedPaths} ParsedPaths
 */

// Data imports

// Logging

// Functions

// Vendor imports

// Script
/**
 * Validates the user's output settings
 * @param {Settings} settings
 * @returns {true}
 */
function validate_output(settings) {
  try {
    let errors = [];
    if (!settings.output || typeof settings.output != 'string') {
      errors = errors.concat(
        new Error(
          'The "output" option in your configuration should be a string that contains the path to the output directory Hydrogen will put its CSS file in.'
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
      step: 'Validating output configuration',
      errors: error,
    };
  }
}

module.exports = {
  validate_output,
};
