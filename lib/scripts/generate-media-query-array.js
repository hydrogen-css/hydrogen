// Hydrogen: Generate media query array

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');
var { h2Error } = require('./logs');

/**
 * TBD
 * @returns {array} Returns a modified array containing an ordered grouping of media queries based on the user's configuration file
 */
function generateMediaQueryArray(argv, pseudoArray) {
  try {
    // Get media settings and assemble a CSS-ready media query from them
    var mediaArray = [];
    var settings = loadSettings(argv);
    var mediaTemplate = ['default', 'classLight', 'classDark', 'preferenceDark'];
    // Add an empty pseudo for the loop
    pseudoArray.unshift('default');
    // Loop through and create the unique set of objects
    settings.media.forEach(function (media) {
      pseudoArray.forEach(function (pseudo) {
        mediaTemplate.forEach(function (template) {
          var mediaObject = {
            key: media.key,
            state: template,
            pseudo: pseudo,
          };
          if (media.query == null) {
            mediaObject.query = null;
            if (template == 'preferenceDark') {
              if (pseudo == 'hover') {
                mediaObject.queryString = '@media (prefers-color-scheme: dark) and (hover: hover) {';
              } else {
                mediaObject.queryString = '@media (prefers-color-scheme: dark) {';
              }
              mediaObject.bracket = true;
            } else {
              if (pseudo == 'hover') {
                mediaObject.queryString = '@media (hover: hover) {';
                mediaObject.bracket = true;
              } else {
                mediaObject.queryString = '';
                mediaObject.bracket = false;
              }
            }
          } else {
            mediaObject.query = media.query;
            if (template == 'preferenceDark') {
              if (pseudo == 'hover') {
                mediaObject.queryString = '@media ' + media.query + ' and (prefers-color-scheme: dark) and (hover: hover) {';
              } else {
                mediaObject.queryString = '@media ' + media.query + ' and (prefers-color-scheme: dark) {';
              }
            } else {
              if (pseudo == 'hover') {
                mediaObject.queryString = '@media ' + media.query + ' and (hover: hover) {';
              } else {
                mediaObject.queryString = '@media ' + media.query + ' {';
              }
            }
            mediaObject.bracket = true;
          }
          mediaArray = mediaArray.concat(mediaObject);
        });
      });
    });
    return mediaArray;
  } catch (error) {
    h2Error(error);
    return false;
  }
}

module.exports = {
  generateMediaQueryArray,
};
