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
const { log_message } = require('../logging/log-message');

// Functions
const { build_attribute_selectors } = require('./build-attribute-selectors');
const { parse_attribute_property } = require('./parse-attribute-property');
const { validate_attribute_css } = require('./validate-attribute-css');

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
 * @returns {boolean}
 */
function build_attribute_css(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  try {
    // Build the selectors
    build_attribute_selectors(
      settings,
      media_model,
      property_model,
      property,
      attribute,
      query
    );
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
              (query.modifiers.mode === 'default' ||
                query.modifiers.mode === 'all') &&
              user_media.mode === 'light'
            ) {
              // Check to see if the value matches the theme
              if (user_media.theme === query.modifiers.theme) {
                // Create the selector prefix
                let selector_prefix =
                  '\n[data-h2*="' + user_media.theme + '"] ';
                if (user_media.theme === 'default') {
                  selector_prefix = '\n[data-h2] ';
                }
                // Check for default state values, otherwise check for a matching state
                if (!query.modifiers.state && user_media.state === 'default') {
                  processed_css.forEach((css_string) => {
                    user_media.query_string =
                      user_media.query_string + selector_prefix + css_string;
                  });
                } else if (query.modifiers.state === user_media.state) {
                  processed_css.forEach((css_string) => {
                    user_media.query_string =
                      user_media.query_string + selector_prefix + css_string;
                  });
                }
              }
            } else if (
              (query.modifiers.mode === 'dark' ||
                query.modifiers.mode === 'all') &&
              user_media.mode === 'dark'
            ) {
              // Check to see if the value matches the theme
              if (user_media.theme === query.modifiers.theme) {
                // Create the selector prefix
                let selector_prefix = '';
                if (user_media.theme === 'default') {
                  if (settings.modes.dark.method === 'toggle') {
                    // prettier-ignore
                    selector_prefix = '\n[data-h2*="dark"] '
                  } else {
                    // prettier-ignore
                    selector_prefix = '\n[data-h2] '
                  }
                } else {
                  if (settings.modes.dark.method === 'toggle') {
                    // prettier-ignore
                    selector_prefix = '\n[data-h2*="' + user_media.theme + '"][data-h2*="dark"] '
                  } else {
                    // prettier-ignore
                    selector_prefix = '\n[data-h2*="' + user_media.theme + '"] '
                  }
                }
                // Check for default state values, otherwise check for a matching state
                if (!query.modifiers.state && user_media.state === 'default') {
                  processed_css.forEach((css_string) => {
                    user_media.query_string =
                      user_media.query_string + selector_prefix + css_string;
                  });
                } else if (query.modifiers.state === user_media.state) {
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
