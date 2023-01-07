// Hydrogen
'use strict';

const { parsed } = require('yargs');
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
const { parse_container } = require('./custom/parse-container');
const { parse_flex_grid } = require('./custom/parse-flex-grid');
const { parse_flex_item } = require('./custom/parse-flex-item');
const { parse_font_size } = require('./custom/parse-font-size');
const { parse_layer } = require('./custom/parse-layer');
const { parse_location } = require('./custom/parse-location');
const { parse_overlay } = require('./custom/parse-overlay');

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
 * @returns {string[]}
 */
function sort_custom_property(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  try {
    if (property === 'container') {
      let value = parse_container(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query
      );
      return value;
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
      let value = parse_layer(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query
      );
      return value;
    } else if (property === 'location') {
      let value = parse_location(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query
      );
      return value;
    } else if (property === 'overlay') {
      let value = parse_overlay(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query
      );
      return value;
    } else {
      throw new Error(
        'A property was incorrectly passed to the custom property function.'
      );
    }
  } catch (error) {
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
