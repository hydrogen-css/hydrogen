// Hydrogen: Parse color

'use strict';

// Third party dependencies
var Color = require('color');
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');
var { h2Error } = require('./logs');

function lightenBy(color, ratio) {
  try {
    const lightness = color.lightness();
    return color.lightness(lightness + (100 - lightness) * ratio);
  } catch (err) {
    return err;
  }
}

function darkenBy(color, ratio) {
  try {
    const lightness = color.lightness();
    return color.lightness(lightness - lightness * ratio);
  } catch (err) {
    return err;
  }
}

function parseColor(argv, property, colorString) {
  try {
    // Load the settings
    var settings = loadSettings(argv);
    // Split the color string value
    var colorArray = colorString.split('.');
    // Get configured colors
    var userColors = null;
    if (settings.colors != null) {
      userColors = settings.colors;
    } else {
      var error = 'Your configuration file is missing a "colors" array.';
      h2Error(error);
      return false;
    }
    // Get configured gradients
    var userGradients = null;
    if (settings.gradients != null) {
      userGradients = settings.gradients;
    } else {
      var error = 'Your configuration file is missing a "gradients" array.';
      h2Error(error);
      return false;
    }
    // Check to see if the string contains a configured color
    for (const color of userColors) {
      // Check to see if the color is a configured color
      if (colorArray.includes(color.key) === true) {
        var colorKey = color.color;
        var colorScaleModifier = null;
        var colorOpacityModifier = null;
        var assembledColor = colorKey;
        // Set the working color to the configured color
        for (const string of colorArray) {
          if (string == 'light' || string == 'lighter' || string == 'lightest' || string == 'dark' || string == 'darker' || string == 'darkest') {
            colorScaleModifier = string; // Set the scale modifier for later use
          }
        }
        for (const string of colorArray) {
          if (/^\d+$/.test(string) == true) {
            colorOpacityModifier = string; // Set the opacity modifier for later use
          }
        }
        // Modify the tint/tone
        if (colorScaleModifier != null && colorScaleModifier == 'light') {
          if (color.scale == null || color.scale == {} || color.scale.light == 'auto' || color.scale.light == null) {
            assembledColor = lightenBy(Color(colorKey), 0.25); // Modify the saturation and hue
            assembledColor = Color(assembledColor).rgb().string(); // Convert the color to RGBA
          } else {
            assembledColor = color.scale.light; // Set the color the value the user chose
          }
        } else if (colorScaleModifier != null && colorScaleModifier == 'lighter') {
          if (color.scale == null || color.scale == {} || color.scale.lighter == 'auto' || color.scale.lighter == null) {
            assembledColor = lightenBy(Color(colorKey), 0.5); // Modify the saturation and hue
            assembledColor = Color(assembledColor).rgb().string(); // Convert the color to RGBA
          } else {
            assembledColor = color.scale.lighter; // Set the color the value the user chose
          }
        } else if (colorScaleModifier != null && colorScaleModifier == 'lightest') {
          if (color.scale == null || color.scale == {} || color.scale.lightest == 'auto' || color.scale.lightest == null) {
            assembledColor = lightenBy(Color(colorKey), 0.75); // Modify the saturation and hue
            assembledColor = Color(assembledColor).rgb().string(); // Convert the color to RGBA
          } else {
            assembledColor = color.scale.lightest; // Set the color the value the user chose
          }
        } else if (colorScaleModifier != null && colorScaleModifier == 'dark') {
          if (color.scale == null || color.scale == {} || color.scale.dark == 'auto' || color.scale.dark == null) {
            assembledColor = Color(colorKey).saturate(0.2).mix(Color('black'), 0.25); // Modify the saturation and hue
            assembledColor = Color(assembledColor).rgb().string(); // Convert the color to RGBA
          } else {
            assembledColor = color.scale.dark; // Set the color the value the user chose
          }
        } else if (colorScaleModifier != null && colorScaleModifier == 'darker') {
          if (color.scale == null || color.scale == {} || color.scale.darker == 'auto' || color.scale.darker == null) {
            assembledColor = Color(colorKey).saturate(0.2).mix(Color('black'), 0.5); // Modify the saturation and hue
            assembledColor = Color(assembledColor).rgb().string(); // Convert the color to RGBA
          } else {
            assembledColor = color.scale.darker; // Set the color the value the user chose
          }
        } else if (colorScaleModifier != null && colorScaleModifier == 'darkest') {
          if (color.scale == null || color.scale == {} || color.scale.darkest == 'auto' || color.scale.darkest == null) {
            assembledColor = Color(colorKey).saturate(0.2).mix(Color('black'), 0.75); // Modify the saturation and hue
            assembledColor = Color(assembledColor).rgb().string(); // Convert the color to RGBA
          } else {
            assembledColor = color.scale.darkest; // Set the color the value the user chose
          }
        }
        // Modify the opacity if it has been set
        if (colorOpacityModifier != null) {
          assembledColor = Color(assembledColor)
            .alpha('.' + colorOpacityModifier)
            .rgb()
            .string();
        }
        // Everything has been checked, return the color object
        var finalColor = {
          type: 'solid',
          color: assembledColor,
        };
        return finalColor;
      }
    }
    // No matching configured color exists, so check for a configured gradient
    if (property == 'bg-color' || property == 'background-color' || property == 'overlay' || property == 'font-color' || property == 'color') {
      for (const gradient of userGradients) {
        if (colorString == gradient.key) {
          colorString = gradient.gradient;
          var fallbackColor = gradient.fallback;
          var finalColor = {
            type: 'gradient',
            color: colorString,
            fallback: fallbackColor,
          };
          return finalColor;
        }
      }
    }
    // The color wasn't a configured color or gradient, so use original value as a CSS value
    var finalColor = {
      type: 'solid',
      color: colorString,
    };
    return finalColor;
  } catch (err) {
    return err;
  }
}

module.exports = {
  lightenBy,
  darkenBy,
  parseColor,
};
