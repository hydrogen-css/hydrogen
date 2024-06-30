// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').ParsedConfig} ParsedConfig
 */
/**
 * @typedef {import('../../../../data/media-array-data').QueryData} QueryData
 */
/**
 * @typedef {import('../../../../data/css-property-data').PropertyModel} PropertyModel
 * @typedef {import('../../../../data/css-property-data').ParsedAttributes} ParsedAttributes
 * @typedef {import('../../../../data/css-property-data').ParsedAttribute} ParsedAttribute
 * @typedef {import('../../../../data/css-property-data').ParsedQuery} ParsedQuery
 */

// Helper functions
const { log_message } = require('../../../console-logging/log-message');

// Vendor imports
var path = require('path');
var { transform, Features } = require('lightningcss');

/**
 * Validates individual attribute CSS to ensure the Hydrogen output is usable.
 * @param {ParsedConfig} settings Hydrogen's configuration object
 * @param {QueryData[]} media_model The compiled media array generated from the user's configuration file
 * @param {PropertyModel} property_model The property data object for storing attribute information
 * @param {string[]} webref An array of valid CSS property names
 * @param {string} property The current attribute's CSS property
 * @param {ParsedAttribute} attribute The current attribute's parsed data
 * @param {ParsedQuery} query The current attribute's parsed query data
 * @param {string[]} css An array containing the current attribute's CSS strings
 * @returns {boolean} Returns true or false based on whether the CSS was valid or not
 */
function validate_attribute_css(
  settings,
  media_model,
  property_model,
  webref,
  property,
  attribute,
  query,
  css
) {
  try {
    // Assemble the processed CSS into a single string
    let string = '';
    css.forEach((i) => {
      string = string + i;
    });
    // 2.0.6: Start validation by checking that the property is actually a valid CSS property
    let property_state = false;
    // Loop through the Webref array containing valid property names and look for a match
    webref.forEach((item) => {
      if (property === item) {
        property_state = true;
      }
    });
    // Then loop through Hydrogen's custom property names to look for a match
    property_model.properties.custom_identifiers.forEach((item) => {
      if (property === item) {
        property_state = true;
      }
    });
    // If a match hasn't been found using both methods, it's an invalid CSS property and should throw an error
    if (property_state === false) {
      log_message({
        type: 'error',
        step: 'Validating CSS',
        config: settings,
        message: '"' + property + '" isn\'t a valid CSS property.',
        attribute: attribute.attribute,
        query: query.query,
        css: string,
        files: attribute.files,
      });
      return false;
    }
    // 2.0.6: Use Lightning CSS to run basic validation; this isn't as comprehensive as the previous tool (CSSTree), but it is regularly updated and offers support for modern CSS features
    try {
      // Create a basic Lightning CSS configuration
      const lightning_config = {
        filename: path.join(settings.output.parsed.string + '/hydrogen.css'),
        code: Buffer.from(string),
        minify: true,
        sourceMap: true,
        errorRecovery: false,
        exclude: Features.VendorPrefixes,
      };
      // Run Lightning CSS to see if it finds any errors
      let { warnings } = transform(lightning_config);
      // If there are warnings, log them, but allow Hydrogen to continue
      if (warnings) {
        warnings.forEach((warn) => {
          log_message({
            type: 'warning',
            step: 'Validating CSS',
            config: settings,
            message: warn.message,
            error: warn,
            attribute: attribute.attribute,
            query: query.query,
            css: string,
            files: attribute.files,
          });
        });
      }
      return true;
    } catch (error) {
      // Lightning ran into an error, so log it to the console and tell Hydrogen to ignore the attribute
      log_message({
        type: 'error',
        step: 'Validating CSS',
        config: settings,
        error: error,
        attribute: attribute.attribute,
        query: query.query,
        css: string,
        files: attribute.files,
      });
      return false;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Validating CSS',
        error: error,
      };
    }
  }
}

module.exports = {
  validate_attribute_css,
};
