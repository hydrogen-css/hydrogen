// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../data/config-data').ParsedConfig} ParsedConfig
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script ==========================================================================================

/**
 * Creates core variables, foundational CSS, and reset styles
 * @param {ParsedConfig} settings The user's settings
 * @param {string} variables The string of variables produced by parse_variables
 * @returns {string} A compiled string of CSS
 */
function build_core_css(settings, variables) {
  try {
    // Set an empty string for the CSS output
    let core_css = '';
    // If logs are enabled, write a processed settings object
    if (settings.logging.generate_logs) {
      fs.writeFileSync(
        path.join(settings.logging.directory + '/processed-settings.json'),
        JSON.stringify(settings, null, ' ')
      );
    }
    // Add the variables to the core CSS
    core_css = core_css + variables;
    // Set box sizing

    core_css = core_css + 'html{box-sizing: border-box;}html * {box-sizing: border-box;}';
    // Build reset styles if enabled
    if (settings.processing.include_reset_css) {
      // Set font size, line height
      core_css =
        core_css +
        'html{font-size: var(--h2-base-font-size); line-height: var(--h2-base-line-height);}';
      // Reset body
      core_css = core_css + 'body {position: relative;}';
      // Reset margins
      core_css =
        core_css +
        'body, h1, h2, h3, h4, h5, h6, p, blockquote, fieldset, figure, aside {margin: 0;}';
      // Set max widths on media
      core_css = core_css + 'img, iframe {max-width: 100%;}';
      // Reset heading font weights
      core_css = core_css + 'h1, h2, h3, h4, h5, h6 {font-weight: normal;}';
      // Reset font family to inherit
      core_css = core_css + '*:not(pre, code, kbd, samp) {font-family: inherit;}';
      // Reset line height to inherit
      core_css = core_css + '* {line-height: inherit;}';
      // Reset basic styles
      core_css = core_css + 'span {color: inherit;font-size: inherit;font-weight: inherit;}';
      core_css = core_css + 'em {color: inherit;font-size: inherit;font-style: italic;}';
      core_css = core_css + 'strong {color: inherit;font-size: inherit;font-weight: 600;}';
      core_css =
        core_css +
        'a {color: inherit;font-size: inherit;font-weight: inherit;text-decoration: underline;}';
      core_css =
        core_css +
        'button {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      core_css =
        core_css +
        'input {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      core_css =
        core_css +
        'select {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      core_css =
        core_css +
        'textarea {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      // Reset lists
      core_css =
        core_css + 'ul, ol, dl {margin: 0;}li {color: inherit;font-size: inherit;margin: 0;}';
      // Format font sizes
      // Captions
      core_css =
        core_css +
        'caption, label {font-size: var(--h2-font-size-caption);line-height: var(--h2-line-height-caption);}';
      // Copy
      core_css =
        core_css +
        'p {font-size: var(--h2-font-size-copy);line-height: var(--h2-line-height-copy);}';
      // H6
      core_css =
        core_css + 'h6 {font-size: var(--h2-font-size-h6);line-height: var(--h2-line-height-h6);}';
      // H5
      core_css =
        core_css + 'h5 {font-size: var(--h2-font-size-h5);line-height: var(--h2-line-height-h5);}';
      // H4
      core_css =
        core_css + 'h4 {font-size: var(--h2-font-size-h4);line-height: var(--h2-line-height-h4);}';
      // H3
      core_css =
        core_css + 'h3 {font-size: var(--h2-font-size-h3);line-height: var(--h2-line-height-h3);}';
      // H2
      core_css =
        core_css + 'h2 {font-size: var(--h2-font-size-h2);line-height: var(--h2-line-height-h2);}';
      // H1
      core_css =
        core_css + 'h1 {font-size: var(--h2-font-size-h1);line-height: var(--h2-line-height-h1);}';
    }
    // Return the core CSS
    return core_css;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Building core CSS',
        error: error,
      };
    }
  }
}

module.exports = {
  build_core_css,
};
