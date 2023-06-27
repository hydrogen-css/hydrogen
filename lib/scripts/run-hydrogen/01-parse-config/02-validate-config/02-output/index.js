// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').Input} Output
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Validates the user's output settings.
 *
 * @param {Config} settings
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
