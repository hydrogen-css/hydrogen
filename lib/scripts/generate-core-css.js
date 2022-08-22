// Hydrogen: Generate core CSS
'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { h2_load_settings } = require('./load-settings');
var { h2_error_detail } = require('./logs');
var { buildTypography } = require('./build-typography');
var { build_variables } = require('./build-variables');

function generateCoreCSS() {
  try {
    var settings = h2_load_settings();
    var coreCSSString = '';
    //
    // Load the variables ======================================================
    //
    let generated_variables = build_variables();
    coreCSSString = coreCSSString + generated_variables;
    // Set box sizing
    coreCSSString =
      coreCSSString +
      'html{box-sizing: border-box;}html * {box-sizing: border-box;}';
    // Build reset styles if enabled
    if (settings.reset_styles != null && settings.reset_styles == true) {
      // Set font size, line height
      coreCSSString =
        coreCSSString +
        'html{font-size: var(--h2-base-font-size); line-height: var(--h2-base-line-height);}';
      // Reset body
      coreCSSString = coreCSSString + 'body {position: relative;}';
      // Reset margins
      coreCSSString =
        coreCSSString +
        'body, h1, h2, h3, h4, h5, h6, p, blockquote, fieldset, figure, aside {margin: 0;}';
      // Set max widths on media
      coreCSSString = coreCSSString + 'img, iframe {max-width: 100%;}';
      // Reset heading font weights
      coreCSSString =
        coreCSSString + 'h1, h2, h3, h4, h5, h6 {font-weight: normal;}';
      // Reset font family to inherit
      coreCSSString =
        coreCSSString + '*:not(pre, code, kbd, samp) {font-family: inherit;}';
      // Reset line height to inherit
      coreCSSString = coreCSSString + '* {line-height: inherit;}';
      // Reset basic styles
      coreCSSString =
        coreCSSString +
        'span {color: inherit;font-size: inherit;font-weight: inherit;}';
      coreCSSString =
        coreCSSString +
        'em {color: inherit;font-size: inherit;font-style: italic;}';
      coreCSSString =
        coreCSSString +
        'strong {color: inherit;font-size: inherit;font-weight: 600;}';
      coreCSSString =
        coreCSSString +
        'a {color: inherit;font-size: inherit;font-weight: inherit;text-decoration: underline;}';
      coreCSSString =
        coreCSSString +
        'button {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      coreCSSString =
        coreCSSString +
        'input {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      coreCSSString =
        coreCSSString +
        'select {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      coreCSSString =
        coreCSSString +
        'textarea {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      // Reset lists
      coreCSSString =
        coreCSSString +
        'ul, ol, dl {margin: 0;}li {color: inherit;font-size: inherit;margin: 0;}';
      // Format font sizes
      // Captions
      coreCSSString =
        coreCSSString +
        'caption, label {font-size: var(--h2-font-size-caption);line-height: var(--h2-line-height-caption);}';
      // Copy
      coreCSSString =
        coreCSSString +
        'p {font-size: var(--h2-font-size-copy);line-height: var(--h2-line-height-copy);}';
      // H6
      coreCSSString =
        coreCSSString +
        'h6 {font-size: var(--h2-font-size-h6);line-height: var(--h2-line-height-h6);}';
      // H5
      coreCSSString =
        coreCSSString +
        'h5 {font-size: var(--h2-font-size-h5);line-height: var(--h2-line-height-h5);}';
      // H4
      coreCSSString =
        coreCSSString +
        'h4 {font-size: var(--h2-font-size-h4);line-height: var(--h2-line-height-h4);}';
      // H3
      coreCSSString =
        coreCSSString +
        'h3 {font-size: var(--h2-font-size-h3);line-height: var(--h2-line-height-h3);}';
      // H2
      coreCSSString =
        coreCSSString +
        'h2 {font-size: var(--h2-font-size-h2);line-height: var(--h2-line-height-h2);}';
      // H1
      coreCSSString =
        coreCSSString +
        'h1 {font-size: var(--h2-font-size-h1);line-height: var(--h2-line-height-h1);}';
    }
    // Return the core CSS
    return coreCSSString;
  } catch (error) {
    // =========================================================================
    // Catch any generic errors
    h2_error_detail('internal', null, null, error);
    return false;
  }
}

module.exports = {
  generateCoreCSS,
};
