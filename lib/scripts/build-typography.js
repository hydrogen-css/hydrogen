// Hydrogen: Build typography
'use strict';

// Vendor dependencies
var path = require('path');

// Hydrogen dependencies
var { h2_load_settings } = require('./load-settings');
var { h2_error_detail } = require('./logs');

/**
 * Calculates consistent line heights based on a vertical rhythm unit for a font size
 * @param {integer} size
 * @param {float} base_line_height
 * @returns {float} returns a calculated line height based on the font size and vertical rhythm
 */
function calculate_line_height(size, base_line_height) {
  try {
    var line_height_multiple = 0;
    var line_height_counter = 1;
    var line_height;
    do {
      line_height_multiple = base_line_height * line_height_counter;
      if (line_height_multiple < size) {
        line_height_counter = line_height_counter + 1;
      } else {
        line_height = line_height_multiple / size;
        return line_height;
      }
    } while (line_height_multiple < size);
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error_detail('internal', null, null, error);
    return false;
  }
}

function buildTypography() {
  try {
    var settings = h2_load_settings();
    var typeSettings = settings.typography;
    var typeArray = [];
    typeSettings.forEach(function (typeSetting) {
      var settingObject = {};
      var htmlSize = typeSetting.size;
      settingObject.htmlSize = htmlSize;
      var line_height = typeSetting.line_height;
      settingObject.line_height = line_height;
      var type_scale = typeSetting.type_scale;
      settingObject.type_scale = type_scale;
      var typeQuery = null;
      var mediaMatch = false;
      settings.media.forEach(function (query) {
        if (query.key == typeSetting.query_key) {
          typeQuery = query.query;
          mediaMatch = true;
        }
      });
      if (mediaMatch == true) {
        settingObject.query_key = typeSetting.query_key;
        settingObject.query = typeQuery;
      } else {
        h2_error_detail(
          'internal',
          null,
          path.join(process.cwd() + '/hydrogen.config.json'),
          typeSetting.query_key +
            ' does not match any of the media keys in your configuration file.'
        );
        return false;
      }
      // Need to generate font sizes
      settingObject.caption = {};
      settingObject.caption.size = 'calc((1 / ' + type_scale + ' ) * 1rem)';
      settingObject.copy = {};
      settingObject.copy.size = 'calc(1 * 1rem)';
      settingObject.h6 = {};
      var h6Size = 1 * type_scale;
      settingObject.h6.size = 'calc((1 * ' + type_scale + ' ) * 1rem)';
      settingObject.h5 = {};
      var h5Size = h6Size * type_scale;
      settingObject.h5.size =
        'calc(var(--h2-font-size-h6) * ' + type_scale + ' )';
      settingObject.h4 = {};
      var h4Size = h5Size * type_scale;
      settingObject.h4.size =
        'calc(var(--h2-font-size-h5) * ' + type_scale + ' )';
      settingObject.h3 = {};
      var h3Size = h4Size * type_scale;
      settingObject.h3.size =
        'calc(var(--h2-font-size-h4) * ' + type_scale + ' )';
      settingObject.h2 = {};
      var h2Size = h3Size * type_scale;
      settingObject.h2.size =
        'calc(var(--h2-font-size-h3) * ' + type_scale + ' )';
      settingObject.h1 = {};
      var h1Size = h2Size * type_scale;
      settingObject.h1.size =
        'calc(var(--h2-font-size-h2) * ' + type_scale + ' )';
      // Need to generate line heights
      settingObject.caption.line_height = 'var(--h2-base-line-height)';
      settingObject.copy.line_height = 'var(--h2-base-line-height)';
      var h6_line_height = calculate_line_height(h6Size, line_height);
      settingObject.h6.line_height = h6_line_height;
      var h5_line_height = calculate_line_height(h5Size, line_height);
      settingObject.h5.line_height = h5_line_height;
      var h4_line_height = calculate_line_height(h4Size, line_height);
      settingObject.h4.line_height = h4_line_height;
      var h3_line_height = calculate_line_height(h3Size, line_height);
      settingObject.h3.line_height = h3_line_height;
      var h2_line_height = calculate_line_height(h2Size, line_height);
      settingObject.h2.line_height = h2_line_height;
      var h1_line_height = calculate_line_height(h1Size, line_height);
      settingObject.h1.line_height = h1_line_height;
      typeArray = typeArray.concat(settingObject);
    });
    return typeArray;
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error_detail('internal', null, null, error);
    return false;
  }
}

module.exports = {
  buildTypography,
};
