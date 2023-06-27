// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('./config-data').Config} Config
 * @typedef {import('./config-data').ParsedConfig} ParsedConfig
 */

// Data imports

// Local functions
const { get_default_config } = require('./config-data');
const {
  parse_input_output,
} = require('../scripts/run-hydrogen/01-parse-config/03-parse-input-output');
const { configure_modes } = require('../scripts/run-hydrogen/01-parse-config/04-configure-modes');
const {
  configure_processing,
} = require('../scripts/run-hydrogen/01-parse-config/05-configure-processing');
const {
  configure_logging,
} = require('../scripts/run-hydrogen/01-parse-config/06-configure-logging');
const { configure_media } = require('../scripts/run-hydrogen/01-parse-config/07-configure-media');
const { configure_themes } = require('../scripts/run-hydrogen/01-parse-config/08-configure-themes');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Creates a fake parsed configuration file; will accept a config as an option, and if one isn't provided, it will create one from the default data.
 *
 * @param {Config} override
 * @returns {ParsedConfig}
 */
function get_parsed_config(override) {
  try {
    // Load the defaults
    let defaults = get_default_config();
    // Load a second set as a fake user config
    let config = get_default_config();
    // Overwrite the user config with passed data if it exists
    if (override) {
      config = override;
    }
    // Add error and warning storage to the default
    defaults.logging.errors = {
      count: 0,
      storage: [],
    };
    defaults.logging.warnings = {
      count: 0,
      storage: [],
    };
    // Set the path and directory values
    config.path = {
      directory: '/home/user/code/hydrogen',
      path: '/home/user/code/hydrogen/hydrogen.config.json',
    };
    // Grab and parse the input and output values
    let directory_data = parse_input_output(config);
    config.input = directory_data.input;
    config.output = directory_data.output;
    // Grab the default modes and then overwrite them based on the user config
    config.modes = configure_modes(defaults, config);
    // Grab the default processing settings and then overwrite them based on the user config
    config.processing = configure_processing(defaults, config);
    // Grab the default log settings and then overwrite them based on the user config
    config.logging = configure_logging(defaults, config);
    // Media data - media is its own independent object, and the base query is stored there now
    config.media = configure_media(defaults, config);
    // Parse and configure themes
    config.themes = configure_themes(defaults, config);
    // Return the parsed config
    return config;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  get_parsed_config,
};
