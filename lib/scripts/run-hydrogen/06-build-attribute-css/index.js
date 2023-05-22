// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../data/css-property-data').ParsedAttributes} ParsedAttributes
 * @typedef {import('../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../data/css-property-data').ParsedQuery} ParsedQuery
 */

// Data imports

// Local functions
const { build_attribute_selectors } = require('./01-build-selectors');
const { parse_attribute_property } = require('./02-parse-property-css');
const { validate_attribute_css } = require('./03-validate-css');

// Helper functions
const { log_message } = require('../../console-logging/log-message');

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
 * @returns {boolean}
 */
function build_attribute_css(settings, media_model, property_model, property, attribute, query) {
  try {
    // Build the selectors
    build_attribute_selectors(settings, media_model, property_model, property, attribute, query);
    // Parse the attribute property
    let processed_css = parse_attribute_property(
      settings,
      media_model,
      property_model,
      property,
      attribute,
      query
    );
    if (processed_css) {
      // Validate the returned CSS
      if (
        validate_attribute_css(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query,
          processed_css
        )
      ) {
        // Add to media css string, and only assemble the Hydrogen file at the end, with the correct order for queries by looping through them
        media_model.forEach((user_media) => {
          if (query.modifiers.media === user_media.key) {
            // Check for a matching default or dark mode value
            if (
              (query.modifiers.mode === 'default' || query.modifiers.mode === 'all') &&
              user_media.mode === 'light'
            ) {
              // Check to see if the value matches the theme
              if (user_media.theme === query.modifiers.theme) {
                // Create the selector prefix
                let selector_prefix = '\n[data-h2*="' + user_media.theme + '"] ';
                if (user_media.theme === 'default') {
                  selector_prefix = '\n[data-h2] ';
                }
                // Check for default state values, otherwise check for a matching state
                if (
                  !query.modifiers.state &&
                  query.modifiers.child_states.length === 0 &&
                  user_media.state === 'default'
                ) {
                  processed_css.forEach((css_string) => {
                    user_media.query_string =
                      user_media.query_string + selector_prefix + css_string;
                  });
                } else if (
                  query.modifiers.state === user_media.state ||
                  query.modifiers.child_states.includes(user_media.state)
                ) {
                  processed_css.forEach((css_string) => {
                    user_media.query_string =
                      user_media.query_string + selector_prefix + css_string;
                  });
                }
              }
            } else if (
              (query.modifiers.mode === 'dark' || query.modifiers.mode === 'all') &&
              user_media.mode === 'dark'
            ) {
              // Check to see if the value matches the theme
              if (user_media.theme === query.modifiers.theme) {
                // Create the selector prefix
                let selector_prefix = '';
                if (user_media.theme === 'default') {
                  if (settings.modes.method === 'toggle') {
                    selector_prefix = '\n[data-h2*="dark"] ';
                  } else {
                    selector_prefix = '\n[data-h2] ';
                  }
                } else {
                  if (settings.modes.method === 'toggle') {
                    selector_prefix = '\n[data-h2*="' + user_media.theme + '"][data-h2*="dark"] ';
                  } else {
                    selector_prefix = '\n[data-h2*="' + user_media.theme + '"] ';
                  }
                }
                // Check for default state values, otherwise check for a matching state
                if (
                  !query.modifiers.state &&
                  query.modifiers.child_states.length === 0 &&
                  user_media.state === 'default'
                ) {
                  processed_css.forEach((css_string) => {
                    user_media.query_string =
                      user_media.query_string + selector_prefix + css_string;
                  });
                } else if (
                  query.modifiers.state === user_media.state ||
                  query.modifiers.child_states.includes(user_media.state)
                ) {
                  processed_css.forEach((css_string) => {
                    user_media.query_string =
                      user_media.query_string + selector_prefix + css_string;
                  });
                }
              }
            }
          }
        });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      log_message({
        settings: settings,
        type: 'error',
        step: error.step,
        attribute: attribute.attribute,
        query: query.query,
        files: attribute.files,
        error: error.error,
      });
      return false;
    } else {
      throw {
        step: 'Building attribute CSS',
        error: error,
      };
    }
  }
}

module.exports = {
  build_attribute_css,
};
