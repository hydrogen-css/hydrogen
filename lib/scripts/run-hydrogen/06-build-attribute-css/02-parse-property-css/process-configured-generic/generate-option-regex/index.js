// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Returns a RegEx that matches a configured key
 *
 * @param {string} value
 * @returns {RegExp}
 */
function configured_option_match(value) {
  try {
    return new RegExp('((?<![a-zA-Z0-9-_])' + value + '(?![a-zA-Z0-9-_]))', 'gm');
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Config option regex',
        error: error,
      };
    }
  }
}

module.exports = {
  configured_option_match,
};
