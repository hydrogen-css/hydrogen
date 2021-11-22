// Hydrogen.css / Utility Generation Scripts

// =============================================================================

'use strict';

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// =============================================================================

// Get utility array.
/**
 * Checks whether the user has set any configuration options for a utility, combines them with any legacy defaults, checks for duplicate keys, and then returns a unique list of finalized configured options.
 * @param {string} env Either 'dev' or 'prod'
 * @param {string} state Either 'vars' or 'maps'
 * @param {string} utilityConfigKey Must be the key used in Hydrogen's config to define this utility
 * @param {object[]} utilityDefaults An array of objects containing any legacy default values for the utility
 * @returns {object[]}
 */
function createUtilityArray(env, state, utilityConfigKey, utilityDefaults) {
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
    if (uniqueKeys.includes(item.key) == false) {
      uniqueKeys = uniqueKeys.concat(item.key);
      uniqueSettings = uniqueSettings.concat(item);
    } else {
      if (state == 'map' || state == 'maps') {
        console.log(
          'H2 ' +
            '[WARNING]'.yellow +
            ' You have a duplicate ' +
            utilityConfigKey.yellow +
            ' key set: ' +
            '"'.yellow +
            item.key.yellow +
            '"'.yellow +
            '. Hydrogen prioritizes configurations such that the first definition using this key in your configuration file will be used over any others. If you don\'t have a duplicate in your configuration, it\'s possible that you\'ve used a reserved default key. Please see the Hydrogen documentation for any reserved keys for the attribute in question.'
        );
      }
    }
  });
  // console.log(uniqueSettings);
  return uniqueSettings;
}

// Load utility map
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

// Get standard utility Sass Variables
/**
 * Calls the utility array to generate a unique list of Sass ready variables.
 * @param {string} env Either 'dev' or 'prod'
 * @param {object[]} utilityDefaults An array of objects containing any legacy default values for the utility
 * @param {string} utilityConfigKey Must be the key used in Hydrogen's config to define this utility
 * @param {string} utilityConfigOption The key used to define the utility's unique value
 * @param {string} utilityName The name of the utility to be used in comments
 * @param {string} variableLabel The name of the utility in the context of Sass variables (spaces should be dashes)
 * @returns {string} Returns a string of usable Sass variables that are to be appended to the final Sass variable export sheet
 */
function createUtilitySassVariables(
  env,
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
  // Loop through each config option and build the list.
  utilityConfig.forEach(function (utilities) {
    // Strip out any weird characters.
    var utilityKey = utilities.key.replace('.', '').replace('%', '');
    // Construct the variable.
    var utilityVariable =
      '$h2-' +
      variableLabel +
      '-' +
      utilityKey +
      ': ' +
      utilities[utilityConfigOption] +
      ';\n';
    utilityVariables = utilityVariables.concat(utilityVariable);
  });
  var stringifiedVariables =
    '// ' + utilityName + '\n' + utilityVariables.join('');
  // console.log(stringifiedVariables);
  // Return the variable set.
  return stringifiedVariables;
}

module.exports = {
  createUtilityArray,
  loadUtilityMap,
  createUtilitySassVariables,
};
