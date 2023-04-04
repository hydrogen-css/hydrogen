// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Media} Media
 * @typedef {import('../../../../data/config-data').Query} Query
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Grabs the default mode configuration data and overwrites it with configurations provided by the user.
 *
 * @param {Config} defaults Hydrogen's default configuration data
 * @param {Config} config The user's configuration file data
 * @returns {Media}
 */
function configure_media(defaults, config) {
  try {
    // Check for media settings and replace them as necessary
    if (config.media) {
      /** @type {Media} */
      if (config.media.base_key != undefined) {
        defaults.media.base_key = config.media.base_key;
      }
      if (config.media.queries && config.media.queries.length > 0) {
        /** @type {Query[]} */
        defaults.media.queries = [
          {
            key: defaults.media.base_key,
            query: 'base',
          },
        ].concat(config.media.queries);
      } else {
        /** @type {Query[]} */
        defaults.media.queries = [
          {
            key: defaults.media.base_key,
            query: 'base',
          },
        ].concat(defaults.media.queries);
      }
    } else {
      /** @type {Query[]} */
      defaults.media.queries = [
        {
          key: 'base',
          query: 'base',
        },
      ].concat(defaults.media.queries);
    }
    // Return the modified settings
    return defaults.media;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Configuring media',
        error: error,
      };
    }
  }
}

module.exports = {
  configure_media,
};
