// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../../data/css-property-data').ParsedAttributes} ParsedAttributes
 * @typedef {import('../../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../../data/css-property-data').ParsedQuery} ParsedQuery
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Constructs CSS selectors from an attribute.
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
 * @returns {boolean}
 */
function build_attribute_selectors(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  try {
    // Handle state values
    let state_string = '';
    if (query.modifiers.state && query.modifiers.state != '') {
      state_string = state_string + ':' + query.modifiers.state;
    }
    // Handle selector values
    let selector_string = '';
    if (
      query.modifiers.selectors &&
      Array.isArray(query.modifiers.selectors) &&
      query.modifiers.selectors.length > 0
    ) {
      query.modifiers.selectors.forEach((selector) => {
        selector_string = selector_string + selector;
      });
    } else {
      // No selectors were found, so check to see if the deprecated class/id modifiers are in use
      if (
        query.modifiers.id &&
        Array.isArray(query.modifiers.id) &&
        query.modifiers.id.length > 0
      ) {
        query.modifiers.id.forEach((id) => {
          selector_string = selector_string + '#' + id;
        });
      }
      if (
        query.modifiers.class &&
        Array.isArray(query.modifiers.class) &&
        query.modifiers.class.length > 0
      ) {
        query.modifiers.class.forEach((class_string) => {
          selector_string = selector_string + '.' + class_string;
        });
      }
    }
    // Handle children
    if (
      !query.modifiers.children ||
      (query.modifiers.children && query.modifiers.children.length === 0)
    ) {
      // No children were called, so assemble the selectors without them
      query.selectors = query.selectors.concat(
        '[data-h2-' +
          property +
          '*="' +
          query.query.replace(/"/g, '\\"').replace(/'/g, "\\'") +
          '"]' +
          selector_string +
          state_string
      );
    } else {
      // Children were found, so include them in the selector assembly
      query.modifiers.children.forEach((child_object) => {
        // 2.0.4: Checking for a pseudo element's presence is required so that we can omit the :not statement which would break it's styling
        if (child_object.pseudo == true) {
          query.selectors = query.selectors.concat(
            '[data-h2-' +
              property +
              '*="' +
              query.query.replace(/"/g, '\\"').replace(/'/g, "\\'") +
              '"]' +
              selector_string +
              state_string +
              ' ' +
              child_object.child
          );
        } else {
          query.selectors = query.selectors.concat(
            '[data-h2-' +
              property +
              '*="' +
              query.query.replace(/"/g, '\\"').replace(/'/g, "\\'") +
              '"]' +
              selector_string +
              state_string +
              ' ' +
              child_object.child +
              ':not([data-h2-' +
              property +
              '])'
          );
        }
      });
    }
    return true;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Building attribute selectors',
        error: error,
      };
    }
  }
}

module.exports = {
  build_attribute_selectors,
};
