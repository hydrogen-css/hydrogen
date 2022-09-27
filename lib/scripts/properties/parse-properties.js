// Hydrogen: Parse properties
'use strict';

// Hydrogen type imports
let Settings = require('../../data/settings-model-definition');
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
let Properties = require('../../data/property-model-definition');
/**
 * @typedef {import('../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../data/property-model-definition').Property} Property
 * @typedef {import('../../data/property-model-definition').PropertyKeys} Key
 * @typedef {import('../../data/property-model-definition').PropertyKeyInstances} Instance
 * @typedef {import('../../data/property-model-definition').PropertyKeyInstanceValues} Value
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../../scripts/logs/log-message');
const { parse_basic_property } = require('../properties/basic');
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
var colors = require('colors');

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
    let property = prop_key.name;
    let css;
    // Check against the property to call the correct CSS constructor
    if (property === 'custom') {
      // Reserved
    } else if (
      property === 'align-content' ||
      property === 'align-items' ||
      property === 'align-self' ||
      property === 'cursor' ||
      property === 'display' ||
      property === 'flex-basis' ||
      property === 'flex-direction' ||
      property === 'flex-grow' ||
      property === 'flex-wrap' ||
      property === 'font-style' ||
      property === 'font-weight' ||
      property === 'grid-column' ||
      property === 'grid-row' ||
      property === 'justify-content' ||
      property === 'justify-items' ||
      property === 'list-style' ||
      property === 'opacity' ||
      property === 'order' ||
      property === 'outline' ||
      property === 'text-align' ||
      property === 'text-decoration' ||
      property === 'text-transform' ||
      property === 'vertical-align'
    ) {
      // Parse basic properties
      css = parse_basic_property(
        settings,
        'basic',
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (
      property === 'height' ||
      property === 'line-height' ||
      property === 'leading' ||
      property === 'margin-top' ||
      property === 'margin-right' ||
      property === 'margin-bottom' ||
      property === 'margin-left' ||
      property === 'max-height' ||
      property === 'max-width' ||
      property === 'min-height' ||
      property === 'min-width' ||
      property === 'padding-top' ||
      property === 'padding-right' ||
      property === 'padding-bottom' ||
      property === 'padding-left' ||
      property === 'width'
    ) {
      // Parse size properties
      css = parse_basic_property(
        settings,
        'size',
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property === 'margin' || property === 'padding') {
      // Parse space properties
      css = parse_space(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'background-color' || property == 'bg-color') {
      css = parse_background_color(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'border') {
      css = parse_border(
        settings,
        prop_data,
        prop_instance,
        property,
        value.prefix,
        value.selectors,
        value.options
      );
    } else if (property == 'font-color' || property == 'color') {
      css = parse_text_color(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'container') {
      css = parse_container(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'fill') {
      css = parse_fill(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'flex-grid') {
      css = parse_flex_grid(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'flex-item') {
      css = parse_flex_item(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'font-family') {
      css = parse_font_family(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'font-size') {
      css = parse_font_size(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'gap') {
      css = parse_gap(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'grid-template-columns') {
      css = parse_grid_template(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'grid-template-rows') {
      css = parse_grid_template(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'layer' || property == 'z-index') {
      css = parse_layer(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'offset' || property == 'location') {
      css = parse_offset(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'overflow') {
      css = parse_overflow(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'overlay') {
      css = parse_overlay(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'position') {
      css = parse_position(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'radius') {
      css = parse_radius(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'shadow') {
      css = parse_shadow(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'transform') {
      css = parse_transform(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'transition') {
      css = parse_transition(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    } else if (property == 'visibility') {
      css = parse_visibility(
        settings,
        prop_data,
        prop_instance,
        property,
        value.selectors,
        value.options
      );
    }
    if (css != false) {
      return css;
    } else {
      log_message({
        type: 'error',
        message: 'This attribute failed to compile.',
        step: 'Parsing properties',
        attribute: prop_instance.attribute,
        files: prop_instance.files,
      });
      return false;
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Parsing properties',
      attribute: prop_instance.attribute,
      files: prop_instance.files,
    });
    return false;
  }
}

module.exports = {
  parse_properties,
};
