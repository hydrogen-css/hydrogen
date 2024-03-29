// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../../../../../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../../../../../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../../../../../../data/css-property-data').ParsedAttributes} ParsedAttributes
 * @typedef {import('../../../../../../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../../../../../../data/css-property-data').ParsedQuery} ParsedQuery
 */

// Data imports

// Local functions
const { color_match } = require('./generate-color-regex');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
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
        let color_regex = color_match(color_setting, 'find');
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
            processed = settings.variables.colors[parsed_color.groups.color].all;
          } else if (
            query.modifiers.mode === 'dark' &&
            settings.modes &&
            settings.modes['dark'] &&
            settings.modes['dark'].automatic
          ) {
            processed = settings.variables.colors[parsed_color.groups.color].all;
          } else {
            processed = settings.variables.colors[parsed_color.groups.color].default;
          }
          if (parsed_color.groups.modifier) {
            let modifier = parsed_color.groups.modifier.substring(1);
            if (query.modifiers.mode === 'all') {
              processed =
                settings.variables.colors[parsed_color.groups.color].modifiers[modifier].all;
            } else if (
              query.modifiers.mode === 'dark' &&
              settings.modes &&
              settings.modes['dark'] &&
              settings.modes['dark'].swap_default_modifiers
            ) {
              processed =
                settings.variables.colors[parsed_color.groups.color].modifiers[modifier].all;
            } else {
              processed =
                settings.variables.colors[parsed_color.groups.color].modifiers[modifier].default;
            }
          }
          let opacity = '1';
          if (parsed_color.groups.opacity) {
            opacity = parsed_color.groups.opacity;
            // Convert the number to a working opacity value
            if (parsed_color.groups.opacity === '.100') {
              opacity = '1';
            } else if (parsed_color.groups.opacity === '.0') {
              opacity = '0';
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
        let regexp = color_match(pair.match, 'replace');
        value = value.replace(regexp, pair.processed);
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
    if (process.env.H2DEBUG) {
      console.log(error);
    }
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
