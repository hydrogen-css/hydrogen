// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Returns a RegEx that matches Hydrogen attributes
 *
 * @example data-h2-PROP="QUERY(OPTIONS)"
 * @example data-h2-PROP='QUERY(OPTIONS)'
 * @example "data-h2-PROP": "QUERY(OPTIONS)"
 * @example 'data-h2-PROP': 'QUERY(OPTIONS)'
 *
 * @returns {RegExp}
 */
function attribute_match() {
  try {
    return new RegExp(
      /(data-h2-)([a-zA-Z-]*)((=|.?:)(\s*)(\\?'([^']*)|\\?"([^"]*)|\\?`([^`]*)))/,
      'gm'
    );
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Attribute regex',
        error: error,
      };
    }
  }
}

module.exports = {
  attribute_match,
};
