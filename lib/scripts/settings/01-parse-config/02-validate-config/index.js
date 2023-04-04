// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Logging} Logging
 */

// Data imports

// Local functions
const { validate_input } = require('./01-input');
const { validate_output } = require('./02-output');
const { validate_modes } = require('./03-modes');
const { validate_processing } = require('./04-processing');
const { validate_logging } = require('./05-logging');
const { validate_media } = require('./06-media');
const { validate_themes } = require('./07-themes');

// Helper functions
const { log_timer } = require('../../../logging/log-timer');
const { log_message } = require('../../../logging/log-message');

// Vendor imports

// Script ==========================================================================================

/**
 * Validates that the user's configuration file is a valid format and contains valid data.
 *
 * @param {object} argv
 * @param {Config} config
 * @returns {Config}
 */
function validate_config(argv, config) {
  try {
    // Initiate the settings validation timer
    const validate_settings_timer_start = process.hrtime.bigint();
    // Ensure settings have been passed and are an object.
    if (!config) {
      throw new Error("The settings object doesn't exist and is required.");
    } else {
      if (typeof config != 'object') {
        throw new Error('Settings must be an object.');
      } else {
        // Collect errors
        let errors = [];
        // Validate each settings section
        try {
          validate_input(config);
        } catch (error) {
          error.errors.forEach((i) => {
            errors = errors.concat({
              step: error.step,
              error: i,
            });
          });
        } finally {
          try {
            validate_output(config);
          } catch (error) {
            error.errors.forEach((i) => {
              errors = errors.concat({
                step: error.step,
                error: i,
              });
            });
          } finally {
            try {
              if (config.modes) {
                validate_modes(config);
              }
            } catch (error) {
              error.errors.forEach((i) => {
                errors = errors.concat({
                  step: error.step,
                  error: i,
                });
              });
            } finally {
              try {
                if (config.processing) {
                  validate_processing(config);
                }
              } catch (error) {
                error.errors.forEach((i) => {
                  errors = errors.concat({
                    step: error.step,
                    error: i,
                  });
                });
              } finally {
                try {
                  if (config.logging) {
                    validate_logging(config);
                  }
                } catch (error) {
                  error.errors.forEach((i) => {
                    errors = errors.concat({
                      step: error.step,
                      error: i,
                    });
                  });
                } finally {
                  try {
                    if (config.media) {
                      validate_media(config);
                    }
                  } catch (error) {
                    error.errors.forEach((i) => {
                      errors = errors.concat({
                        step: error.step,
                        error: i,
                      });
                    });
                  } finally {
                    try {
                      if (config.themes) {
                        validate_themes(config);
                      }
                    } catch (error) {
                      error.errors.forEach((i) => {
                        errors = errors.concat({
                          step: error.step,
                          error: i,
                        });
                      });
                    } finally {
                      if (errors.length > 0) {
                        let last = errors[0];
                        errors.forEach((error, index) => {
                          if (index === errors.length - 1) {
                            last = error;
                          } else {
                            if (error.step) {
                              log_message({
                                type: 'error',
                                step: error.step,
                                error: error.error,
                              });
                            } else {
                              log_message({
                                type: 'error',
                                step: 'Validating config',
                                error: error.error,
                              });
                            }
                          }
                        });
                        throw last;
                      } else {
                        // End the settings validation timer and log the time
                        const validate_settings_timer_end = process.hrtime.bigint();
                        if (argv.h2_timers) {
                          if (argv.h2_timers === true || argv.h2_timers === 'true') {
                            log_timer({
                              settings: config,
                              step: 'Validating config',
                              times: {
                                start: validate_settings_timer_start,
                                end: validate_settings_timer_end,
                              },
                            });
                          }
                        } else if (
                          (config.logging &&
                            config.logging.show_timers &&
                            config.logging.show_timers === true) ||
                          !config.logging ||
                          (config.logging && !config.logging.show_timers)
                        ) {
                          log_timer({
                            settings: config,
                            step: 'Validating config',
                            times: {
                              start: validate_settings_timer_start,
                              end: validate_settings_timer_end,
                            },
                          });
                        }
                        return config;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Validating config',
        error: error,
      };
    }
  }
}

module.exports = {
  validate_config,
};
