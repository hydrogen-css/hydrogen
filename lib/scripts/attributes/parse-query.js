// Hydrogen: Parse query
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
const { parse_prefix } = require('./parse-prefix');
const { parse_options } = require('./parse-options');

// Vendor imports

// Scripts

/**
 * Takes a query and parses it for the media string (including modifiers) and the options provided to it
 * @param {Settings} settings The user's settings
 * @param {PropertyModel} property_data
 * @param {string} property_string The relevant Hydrogen property
 * @param {string} attribute_string The full attribute used in the markup
 * @param {string} query_string The query string passed from the parser
 * @param {string} file The file this attribute was found in
 * @returns {{prefix: string, modifiers: Modifiers, values: string[]} | false} The query's modifier prefix as a string, parsed modifiers, and an array of its options
 */
function parse_query(
  settings,
  property_data,
  property_string,
  attribute_string,
  query_string,
  file
) {
  try {
    // Check to see if modifiers exist first by checking the first character for opening brackets
    if (query_string.charAt(0) === '(') {
      throw new Error('This query is missing a media prefix.');
    } else {
      // Create a counter for brackets
      let open_bracket = 0;
      // Loop backwards through the query_string
      // This is because we need to find the options encased in the final pair of ()
      for (let i = query_string.length; i > 0; i -= 1) {
        // If the character is "(" increase the count
        if (query_string.charAt(i) === '(') open_bracket++;
        // If the character is ")" decrease the count
        if (query_string.charAt(i) === ')') open_bracket--;
        // If brackets are properly matched and the current character isn't empty, use the character's index to return everything before it as the modifier prefix, and everything from the index onwards as the options.
        if (open_bracket === 0 && query_string.charAt(i) != '') {
          // Parse modifiers
          let modifiers = parse_prefix(
            settings,
            property_string,
            attribute_string,
            query_string,
            query_string.substring(0, i),
            file
          );
          // Parse options passed to the query
          let options;
          if (property_data.properties.custom.includes(property_string)) {
            options = parse_options(
              settings,
              attribute_string,
              query_string,
              file,
              query_string.substring(i).slice(1, -1),
              ','
            );
          } else if (
            property_data.properties.compatibility.includes(property_string)
          ) {
            options = parse_options(
              settings,
              attribute_string,
              query_string,
              file,
              query_string.substring(i).slice(1, -1),
              ','
            );
            if (options) {
              let options_condensed = '';
              options.forEach((item, index) => {
                let spacer = ' ';
                if (index === 0) {
                  spacer = '';
                }
                options_condensed = options_condensed + spacer + item;
              });
              options = [options_condensed];
            }
          } else {
            options = [query_string.substring(i).slice(1, -1)];
          }
          // Return the modifiers and options to the query object
          if (!modifiers) {
            return false;
          } else if (!options) {
            return false;
          } else {
            return {
              prefix: query_string.substring(0, i),
              modifiers: modifiers,
              values: options,
            };
          }
        }
      }
    }
  } catch (error) {
    log_message({
      type: 'error',
      settings: settings,
      error: error,
      step: 'Parsing query syntax',
      attribute: attribute_string,
      query: query_string,
      files: [file],
    });
    return false;
  }
}

module.exports = {
  parse_query,
};
