// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../data/settings-model-definition').Logging} Logging
 */

// Data imports

// Logging
const { log_timer } = require('../../logging/log-timer');

// Functions
const { validate_input } = require('./validate-input');
const { validate_output } = require('./validate-output');
const { validate_modes } = require('./validate-modes');
const { validate_processing } = require('./validate-processing');
const { validate_logging } = require('./validate-logging');
const { validate_media } = require('./validate-media');
const { validate_themes } = require('./themes/validate-themes');
const { log_message } = require('../../logging/log-message');

// Vendor imports

// Script
/**
 * Validates that the user's configuration file is a valid format and contains valid data
 * @param {object} argv Options passed by the user through the CLI
 * @param {Settings} settings The user's settings
 * @returns {Settings} The function will throw an error if invalid settings are found, preventing the build
 */
function validate_user_settings(argv, settings) {
  try {
    // Initiate the settings validation timer
    const validate_settings_timer_start = process.hrtime.bigint();
    // Ensure settings have been passed and are an object.
    if (!settings) {
      throw new Error("The settings object doesn't exist and is required.");
    } else {
      if (typeof settings != 'object') {
        throw new Error('Settings must be an object.');
      } else {
        // Collect errors
        let errors = [];
        // Validate each settings section
        try {
          validate_input(settings);
        } catch (error) {
          error.errors.forEach((i) => {
            errors = errors.concat({
              step: error.step,
              error: i,
            });
          });
        } finally {
          try {
            validate_output(settings);
          } catch (error) {
            error.errors.forEach((i) => {
              errors = errors.concat({
                step: error.step,
                error: i,
              });
            });
          } finally {
            try {
              if (settings.modes) {
                validate_modes(settings);
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
                if (settings.processing) {
                  validate_processing(settings);
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
                  if (settings.logging) {
                    validate_logging(settings);
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
                    if (settings.media) {
                      validate_media(settings);
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
                      if (settings.themes) {
                        validate_themes(settings);
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
                                step: 'Validating user settings',
                                error: error.error,
                              });
                            }
                          }
                        });
                        throw last;
                      } else {
                        // End the settings validation timer and log the time
                        const validate_settings_timer_end =
                          process.hrtime.bigint();
                        if (argv.h2_timers) {
                          if (
                            argv.h2_timers === true ||
                            argv.h2_timers === 'true'
                          ) {
                            log_timer({
                              settings: settings,
                              step: 'Validating user settings',
                              times: {
                                start: validate_settings_timer_start,
                                end: validate_settings_timer_end,
                              },
                            });
                          }
                        } else if (
                          (settings.logging &&
                            settings.logging.show_timers &&
                            settings.logging.show_timers === true) ||
                          !settings.logging ||
                          (settings.logging && !settings.logging.show_timers)
                        ) {
                          log_timer({
                            settings: settings,
                            step: 'Validating user settings',
                            times: {
                              start: validate_settings_timer_start,
                              end: validate_settings_timer_end,
                            },
                          });
                        }
                        return settings;
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
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Validating user settings',
        error: error,
      };
    }
  }
}

module.exports = {
  validate_user_settings,
};
