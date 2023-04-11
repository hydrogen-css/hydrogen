// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Returns a RegEx that matches configured color values and their modifiers
 *
 * @param {string} value
 * @param {'find' | 'replace'} type
 * @returns {RegExp}
 */
function color_match(value, type) {
  try {
    if (type === 'find') {
      return new RegExp(
        '((?<![a-zA-Z0-9-_])' + value + '(?![a-zA-Z0-9-_]))(\\.+[a-zA-Z]+)*(\\.+[0-9]+)*',
        'gm'
      );
    } else if (type === 'replace') {
      return new RegExp('((?<![a-zA-Z0-9-_])' + value + '(?![a-zA-Z0-9-_\\.]))', 'gm');
    } else {
      throw new Error('A type of "find" or "replace" wasn\'t passed to the function.');
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Color regex',
        error: error,
      };
    }
  }
}

module.exports = {
  color_match,
};
