// Hydrogen: Create media array
'use strict';

// Hydrogen data models
let Settings = require('../data/settings-model-definition');
/** @typedef {import('../data/settings-model-definition').Settings} Settings */
let MediaArray = require('../data/media-model-definition');
/** @typedef {import('../data/media-model-definition').MediaArray} MediaArray */

// Hydrogen data imports
const state_data_model = require('../data/state-model');

// Hydrogen function imports

// Vendor imports

// Script

/**
 * Generates a media query list based on the user's settings that can be populated in a specific order for CSS construction
 * @param {Settings} settings The user's settings
 * @returns {Promise<MediaArray>} An array of ordered media queries to be populated with CSS
 */
function create_media_array(settings) {
  return new Promise((resolve, reject) => {
    try {
      // Set up an empty array to be populated
      let media_array = [];
      // Get the user's media query settings
      let media_list = JSON.parse(JSON.stringify(settings.media.queries));
      // Create an array containing possible mode settings
      let mode_list = ['light', 'dark'];
      // Add a default value to the state list that can be used to create a non-pseudo query
      let state_data = JSON.parse(JSON.stringify(state_data_model));
      state_data.unshift('default');
      // Create an array of themes from the user's config if they exist
      let theme_list = [];
      Object.keys(settings.themes).forEach(function (theme_key) {
        theme_list = theme_list.concat(theme_key);
      });
      // Check to see if the user has chosen preference-based or class-based dark mode
      if (
        settings.modes &&
        settings.modes.dark &&
        settings.modes.dark.method === 'preference'
      ) {
        // ---
        // base
        // base dark media
        // base hover media
        // base dark media and hover media
        // base pseudo
        // base dark media and pseudo
        // query
        // query dark media
        // query hover media
        // query dark media and hover media
        // query pseudo
        // query dark media and pseudo
        // ---
        // Loop through media settings from the configuration
        media_list.forEach(function (media) {
          // Loop through the theme list - this doesn't add anything to the query string because the theme selector is added during the CSS construction for each style
          theme_list.forEach(function (theme) {
            // Loop through the pseudo-class array
            state_data.forEach(function (state) {
              // Loop through the media template list
              mode_list.forEach(function (mode) {
                // Set the query's standardized values
                let media_object = {
                  key: media.key,
                  mode: mode,
                  state: state,
                  theme: theme,
                };
                // Check to see if the query is the base query - this can refer to 'base' because the query has been set as such in the settings parser
                if (media.query === 'base') {
                  // Working with the base query, so set the query value to null
                  media_object.query = null;
                  // Check to see if we're building a standard or dark mode query
                  if (mode === 'dark') {
                    // Check to see if the state is hover or not (if it is, a media query is required)
                    if (state === 'hover') {
                      // Base query, dark mode, hover state
                      // prettier-ignore
                      media_object.query_string = '@media (prefers-color-scheme: dark) and (hover: hover) {';
                      media_object.closing_string = '}';
                    } else {
                      // Base query, dark mode, other state
                      // prettier-ignore
                      media_object.query_string = '@media (prefers-color-scheme: dark) {';
                      media_object.closing_string = '}';
                    }
                  } else {
                    // Check to see if the state is hover or not (if it is, a media query is required)
                    if (state === 'hover') {
                      // Base query, light mode, hover state
                      // prettier-ignore
                      media_object.query_string = '@media (hover: hover) {';
                      media_object.closing_string = '}';
                    } else {
                      // Base query, light mode, other state
                      // prettier-ignore
                      media_object.query_string = '';
                      media_object.closing_string = '';
                    }
                  }
                } else {
                  // Working with a custom query, so set the query value to the configured CSS query
                  media_object.query = media.query;
                  // Check to see if we're building a standard or dark mode query
                  if (mode === 'dark') {
                    // Check to see if the state is hover or not (if it is, a media query is required)
                    if (state === 'hover') {
                      // Custom query, dark mode, hover state
                      // prettier-ignore
                      media_object.query_string = '@media ' + media.query + ' and (prefers-color-scheme: dark) and (hover: hover) {';
                      media_object.closing_string = '}';
                    } else {
                      // Custom query, dark mode, other state
                      // prettier-ignore
                      media_object.query_string = '@media ' + media.query + ' and (prefers-color-scheme: dark) {';
                      media_object.closing_string = '}';
                    }
                  } else {
                    // Check to see if the state is hover or not (if it is, a media query is required)
                    if (state === 'hover') {
                      // Custom query, light mode, hover state
                      // prettier-ignore
                      media_object.query_string = '@media ' + media.query + ' and (hover: hover) {';
                      media_object.closing_string = '}';
                    } else {
                      // Custom query, light mode, other state
                      // prettier-ignore
                      media_object.query_string = '@media ' + media.query + ' {';
                      media_object.closing_string = '}';
                    }
                  }
                }
                // Add the newly created query to the media array
                media_array = media_array.concat(media_object);
              });
            });
          });
        });
        // Return the complete media array
        resolve(media_array);
      } else if (
        settings.modes &&
        settings.modes.dark &&
        settings.modes.dark.method === 'toggle'
      ) {
        // ---
        // base
        // base dark class
        // base hover media
        // base hover media and dark class
        // base pseudo
        // base pseudo and dark class
        // query
        // query dark class
        // query hover media
        // query hover media and dark class
        // query pseudo
        // query pseudo and dark class
        // ---
        // Loop through media settings from the configuration
        media_list.forEach(function (media) {
          // Loop through the theme list - this doesn't add anything to the query string because the theme selector is added during the CSS construction for each style
          theme_list.forEach(function (theme) {
            // Loop through the pseudo-class array
            state_data.forEach(function (state) {
              // Loop through the media template list
              mode_list.forEach(function (mode) {
                // Set the query's standardized values
                var media_object = {
                  key: media.key,
                  mode: mode,
                  state: state,
                  theme: theme,
                };
                // Check to see if the query is the base query - this can refer to 'base' because the query has been set as such in the settings parser
                if (media.query === 'base') {
                  // Working with the base query, so set the query value to null
                  media_object.query = null;
                  // Check to see if the state is hover or not (if it is, a media query is required)
                  if (state === 'hover') {
                    // Base query, hover state
                    // prettier-ignore
                    media_object.query_string = '@media (hover: hover) {';
                    media_object.closing_string = '}';
                  } else {
                    // Base query, other state
                    // prettier-ignore
                    media_object.query_string = '';
                    media_object.closing_string = '';
                  }
                } else {
                  // Working with a custom query, so set the query value to the configured CSS query
                  media_object.query = media.query;
                  // Check to see if the state is hover or not (if it is, a media query is required)
                  if (state === 'hover') {
                    // Custom query, hover state
                    // prettier-ignore
                    media_object.query_string = '@media ' + media.query + ' and (hover: hover) {';
                    media_object.closing_string = '}';
                  } else {
                    // Custom query, other state
                    // prettier-ignore
                    media_object.query_string = '@media ' + media.query + ' {';
                    media_object.closing_string = '}';
                  }
                }
                // Add the newly created query to the media array
                media_array = media_array.concat(media_object);
              });
            });
          });
        });
        // Return the complete media array
        resolve(media_array);
      }
    } catch (error) {
      reject();
    }
  });
}

module.exports = {
  create_media_array,
};
