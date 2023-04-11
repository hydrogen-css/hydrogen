// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Returns a RegEx that matches Hydrogen multiplier values
 *
 * @example x5
 * @example x.25
 * @example -x1
 *
 * @returns {RegExp}
 */
function multiplier_match() {
  try {
    // To note about this expression: it also matches the "x" in "px", so we have to check that the expression also matched a number before adding it to the processing array below
    return new RegExp(/(-?)(x{1})([0-9]*)(\.?)([0-9]*)/, 'gm');
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Multiplier regex',
        error: error,
      };
    }
  }
}

module.exports = {
  multiplier_match,
};
