// Hydrogen: Generate media query array

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');
var { h2Error } = require('./logs');

/**
 * Generates a complex array of media queries that form the foundation of dark mode support and the pseudo-class cascade.
 * @param {string} argv - arguments passed to the Hydrogen script from the CLI
 * @param {[string]} pseudoArray - array of pseudo-class strings, used for generating unique queries for each pseudo-class
 * @returns {[{key: string, state: string, pseudo: string, query: string, queryString: string, bracket: boolean}]} - array of media queries structured for the cascade
 */
function generateMediaQueryArray(argv, pseudoArray) {
  try {
    // Get media settings and assemble a CSS-ready media query from them
    var mediaArray = [];
    var settings = loadSettings(argv);
    var mediaTemplate = ['default', 'classLight', 'classDark', 'preferenceDark'];
    // Add an empty pseudo for the loop
    pseudoArray.unshift('default');
    // Loop through media settings from the configuration
    settings.media.forEach(function (media) {
      // Loop through the pseudo-class array
      pseudoArray.forEach(function (pseudo) {
        // Loop through the media template list
        mediaTemplate.forEach(function (template) {
          // Set the query's standardized values
          var mediaObject = {
            key: media.key,
            state: template,
            pseudo: pseudo,
          };
          // Check to see if the query is null or base
          if (media.query == null || media.query == 'base') {
            // Set the query value to null
            mediaObject.query = null;
            // Construct the preference-based dark mode query
            if (template == 'preferenceDark') {
              // Check to see if the hover pseudo-class is required, and add it to the query
              if (pseudo == 'hover') {
                mediaObject.queryString = '@media (prefers-color-scheme: dark) and (hover: hover) {';
              }
              // Hover isn't applicable, so construct the query without it
              else {
                mediaObject.queryString = '@media (prefers-color-scheme: dark) {';
              }
              // Indicate that this query will require a closing bracket when used
              mediaObject.bracket = true;
            }
            // Construct the default query
            else {
              // Check to see if the hover pseudo-class is required, and add it to the query
              if (pseudo == 'hover') {
                mediaObject.queryString = '@media (hover: hover) {';
                // Indicate that this query will require a closing bracket when used
                mediaObject.bracket = true;
              }
              // Hover isn't applicable, so construct the query without it
              else {
                mediaObject.queryString = '';
                // Indicate that this query doesn't require a closing bracket
                mediaObject.bracket = false;
              }
            }
          }
          // The query wasn't the base query, so assemble a full media query
          else {
            // Set the query value to the configured query
            mediaObject.query = media.query;
            // Construct the preference-based dark mode query
            if (template == 'preferenceDark') {
              // Check to see if the hover pseudo-class is required, and add it to the query
              if (pseudo == 'hover') {
                mediaObject.queryString = '@media ' + media.query + ' and (prefers-color-scheme: dark) and (hover: hover) {';
              }
              // Hover isn't applicable, so construct the query without it
              else {
                mediaObject.queryString = '@media ' + media.query + ' and (prefers-color-scheme: dark) {';
              }
            }
            // Construct only the configured media query
            else {
              // Check to see if the hover pseudo-class is required, and add it to the query
              if (pseudo == 'hover') {
                mediaObject.queryString = '@media ' + media.query + ' and (hover: hover) {';
              }
              // Hover isn't applicable, so construct the query without it
              else {
                mediaObject.queryString = '@media ' + media.query + ' {';
              }
            }
            // Indicate that this query will require a closing bracket when used
            mediaObject.bracket = true;
          }
          // Add the newly created query to the media array
          mediaArray = mediaArray.concat(mediaObject);
        });
      });
    });
    // Return the complete media array
    return mediaArray;
  } catch (error) {
    h2Error(error);
    return false;
  }
}

module.exports = {
  generateMediaQueryArray,
};
