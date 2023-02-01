// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../data/settings-model-definition').Typography} Typography
 */

// Data imports

// Logging

// Functions

// Vendor imports

// Scripts
/**
 * Assembles a string containing all the size and line heights for a particular type setting
 * @param {Settings} settings The user's settings
 * @param {Typography} type_setting
 * @returns {string} A string containing type variables for use in CSS
 */
function build_typography_variables(settings, type_setting) {
  try {
    // Captions
    // prettier-ignore
    let caption_size = '--h2-font-size-caption: ' + type_setting.caption.size + ';\n';
    // prettier-ignore
    let caption_line = '--h2-line-height-caption: ' + type_setting.caption.line_height + ';\n';
    // Copy
    // prettier-ignore
    let copy_size = '--h2-font-size-copy: ' + type_setting.copy.size + ';\n';
    // prettier-ignore
    let copy_line = '--h2-line-height-copy: ' + type_setting.copy.line_height + ';\n';
    // Heading 6
    // prettier-ignore
    let h6_size = '--h2-font-size-h6: ' + type_setting.h6.size + ';\n';
    // prettier-ignore
    let h6_line = '--h2-line-height-h6: ' + type_setting.h6.line_height + ';\n';
    // Heading 5
    // prettier-ignore
    let h5_size = '--h2-font-size-h5: ' + type_setting.h5.size + ';\n';
    // prettier-ignore
    let h5_line = '--h2-line-height-h5: ' + type_setting.h5.line_height + ';\n';
    // Heading 4
    // prettier-ignore
    let h4_size = '--h2-font-size-h4: ' + type_setting.h4.size + ';\n';
    // prettier-ignore
    let h4_line = '--h2-line-height-h4: ' + type_setting.h4.line_height + ';\n';
    // Heading 3
    // prettier-ignore
    let h3_size = '--h2-font-size-h3: ' + type_setting.h3.size + ';\n';
    // prettier-ignore
    let h3_line = '--h2-line-height-h3: ' + type_setting.h3.line_height + ';\n';
    // Heading 2
    // prettier-ignore
    let h2_size = '--h2-font-size-h2: ' + type_setting.h2.size + ';\n';
    // prettier-ignore
    let h2_line = '--h2-line-height-h2: ' + type_setting.h2.line_height + ';\n';
    // Heading 1
    // prettier-ignore
    let h1_size = '--h2-font-size-h1: ' + type_setting.h1.size + ';\n';
    // prettier-ignore
    let h1_line = '--h2-line-height-h1: ' + type_setting.h1.line_height + ';\n';
    // Display
    // prettier-ignore
    let display_size = '--h2-font-size-display: ' + type_setting.display.size + ';\n';
    // prettier-ignore
    let display_line = '--h2-line-height-display: ' + type_setting.display.line_height + ';\n';
    // Assemble the type string and return it
    let typography =
      caption_size +
      caption_line +
      copy_size +
      copy_line +
      h6_size +
      h6_line +
      h5_size +
      h5_line +
      h4_size +
      h4_line +
      h3_size +
      h3_line +
      h2_size +
      h2_line +
      h1_size +
      h1_line +
      display_size +
      display_line;
    return typography;
  } catch (error) {
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Building typography variables',
        error: error,
      };
    }
  }
}

module.exports = {
  build_typography_variables,
};
