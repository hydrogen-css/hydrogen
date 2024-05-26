// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').Processing} Processing
 */

// Data imports
const { get_default_config } = require('../../../../data/config-data');

// Local functions
const { configure_processing } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That configure_processing properly returns a modified modes object with a full configuration', () => {
  // Input
  /** @type {Config} */
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Processing} */
    processing: {
      browser_prefix_css: false,
      error_recovery: true,
      export_variable_file: true,
      include_reset_css: false,
      minify_css: true,
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_processing(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(output.browser_prefix_css).toBe(false);
  expect(output.export_variable_file).toBe(true);
  expect(output.error_recovery).toBe(true);
  expect(output.include_reset_css).toBe(false);
  expect(output.minify_css).toBe(true);
});

test('That configure_processing properly returns a modified modes object with partial configuration', () => {
  // Input
  /** @type {Config} */
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Processing} */
    processing: {
      browser_prefix_css: false,
      include_reset_css: false,
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_processing(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(output.browser_prefix_css).toBe(false);
  expect(output.export_variable_file).toBe(false);
  expect(output.error_recovery).toBe(false);
  expect(output.include_reset_css).toBe(false);
  expect(output.minify_css).toBe(true);
});

test('That configure_processing properly returns a modified modes object with an empty configuration', () => {
  // Input
  /** @type {Config} */
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {};
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_processing(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(output.browser_prefix_css).toBe(true);
  expect(output.export_variable_file).toBe(false);
  expect(output.error_recovery).toBe(false);
  expect(output.include_reset_css).toBe(true);
  expect(output.minify_css).toBe(true);
});
