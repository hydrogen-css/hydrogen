// Hydrogen.css / Utility Generation Scripts

// ---

'use strict';

var colors = require('colors');

// Import Hydrogen's configuration scripts
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// ---

/**
 * Checks whether the user has set any configuration options for a utility, combines them with any legacy defaults, checks for duplicate keys, and then returns a unique list of finalized configured options.
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} state Either 'vars' or 'maps'
 * @param {string} utilityConfigKey Must be the key used in Hydrogen's config to define this utility
 * @param {object[]} utilityDefaults An array of objects containing any legacy default values for the utility
 * @returns {object[]}
 */
function createUtilityArray(env, state, utilityConfigKey, utilityDefaults) {
  try {
    // Load Hydrogen's default settings for the utility.
    var defaults = loadH2Defaults(env);
    // Load the user's settings for the utility;
    var config = loadH2Config(env);
    // Enable the correct settings based on whether the user has set custom values.
    var utilitySettings;
    if (
      config[utilityConfigKey] != null &&
      config[utilityConfigKey] != undefined &&
      config[utilityConfigKey].length > 0
    ) {
      utilitySettings = config[utilityConfigKey];
    } else {
      utilitySettings = defaults[utilityConfigKey];
    }
    // Combine the settings with any legacy default values.
    var combinedSettings;
    if (
      utilityDefaults != null &&
      utilityDefaults != undefined &&
      utilityDefaults.length > 0
    ) {
      combinedSettings = utilityDefaults.concat(utilitySettings);
    } else {
      combinedSettings = utilitySettings;
    }
    // Create empty variables to find unique settings.
    var uniqueKeys = [];
    var uniqueSettings = [];
    // If the utility is height or width, we need to add the whitespace keys to the uniqueKeys array so that they aren't overidden by user settings
    if (utilityConfigKey == 'heights' || utilityConfigKey == 'widths') {
      uniqueKeys = uniqueKeys.concat('xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl');
    }
    // Loop through the settings to find unique values.
    combinedSettings.forEach(function (item) {
      if (item.key == undefined || item.key == null) {
        throw (
          'One of your ' +
          utilityConfigKey +
          ' settings is missing a key value.'
        );
      } else {
        if (uniqueKeys.includes(item.key) == false) {
          uniqueKeys = uniqueKeys.concat(item.key);
          uniqueSettings = uniqueSettings.concat(item);
        } else {
          if (state == 'map' || state == 'maps') {
            console.log(
              'Hydrogen',
              '[WARNING]'.yellow,
              'Your',
              utilityConfigKey.bold.yellow,
              'configuration keys contain a duplicate or are using a reserved keyword:',
              item.key.bold.yellow + '.'
            );
            console.log(
              "Configurations are prioritized such that the first definition using this key in your configuration file will be used over any others. If you don't have a duplicate in your configuration, it's possible that you've used a reserved default key, which will always override your settings. Please see the Hydrogen documentation for any reserved keys for the attribute in question."
                .gray
            );
          }
        }
      }
    });
    return uniqueSettings;
  } catch (ex) {
    return false;
  }
}

/**
 * Checks whether the user has set any configuration options for colors or gradients, checks for duplicate keys in both settings, and then returns a unique list of finalized configured options.
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} state Either 'vars' or 'maps'
 * @param {string} utilityConfigKey Must be the key used in Hydrogen's config to define this utility
 * @param {object[]} utilityDefaults An array of objects containing any legacy default values for the utility
 * @returns {object[]} A unique list of color or gradient settings
 */
function createUniqueColorArray(env, state, utilityConfigKey, utilityDefaults) {
  try {
    if (utilityDefaults.length > 0) {
      throw (
        "You've passed " +
        utilityConfigKey +
        " with defaults, which shouldn't happen."
      );
    }
    // Get configs
    var defaults = loadH2Defaults(env);
    var config = loadH2Config(env);
    // Get color configurations
    var colorSettings;
    if (
      config['colors'] != null &&
      config['colors'] != undefined &&
      config['colors'].length > 0
    ) {
      colorSettings = config['colors']; // User
    } else {
      colorSettings = defaults['colors']; // Default
    }
    // Get unique color keys
    var uniqueColorKeys = [];
    var uniqueColorSettings = [];
    colorSettings.forEach(function (item) {
      if (item.key == undefined || item.key == null) {
        throw (
          'One of your ' +
          utilityConfigKey +
          ' settings is missing a key value.'
        );
      } else {
        if (uniqueColorKeys.includes(item.key) == false) {
          uniqueColorKeys = uniqueColorKeys.concat(item.key);
          uniqueColorSettings = uniqueColorSettings.concat(item);
        } else {
          if (state == 'map' || state == 'maps') {
            console.log(
              'Hydrogen',
              '[WARNING]'.yellow,
              'Your',
              utilityConfigKey.bold.yellow,
              'configuration keys contain a duplicate:',
              item.key.bold.yellow + '.'
            );
            console.log(
              "Configurations are prioritized such that the first definition using this key in your configuration file will be used over any others. If you don't have a duplicate in your configuration, it's possible that you've used a reserved default key, which will always override your settings. Please see the Hydrogen documentation for any reserved keys for the attribute in question."
                .gray
            );
          }
        }
      }
    });
    // Get gradient configurations
    var gradientSettings;
    var uniqueGradientKeys = [];
    var uniqueGradientSettings = [];
    if (
      config['gradients'] != null &&
      config['gradients'] != undefined &&
      config['gradients'].length > 0
    ) {
      gradientSettings = config['gradients']; // User
      // Get unique gradient keys
      gradientSettings.forEach(function (item) {
        var deprecated = false;
        var gradientKey = '';
        // Check to see if the user is using new or old syntax
        if (item.key == undefined || item.key == null) {
          // Old syntax; generate key from gradient type and color stops
          var oldSyntaxKey = item.type;
          item.colorStops.forEach(function (color, index, array) {
            oldSyntaxKey = oldSyntaxKey + '[' + color.key + ']';
          });
          deprecated = true;
          gradientKey = oldSyntaxKey;
        } else {
          // New syntax; check for unique key
          gradientKey = item.key;
        }
        if (uniqueColorKeys.includes(gradientKey) == false) {
          if (uniqueGradientKeys.includes(gradientKey) == false) {
            uniqueGradientKeys = uniqueGradientKeys.concat(gradientKey);
            uniqueGradientSettings = uniqueGradientSettings.concat(item);
            if (deprecated == true) {
              if (state == 'map' || state == 'maps') {
                console.log(
                  'Hydrogen',
                  '[WARNING]'.yellow,
                  "You're using a deprecated gradient syntax. Please update",
                  gradientKey.yellow.bold,
                  "with a key definition in your configuration file. If you choose to do this, you'll need to update all instances of this gradient in your markup as well."
                );
              }
            }
          } else {
            if (state == 'map' || state == 'maps') {
              console.log(
                'Hydrogen',
                '[WARNING]'.yellow,
                'Your',
                utilityConfigKey.bold.yellow,
                'configuration keys contain a duplicate:',
                gradientKey.bold.yellow + '.'
              );
              console.log(
                'Configurations are prioritized such that the first definition using this key in your configuration file will be used over any others.'
                  .gray
              );
            }
          }
        } else {
          if (state == 'map' || state == 'maps') {
            console.log(
              'Hydrogen',
              '[WARNING]'.yellow,
              'Your',
              utilityConfigKey.bold.yellow,
              'configuration keys contain a duplicate key that is found in your color settings:',
              gradientKey.bold.yellow + '.'
            );
            console.log(
              "Configurations are prioritized such that the first definition using this key in your configuration file will be used over any others. In this case, Hydrogen found that you've named a gradient using a key that you've also used to name a color. Because colors and gradients co-exist in the same attributes, the color definition will always take priority over the gradient. Please provide your gradient with a unique key."
                .gray
            );
          }
        }
      });
    } else {
      // No gradients
    }
    // Check to see if colors or gradients are being requested
    if (utilityConfigKey == 'colors') {
      return uniqueColorSettings;
    } else if (utilityConfigKey == 'gradients') {
      return uniqueGradientSettings;
    } else {
      throw "You're using the colors/gradient utility script for a different utility.";
    }
  } catch (err) {
    return err;
  }
}

/**
 * Generates the utility's Sass map so that it can be then compiled.
 * @param {string} env Either 'dev' or 'prod'
 * @param {object[]} utilityDefaults An array of objects containing any legacy default values for the utility
 * @param {string} utilityConfigKey Must be the key used in Hydrogen's config to define this utility
 * @param {string} utilityConfigValue The key used to define the utility's unique value
 * @param {*string} utilityMapLabel The value used to generate the Sass map for the utility (spaces must be dashes)
 * @returns
 */
function loadUtilityMap(
  env,
  utilityDefaults,
  utilityConfigKey,
  utilityConfigValue,
  utilityMapLabel
) {
  var utilityConfig = createUtilityArray(
    env,
    'maps',
    utilityConfigKey,
    utilityDefaults
  );
  // Create the map string.
  var utilityMapStringStart = '$h2-map-' + utilityMapLabel + ': (';
  var utilityMapStringContent = '';
  var utilityMapStringEnd = ');';
  // Loop through each option and build the map.
  utilityConfig.forEach(function (item) {
    var utilityString =
      '"' + item.key + '": "' + item[utilityConfigValue] + '",';
    utilityMapStringContent = utilityMapStringContent.concat(utilityString);
  });
  // Assemble the map.
  var utilityMap =
    utilityMapStringStart + utilityMapStringContent + utilityMapStringEnd;
  // Return the map.
  return utilityMap;
}

/**
 * Calls the utility array to generate a unique list of variables for either CSS or Sass
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} format Either 'css' or 'sass'
 * @param {object[]} utilityDefaults An array of objects containing any legacy default values for the utility
 * @param {string} utilityConfigKey Must be the key used in Hydrogen's config to define this utility
 * @param {string} utilityConfigOption The key used to define the utility's unique value
 * @param {string} utilityName The name of the utility to be used in comments
 * @param {string} variableLabel The name of the utility in the context of variables (spaces should be dashes)
 * @returns {string} Returns a string of usable variables that are to be appended to the final variable file
 */
function createUtilityVariables(
  env,
  format,
  utilityDefaults,
  utilityConfigKey,
  utilityConfigOption,
  utilityName,
  variableLabel
) {
  var utilityConfig = createUtilityArray(
    env,
    'vars',
    utilityConfigKey,
    utilityDefaults
  );
  var utilityVariables = [];
  var formatPrefix = '';
  if (format == 'css') {
    formatPrefix = '--';
  } else if (format == 'sass') {
    formatPrefix = '$';
  }
  // If the utility is height or width, we need to generate the t-shirt sizes based on the whitespace scale.
  if (utilityConfigKey == 'heights' || utilityConfigKey == 'widths') {
    var defaults = loadH2Defaults(env);
    var config = loadH2Config(env);
    // Set an empty variable for the config to be populated based on whether the user has set their own settings.
    var whitespaceScaleConfig;
    // Check to see if the user has defined any options in their config, and if not, load the defaults.
    if (
      config.whitespaceScale != null &&
      config.whitespaceScale != undefined &&
      config.whitespaceScale.length > 0
    ) {
      whitespaceScaleConfig = config.whitespaceScale;
    } else {
      whitespaceScaleConfig = defaults.whitespaceScale;
    }
    // Create the variables
    var spaceXXS =
      formatPrefix +
      'h2-' +
      variableLabel +
      '-xxs: ' +
      1 / whitespaceScaleConfig / whitespaceScaleConfig +
      'rem;\n';
    var spaceXS =
      formatPrefix +
      'h2-' +
      variableLabel +
      '-xs: ' +
      1 / whitespaceScaleConfig +
      'rem;\n';
    var spaceS = formatPrefix + 'h2-' + variableLabel + '-s: 1rem;\n';
    var spaceM =
      formatPrefix +
      'h2-' +
      variableLabel +
      '-m: ' +
      1 * whitespaceScaleConfig +
      'rem;\n';
    var spaceL =
      formatPrefix +
      'h2-' +
      variableLabel +
      '-l: ' +
      1 * whitespaceScaleConfig * whitespaceScaleConfig +
      'rem;\n';
    var spaceXL =
      formatPrefix +
      'h2-' +
      variableLabel +
      '-xl: ' +
      1 *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig +
      'rem;\n';
    var spaceXXL =
      formatPrefix +
      'h2-' +
      variableLabel +
      '-xxl: ' +
      1 *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig *
        whitespaceScaleConfig +
      'rem;\n';
    utilityVariables = utilityVariables.concat(
      spaceXXS,
      spaceXS,
      spaceS,
      spaceM,
      spaceL,
      spaceXL,
      spaceXXL
    );
  }
  // Loop through each config option and build the list.
  utilityConfig.forEach(function (utilities) {
    // Strip out any weird characters.
    var utilityKey = utilities.key.replace('.', '').replace('%', '');
    // Construct the variable (e.g. --h2-radius-rounded: 10px;\n)
    var utilityVariable =
      formatPrefix +
      'h2-' +
      variableLabel +
      '-' +
      utilityKey +
      ': ' +
      utilities[utilityConfigOption] +
      ';\n';
    utilityVariables = utilityVariables.concat(utilityVariable);
  });
  // Convert the array to a string
  var stringifiedVariables =
    '/* ' + utilityName + ' */\n' + utilityVariables.join('');
  // Return the variable set
  return stringifiedVariables;
}

// Export the utility's scripts for use
module.exports = {
  createUtilityArray,
  createUniqueColorArray,
  loadUtilityMap,
  createUtilityVariables,
};
