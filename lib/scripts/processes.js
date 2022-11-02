// Hydrogen: Core processes
'use strict';

// Hydrogen data models
let Settings = require('../data/settings-model-definition');
/** @typedef {import('../data/settings-model-definition').Settings} Settings */
let MediaArray = require('../data/media-model-definition');
/** @typedef {import('../data/media-model-definition').MediaArray} MediaArray */

// Hydrogen data imports

// Hydrogen function imports
const { log_message } = require('./logs/log-message');
const { log_timer } = require('./logs/log-timer');
const { parse_settings } = require('./settings/parse-settings');
const { create_media_array } = require('./create-media-array');
const { hydrogen } = require('./build-core');

// Vendor imports

// Scripts

/**
 * Logs a success message that includes compiled errors and warnings
 * @param {Settings} settings
 * @returns {Promise}
 */
function hydrogen_success(settings) {
  return new Promise((resolve, reject) => {
    // Log success
    let message = '';
    if (settings.processing.var_export === true) {
      message =
        'A CSS file and CSS variable export file was created in your output directory.';
    } else {
      message = 'A CSS file was created in your output directory.';
    }
    log_message({
      type: 'success',
      step: 'Build completed',
      errors: settings.logging.errors.count,
      warnings: settings.logging.warnings.count,
      message: message,
    });
    resolve();
  });
}

/**
 * @typedef {object} CoreOptions
 * @prop {Settings} settings
 * @prop {MediaArray} media
 * @prop {number} timer
 */

/**
 * A partial Hydrogen build that only runs CSS generation
 * @param {CoreOptions} options
 * @returns {Promise}
 */
function hydrogen_core(options) {
  return new Promise((resolve, reject) => {
    // Run Hydrogen
    hydrogen({
      settings: options.settings,
      media: options.media,
      timer: options.timer,
    })
      .then((result) => {
        resolve(options.settings);
      })
      .catch((error) => {
        log_message(error);
      });
  });
}

/**
 * @typedef {object} FullResult
 * @prop {Settings} settings
 * @prop {MediaArray} media
 */

/**
 * A complete Hydrogen build, including settings parsing, media array construction, and CSS generation
 * @returns {Promise<FullResult>}
 */
function hydrogen_full() {
  return new Promise((resolve, reject) => {
    // Log that the script has started
    console.log('');
    log_message({
      type: 'system',
      step: 'Starting the build...',
    });
    // Initiate the total build timer
    const timer_start_total_build = process.hrtime.bigint();
    // Log that Hydrogen is parsing settings
    log_message({
      type: 'system',
      step: 'Parsing settings...',
    });
    // Initiate the settings parser timer
    const parse_settings_timer_start = process.hrtime.bigint();
    // Load the user's settings
    parse_settings(process.argv)
      .then((settings) => {
        create_media_array(settings).then((media) => {
          // End the settings parser timer and log the time
          const parse_settings_timer_end = process.hrtime.bigint();
          log_timer({
            settings: settings,
            step: 'Settings parser',
            times: {
              start: parse_settings_timer_start,
              end: parse_settings_timer_end,
            },
          });
          hydrogen_core({
            settings: settings,
            media: media,
            timer: timer_start_total_build,
          }).then((result) => {
            resolve({ settings: settings, media: media });
          });
        });
      })
      .catch((error) => {
        log_message(error);
      });
  });
}

module.exports = {
  hydrogen_success,
  hydrogen_core,
  hydrogen_full,
};
