// Hydrogen: Parse flex item
'use strict';

// Hydrogen data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('../../../data/media-model-definition').MediaArray} MediaModel
 * @typedef {import('../../../data/media-model-definition').MediaObject} Media
 */
/**
 * @typedef {import('../../../data/property-model-definition').PropertyModel} PropertyModel
 * @typedef {import('../../../data/property-model-definition').Properties} Properties
 * @typedef {import('../../../data/property-model-definition').Attribute} Attribute
 * @typedef {import('../../../data/property-model-definition').Query} Query
 * @typedef {import('../../../data/property-model-definition').Modifiers} Modifiers
 */

// Hydrogen data imports

// Hydrogen function imports
const { log_message } = require('../../logs/log-message');

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
 * @returns {Promise<string[]>}
 */
function parse_flex_item(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  return new Promise((resolve, reject) => {
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
            // prettier-ignore
            flex_css = '{flex: 0 0 calc((' + x_column + ' / ' + y_column + ' * 100%) - var(--h2-column-gap));min-width: 0;}';
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
            // prettier-ignore
            flex_css = '{flex: 0 0 calc((' + numerator + ' / ' + denominator + ' * 100%) - var(--h2-column-gap));min-width: 0;}';
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
        // prettier-ignore
        css = flex_css;
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat(selector + css);
        });
        resolve(css_array);
      } else {
        throw new Error('Flex item accepts 1 value.');
      }
    } catch (error) {
      if (typeof error === Error) {
        log_message({
          type: 'error',
          settings: settings,
          step: 'Processing ' + property,
          attribute: attribute.attribute,
          query: query.query,
          files: attribute.files,
          error: error,
        });
      } else {
        log_message({
          type: 'warning',
          settings: settings,
          step: 'Processing ' + property,
          attribute: attribute.attribute,
          query: query.query,
          files: attribute.files,
          message: error,
        });
      }
      reject();
    }
  });
}

module.exports = {
  parse_flex_item,
};
