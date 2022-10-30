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

// Hydrogen function imports
const { log_message } = require('../../scripts/logs/log-message');
const { parse_basic_property } = require('../properties/parse-basic-property');
const { parse_space } = require('../properties/space');
const {
  parse_background_color,
} = require('../properties/custom/background-color');
const { parse_border } = require('../properties/custom/border');
const { parse_text_color } = require('../properties/custom/color');
const { parse_container } = require('../properties/custom/container');
const { parse_fill } = require('../properties/custom/fill');
const { parse_flex_grid } = require('../properties/custom/flex-grid');
const { parse_flex_item } = require('../properties/custom/flex-item');
const { parse_font_family } = require('../properties/custom/font-family');
const { parse_font_size } = require('../properties/custom/font-size');
const { parse_gap } = require('../properties/custom/gap');
const { parse_grid_template } = require('../properties/custom/grid-template');
const { parse_layer } = require('../properties/custom/layer');
const { parse_offset } = require('../properties/custom/offset');
const { parse_overflow } = require('../properties/custom/overflow');
const { parse_overlay } = require('../properties/custom/overlay');
const { parse_position } = require('../properties/custom/position');
const { parse_radius } = require('../properties/custom/radius');
const { parse_shadow } = require('../properties/custom/shadow');
const { parse_transform } = require('../properties/custom/transform');
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
      if (property === 'custom') {
        // Reserved
      } else if (property === 'margin' || property === 'padding') {
        // Parse space properties
        css = parse_space(settings, property, prop_data, prop_instance, value);
      } else if (property === 'background-color' || property === 'bg-color') {
        css = parse_background_color(
          settings,
          property,
          prop_data,
          prop_instance,
          value
        );
      } else if (property === 'border') {
        css = parse_border(settings, property, prop_data, prop_instance, value);
      } else if (property === 'font-color' || property === 'color') {
        css = parse_text_color(
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
      } else if (property === 'fill') {
        css = parse_fill(settings, property, prop_data, prop_instance, value);
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
      } else if (property === 'gap') {
        css = parse_gap(settings, property, prop_data, prop_instance, value);
      } else if (property === 'grid-template-columns') {
        css = parse_grid_template(
          settings,
          property,
          prop_data,
          prop_instance,
          value
        );
      } else if (property === 'grid-template-rows') {
        css = parse_grid_template(
          settings,
          property,
          prop_data,
          prop_instance,
          value
        );
      } else if (property === 'layer' || property === 'z-index') {
        css = parse_layer(settings, property, prop_data, prop_instance, value);
      } else if (property === 'offset' || property === 'location') {
        css = parse_offset(settings, property, prop_data, prop_instance, value);
      } else if (property === 'overflow') {
        css = parse_overflow(
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
        css = parse_radius(settings, property, prop_data, prop_instance, value);
      } else if (property === 'shadow') {
        css = parse_shadow(settings, property, prop_data, prop_instance, value);
      } else if (property === 'transform') {
        css = parse_transform(
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
        // Parse property as straight CSS
        css = parse_basic_property(
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
