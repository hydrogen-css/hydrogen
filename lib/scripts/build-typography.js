// Hydrogen: Build typography

'use strict';

// Third party dependencies

// Local dependencies
var { loadSettings } = require('./load-settings');
var { h2Error } = require('./logs');

function calculateLineHeight(size, baseLineHeight) {
  try {
    var lineHeightMultiple = 0;
    var lineHeightCounter = 1;
    var lineHeight;
    do {
      lineHeightMultiple = baseLineHeight * lineHeightCounter;
      if (lineHeightMultiple < size) {
        lineHeightCounter = lineHeightCounter + 1;
      } else {
        lineHeight = lineHeightMultiple / size;
        return lineHeight;
      }
    } while (lineHeightMultiple < size);
  } catch (error) {
    h2Error(error);
    return error;
  }
}

function buildTypography() {
  try {
    var settings = loadSettings();
    var typeSettings = settings.typography;
    var typeArray = [];
    typeSettings.forEach(function (typeSetting) {
      var settingObject = {};
      var htmlSize = typeSetting.size;
      settingObject.htmlSize = htmlSize;
      var lineHeight = typeSetting.lineHeight;
      settingObject.lineHeight = lineHeight;
      var typeScale = typeSetting.typeScale;
      settingObject.typeScale = typeScale;
      var typeQuery = null;
      var mediaMatch = false;
      settings.media.forEach(function (query) {
        if (query.key == typeSetting.queryKey) {
          typeQuery = query.query;
          mediaMatch = true;
        }
      });
      if (mediaMatch == true) {
        settingObject.queryKey = typeSetting.queryKey;
        settingObject.query = typeQuery;
      } else {
        throw typeSetting.queryKey + ' does not match any of the media keys in your configuration file.';
      }
      // Need to generate font sizes
      settingObject.caption = {};
      var captionSize = 1 / typeScale;
      settingObject.caption.size = captionSize + 'rem';
      settingObject.copy = {};
      var copySize = 1;
      settingObject.copy.size = copySize + 'rem';
      settingObject.h6 = {};
      var h6Size = 1 * typeScale;
      settingObject.h6.size = h6Size + 'rem';
      settingObject.h5 = {};
      var h5Size = h6Size * typeScale;
      settingObject.h5.size = h5Size + 'rem';
      settingObject.h4 = {};
      var h4Size = h5Size * typeScale;
      settingObject.h4.size = h4Size + 'rem';
      settingObject.h3 = {};
      var h3Size = h4Size * typeScale;
      settingObject.h3.size = h3Size + 'rem';
      settingObject.h2 = {};
      var h2Size = h3Size * typeScale;
      settingObject.h2.size = h2Size + 'rem';
      settingObject.h1 = {};
      var h1Size = h2Size * typeScale;
      settingObject.h1.size = h1Size + 'rem';
      // Need to generate line heights
      var captionLineHeight = lineHeight;
      settingObject.caption.lineHeight = captionLineHeight;
      var copyLineHeight = lineHeight;
      settingObject.copy.lineHeight = 'var(--h2-base-line-height)';
      var h6LineHeight = calculateLineHeight(h6Size, lineHeight);
      settingObject.h6.lineHeight = h6LineHeight;
      var h5LineHeight = calculateLineHeight(h5Size, lineHeight);
      settingObject.h5.lineHeight = h5LineHeight;
      var h4LineHeight = calculateLineHeight(h4Size, lineHeight);
      settingObject.h4.lineHeight = h4LineHeight;
      var h3LineHeight = calculateLineHeight(h3Size, lineHeight);
      settingObject.h3.lineHeight = h3LineHeight;
      var h2LineHeight = calculateLineHeight(h2Size, lineHeight);
      settingObject.h2.lineHeight = h2LineHeight;
      var h1LineHeight = calculateLineHeight(h1Size, lineHeight);
      settingObject.h1.lineHeight = h1LineHeight;
      typeArray = typeArray.concat(settingObject);
    });
    return typeArray;
  } catch (error) {
    h2Error(error);
    return error;
  }
}

module.exports = {
  buildTypography,
};
