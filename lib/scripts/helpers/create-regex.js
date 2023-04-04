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

/**
 * Returns a RegEx that matches Hydrogen attributes
 * @example data-h2-PROP="QUERY(OPTIONS)"
 * @example data-h2-PROP='QUERY(OPTIONS)'
 * @example "data-h2-PROP": "QUERY(OPTIONS)"
 * @example 'data-h2-PROP': 'QUERY(OPTIONS)'
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

/**
 * Returns a RegEx that matches a configured key
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

/**
 * Returns a RegEx that matches configured color values and their modifiers
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

/**
 * Returns a RegEx that matches Hydrogen multiplier values
 * @example x5
 * @example x.25
 * @example -x1
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
  wrapper_match,
  attribute_match,
  configured_option_match,
  color_match,
  multiplier_match,
};
