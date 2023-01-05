// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */
/**
 * @typedef {import('../../data/media-model-definition').MediaObject} MediaObject
 */

// Data imports

// Logging
const { log_message } = require('../../lib/scripts/logging/log-message');

// Functions
const { create_settings } = require('./settings');
const { hydrogen_build } = require('../../lib/build');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Script
function test() {
  try {
    log_message({
      type: 'system',
      step: 'Running test...',
      test: 'Basic environment',
      buffers: {
        top: false,
      },
    });
    create_settings();
    let results = hydrogen_build();
    fs.readFileSync(path.resolve(process.cwd(), 'output/hydrogen.css'));
    if (
      results.settings_data.logging.errors.count > 0 ||
      results.settings_data.logging.warnings.count > 0
    ) {
      throw new Error('Errors were found during the build.');
    }
    return true;
  } catch (error) {
    if (error.step) {
      log_message({
        type: 'error',
        step: error.step,
        test: 'Basic environment',
        error: error.error,
      });
    } else {
      log_message({
        type: 'error',
        step: 'Running test',
        test: 'Basic environment',
        error: error,
      });
    }
    throw error;
  }
}

function run_tests() {
  try {
    test();
    log_message({
      type: 'success',
      step: 'Running test',
      test: 'Basic environment',
      buffers: {
        top: false,
        bottom: true,
      },
    });
    return true;
  } catch (error) {
    log_message({
      type: 'failure',
      step: 'Running test',
      test: 'Basic environment',
      buffers: {
        top: false,
        bottom: true,
      },
    });
    return false;
  }
}

module.exports = {
  test,
  run_tests,
};
