// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../../../data/css-property-data').ParsedAttributes} ParsedAttributes
 * @typedef {import('../../../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../../../data/css-property-data').ParsedQuery} ParsedQuery
 */

// Data imports

// Local functions
const { parse_standard_property } = require('../parse-standard-property');
const { parse_flex_grid } = require('./parse-flex-grid');
const { parse_flex_item } = require('./parse-flex-item');
const { parse_font_size } = require('./parse-font-size');
const { parse_layer } = require('./parse-layer');
const { parse_location } = require('./parse-location');
const { parse_overlay } = require('./parse-overlay');
const { parse_visually_hidden } = require('./parse-visually-hidden');
const { parse_wrapper } = require('./parse-wrapper');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Processes custom Hydrogen properties.
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
 * @returns {string[]}
 */
function sort_custom_property(settings, media_model, property_model, property, attribute, query) {
  try {
    if (property === 'container') {
      if (query.values.length === 1) {
        // 2.0.6: This new check looks to see if the user is trying to use the native CSS container property
        let value = parse_standard_property(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query
        );
        return value;
      } else {
        // 2.0.6: This catches the deprecated container implementation and processes it as the custom wrapper attribute
        let value = parse_wrapper(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query
        );
        return value;
      }
    } else if (property === 'flex-grid') {
      let value = parse_flex_grid(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query
      );
      return value;
    } else if (property === 'flex-item') {
      let value = parse_flex_item(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query
      );
      return value;
    } else if (property === 'font-size') {
      let value = parse_font_size(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query
      );
      return value;
    } else if (property === 'layer') {
      let value = parse_layer(settings, media_model, property_model, property, attribute, query);
      return value;
    } else if (property === 'location') {
      let value = parse_location(settings, media_model, property_model, property, attribute, query);
      return value;
    } else if (property === 'overlay') {
      let value = parse_overlay(settings, media_model, property_model, property, attribute, query);
      return value;
    } else if (property === 'visually-hidden') {
      let value = parse_visually_hidden(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query
      );
      return value;
    } else if (property === 'wrapper') {
      let value = parse_wrapper(settings, media_model, property_model, property, attribute, query);
      return value;
    } else {
      throw new Error('A property was incorrectly passed to the custom property function.');
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Sorting custom properties',
        error: error,
      };
    }
  }
}

module.exports = {
  sort_custom_property,
};
