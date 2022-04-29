// Hydrogen: Generate core CSS

'use strict';

// Third party dependencies
var Color = require('color');
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');
var { calculateLineHeight } = require('./calculate-line-height');

function generateCoreCSS() {
  try {
    var settings = loadSettings();
    var coreCSSString = '';
    // Set the base font size
    var htmlFontSettings = settings.baseFontSizes;
    htmlFontSettings.forEach(function(size) {
      coreCSSString = coreCSSString + '@media ' + size.query + '{html {font-size: ' + size.size + ';}}'
    });
    // Set box sizing and the base line height
    coreCSSString = coreCSSString + 'html{box-sizing: border-box;line-height: ' + settings.baseLineHeight + ';}html * {box-sizing: border-box;}';
    // Reset body
    coreCSSString = coreCSSString + 'body {position: relative;}';
    // Reset margins
    coreCSSString = coreCSSString + 'body, h1, h2, h3, h4, h5, h6, p, blockquote, fieldset, figure, aside {margin: 0;}';
    // Set max widths on media
    coreCSSString = coreCSSString + 'img, iframe {max-width: 100%;}';
    // Reset heading font weights
    coreCSSString = coreCSSString + 'h1, h2, h3, h4, h5, h6 {font-weight: normal;}';
    // Reset basic styles
    coreCSSString = coreCSSString + 'span {color: inherit;font-family: inherit;font-size: inherit;font-weight: inherit;line-height: inherit;}em {color: inherit;font-family: inherit;font-size: inherit;font-style: italic;line-height: inherit;}strong {color: inherit;font-family: inherit;font-size: inherit;font-weight: 600;line-height: inherit;}a {color: inherit;font-family: inherit;font-size: inherit;font-weight: inherit;line-height: inherit;text-decoration: underline;transition: color 0.2s ease;}';
    // Reset lists
    coreCSSString = coreCSSString + 'ul, ol, dl {line-height: inherit;padding: 0;margin: 0;}li {color: inherit;font-family: inherit;font-size: inherit;line-height: inherit;margin: 0;}';
    // Format font sizes
    var baseSize = 1;
    var fontScale  = settings.typeScale;
    var captionSize = baseSize / fontScale;
    var captionUnit = captionSize + 'rem';
    var captionLineHeight = settings.baseLineHeight;
    var copySize = baseSize;
    var copyUnit = copySize + 'rem';
    var copyLineHeight = settings.baseLineHeight;
    var h6Size = baseSize * fontScale;
    var h6Unit = h6Size + 'rem';
    var h6LineHeight = calculateLineHeight(h6Size);
    var h5Size = h6Size * fontScale;
    var h5Unit = h5Size + 'rem';
    var h5LineHeight = calculateLineHeight(h5Size);
    var h4Size = h5Size * fontScale;
    var h4Unit = h4Size + 'rem';
    var h4LineHeight = calculateLineHeight(h4Size);
    var h3Size = h4Size * fontScale;
    var h3Unit = h3Size + 'rem';
    var h3LineHeight = calculateLineHeight(h3Size);
    var h2Size = h3Size * fontScale;
    var h2Unit = h2Size + 'rem';
    var h2LineHeight = calculateLineHeight(h2Size);
    var h1Size = h2Size * fontScale;
    var h1Unit = h1Size + 'rem';
    var h1LineHeight = calculateLineHeight(h1Size);
    coreCSSString = coreCSSString + 'h1 {font-size:' + h1Unit + ';line-height:' + h1LineHeight + ';}h2 {font-size:' + h2Unit + ';line-height:' + h2LineHeight + ';}h3 {font-size:' + h3Unit + ';line-height:' + h3LineHeight + ';}h4 {font-size:' + h4Unit + ';line-height:' + h4LineHeight + ';}h5 {font-size:' + h5Unit + ';line-height:' + h5LineHeight + ';}h6{font-size:' + h6Unit + ';line-height:' + h6LineHeight + ';} p, div {font-size:' + copyUnit + ';line-height:' + copyLineHeight + ';}caption, label {font-size:' + captionUnit + ';line-height:' + captionLineHeight + ';}';
    // Return the core CSS
    return coreCSSString;
  } catch (err) {
    return err;
  }
}

module.exports = {
  generateCoreCSS
}