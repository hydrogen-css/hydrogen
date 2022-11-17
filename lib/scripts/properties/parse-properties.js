// Hydrogen: Parse properties
'use strict';

// Hydrogen data models
let Settings = require('../../data/settings-model-definition');
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
let Properties = require('../../data/property-model-definition');
/**
 * @typedef {import('../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../data/property-model-definition').Property} Property
 * @typedef {import('../../data/property-model-definition').Key} Key
 * @typedef {import('../../data/property-model-definition').Instance} Instance
 * @typedef {import('../../data/property-model-definition').Value} Value
 */

// Hydrogen data imports
let custom_props = require('../../data/properties-custom');

// Hydrogen function imports
const { log_message } = require('../../scripts/logs/log-message');
const { parse_property } = require('./parse-property');
const { parse_border } = require('../properties/custom/border');
const { parse_container } = require('../properties/custom/container');
const { parse_flex_grid } = require('../properties/custom/flex-grid');
const { parse_flex_item } = require('../properties/custom/flex-item');
const { parse_font_family } = require('../properties/custom/font-family');
const { parse_font_size } = require('../properties/custom/font-size');
const { parse_layer } = require('../properties/custom/layer');
const { parse_offset } = require('../properties/custom/offset');
const { parse_overlay } = require('../properties/custom/overlay');
const { parse_position } = require('../properties/custom/position');
const { parse_radius } = require('../properties/custom/radius');
const { parse_shadow } = require('../properties/custom/shadow');
const { parse_transition } = require('../properties/custom/transition');
const { parse_visibility } = require('../properties/custom/visibility');

// Vendor imports

// Scripts

/**
 * Parses an attribute based on its property and creates CSS
 * @param {Settings} settings
 * @param {Property} prop_data
 * @param {Key} prop_key
 * @param {Instance} prop_instance
 * @param {Value} value
 * @return {string[] | false}
 */
function parse_properties(settings, prop_data, prop_key, prop_instance, value) {
  try {
    let theme = value.modifiers.theme;
    let property = prop_key.name;
    let css = false;
    // Ensure a matching theme is present
    if (settings.themes[theme]) {
      // Check against the property to call the correct CSS constructor
      if (custom_props.includes(property)) {
        if (property === 'border') {
          css = parse_border(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'container') {
          css = parse_container(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'flex-grid') {
          css = parse_flex_grid(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'flex-item') {
          css = parse_flex_item(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'font-family') {
          css = parse_font_family(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'font-size') {
          css = parse_font_size(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'layer' || property === 'z-index') {
          css = parse_layer(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'offset' || property === 'location') {
          css = parse_offset(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'overlay') {
          css = parse_overlay(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'position') {
          css = parse_position(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'radius') {
          css = parse_radius(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'shadow') {
          css = parse_shadow(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'transition') {
          css = parse_transition(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else if (property === 'visibility') {
          css = parse_visibility(
            settings,
            property,
            prop_data,
            prop_instance,
            value
          );
        } else {
          throw new Error(
            "Something fatal happened because you used a prop that should be custom, but it wasn't found."
          );
        }
      } else if (property === 'custom') {
        // Reserved
      } else {
        css = parse_property(
          settings,
          property,
          prop_data,
          prop_instance,
          value
        );
      }
      if (css && css.length > 0) {
        return css;
      }
    } else {
      // Using a theme that's not defined
      log_message(settings, {
        type: 'error',
        step: 'Building ' + property + ' CSS',
        message:
          "This query is using a theme modifier that hasn't been defined in your configuration.",
        attribute: prop_instance.attribute,
        query: value.query,
        files: prop_instance.files,
      });
      return false;
    }
  } catch (error) {
    log_message(settings, {
      type: 'error',
      message: error,
      step: 'Parsing properties',
      attribute: prop_instance.attribute,
      query: value.query,
      files: prop_instance.files,
    });
    return false;
  }
}

module.exports = {
  parse_properties,
};
