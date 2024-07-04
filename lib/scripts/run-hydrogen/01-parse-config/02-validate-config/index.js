// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Logging} Logging
 */

// Local functions
const { validate_input } = require('./01-input');
const { validate_output } = require('./02-output');
const { validate_modes } = require('./03-modes');
const { validate_processing } = require('./04-processing');
const { validate_logging } = require('./05-logging');
const { validate_media } = require('./06-media');
const { validate_themes } = require('./07-themes');

// Helper functions
const { log_message } = require('../../../console-logging/log-message');

/**
 * Validates that the user's configuration file is a valid format and contains valid data.
 * @param {object} argv
 * @param {Config} defaults
 * @param {Config} config
 * @returns {Config}
 */
function validate_config(argv, defaults, config) {
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
                        validate_themes(defaults, config);
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
                                config: defaults,
                                error: error.error,
                              });
                            } else {
                              log_message({
                                type: 'error',
                                step: 'Validating config',
                                config: defaults,
                                error: error.error,
                              });
                            }
                          }
                        });
                        throw last;
                      } else {
                        // Log that Hydrogen is parsing settings
                        if (argv.h2_verbose) {
                          if (argv.h2_verbose === true || argv.h2_verbose === 'true') {
                            log_message({
                              type: 'system',
                              step: 'Settings validated',
                              times: {
                                start: validate_settings_timer_start,
                                end: process.hrtime.bigint(),
                              },
                            });
                          }
                        } else if (
                          (config.logging &&
                            config.logging.verbose_console_output &&
                            config.logging.verbose_console_output === true) ||
                          !config.logging ||
                          (config.logging && config.logging.verbose_console_output == undefined)
                        ) {
                          log_message({
                            type: 'system',
                            step: 'Settings validated',
                            times: {
                              start: validate_settings_timer_start,
                              end: process.hrtime.bigint(),
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
