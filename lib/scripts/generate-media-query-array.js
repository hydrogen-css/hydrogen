// Hydrogen: Generate media query array
'use strict';

// Hydrogen type imports
let Settings = require('../data/settings-model-definition');
/**
 * @typedef {import('../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
let state_data = require('../data/state-model');
// Hydrogen function imports
const { log_message } = require('../scripts/logs/log-message');
// Vendor imports
var colors = require('colors');

/**
 * @typedef {[{key: "media modifier", mode: "light" | "dark", state: "state value", query: "media query" | null, queryString: string, bracket: boolean}]} MediaArray
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
    let mediaList = JSON.parse(
      JSON.stringify(settings.styles.foundations.media)
    );
    // Create an array containing possible mode settings
    let mode_list = ['light', 'dark'];
    // Add a default value to the state list that can be used to create a non-pseudo query
    state_data.unshift('default');
    // Check to see if the user has chosen preference-based or class-based dark mode
    if (settings.build.dark_mode == 'preference') {
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
      mediaList.forEach(function (media) {
        // Loop through the pseudo-class array
        state_data.forEach(function (state) {
          // Loop through the media template list
          mode_list.forEach(function (mode) {
            // Set the query's standardized values
            let media_object = {
              key: media.key,
              mode: mode,
              state: state,
            };
            // Check to see if the query is the base query
            if (media.query == 'base') {
              // Set the query value to null
              media_object.query = null;
              // Check the mode
              if (mode == 'dark') {
                // Assemble a dark media query
                if (state == 'hover') {
                  // Assemble a hover media query
                  media_object.queryString =
                    '@media (prefers-color-scheme: dark) and (hover: hover) {';
                } else {
                  // Assemble a generic query
                  media_object.queryString =
                    '@media (prefers-color-scheme: dark) {';
                }
                media_object.bracket = true;
              } else {
                // Assemble a list media query
                if (state == 'hover') {
                  // Assemble a hover media query
                  media_object.queryString = '@media (hover: hover) {';
                  media_object.bracket = true;
                } else {
                  // Assemble a generic query
                  media_object.queryString = '';
                  media_object.bracket = false;
                }
              }
            } else {
              // Set the query value to the configured query
              media_object.query = media.query;
              // Check the mode
              if (mode == 'dark') {
                // Assemble a dark media query
                if (state == 'hover') {
                  // Assemble a hover media query
                  media_object.queryString =
                    '@media ' +
                    media.query +
                    ' and (prefers-color-scheme: dark) and (hover: hover) {';
                } else {
                  // Assemble a generic query
                  media_object.queryString =
                    '@media ' +
                    media.query +
                    ' and (prefers-color-scheme: dark) {';
                }
                media_object.bracket = true;
              } else {
                // Assemble a list media query
                if (state == 'hover') {
                  // Assemble a hover media query
                  media_object.queryString =
                    '@media ' + media.query + ' and (hover: hover) {';
                } else {
                  // Assemble a generic query
                  media_object.queryString = '@media ' + media.query + ' {';
                }
                media_object.bracket = true;
              }
            }
            // Add the newly created query to the media array
            media_array = media_array.concat(media_object);
          });
        });
      });
      // Return the complete media array
      return media_array;
    } else if (settings.build.dark_mode == 'toggle') {
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
      mediaList.forEach(function (media) {
        // Loop through the pseudo-class array
        state_data.forEach(function (state) {
          // Loop through the media template list
          mode_list.forEach(function (mode) {
            // Set the query's standardized values
            var media_object = {
              key: media.key,
              mode: mode,
              state: state,
            };
            // Check to see if the query is the base query
            if (media.query == 'base') {
              // Set the query value to null
              media_object.query = null;
              // Assemble a list media query
              if (state == 'hover') {
                // Assemble a hover media query
                media_object.queryString = '@media (hover: hover) {';
                media_object.bracket = true;
              } else {
                // Assemble a generic query
                media_object.queryString = '';
                media_object.bracket = false;
              }
            } else {
              // Set the query value to the configured query
              media_object.query = media.query;
              if (state == 'hover') {
                // Assemble a hover media query
                media_object.queryString =
                  '@media ' + media.query + ' and (hover: hover) {';
              } else {
                // Assemble a generic query
                media_object.queryString = '@media ' + media.query + ' {';
              }
              media_object.bracket = true;
            }
            // Add the newly created query to the media array
            media_array = media_array.concat(media_object);
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
