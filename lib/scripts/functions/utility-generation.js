// Hydrogen.css / Utility Generation Scripts

// ---

'use strict';

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
    // console.log(combinedSettings);
    // Create empty variables to find unique settings.
    var uniqueKeys = [];
    var uniqueSettings = [];
    combinedSettings.forEach(function (item) {
      if (item.key == undefined || item.key == null) {
        // console.log('no key');
        // This whole if statement is required to support the deprecated gradient syntax.
        if (utilityConfigKey == 'gradients') {
          // console.log('no key gradient');
          var radialColorStopKeys = item.type;
          item.colorStops.forEach(function (color, index, array) {
            radialColorStopKeys = radialColorStopKeys + '[' + color.key + ']';
          });
          if (uniqueKeys.includes(radialColorStopKeys) == false) {
            uniqueKeys = uniqueKeys.concat(radialColorStopKeys);
            uniqueSettings = uniqueSettings.concat(item);
            if (state == 'map' || state == 'maps') {
              console.log(
                'Hydrogen',
                '[WARNING]'.yellow,
                "You're using a deprecated gradient syntax. Please update",
                radialColorStopKeys.yellow.bold,
                'with a key definition in your configuration file. Be sure to update your markup accordingly.'
              );
            }
          } else {
            if (state == 'map' || state == 'maps') {
              console.log(
                'Hydrogen',
                '[WARNING]'.yellow,
                'Your',
                utilityConfigKey.bold.yellow,
                'configuration keys contain a duplicate or are using a reserved keyword:',
                radialColorStopKeys.bold.yellow + '.'
              );
              console.log(
                "Configurations are prioritized such that the first definition using this key in your configuration file will be used over any others. If you don't have a duplicate in your configuration, it's possible that you've used a reserved default key, which will always override your settings. Please see the Hydrogen documentation for any reserved keys for the attribute in question."
                  .gray
              );
            }
          }
          // console.log(uniqueSettings);
        }
      } else {
        // console.log('yes key');
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
    // console.log(uniqueKeys);
    // console.log(uniqueSettings);
    return uniqueSettings;
  } catch (ex) {
    return false;
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
  loadUtilityMap,
  createUtilityVariables,
};
