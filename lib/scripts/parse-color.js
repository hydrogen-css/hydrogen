// Hydrogen: Parse color

'use strict';

// Third party dependencies
var Color = require('color');
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');
var { generateGradientMap } = require('./generate-gradient-map');

function lightenBy(color, ratio) {
  try {
    const lightness = color.lightness();
    return color.lightness(lightness + (100 - lightness) * ratio);
  } catch (err) {
    console.log(err);
    return err;
  }
}

function darkenBy(color, ratio) {
  try {
    const lightness = color.lightness();
    return color.lightness(lightness - lightness * ratio);
  } catch (err) {
    console.log(err);
    return err;
  }
}

function parseColor(argv, property, colorString) {
  try {
    var settings = loadSettings(argv);
    var gradientMap = generateGradientMap(argv);
    var workingColor = colorString;
    var uneditedColor = colorString;
    var colorKey = workingColor.match(/(?<=^|\])[^\[]+/g);
    var scaleModifier = workingColor.match(/^\[+?[^\]]*\]/g);
    if (scaleModifier != null) {
      scaleModifier = scaleModifier[0].match(/[^\[].*[^\]]/g);
    }
    var opacityModifier = workingColor.match(/\[(\.|0).*\]/g);
    if (opacityModifier != null) {
      opacityModifier = opacityModifier[0].match(/[^\[].*[^\]]/g);
    }
    var userColors = settings.colors;
    for (const color of userColors) {
      if (colorKey[0] == color.key) {
        var actualColor = color.color;
        if (scaleModifier != null) {
          if (scaleModifier == 'light') {
            if (color.scale.light == 'auto' || color.scale.light == null || color.scale.light == undefined) {
              workingColor = lightenBy(Color(actualColor), 0.25);
              workingColor = Color(workingColor).rgb().string();
            } else {
              workingColor = color.scale.light;
            }
          } else if (scaleModifier == 'lighter') {
            if (color.scale.lighter == 'auto' || color.scale.lighter == null || color.scale.lighter == undefined) {
              workingColor = lightenBy(Color(actualColor), 0.5);
              workingColor = Color(workingColor).rgb().string();
            } else {
              workingColor = color.scale.lighter;
            }
          } else if (scaleModifier == 'lightest') {
            if (color.scale.lightest == 'auto' || color.scale.lightest == null || color.scale.lightest == undefined) {
              workingColor = lightenBy(Color(actualColor), 0.75);
              workingColor = Color(workingColor).rgb().string();
            } else {
              workingColor = color.scale.lightest;
            }
          } else if (scaleModifier == 'dark') {
            if (color.scale.dark == 'auto' || color.scale.dark == null || color.scale.dark == undefined) {
              workingColor = darkenBy(Color(actualColor), 0.25);
              workingColor = Color(workingColor).rgb().string();
            } else {
              workingColor = color.scale.dark;
            }
          } else if (scaleModifier == 'darker') {
            if (color.scale.darker == 'auto' || color.scale.darker == null || color.scale.darker == undefined) {
              workingColor = darkenBy(Color(actualColor), 0.5);
              workingColor = Color(workingColor).rgb().string();
            } else {
              workingColor = color.scale.darker;
            }
          } else if (scaleModifier == 'darkest') {
            if (color.scale.darkest == 'auto' || color.scale.darkest == null || color.scale.darkest == undefined) {
              workingColor = darkenBy(Color(actualColor), 0.75);
              workingColor = Color(workingColor).rgb().string();
            } else {
              workingColor = color.scale.darkest;
            }
          } else {
            return null;
          }
        }
        if (opacityModifier != null) {
          workingColor = Color(actualColor).alpha(opacityModifier).rgb().string();
        }
        if (scaleModifier == null && opacityModifier == null) {
          workingColor = color.color;
        }
        // Return the color and type
        var finalColor = {
          "type": "solid",
          "color": workingColor
        }
        return finalColor;
      }
    };
    for (const [key, value] of Object.entries(gradientMap)) {
      if (workingColor == key) {
        if (property == 'bg-color' || property == 'overlay' || property == 'font-color' || property == 'color') {
          workingColor = value;
          // Return the color and type
          var finalColor = {
            "type": "gradient",
            "color": workingColor
          }
          return finalColor;
        }
        return null;
      }
    }
    if (uneditedColor == workingColor) {
      // Return the color and type
      var finalColor = {
        "type": "solid",
        "color": workingColor
      }
      // console.log('CSS color', finalColor);
      return finalColor;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  lightenBy,
  darkenBy,
  parseColor
}