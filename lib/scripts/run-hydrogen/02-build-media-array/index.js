// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/config-data').ParsedConfig} ParsedConfig
 * @typedef {import('../../../data/config-data').Modes} Modes
 * @typedef {import('../../../data/config-data').DarkMode} DarkMode
 * @typedef {import('../../../data/config-data').Media} Media
 * @typedef {import('../../../data/config-data').Query} Query
 */
/**
 * @typedef {import('../../../data/default-mode-data').DefaultModes} DefaultModes
 */
/**
 * @typedef {import('../../../data/interaction-state-data').InteractionStates} InteractionStates
 */
/**
 * @typedef {import('../../../data/media-array-data').QueryData} QueryData
 */

// Data imports
const { get_interaction_state_data } = require('../../../data/interaction-state-data');

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Generates a media query list based on the user's settings that can be populated in a specific order for CSS construction.
 *
 * Requires:
 * - Config.Modes
 * - Config.Media
 * - Config.ParsedThemes
 *
 * @param {ParsedConfig} config
 * @returns {QueryData[]}
 */
function build_media_array(config) {
  try {
    // Set up an empty array to be populated
    /** @type {QueryData[]} */
    let media_array = [];
    // Get the user's media query settings
    /** @type {Query[]} */
    let media_list = JSON.parse(JSON.stringify(config.media.queries));
    // Create an array containing possible mode settings
    /** @type {DefaultModes} */
    // let mode_list = get_default_mode_data();
    let mode_list = ['light', 'dark'];
    // Add a default value to the state list that can be used to create a non-pseudo query
    /** @type {InteractionStates} */
    let state_data = get_interaction_state_data();
    state_data.unshift('default');
    // Create an array of themes from the user's config if they exist
    let theme_list = [];
    if (!Array.isArray(config.themes)) {
      Object.keys(config.themes).forEach((theme_key) => {
        theme_list = theme_list.concat(theme_key);
      });
    } else {
      throw new Error(
        "The theme configuration hasn't been parsed yet. This is likely a problem with Hydrogen."
      );
    }
    // Check to see if the user has chosen preference-based or class-based dark mode
    if (config.modes && config.modes.method && config.modes.method === 'preference') {
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
      media_list.forEach((media) => {
        // Loop through the theme list - this doesn't add anything to the query string because the theme selector is added during the CSS construction for each style
        theme_list.forEach((theme) => {
          // Loop through the pseudo-class array
          state_data.forEach((state) => {
            // Loop through the media template list
            mode_list.forEach((mode) => {
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
      return media_array;
    } else if (config.modes && config.modes.method && config.modes.method === 'toggle') {
      // ---
      // Dark mode is attribute-based here, not media query based
      // base  |       |             |               | 2 | [h2][attr]
      // base  | theme |             |               | 2 | [h2=theme][attr]
      // base  |       | mode (dark) |               | 2 | [h2=mode][attr]
      // base  | theme | mode (dark) |               | 3 | [h2=theme][h2=mode][attr]
      // base  |       |             | state (hover) | 3 | media{[h2][attr]:state}
      // base  | theme |             | state (hover) | 3 | media{[h2=theme][attr]:state}
      // base  |       | mode (dark) | state (hover) | 3 | media{[h2=mode][attr]:state}
      // base  | theme | mode (dark) | state (hover) | 4 | media{[h2=theme][h2=mode][attr]:state}
      // base  |       |             | state (other) | 3 | [h2][attr]:state
      // base  | theme |             | state (other) | 3 | [h2=theme][attr]:state
      // base  |       | mode (dark) | state (other) | 3 | [h2=mode][attr]:state
      // base  | theme | mode (dark) | state (other) | 4 | [h2=theme][h2=mode][attr]:state
      // query |       |             |               | 2 | media{[h2][attr]}
      // query | theme |             |               | 2 | media{[h2=theme][attr]}
      // query |       | mode (dark) |               | 2 | media{[h2=mode][attr]}
      // query | theme | mode (dark) |               | 3 | media{[h2=theme][h2=mode][attr]}
      // query |       |             | state (hover) | 3 | media/media{[h2][attr]:state}
      // query | theme |             | state (hover) | 3 | media/media{[h2=theme][attr]:state}
      // query |       | mode (dark) | state (hover) | 3 | media/media{[h2=mode][attr]:state}
      // query | theme | mode (dark) | state (hover) | 4 | media/media{[h2=theme][h2=mode][attr]:state}
      // query |       |             | state (other) | 3 | media/media{[h2][attr]:state}
      // query | theme |             | state (other) | 3 | media/media{[h2=theme][attr]:state}
      // query |       | mode (dark) | state (other) | 3 | media/media{[h2=mode][attr]:state}
      // query | theme | mode (dark) | state (other) | 4 | media/media{[h2=theme][h2=mode][attr]:state}
      // Note that state (other) will always override declarations unless a theme is introduced into another state declaration in dark mode
      // base:theme:dark:hover > base:focus > base:theme:hover | base:dark:hover
      // ---
      // Loop through media settings from the configuration
      media_list.forEach((media) => {
        // Loop through the theme list - this doesn't add anything to the query string because the theme selector is added during the CSS construction for each style
        theme_list.forEach((theme) => {
          // Loop through the pseudo-class array
          state_data.forEach((state) => {
            // Loop through the media template list
            mode_list.forEach((mode) => {
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
      return media_array;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Building media array',
        error: error,
      };
    }
  }
}

module.exports = {
  build_media_array,
};
