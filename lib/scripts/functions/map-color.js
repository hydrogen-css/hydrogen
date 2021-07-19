"use strict";

var colorOpacityMap = {
  '[1]': '1',
  '[.9]': '-.1',
  '[.8]': '-.2',
  '[.7]': '-.3',
  '[.6]': '-.4',
  '[.5]': '-.5',
  '[.4]': '-.6',
  '[.3]': '-.7',
  '[.2]': '-.8',
  '[.1]': '-.9',
  '[0]': '-1'
};

function loadColorMap(defaults, config) {
  // Create string.
  var colorMapStringStart = '@use "sass:color"; $h2-map-color: (';
  var colorMapStringContent = '';
  var colorMapStringEnd = ');';
  var colorConfig;
  // Check to see if the user has set color options, and if not, load the defaults.
  if (config.colors != null && config.colors != undefined && config.colors.length > 0) {
    colorConfig = config.colors;
  } else {
    colorConfig = defaults.colors;
  }
  // Loop through available colors and create the color map.
  colorConfig.forEach(function(color) {
    var colorString = '"' + color.name + '": ' + color.color + ',';
    var colorLightString = '"[light]' + color.name + '": color.scale(' + color.color + ', $lightness: 25%),';
    var colorDarkString = '"[dark]' + color.name + '": color.scale(' + color.color + ', $lightness: -15%, $saturation: -10%),';
    var colorOpacityString = '';
    if (color.opacity != null && color.opacity != undefined && color.opacity == true) {
      // console.log('Color:', color.name, 'has opacity set to true!');
      for (let opacity in colorOpacityMap) {
        colorOpacityString = colorOpacityString + '"' + color.name + opacity + '": color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '),';
        // console.log('Color Opacity String: ', colorOpacityString);
        colorOpacityString = colorOpacityString + '"[light]' + color.name + opacity + '": color.scale(color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '), $lightness: 25%),';
        colorOpacityString = colorOpacityString + '"[dark]' + color.name + opacity + '": color.scale(color.adjust(' + color.color + ', $alpha: ' + colorOpacityMap[opacity] + '), $lightness: -15%, $saturation: -10%),';
      }
    }
    colorMapStringContent = colorMapStringContent.concat(colorString).concat(colorLightString).concat(colorDarkString).concat(colorOpacityString);
  });
  var colorMap = colorMapStringStart + colorMapStringContent + colorMapStringEnd;
  // Pass the color map.
  return colorMap;
}

function setColorMap(defaults, config, env) {
  var colorMap = '';
  colorMap = loadColorMap(defaults, config);
  if (env == "dev") {
    return src('./lib/styles/maps/_map-color.scss')
      .pipe(footer(colorMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  } else if (env == "prod") {
    return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/maps/_map-color.scss')
      .pipe(footer(colorMap))
      .pipe(dest('./' + config.folders.styles + '/hydrogen/maps'));
  }
}

module.exports = setColorMap;