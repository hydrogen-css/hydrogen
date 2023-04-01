// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../data/settings-model-definition').Typography} Typography
 */

// Data imports
const { get_settings_data } = require('../../data/settings-model');

// Logging
let { log_message } = require('../../scripts/logging/log-message');

// Functions
const { generate_type_units } = require('./generate-type-units');

// Test-specific functions
let { run_queue } = require('../../../tests/run-queue');

// Vendor imports
var fs = require('fs');
var path = require('path');

// Test definitions
let test_group = 'generate_type_units tests';
let test_1_name = '1 - Valid handling of default settings';
let test_2_name = '2 - Valid handling partial line_heights configuration';
let test_3_name = '3 - Valid handling of deprecated line_height';
let test_4_name = '4 - Proper error return';

function test_1() {
  let test = test_1_name;
  try {
    log_message({
      type: 'system',
      step: 'Running test...',
      test: test,
    });
    let settings = get_settings_data();
    /** @type {Typography} */
    let type_config = {
      query_key: 'base',
      query: 'base',
      size: '100%',
      type_scale: '1.125',
      line_heights: {
        caption: '1.3',
        copy: '1.4',
        h6: '1.2',
        h5: '1.2',
        h4: '1.2',
        h3: '1.2',
        h2: '1.2',
        h1: '1.2',
        display: '1.2',
      },
    };
    let expected_output = {
      type_units:
        '/* Core units */\n' +
        '--h2-base-font-size: 100%;\n' +
        '--h2-base-line-height: 1.4;\n' +
        '--h2-base-whitespace: 1.4;\n',
      type_vars:
        '/* Font sizes and line heights */\n' +
        '--h2-font-size-caption: calc(var(--h2-font-size-copy) / 1.125);\n' +
        '--h2-line-height-caption: 1.3;\n' +
        '--h2-font-size-copy: 1rem;\n' +
        '--h2-line-height-copy: var(--h2-base-line-height);\n' +
        '--h2-font-size-h6: calc(var(--h2-font-size-copy) * 1.125);\n' +
        '--h2-line-height-h6: 1.2;\n' +
        '--h2-font-size-h5: calc(var(--h2-font-size-h6) * 1.125);\n' +
        '--h2-line-height-h5: 1.2;\n' +
        '--h2-font-size-h4: calc(var(--h2-font-size-h5) * 1.125);\n' +
        '--h2-line-height-h4: 1.2;\n' +
        '--h2-font-size-h3: calc(var(--h2-font-size-h4) * 1.125);\n' +
        '--h2-line-height-h3: 1.2;\n' +
        '--h2-font-size-h2: calc(var(--h2-font-size-h3) * 1.125);\n' +
        '--h2-line-height-h2: 1.2;\n' +
        '--h2-font-size-h1: calc(var(--h2-font-size-h2) * 1.125);\n' +
        '--h2-line-height-h1: 1.2;\n' +
        '--h2-font-size-display: calc(var(--h2-font-size-h1) * 1.125);\n' +
        '--h2-line-height-display: 1.2;\n',
    };
    let results = generate_type_units(settings, type_config);
    if (!results.type_units || !results.type_vars) {
      throw new Error(
        'The returned value of the generated typography units was missing expected values.'
      );
    } else {
      if (typeof results.type_units != 'string') {
        throw new Error('The type units');
      }
      if (typeof results.type_vars != 'string') {
        throw new Error('Hydrogen had unexpected warnings during the test build.');
      }
    }
    return {
      test: test,
      status: true,
    };
  } catch (error) {
    if (error.step) {
      log_message({
        type: 'error',
        step: error.step,
        error: error.error,
      });
    } else {
      log_message({
        type: 'error',
        step: test,
        error: error,
      });
    }
    throw {
      test: test,
      status: false,
    };
  }
}

function test_queue() {
  try {
    let results = [];
    try {
      let test_1_results = test_1();
      log_message({
        type: 'success',
        step: 'Test passed',
        test: test_1_results.test,
      });
      results.push(test_1_results);
    } catch (error) {
      log_message({
        type: 'failure',
        step: 'Test failed',
        test: error.test,
      });
      results.push(error);
    } finally {
      return results;
    }
  } catch (error) {
    throw error;
  }
}

function run_tests() {
  run_queue(test_group, test_queue);
}

module.exports = {
  test_queue,
  run_tests,
};
