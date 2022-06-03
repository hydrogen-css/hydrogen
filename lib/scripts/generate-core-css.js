// Hydrogen: Generate core CSS

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');
var { h2Error } = require('./logs');
var { buildTypography } = require('./build-typography');

function generateCoreCSS(argv) {
  try {
    var settings = loadSettings(argv);
    var coreCSSString = '';
    // Set the base font sizes and line heights
    var typographySettings = buildTypography(argv);
    typographySettings.forEach(function (setting) {
      // Check for a media query and add it if it exists
      if (setting.query != null && setting.query != 'base') {
        coreCSSString = coreCSSString + '@media ' + setting.query + '{';
      }
      // Build the font size and line height CSS variables
      coreCSSString = coreCSSString + ':root {';
      // Base settings
      coreCSSString = coreCSSString + '--h2BaseFontSize: ' + setting.htmlSize + ';';
      coreCSSString = coreCSSString + '--h2BaseLineHeight: ' + setting.lineHeight + ';';
      // Captions
      coreCSSString = coreCSSString + '--h2CaptionFontSize: ' + setting.caption.size + ';';
      coreCSSString = coreCSSString + '--h2CaptionLineHeight: ' + setting.caption.lineHeight + ';';
      // Copy
      coreCSSString = coreCSSString + '--h2CopyFontSize: ' + setting.copy.size + ';';
      coreCSSString = coreCSSString + '--h2CopyLineHeight: ' + setting.copy.lineHeight + ';';
      // H6
      coreCSSString = coreCSSString + '--h2H6FontSize: ' + setting.h6.size + ';';
      coreCSSString = coreCSSString + '--h2H6LineHeight: ' + setting.h6.lineHeight + ';';
      // H5
      coreCSSString = coreCSSString + '--h2H5FontSize: ' + setting.h5.size + ';';
      coreCSSString = coreCSSString + '--h2H5LineHeight: ' + setting.h5.lineHeight + ';';
      // H4
      coreCSSString = coreCSSString + '--h2H4FontSize: ' + setting.h4.size + ';';
      coreCSSString = coreCSSString + '--h2H4LineHeight: ' + setting.h4.lineHeight + ';';
      // H3
      coreCSSString = coreCSSString + '--h2H3FontSize: ' + setting.h3.size + ';';
      coreCSSString = coreCSSString + '--h2H3LineHeight: ' + setting.h3.lineHeight + ';';
      // H2
      coreCSSString = coreCSSString + '--h2H2FontSize: ' + setting.h2.size + ';';
      coreCSSString = coreCSSString + '--h2H2LineHeight: ' + setting.h2.lineHeight + ';';
      // H1
      coreCSSString = coreCSSString + '--h2H1FontSize: ' + setting.h1.size + ';';
      coreCSSString = coreCSSString + '--h2H1LineHeight: ' + setting.h1.lineHeight + ';';
      // Close the root declaration
      coreCSSString = coreCSSString + '}';
      // Close the media query if it exists
      if (setting.query != null && setting.query != 'base') {
        coreCSSString = coreCSSString + '}';
      }
    });
    // Set box sizing
    coreCSSString = coreCSSString + 'html{box-sizing: border-box;}html * {box-sizing: border-box;}';
    if (settings.resetStyles != null && settings.resetStyles == true) {
      // Set font size, line height
      coreCSSString = coreCSSString + 'html{font-size: var(--h2BaseFontSize); line-height: var(--h2BaseLineHeight);}';
      // Reset body
      coreCSSString = coreCSSString + 'body {position: relative;}';
      // Reset margins
      coreCSSString = coreCSSString + 'body, h1, h2, h3, h4, h5, h6, p, blockquote, fieldset, figure, aside {margin: 0;}';
      // Set max widths on media
      coreCSSString = coreCSSString + 'img, iframe {max-width: 100%;}';
      // Reset heading font weights
      coreCSSString = coreCSSString + 'h1, h2, h3, h4, h5, h6 {font-weight: normal;}';
      // Reset basic styles
      coreCSSString = coreCSSString + 'span {color: inherit;font-family: inherit;font-size: inherit;font-weight: inherit;line-height: inherit;}em {color: inherit;font-family: inherit;font-size: inherit;font-style: italic;line-height: inherit;}strong {color: inherit;font-family: inherit;font-size: inherit;font-weight: 600;line-height: inherit;}a {color: inherit;font-family: inherit;font-size: inherit;font-weight: inherit;line-height: inherit;text-decoration: underline;}';
      // Reset lists
      coreCSSString = coreCSSString + 'ul, ol, dl {line-height: inherit;padding: 0;margin: 0;}li {color: inherit;font-family: inherit;font-size: inherit;line-height: inherit;margin: 0;}';
      // Format font sizes
      // Captions
      coreCSSString = coreCSSString + 'caption, label {font-size: var(--h2CaptionFontSize);line-height: var(--h2CaptionLineHeight);}';
      // Copy
      coreCSSString = coreCSSString + 'p, div {font-size: var(--h2CopyFontSize);line-height: var(--h2CopyLineHeight);}';
      // H6
      coreCSSString = coreCSSString + 'h6 {font-size: var(--h2H6FontSize);line-height: var(--h2H6LineHeight);}';
      // H5
      coreCSSString = coreCSSString + 'h5 {font-size: var(--h2H5FontSize);line-height: var(--h2H5LineHeight);}';
      // H4
      coreCSSString = coreCSSString + 'h4 {font-size: var(--h2H4FontSize);line-height: var(--h2H4LineHeight);}';
      // H3
      coreCSSString = coreCSSString + 'h3 {font-size: var(--h2H3FontSize);line-height: var(--h2H3LineHeight);}';
      // H2
      coreCSSString = coreCSSString + 'h2 {font-size: var(--h2H2FontSize);line-height: var(--h2H2LineHeight);}';
      // H1
      coreCSSString = coreCSSString + 'h1 {font-size: var(--h2H1FontSize);line-height: var(--h2H1LineHeight);}';
    }
    // Return the core CSS
    return coreCSSString;
  } catch (err) {
    h2Error(err);
    return err;
  }
}

module.exports = {
  generateCoreCSS,
};
