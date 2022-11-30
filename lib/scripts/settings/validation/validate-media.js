// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../data/settings-model-definition').Logging} Logging
 */

// Data imports
const { get_state_data } = require('../../../data/state-model');

// Logging
const { log_message } = require('../../logs/log-message');
const { log_timer } = require('../../logs/log-timer');

// Functions

// Vendor imports

// Script
let modifier_data = ['dark', 'all', 'selectors', 'children', 'id', 'class'];
let reserved_data = modifier_data.concat(get_state_data());
let reserved_string = '';
reserved_data.forEach(function (word, index) {
  if (index === reserved_data.length - 1) {
    reserved_string = reserved_string + word;
  } else {
    reserved_string = reserved_string + word + ', ';
  }
});

function validate_media(settings, path) {
  try {
    if (settings.media.base_key) {
      let key = settings.media.base_key;
      if (typeof key != 'string') {
        throw 'The "base_key" option in the "media" section of your configuration must be a string.';
      }
      if (/\s/g.test(key) || key.includes('.')) {
        throw 'The "base_key" option in the "media" section of your configuration can\'t contain spaces or periods.';
      }
      reserved_data.forEach(function (word) {
        if (key === word) {
          throw (
            'The "base_key" option in the "media" section of your configuration is using a reserved state modifier word. Media keys can\'t be any of the following: ' +
            reserved_string +
            '.'
          );
        }
      });
      if (settings.media.queries) {
        settings.media.queries.forEach(function (query) {
          if (query.key && query.key === key) {
            throw 'One or more "key" options in the "queries" definition in the "media" section of your configuration are using the same value as their "key". All media keys must be unique.';
          }
          if (query.key.endsWith(key)) {
            throw 'Due to the nature of wildcard attribute selectors, "key" options in the "queries" definition in the "media" section of your configuration cannot end in the same string as another. A media key ends with the same string as another query definition\'s "key" value.';
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
            throw 'A "key" option in a "queries" definition in the "media" section of your configuration must be a string.';
          }
          if (/\s/g.test(query.key) || query.key.includes('.')) {
            throw 'A "key" option in a "queries" definition in the "media" section of your configuration can\'t contain spaces or periods.';
          }
          if (settings.media.base_key) {
            if (settings.media.base_key === query.key) {
              throw 'A "key" option in a "queries" definition in the "media" section of your configuration is using the same value as your "base_key". All media keys must be unique.';
            }
            if (settings.media.base_key.endsWith(query.key)) {
              throw 'Due to the nature of wildcard attribute selectors, "key" options in the "queries" definition in the "media" section of your configuration cannot end in the same string as another. A media key ends with the same string used as your "base_key" option.';
            }
          }
          reserved_data.forEach(function (word) {
            if (word === query.key) {
              throw (
                'A "key" option in a "queries" definition in the "media" section of your configuration is using a reserved state modifier word. Media keys can\'t be any of the following: ' +
                reserved_string +
                '.'
              );
            }
          });
          unique.forEach(function (other) {
            if (other.key && other.key === query.key) {
              throw 'One or more "key" options in the "queries" definition in the "media" section of your configuration are using the same value as their "key". All media keys must be unique.';
            }
            if (other.key.endsWith(query.key)) {
              throw 'Due to the nature of wildcard attribute selectors, "key" options in the "queries" definition in the "media" section of your configuration cannot end in the same string as another. A media key ends with the same string as another query definition\'s "key" value.';
            }
          });
          // Media queries
          if (
            !query.query ||
            typeof query.query != 'string' ||
            query.query === 'base'
          ) {
            throw 'The "query" option in the "queries" definition in the "media" section of your configuration must be a string and a valid CSS media query value (e.g. screen and (min-width: 48em))';
          }
          unique.forEach(function (other) {
            if (other.query && other.query === query.query) {
              throw 'One or more "query" options in the "queries" definition in the "media" section of your configuration are using the same value. All media query values must be unique.';
            }
          });
        });
      }
    }
    return true;
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Settings validation: media',
      files: path,
    });
    return false;
  }
}
