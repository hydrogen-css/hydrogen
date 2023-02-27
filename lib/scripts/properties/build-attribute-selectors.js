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
      query.modifiers.children.forEach((child) => {
        query.selectors = query.selectors.concat(
          '[data-h2-' +
            property +
            '*="' +
            query.query.replace(/"/g, '\\"').replace(/'/g, "\\'") +
            '"]' +
            selector_string +
            state_string +
            ' ' +
            child +
            ':not([data-h2-' +
            property +
            '])'
        );
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
