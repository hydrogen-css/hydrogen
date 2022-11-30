// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../data/settings-model-definition').Logging} Logging
 */

// Data imports
const { get_state_data } = require('../../../data/state-model');

// Logging
const { log_message } = require('../../logs/log-message');
const { log_timer } = require('../../logs/log-timer');

// Functions

// Vendor imports

// Script
function validate_logging(settings, path) {
  try {
    if (settings.logging.logs && typeof settings.logging.logs != 'boolean') {
      throw 'The "logs" option in the "logging" section of your configuration must either be "true" or "false".';
    }
    if (
      settings.logging.timers &&
      typeof settings.logging.timers != 'boolean'
    ) {
      throw 'The "timers" option in the "logging" section of your configuration must either be "true" or "false".';
    }
    return true;
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Settings validation: logging',
      files: path,
    });
    return false;
  }
}
