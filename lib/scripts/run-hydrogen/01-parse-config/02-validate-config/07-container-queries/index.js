// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../data/config-data').ContainerQuery} ContainerQuery
 */

// Data imports
const { get_reserved_words } = require('../../../../../data/reserved-words-data');

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Validates the user's container query settings.
 *
 * @param {Config} settings
 * @returns {true}
 */
function validate_container_queries(settings) {
  try {
    let errors = [];
    let reserved_data = get_reserved_words();
    let reserved_string = '';
    reserved_data.forEach(function (word, index) {
      if (index === reserved_data.length - 1) {
        reserved_string = reserved_string + word;
      } else {
        reserved_string = reserved_string + word + ', ';
      }
    });
    let queries = settings.container_queries;
    if (queries.length > 0) {
      queries.forEach(function (query, index) {
        // Create an array for duplicate checking
        let unique = queries.slice();
        unique.splice(index, 1);
        // Container query keys
        if (typeof query.key != 'string') {
          errors = errors.concat(
            new Error(
              'The "key" options in the "container_queries" section of your configuration must be a string.'
            )
          );
        }
        if (/\s/g.test(query.key) || query.key.includes('.')) {
          errors = errors.concat(
            new Error(
              'The "key" options in the "container_queries" section of your configuration can\'t contain spaces or periods.'
            )
          );
        }
        reserved_data.forEach(function (word) {
          if (word === query.key) {
            errors = errors.concat(
              new Error(
                'A "key" option in the "container_queries" section of your configuration is using a reserved state modifier word. Container query keys can\'t be any of the following: ' +
                  reserved_string +
                  '.'
              )
            );
          }
        });
        unique.forEach(function (other) {
          if (other.key && other.key === query.key) {
            errors = errors.concat(
              new Error(
                'One or more "key" options in the "container_queries" section of your configuration are using the same value as their "key". All container query keys must be unique.'
              )
            );
          }
          if (other.key.endsWith(query.key)) {
            errors = errors.concat(
              new Error(
                'Due to the nature of wildcard attribute selectors, "key" options in the "container_queries" section of your configuration cannot end in the same string as another. A container query key ends with the same string as another query definition\'s "key" value.'
              )
            );
          }
        });
        // Container queries
        if (!query.query || typeof query.query != 'string' || query.query === 'base') {
          errors = errors.concat(
            new Error(
              'The "query" option in the "container_queries" section of your configuration must be a string and a valid CSS container query value (e.g. (min-width: 700px))'
            )
          );
        }
        unique.forEach(function (other) {
          if (other.query && other.query === query.query) {
            new Error(
              'One or more "query" options in the "container_queries" section of your configuration are using the same value. All container query values must be unique.'
            );
          }
        });
      });
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
      step: 'Validating container query configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_container_queries,
};
