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
const { process_configured_space } = require('../../process-configured-space');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Processes custom flex-grid values.
 *
 * @param {ParsedConfig} settings
 * @param {QueryData[]} media_model
 * @param {PropertyModel} property_model
 * @param {string} property
 * @param {ParsedAttribute} attribute
 * @param {ParsedQuery} query
 * @returns {string[]}
 */
function parse_flex_grid(settings, media_model, property_model, property, attribute, query) {
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
        css =
          '{align-items: ' +
          alignment_css +
          ';display: flex;flex-wrap: wrap;--h2-column-gap: ' +
          column_gap_css +
          ';--h2-row-gap: ' +
          row_gap_css +
          ';margin: calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap));' +
          'width:calc(100% + var(--h2-column-gap));}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat(selector + css);
          css_array = css_array.concat(
            selector + ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}'
          );
          css_array = css_array.concat(selector + '{pointer-events: none;}');
          css_array = css_array.concat(selector + ' > * {pointer-events: auto;}');
        });
        return css_array;
      } else {
        css =
          '{align-items: ' +
          alignment_css +
          ';display: flex;flex-wrap: wrap;--h2-column-gap: ' +
          column_gap_css +
          ';--h2-row-gap: ' +
          column_gap_css +
          ';margin: calc(-1 * var(--h2-row-gap)) 0 0 calc(-1 * var(--h2-column-gap));' +
          'width:calc(100% + var(--h2-column-gap));}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat(selector + css);
          css_array = css_array.concat(
            selector + ' > [data-h2-flex-item]{margin: var(--h2-row-gap) 0 0 var(--h2-column-gap);}'
          );
          css_array = css_array.concat(selector + '{pointer-events: none;}');
          css_array = css_array.concat(selector + ' > * {pointer-events: auto;}');
        });
        return css_array;
      }
    } else {
      throw new Error('Flex grid accepts 2 or 3 values.');
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
  parse_flex_grid,
};
