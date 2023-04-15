// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Returns a RegEx that matches the Hydrogen wrapper attribute
 * @example data-h2
 * @returns {RegExp}
 */
function wrapper_match() {
  try {
    return new RegExp(/data-h2(?![-\]])/, 'g');
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Wrapper regex',
        error: error,
      };
    }
  }
}

module.exports = {
  wrapper_match,
};
