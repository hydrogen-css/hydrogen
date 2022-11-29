// Hydrogen: Parse options
'use strict';

// Hydrogen data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('../../data/property-model-definition').PropertyModel} PropertyModel
 * @typedef {import('../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../data/property-model-definition').Attribute} Attribute
 * @typedef {import('../../data/property-model-definition').Query} Query
 * @typedef {import('../../data/property-model-definition').Modifiers} Modifiers
 */

// Hydrogen data imports

// Hydrogen function imports
const { log_message } = require('../logs/log-message');

// Vendor imports

// Scripts

/**
 * Parses a comma separated list and returns an array of values
 * @param {string} attribute The full attribute being parsed
 * @param {string} query The query being parsed
 * @param {string} file The attribute's file location
 * @param {string} input The input to be processed as options
 * @returns {string[] | false}
 */
function parse_options(settings, attribute, query, file, input, character) {
  try {
    let parsed_input = [];
    // Create counters for tracking opening/closing brackets
    let bracket_count = 0;
    let square_count = 0;
    // Set the slice position to the start of the string
    // As options are found, this variable tracks how far into the string we are so that we don't duplicate matches
    let slice_start = 0;
    // Loop over each character in the options string
    // By checking for opening/closing brackets, we can slice the string when appropriate matches are found and capture the slice as a single query
    for (let i = 0; i < input.length; ) {
      // If the character is "[" increase the count
      if (input.charAt(i) === '[') {
        square_count = square_count + 1;
      }
      // If the character is "]" decrease the count
      if (input.charAt(i) === ']') {
        square_count = square_count - 1;
      }
      // If the character is "(" increase the count
      if (input.charAt(i) === '(' && square_count === 0) {
        bracket_count = bracket_count + 1;
      }
      // If the character is ")" decrease the count
      if (input.charAt(i) === ')' && square_count === 0) {
        bracket_count = bracket_count - 1;
      }
      // If the current character is a "," and the bracket counts are properly balanced, a complete option was found
      if (
        input.charAt(i) === character &&
        bracket_count === 0 &&
        square_count === 0
      ) {
        // The option is assumed to be everything from slice_start until the current comma character
        let new_option = input.slice(slice_start, i).trim();
        // Add the option to the options array
        parsed_input = parsed_input.concat(new_option);
        // Update the start of the next slice by telling it to look at the character after this comma
        slice_start = i + 1;
      }
      // Increment the character and restart the check
      i = i + 1;
    }
    // Check for a single option
    // The loop above doesn't account for a single input (no comma) or the final string in a comma separated list, so we have to check for it manually by seeing if slice_start matches the length of the input (everything was caught) or if it ended early (something was missed)
    if (slice_start != input.length) {
      // Set the option based on the current slice position to the end of the input
      let new_option = input.slice(slice_start, input.length).trim();
      // Add the option to the options array
      parsed_input = parsed_input.concat(new_option);
    } // Check to see if the options array is empty, and if it is, throw a warning
    if (parsed_input.length === 0) {
      throw 'This query has no options passed to it, so it has been ignored.';
    }
    // Finally, check for outstanding mismatched brackets, because this means that there was a typo
    if (square_count != 0 || bracket_count != 0) {
      throw new Error(
        'Hydrogen found an unequal number of brackets in this attribute. This is likely a typo.'
      );
    } else {
      return parsed_input;
    }
  } catch (error) {
    log_message({
      type: 'error',
      settings: settings,
      error: error,
      step: 'Parsing query options',
      attribute: attribute,
      query: query,
      files: [file],
    });
    return false;
  }
}

module.exports = {
  parse_options,
};
