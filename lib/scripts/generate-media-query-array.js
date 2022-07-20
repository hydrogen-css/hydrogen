// Hydrogen: Generate media query array
'use strict';

// Vendor dependencies
var colors = require('colors');
var fs = require('fs');
var path = require('path');

// Hydrogen dependencies
var { h2_load_settings } = require('./load-settings');
var { h2_error_detail } = require('./logs');

function generateMediaQueryArray(pseudoList) {
  try {
    // Create default variables
    var mediaArray = [];
    var settings = h2_load_settings();
    // Set the media list
    var mediaList = settings.media;
    // Set the pseudo list and add a default value to be used to create a non-pseudo query
    pseudoList.unshift('default');
    // Set the mode list
    var modeList = ['light', 'dark'];
    // Check to see if the user has chosen preference-based or class-based dark mode
    if (settings.dark_mode == 'preference') {
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
        pseudoList.forEach(function (pseudo) {
          // Loop through the media template list
          modeList.forEach(function (mode) {
            // Set the query's standardized values
            var mediaObject = {
              key: media.key,
              state: mode,
              pseudo: pseudo,
            };
            // Check to see if the query is the base query
            if (media.query == null || media.query == 'base') {
              // Set the query value to null
              mediaObject.query = null;
              // Check the mode
              if (mode == 'dark') {
                // Assemble a dark media query
                if (pseudo == 'hover') {
                  // Assemble a hover media query
                  mediaObject.queryString =
                    '@media (prefers-color-scheme: dark) and (hover: hover) {';
                } else {
                  // Assemble a generic query
                  mediaObject.queryString =
                    '@media (prefers-color-scheme: dark) {';
                }
                mediaObject.bracket = true;
              } else {
                // Assemble a list media query
                if (pseudo == 'hover') {
                  // Assemble a hover media query
                  mediaObject.queryString = '@media (hover: hover) {';
                  mediaObject.bracket = true;
                } else {
                  // Assemble a generic query
                  mediaObject.queryString = '';
                  mediaObject.bracket = false;
                }
              }
            } else {
              // Set the query value to the configured query
              mediaObject.query = media.query;
              // Check the mode
              if (mode == 'dark') {
                // Assemble a dark media query
                if (pseudo == 'hover') {
                  // Assemble a hover media query
                  mediaObject.queryString =
                    '@media ' +
                    media.query +
                    ' and (prefers-color-scheme: dark) and (hover: hover) {';
                } else {
                  // Assemble a generic query
                  mediaObject.queryString =
                    '@media ' +
                    media.query +
                    ' and (prefers-color-scheme: dark) {';
                }
                mediaObject.bracket = true;
              } else {
                // Assemble a list media query
                if (pseudo == 'hover') {
                  // Assemble a hover media query
                  mediaObject.queryString =
                    '@media ' + media.query + ' and (hover: hover) {';
                } else {
                  // Assemble a generic query
                  mediaObject.queryString = '@media ' + media.query + ' {';
                }
                mediaObject.bracket = true;
              }
            }
            // Add the newly created query to the media array
            mediaArray = mediaArray.concat(mediaObject);
          });
        });
      });
      // Return the complete media array
      return mediaArray;
    } else if (settings.dark_mode == 'toggle') {
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
        pseudoList.forEach(function (pseudo) {
          // Loop through the media template list
          modeList.forEach(function (mode) {
            // Set the query's standardized values
            var mediaObject = {
              key: media.key,
              state: mode,
              pseudo: pseudo,
            };
            // Check to see if the query is the base query
            if (media.query == null || media.query == 'base') {
              // Set the query value to null
              mediaObject.query = null;
              // Assemble a list media query
              if (pseudo == 'hover') {
                // Assemble a hover media query
                mediaObject.queryString = '@media (hover: hover) {';
                mediaObject.bracket = true;
              } else {
                // Assemble a generic query
                mediaObject.queryString = '';
                mediaObject.bracket = false;
              }
            } else {
              // Set the query value to the configured query
              mediaObject.query = media.query;
              if (pseudo == 'hover') {
                // Assemble a hover media query
                mediaObject.queryString =
                  '@media ' + media.query + ' and (hover: hover) {';
              } else {
                // Assemble a generic query
                mediaObject.queryString = '@media ' + media.query + ' {';
              }
              mediaObject.bracket = true;
            }
            // Add the newly created query to the media array
            mediaArray = mediaArray.concat(mediaObject);
          });
        });
      });
      // Return the complete media array
      return mediaArray;
    }
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error_detail(
      'internal',
      null,
      path.join(process.cwd() + '/hydrogen.config.json'),
      error
    );
    return false;
  }
}

module.exports = {
  generateMediaQueryArray,
};
