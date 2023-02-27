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
const { process_generic_value } = require('../process-generic-value');
const { process_configured_space } = require('../process-configured-space');

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
function parse_container(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  try {
    if (query.values.length === 2 || query.values.length === 3) {
      let css = '';
      let css_array = [];
      let alignment = query.values[0];
      let alignment_css = '';
      let width = query.values[1];
      let width_css = '';
      let padding = false;
      let padding_css = '';
      if (query.values[2]) {
        padding = query.values[2];
      }
      // Construct alignment CSS
      if (alignment === 'center' || alignment === 'middle') {
        alignment_css = 'margin-right: auto;margin-left: auto;';
      } else if (alignment === 'left') {
        alignment_css = 'margin-right: auto;margin-left: 0;';
      } else if (alignment === 'right') {
        alignment_css = 'margin-right: 0;margin-left: auto;';
      } else {
        throw new Error(
          'The first option passed to container must be "center", "left", or "right".'
        );
      }
      // Construct width CSS
      width = process_generic_value(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        'container',
        'containers',
        width
      );
      width_css = process_configured_space(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        width
      );
      // Construct padding CSS if applicable
      if (padding) {
        padding_css = process_configured_space(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query,
          padding
        );
        let modified_width_css = '';
        if (
          width_css === 'none' ||
          width_css === 'initial' ||
          width_css === 'inherit'
        ) {
          modified_width_css = width_css;
        } else {
          modified_width_css =
            'calc(' + width_css + ' + (' + padding_css + ' * 2))';
        }
        // Build the CSS string
        // prettier-ignore
        css = '{' + alignment_css + 'max-width:' + modified_width_css + ';padding-right:' + padding_css + ';padding-left:' + padding_css + ';width: 100%;}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat(selector + css);
        });
        return css_array;
      } else {
        // prettier-ignore
        css = '{' + alignment_css + 'max-width: ' + width_css + ';width: 100%;}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat(selector + css);
        });
        return css_array;
      }
    } else {
      throw new Error('Container accepts 2 or 3 values.');
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Processing ' + property,
        error: error,
      };
    }
  }
}

module.exports = {
  parse_container,
};
