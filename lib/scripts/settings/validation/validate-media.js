// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../data/settings-model-definition').Media} Media
 * @typedef {import('../../../data/settings-model-definition').Query} Query
 */

// Data imports
const { get_reserved_words } = require('../../../data/reserved-words');

// Logging

// Functions

// Vendor imports

// Script
/**
 * Validates the user's media settings
 * @param {Settings} settings
 * @returns {true}
 */
function validate_media(settings) {
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
    if (settings.media.base_key) {
      let key = settings.media.base_key;
      if (typeof key != 'string') {
        errors = errors.concat(
          new Error(
            'The "base_key" option in the "media" section of your configuration must be a string.'
          )
        );
      }
      if (/\s/g.test(key) || key.includes('.')) {
        errors = errors.concat(
          new Error(
            'The "base_key" option in the "media" section of your configuration can\'t contain spaces or periods.'
          )
        );
      }
      reserved_data.forEach(function (word) {
        if (key === word) {
          errors = errors.concat(
            new Error(
              'The "base_key" option in the "media" section of your configuration is using a reserved state modifier word. Media keys can\'t be any of the following: ' +
                reserved_string +
                '.'
            )
          );
        }
      });
      if (settings.media.queries) {
        settings.media.queries.forEach(function (query) {
          if (query.key && query.key === key) {
            errors = errors.concat(
              new Error(
                'One or more "key" options in the "queries" definition in the "media" section of your configuration are using the same value as their "key". All media keys must be unique.'
              )
            );
          }
          if (query.key.endsWith(key)) {
            errors = errors.concat(
              new Error(
                'Due to the nature of wildcard attribute selectors, "key" options in the "queries" definition in the "media" section of your configuration cannot end in the same string as another. A media key ends with the same string as another query definition\'s "key" value.'
              )
            );
          }
        });
      }
    }
    if (settings.media.queries) {
      let queries = settings.media.queries;
      if (queries.length > 0) {
        queries.forEach(function (query, index) {
          // Create an array for duplicate checking
          let unique = queries.slice();
          unique.splice(index, 1);
          // Media keys
          if (typeof query.key != 'string') {
            errors = errors.concat(
              new Error(
                'A "key" option in a "queries" definition in the "media" section of your configuration must be a string.'
              )
            );
          }
          if (/\s/g.test(query.key) || query.key.includes('.')) {
            errors = errors.concat(
              new Error(
                'A "key" option in a "queries" definition in the "media" section of your configuration can\'t contain spaces or periods.'
              )
            );
          }
          if (settings.media.base_key) {
            if (settings.media.base_key === query.key) {
              errors = errors.concat(
                new Error(
                  'A "key" option in a "queries" definition in the "media" section of your configuration is using the same value as your "base_key". All media keys must be unique.'
                )
              );
            }
            if (settings.media.base_key.endsWith(query.key)) {
              errors = errors.concat(
                new Error(
                  'Due to the nature of wildcard attribute selectors, "key" options in the "queries" definition in the "media" section of your configuration cannot end in the same string as another. A media key ends with the same string used as your "base_key" option.'
                )
              );
            }
          }
          reserved_data.forEach(function (word) {
            if (word === query.key) {
              errors = errors.concat(
                new Error(
                  'A "key" option in a "queries" definition in the "media" section of your configuration is using a reserved state modifier word. Media keys can\'t be any of the following: ' +
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
                  'One or more "key" options in the "queries" definition in the "media" section of your configuration are using the same value as their "key". All media keys must be unique.'
                )
              );
            }
            if (other.key.endsWith(query.key)) {
              errors = errors.concat(
                new Error(
                  'Due to the nature of wildcard attribute selectors, "key" options in the "queries" definition in the "media" section of your configuration cannot end in the same string as another. A media key ends with the same string as another query definition\'s "key" value.'
                )
              );
            }
          });
          // Media queries
          if (
            !query.query ||
            typeof query.query != 'string' ||
            query.query === 'base'
          ) {
            errors = errors.concat(
              new Error(
                'The "query" option in the "queries" definition in the "media" section of your configuration must be a string and a valid CSS media query value (e.g. screen and (min-width: 48em))'
              )
            );
          }
          unique.forEach(function (other) {
            if (other.query && other.query === query.query) {
              new Error(
                'One or more "query" options in the "queries" definition in the "media" section of your configuration are using the same value. All media query values must be unique.'
              );
            }
          });
        });
      }
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
      step: 'Validating media configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_media,
};
