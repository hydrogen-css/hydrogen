// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../data/settings-model-definition').Logging} Logging
 */

// Data imports

// Logging
const { log_timer } = require('../../logs/log-timer');

// Functions
const { validate_input } = require('./validate-input');
const { validate_output } = require('./validate-output');
const { validate_modes } = require('./validate-modes');
const { validate_processing } = require('./validate-processing');
const { validate_logging } = require('./validate-logging');
const { validate_media } = require('./validate-media');
const { validate_theme } = require('./themes/validate-theme');
const { log_message } = require('../../logs/log-message');

// Vendor imports

// Script
/**
 * Runs the main settings validation
 * @param {Settings} settings
 * @returns {boolean}
 */
function validate_user_settings(settings) {
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
        // Create an array to store errors so that we can log them all and then throw
        let errors = [];
        // Validate each settings section
        try {
          validate_input(settings);
        } catch (error) {
          errors.push(error);
        } finally {
          try {
            validate_output(settings);
          } catch (error) {
            errors.push(error);
          } finally {
            try {
              if (settings.modes) {
                validate_modes(settings);
              }
            } catch (error) {
              errors.push(error);
            } finally {
              try {
                if (settings.processing) {
                  validate_processing(settings);
                }
              } catch (error) {
                errors.push(error);
              } finally {
                try {
                  if (settings.logging) {
                    validate_logging(settings);
                  }
                } catch (error) {
                  errors.push(error);
                } finally {
                  try {
                    if (settings.media) {
                      validate_media(settings);
                    }
                  } catch (error) {
                    errors.push(error);
                  } finally {
                    try {
                      if (settings.themes) {
                        if (
                          !Array.isArray(settings.themes) ||
                          settings.themes.length === 0
                        ) {
                          throw new Error(
                            'The "themes" setting in your configuration must be an array containing at least one default theme object.'
                          );
                        } else {
                          // Check for a default theme
                          let state = false;
                          settings.themes.forEach((theme) => {
                            // Theme key - checks for the existence of a default theme
                            if (
                              theme.key &&
                              typeof theme.key === 'string' &&
                              (theme.key === 'default' || theme.key == null)
                            ) {
                              state = true;
                            }
                          });
                          if (!state) {
                            throw new Error(
                              'Your Hydrogen settings are missing a default theme. At least one theme must be defined before compiling.'
                            );
                          }
                          // Validate themes
                          settings.themes.forEach((theme) => {
                            try {
                              validate_theme(settings, theme);
                            } catch (error) {
                              errors.push(error);
                            }
                          });
                        }
                      }
                    } catch (error) {
                      errors.push(error);
                    } finally {
                      // Check to see if errors were found, and if they were, loop through and log them before stopping Hydrogen
                      if (errors.length > 0) {
                        throw new Error(
                          'Errors were found in your configuration file.'
                        );
                      } else {
                        // End the settings validation timer and log the time
                        const validate_settings_timer_end =
                          process.hrtime.bigint();
                        log_timer({
                          settings: settings,
                          step: 'Validating settings',
                          times: {
                            start: validate_settings_timer_start,
                            end: validate_settings_timer_end,
                          },
                        });
                        return true;
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
