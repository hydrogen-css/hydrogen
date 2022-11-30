// Hydrogen: Parse queries
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
const { parse_query } = require('./parse-query');

// Vendor imports

// Scripts

/**
 * Takes an attribute instance and deconstructs it to identify individual queries passed as options
 * @param {Settings} settings The user's settings
 * @param {PropertyModel} property_data
 * @param {string} property The relevant Hydrogen property
 * @param {string} attribute The full attribute used in the markup
 * @param {string} input The values string passed from the parser
 * @param {string} file The file this attribute was found in
 * @returns {Query[] | false}
 */
function parse_queries(
  settings,
  property_data,
  property,
  attribute,
  input,
  file
) {
  try {
    // Create an empty array to store unparsed queries
    let query_array = [];
    // Create an empty array to store the final queries
    /** @type {Query[]} */
    let queries = [];
    // Create counters for tracking opening/closing brackets
    let bracket_count = 0;
    let square_count = 0;
    // Check for extra quote characters at the beginning of the string and remove them
    if (
      (input.charAt(0) === '"') |
      (input.charAt(0) === "'") |
      (input.charAt(0) === '`')
    ) {
      input = input.slice(1);
    }
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
      // If the current character is a ")" and the bracket counts are properly balanced, a complete query was found
      if (
        input.charAt(i) === ')' &&
        bracket_count === 0 &&
        square_count === 0
      ) {
        // The option is assumed to be everything from slice_start until the current ")" character
        let new_query = input.slice(slice_start, i + 1).trim();
        // Add the query to the query array
        query_array = query_array.concat(new_query);
        // Update the start of the next slice by telling it to look at the character after this bracket
        slice_start = i + 1;
      }
      // Increment the character and check the next one for a query
      i = i + 1;
    }
    // Check for outstanding mismatched brackets, because this means that there was a typo
    if (square_count != 0 || bracket_count != 0) {
      throw new Error(
        'Hydrogen found an unequal number of brackets in this attribute. This is likely a typo.'
      );
    }
    // Check to see if the query array is empty and close the parser if it is
    if (query_array.length === 0) {
      throw 'This attribute has no queries passed to it, so it has been ignored.';
    }
    // Loop through the queries that were found and parse them, after which return them
    query_array.forEach(function (query) {
      let parsed_query = parse_query(
        settings,
        property_data,
        property,
        attribute,
        query,
        file
      );
      // If a parsed query was found, add it to the final query array - don't return false here because we want to return all valid queries without failing on bad ones, which should be ignored
      if (parsed_query) {
        queries.push({
          query: query,
          prefix: parsed_query.prefix,
          modifiers: parsed_query.modifiers,
          values: parsed_query.values,
          selectors: [],
        });
      }
    });
    if (queries && Array.isArray(queries) && queries.length > 0) {
      return queries;
    } else {
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      settings: settings,
      error: error,
      step: 'Parsing attribute queries',
      attribute: attribute,
      files: [file],
    });
    return false;
  }
}

module.exports = {
  parse_queries,
};
