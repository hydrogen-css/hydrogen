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
function parse_flex_grid(
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
      let column_gap = query.values[1];
      let column_gap_css = '';
      let row_gap = false;
      let row_gap_css = '';
      if (query.values[2]) {
        row_gap = query.values[2];
      }
      // Parse alignment
      alignment_css = alignment;
      if (alignment === 'top') {
        alignment_css = 'flex-start';
      } else if (alignment === 'middle') {
        alignment_css = 'center';
      } else if (alignment === 'bottom') {
        alignment_css = 'flex-end';
      }
      // Parse column gap
      column_gap_css = process_configured_space(
        settings,
        media_model,
        property_model,
        property,
        attribute,
        query,
        column_gap
      );
      if (row_gap) {
        row_gap_css = process_configured_space(
          settings,
          media_model,
          property_model,
          property,
          attribute,
          query,
          row_gap
        );
        // prettier-ignore
        css = '{align-items: ' + alignment_css + ';display: flex;flex-wrap: wrap;--h2-column-gap: ' + column_gap_css + ';--h2-row-gap: ' + row_gap_css + ';margin: calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap));' + 'width:calc(100% + var(--h2-column-gap));}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat(selector + css);
          css_array = css_array.concat(
            // prettier-ignore
            selector + ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}'
          );
          css_array = css_array.concat(selector + '{pointer-events: none;}');
          css_array = css_array.concat(
            selector + ' > * {pointer-events: auto;}'
          );
        });
        return css_array;
      } else {
        // prettier-ignore
        css = '{align-items: ' + alignment_css + ';display: flex;flex-wrap: wrap;--h2-column-gap: ' + column_gap_css + ';--h2-row-gap: ' + column_gap_css + ';margin: calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap));' + 'width:calc(100% + var(--h2-column-gap));}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat(selector + css);
          css_array = css_array.concat(
            // prettier-ignore
            selector + ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}'
          );
          css_array = css_array.concat(selector + '{pointer-events: none;}');
          css_array = css_array.concat(
            selector + ' > * {pointer-events: auto;}'
          );
        });
        return css_array;
      }
    } else {
      throw new Error('Flex grid accepts 2 or 3 values.');
    }
  } catch (error) {
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
  parse_flex_grid,
};
