// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../../../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../../../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../../../../data/css-property-data').ParsedAttributes} ParsedAttributes
 * @typedef {import('../../../../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../../../../data/css-property-data').ParsedQuery} ParsedQuery
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Processes custom flex-item values.
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
 * @returns {string[]}
 */
function parse_flex_item(settings, media_model, property_model, property, attribute, query) {
  try {
    if (query.values.length === 1) {
      let css = '';
      let css_array = [];
      let flex = query.values[0];
      let flex_css = '';
      // Parse the flex value
      // Check to see if the value is a reserved key first
      if (flex === 'auto') {
        flex_css = '{flex: auto;max-width: 100%;min-width: 0;}';
      } else if (flex === 'content' || flex === 'initial') {
        flex_css = '{flex: initial;max-width: 100%;min-width: 0;}';
      } else if (flex === 'fill' || flex === '1') {
        flex_css = '{flex: 1;max-width: 100%;min-width: 0;}';
      } else if (flex.includes('of') === true) {
        // Since the value wasn't a key, it might be an XofY
        let x_column = flex.match(/^[0-9]+/g);
        let y_column = flex.match(/(?<=of)[0-9]+/g);
        if (x_column && y_column) {
          flex_css =
            '{flex: 0 0 calc((' +
            x_column +
            ' / ' +
            y_column +
            ' * 100%) - var(--h2-column-gap));min-width: 0;}';
        } else {
          throw new Error(
            'Flex item must be passed a value in one of the following formats: XofY, X/Y, auto, content, or fill.'
          );
        }
      } else if (flex.includes('/') === true) {
        // Since the value wasn't an XofY, check for the fraction syntax
        let numerator = flex.match(/^[0-9]+/g);
        let denominator = flex.match(/(?<=\/)[0-9]+/g);
        if (numerator && denominator) {
          flex_css =
            '{flex: 0 0 calc((' +
            numerator +
            ' / ' +
            denominator +
            ' * 100%) - var(--h2-column-gap));min-width: 0;}';
        } else {
          throw new Error(
            'Flex item must be passed a value in one of the following formats: XofY, X/Y, auto, content, or fill.'
          );
        }
      } else {
        throw new Error(
          'Flex item must be passed a value in one of the following formats: XofY, X/Y, auto, content, or fill.'
        );
      }
      css = flex_css;
      // Assemble and return the CSS array
      query.selectors.forEach((selector) => {
        css_array = css_array.concat(selector + css);
      });
      return css_array;
    } else {
      throw new Error('Flex item accepts 1 value.');
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
  parse_flex_item,
};
