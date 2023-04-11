// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').Config} Config
 * @typedef {import('../../../../data/config-data').ParsedPath} ParsedPath
 * @typedef {import('../../../../data/config-data').Input} Input
 * @typedef {import('../../../../data/config-data').Output} Output
 * @typedef {import('../../../../data/config-data').Logging} Logging
 */

// Data imports
const { get_default_config } = require('../../../../data/config-data');

// Local functions
const { parse_input_output } = require('../03-parse-input-output');
const { configure_logging } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That configure_logging properly returns a modified modes object with a full configuration', () => {
  // Input
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Input} */
    input: ['path/to/test/input'],
    /** @type {Output} */
    output: 'path/to/test/output',
    /** @type {ParsedPath} */
    path: {
      directory: '/home/user/code/hydrogen',
      path: '/home/user/code/hydrogen/hydrogen.config.json',
    },
    /** @type {Logging} */
    logging: {
      generate_logs: true,
      show_timers: false,
      verbose_console_output: false,
    },
  };
  let parsed_directories = parse_input_output(config);
  config.input = parsed_directories.input;
  config.output = parsed_directories.output;
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_logging(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(output.generate_logs).toBe(true);
  expect(output.show_timers).toBe(false);
  expect(output.verbose_console_output).toBe(false);
  expect(typeof output.time).toBe('string');
  expect(typeof output.directory).toBe('string');
});

test('That configure_logging properly returns a modified modes object with partial configuration', () => {
  // Input
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Input} */
    input: ['path/to/test/input'],
    /** @type {Output} */
    output: 'path/to/test/output',
    /** @type {ParsedPath} */
    path: {
      directory: '/home/user/code/hydrogen',
      path: '/home/user/code/hydrogen/hydrogen.config.json',
    },
    /** @type {Logging} */
    logging: {
      generate_logs: true,
    },
  };
  let parsed_directories = parse_input_output(config);
  config.input = parsed_directories.input;
  config.output = parsed_directories.output;
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_logging(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(output.generate_logs).toBe(true);
  expect(output.show_timers).toBe(true);
  expect(output.verbose_console_output).toBe(true);
  expect(typeof output.time).toBe('string');
  expect(typeof output.directory).toBe('string');
});

test('That configure_logging properly returns a modified modes object with an empty configuration', () => {
  // Input
  let defaults = get_default_config();
  /** @type {Config} */
  let config = {
    /** @type {Input} */
    input: ['path/to/test/input'],
    /** @type {Output} */
    output: 'path/to/test/output',
    /** @type {ParsedPath} */
    path: {
      directory: '/home/user/code/hydrogen',
      path: '/home/user/code/hydrogen/hydrogen.config.json',
    },
  };
  let parsed_directories = parse_input_output(config);
  config.input = parsed_directories.input;
  config.output = parsed_directories.output;
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = configure_logging(defaults, config);
  // Run the tests
  expect(output && typeof output === 'object').toBe(true);
  expect(output.generate_logs).toBe(false);
  expect(output.show_timers).toBe(true);
  expect(output.verbose_console_output).toBe(true);
  expect(typeof output.time).toBe('string');
  expect(typeof output.directory).toBe('string');
});
