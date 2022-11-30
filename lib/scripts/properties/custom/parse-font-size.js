// Hydrogen: Parse font size
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
function parse_font_size(
  settings,
  media_model,
  property_model,
  property,
  attribute,
  query
) {
  return new Promise((resolve, reject) => {
    try {
      if (query.values.length === 1 || query.values.length === 2) {
        let css = '';
        let css_array = [];
        let size = query.values[0];
        let size_css = '';
        let line_height = false;
        let line_height_css = '';
        if (query.values[1]) {
          line_height = query.values[1];
          line_height_css = line_height;
        }
        // Parse font-size
        if (size === 'display') {
          size_css = 'var(--h2-font-size-display)';
          if (!line_height) {
            line_height_css = 'var(--h2-line-height-display)';
          }
        } else if (size === 'h1') {
          size_css = 'var(--h2-font-size-h1)';
          if (!line_height) {
            line_height_css = 'var(--h2-line-height-h1)';
          }
        } else if (size === 'h2') {
          size_css = 'var(--h2-font-size-h2)';
          if (!line_height) {
            line_height_css = 'var(--h2-line-height-h2)';
          }
        } else if (size === 'h3') {
          size_css = 'var(--h2-font-size-h3)';
          if (!line_height) {
            line_height_css = 'var(--h2-line-height-h3)';
          }
        } else if (size === 'h4') {
          size_css = 'var(--h2-font-size-h4)';
          if (!line_height) {
            line_height_css = 'var(--h2-line-height-h4)';
          }
        } else if (size === 'h5') {
          size_css = 'var(--h2-font-size-h5)';
          if (!line_height) {
            line_height_css = 'var(--h2-line-height-h5)';
          }
        } else if (size === 'h6') {
          size_css = 'var(--h2-font-size-h6)';
          if (!line_height) {
            line_height_css = 'var(--h2-line-height-h6)';
          }
        } else if (
          size === 'base' ||
          size === 'paragraph' ||
          size === 'normal' ||
          size === 'copy'
        ) {
          size_css = 'var(--h2-font-size-copy)';
          if (!line_height) {
            line_height_css = 'var(--h2-line-height-copy)';
          }
        } else if (size === 'label' || size === 'caption') {
          size_css = 'var(--h2-font-size-caption)';
          if (!line_height) {
            line_height_css = 'var(--h2-line-height-caption)';
          }
        } else {
          // CSS units were used for font size
          size_css = size;
          if (!line_height) {
            line_height_css = 'var(--h2-line-height-copy)';
          }
        }
        // prettier-ignore
        css = '{font-size: ' + size_css + ';line-height: ' + line_height_css + ';}';
        // Assemble and return the CSS array
        query.selectors.forEach((selector) => {
          css_array = css_array.concat(
            '[data-h2-line-height]' + selector + ',',
            '[data-h2-leading]' + selector + ','
          );
          css_array = css_array.concat(selector + css);
        });
        resolve(css_array);
      } else {
        throw new Error('Font size accepts 1 or 2 values.');
      }
    } catch (error) {
      log_message({
        type: 'error',
        settings: settings,
        step: 'Processing ' + property,
        attribute: attribute.attribute,
        query: query.query,
        files: attribute.files,
        error: error,
      });
      reject();
    }
  });
}

module.exports = {
  parse_font_size,
};
