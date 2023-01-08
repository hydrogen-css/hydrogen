// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('../../data/media-model-definition').MediaArray} MediaModel
 * @typedef {import('../../data/media-model-definition').MediaObject} Media
 */
/**
 * @typedef {import('../../data/property-model-definition').PropertyModel} PropertyModel
 * @typedef {import('../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../data/property-model-definition').Attribute} Attribute
 * @typedef {import('../../data/property-model-definition').Query} Query
 * @typedef {import('../../data/property-model-definition').Modifiers} Modifiers
 */

// Data imports

// Logging

// Functions

// Vendor imports

// Scripts
/**
 *
 * @param {Settings} settings
 * @param {MediaModel} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {Attribute} attribute
 * @param {Query} query
 * @returns {string}
 */
function process_configured_color(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query,
  value
) {
  try {
    if (property_model.properties.color.indexOf(property) !== -1) {
      let parsed_colors = [];
      let processed_colors = [];
      // Loop through the color settings to grab color keys for building the regex
      Object.keys(settings.variables.colors).forEach((color_setting) => {
        // Create the color expression
        let color_regex = new RegExp(
          '((?<![a-zA-Z0-9])' +
            color_setting +
            '(?![a-zA-Z0-9]))(\\.+[a-zA-Z]+)*(\\.+[0-9]+)*',
          'gm'
        );
        // Find color matches
        let matches;
        while ((matches = color_regex.exec(value)) !== null) {
          if (matches.index === color_regex.lastIndex) {
            color_regex.lastIndex++;
          }
          parsed_colors.push({
            match: matches[0],
            groups: {
              color: matches[1],
              modifier: matches[2],
              opacity: matches[3],
            },
          });
        }
      });
      // Process color matches
      parsed_colors.forEach((parsed_color) => {
        let processed = false;
        if (settings.variables.colors[parsed_color.groups.color]) {
          if (query.modifiers.mode === 'all') {
            processed =
              settings.variables.colors[parsed_color.groups.color].all;
          } else {
            processed =
              settings.variables.colors[parsed_color.groups.color].default;
          }
          if (parsed_color.groups.modifier) {
            let modifier = parsed_color.groups.modifier.substring(1);
            if (query.modifiers.mode === 'all') {
              processed =
                settings.variables.colors[parsed_color.groups.color].modifiers[
                  modifier
                ].all;
            } else {
              processed =
                settings.variables.colors[parsed_color.groups.color].modifiers[
                  modifier
                ].default;
            }
          }
          let opacity = 1;
          if (parsed_color.groups.opacity) {
            opacity = parseFloat(parsed_color.groups.opacity.substring(1));
            if (opacity.toString().length === 1) {
              opacity = opacity * 10;
            }
            // Convert the number to a working opacity value
            if (opacity >= 100) {
              opacity = 1;
            } else if (opacity === 0) {
              opacity = 0;
            } else {
              opacity = opacity / 100;
            }
          }
          processed = 'rgba(' + processed + ', ' + opacity + ')';
        } else {
          throw new Error("This color wasn't passed a color key.");
        }
        if (processed) {
          let processed_color_data = {
            match: parsed_color.match,
            processed: processed,
          };
          processed_colors = processed_colors.concat(processed_color_data);
        } else {
          throw new Error(
            "The color couldn't be processed and properly added to the RGBA function."
          );
        }
      });
      // Replace color matches with processed values
      processed_colors.forEach((pair) => {
        value = value.replace(pair.match, pair.processed);
      });
      if (value) {
        return value;
      } else {
        throw new Error("A value couldn't be processed.");
      }
    } else {
      return value;
    }
  } catch (error) {
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Processing configured color',
        error: error,
      };
    }
  }
}

module.exports = {
  process_configured_color,
};
