// Hydrogen: Generate media query array
'use strict';

// Hydrogen type imports
let Settings = require('../data/settings-model-definition');
/**
 * @typedef {import('../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
const state_data_model = require('../data/state-model');
// Hydrogen function imports
const { log_message } = require('../scripts/logs/log-message');
// Vendor imports
var colors = require('colors');

/**
 * @typedef {[{key: "media modifier", mode: "light" | "dark", state: "state value", theme: "theme key", query: "media query" | null, query_string: string, closing_string: string}]} MediaArray
 */

/**
 * Generates a media query list based on the user's settings that can be populated in a specific order for CSS construction
 * @param {Settings} settings The user's settings
 * @returns {MediaArray} An array of ordered media queries to be populated with CSS
 */
function generate_user_media_array(settings) {
  try {
    // Set up an empty array to be populated
    let media_array = [];
    // Get the user's media query settings
    let media_list = JSON.parse(
      JSON.stringify(settings.styles.foundations.media)
    );
    // Create an array containing possible mode settings
    let mode_list = ['light', 'dark'];
    // Add a default value to the state list that can be used to create a non-pseudo query
    let state_data = JSON.parse(JSON.stringify(state_data_model));
    state_data.unshift('default');
    // Create an array of themes from the user's config if they exist
    let theme_list = [];
    Object.keys(settings.runtime.themes).forEach(function (key) {
      theme_list = theme_list.concat(key);
    });
    // Check to see if the user has chosen preference-based or class-based dark mode
    if (
      settings.build &&
      settings.build.modes &&
      settings.build.modes.dark &&
      settings.build.modes.dark.method === 'preference'
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
              // Check to see if the query is the base query
              if (media.query === settings.build.base_query_key) {
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
      return media_array;
    } else if (
      settings.build &&
      settings.build.modes &&
      settings.build.modes.dark &&
      settings.build.modes.dark.method === 'toggle'
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
              // Check to see if the query is the base query
              if (media.query === settings.build.base_query_key) {
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
      return media_array;
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Generating media query array',
      files: [settings.runtime.settings.path],
    });
    return false;
  }
}

module.exports = {
  generate_user_media_array,
};
