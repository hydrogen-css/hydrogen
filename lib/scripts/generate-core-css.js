// Hydrogen: Generate core CSS

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');
var { h2Error } = require('./logs');
var { buildTypography } = require('./build-typography');

function generateCoreCSS() {
  try {
    var settings = loadSettings();
    var coreCSSString = '';
    // Set the base font sizes and line heights
    var typographySettings = buildTypography();
    typographySettings.forEach(function (setting) {
      // Check for a media query and add it if it exists
      if (setting.query != null && setting.query != 'base') {
        coreCSSString = coreCSSString + '@media ' + setting.query + '{';
      }
      // Build the font size and line height CSS variables
      coreCSSString = coreCSSString + ':root {';
      // Base settings
      coreCSSString = coreCSSString + '--h2-base-font-size: ' + setting.htmlSize + ';';
      coreCSSString = coreCSSString + '--h2-base-line-height: ' + setting.lineHeight + ';';
      coreCSSString = coreCSSString + '--h2-whitespace: ' + setting.lineHeight + ';';
      // Captions
      coreCSSString = coreCSSString + '--h2-font-size-caption: ' + setting.caption.size + ';';
      coreCSSString = coreCSSString + '--h2-line-height-caption: ' + setting.caption.lineHeight + ';';
      // Copy
      coreCSSString = coreCSSString + '--h2-font-size-copy: ' + setting.copy.size + ';';
      coreCSSString = coreCSSString + '--h2-line-height-copy: ' + setting.copy.lineHeight + ';';
      // H6
      coreCSSString = coreCSSString + '--h2-font-size-h6: ' + setting.h6.size + ';';
      coreCSSString = coreCSSString + '--h2-line-height-h6: ' + setting.h6.lineHeight + ';';
      // H5
      coreCSSString = coreCSSString + '--h2-font-size-h5: ' + setting.h5.size + ';';
      coreCSSString = coreCSSString + '--h2-line-height-h5: ' + setting.h5.lineHeight + ';';
      // H4
      coreCSSString = coreCSSString + '--h2-font-size-h4: ' + setting.h4.size + ';';
      coreCSSString = coreCSSString + '--h2-line-height-h4: ' + setting.h4.lineHeight + ';';
      // H3
      coreCSSString = coreCSSString + '--h2-font-size-h3: ' + setting.h3.size + ';';
      coreCSSString = coreCSSString + '--h2-line-height-h3: ' + setting.h3.lineHeight + ';';
      // H2
      coreCSSString = coreCSSString + '--h2-font-size-h2: ' + setting.h2.size + ';';
      coreCSSString = coreCSSString + '--h2-line-height-h2: ' + setting.h2.lineHeight + ';';
      // H1
      coreCSSString = coreCSSString + '--h2-font-size-h1: ' + setting.h1.size + ';';
      coreCSSString = coreCSSString + '--h2-line-height-h1: ' + setting.h1.lineHeight + ';';
      // Build font family variables for later use
      if (settings.fonts != null) {
        settings.fonts.forEach(function (fontFamilySetting) {
          coreCSSString = coreCSSString + '--h2-font-family-' + fontFamilySetting.key + ': ' + fontFamilySetting.family + ';';
        });
      }
      // Close the root declaration
      coreCSSString = coreCSSString + '}';
      // Close the media query if it exists
      if (setting.query != null && setting.query != 'base') {
        coreCSSString = coreCSSString + '}';
      }
    });
    // Set box sizing
    coreCSSString = coreCSSString + 'html{box-sizing: border-box;}html * {box-sizing: border-box;}';
    // Build reset styles if enabled
    if (settings.resetStyles != null && settings.resetStyles == true) {
      // Set font size, line height
      coreCSSString = coreCSSString + 'html{font-size: var(--h2-base-font-size); line-height: var(--h2-base-line-height);}';
      // Reset body
      coreCSSString = coreCSSString + 'body {position: relative;}';
      // Reset margins
      coreCSSString = coreCSSString + 'body, h1, h2, h3, h4, h5, h6, p, blockquote, fieldset, figure, aside {margin: 0;}';
      // Set max widths on media
      coreCSSString = coreCSSString + 'img, iframe {max-width: 100%;}';
      // Reset heading font weights
      coreCSSString = coreCSSString + 'h1, h2, h3, h4, h5, h6 {font-weight: normal;}';
      // Reset font family to inherit
      coreCSSString = coreCSSString + '*:not(pre, code, kbd, samp) {font-family: inherit;}';
      // Reset line height to inherit
      coreCSSString = coreCSSString + '* {line-height: inherit;}';
      // Reset basic styles
      coreCSSString = coreCSSString + 'span {color: inherit;font-size: inherit;font-weight: inherit;}';
      coreCSSString = coreCSSString + 'em {color: inherit;font-size: inherit;font-style: italic;}';
      coreCSSString = coreCSSString + 'strong {color: inherit;font-size: inherit;font-weight: 600;}';
      coreCSSString = coreCSSString + 'a {color: inherit;font-size: inherit;font-weight: inherit;text-decoration: underline;}';
      coreCSSString = coreCSSString + 'button {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      coreCSSString = coreCSSString + 'input {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      coreCSSString = coreCSSString + 'select {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      coreCSSString = coreCSSString + 'textarea {font-family: inherit; font-size: var(--h2-font-size-copy); line-height: var(--h2-line-height-copy);}';
      // Reset lists
      coreCSSString = coreCSSString + 'ul, ol, dl {margin: 0;}li {color: inherit;font-size: inherit;margin: 0;}';
      // Format font sizes
      // Captions
      coreCSSString = coreCSSString + 'caption, label {font-size: var(--h2-font-size-caption);line-height: var(--h2-line-height-caption);}';
      // Copy
      coreCSSString = coreCSSString + 'p {font-size: var(--h2-font-size-copy);line-height: var(--h2-line-height-copy);}';
      // H6
      coreCSSString = coreCSSString + 'h6 {font-size: var(--h2-font-size-h6);line-height: var(--h2-line-height-h6);}';
      // H5
      coreCSSString = coreCSSString + 'h5 {font-size: var(--h2-font-size-h5);line-height: var(--h2-line-height-h5);}';
      // H4
      coreCSSString = coreCSSString + 'h4 {font-size: var(--h2-font-size-h4);line-height: var(--h2-line-height-h4);}';
      // H3
      coreCSSString = coreCSSString + 'h3 {font-size: var(--h2-font-size-h3);line-height: var(--h2-line-height-h3);}';
      // H2
      coreCSSString = coreCSSString + 'h2 {font-size: var(--h2-font-size-h2);line-height: var(--h2-line-height-h2);}';
      // H1
      coreCSSString = coreCSSString + 'h1 {font-size: var(--h2-font-size-h1);line-height: var(--h2-line-height-h1);}';
    }
    // Return the core CSS
    return coreCSSString;
  } catch (error) {
    h2Error(error);
    return error;
  }
}

module.exports = {
  generateCoreCSS,
};
