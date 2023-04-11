// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Modes} Modes
 * @typedef {import('../../../../data/config-data').DarkMode} DarkMode
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Grabs the default mode configuration data and overwrites it with configurations provided by the user.
 *
 * Requires:
 * - config.modes
 *
 * @param {Config} defaults Hydrogen's default configuration data
 * @param {Config} config The user's configuration file data
 * @returns {Modes}
 */
function configure_modes(defaults, config) {
  try {
    // Overwrite the method if it exists
    if (config.modes && config.modes.method) {
      defaults.modes.method = config.modes.method;
    }
    // Check for dark mode configurations and overwrite them as necessary
    if (config.modes && config.modes.dark) {
      /** @type {DarkMode} */
      if (config.modes.dark.auto_apply_styles != undefined) {
        defaults.modes.dark.auto_apply_styles = config.modes.dark.auto_apply_styles;
      }
      if (config.modes.dark.swap_default_modifiers != undefined) {
        defaults.modes.dark.swap_default_modifiers = config.modes.dark.swap_default_modifiers;
      }
    }
    return defaults.modes;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Configuring modes',
        error: error,
      };
    }
  }
}

module.exports = {
  configure_modes,
};
