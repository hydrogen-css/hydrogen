// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../../data/config-data').Typography} Typography
 */

// Data imports

// Local functions
const { parse_type_scale_item } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That parse_type_scale_item returns a number when passed a string', () => {
  // Input
  /** @type {Typography} */
  let type_config = {
    query_key: 'base',
    size: '100%',
    type_scale: '1.125',
    line_heights: {
      caption: '1.2',
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = parse_type_scale_item(type_config, 'caption', '1.5');
  // Run the tests
  expect(output).toBe(1.2);
});

test('That parse_type_scale_item returns the specified line_height when passed "auto"', () => {
  // Input
  /** @type {Typography} */
  let type_config = {
    query_key: 'base',
    size: '100%',
    type_scale: '1.125',
    line_heights: {
      caption: 'auto',
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = parse_type_scale_item(type_config, 'caption', '1.5');
  // Run the tests
  expect(output).toBe('1.5');
});

test('That parse_type_scale_item returns a number when passed a number', () => {
  // Input
  /** @type {Typography} */
  let type_config = {
    query_key: 'base',
    size: '100%',
    type_scale: '1.125',
    line_heights: {
      caption: 1.7,
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = parse_type_scale_item(type_config, 'caption', '1.5');
  // Run the tests
  expect(output).toBe(1.7);
});

test('That parse_type_scale_item returns properly when passed the newer "body" setting', () => {
  // Input
  /** @type {Typography} */
  let type_config = {
    query_key: 'base',
    size: '100%',
    type_scale: '1.125',
    line_heights: {
      body: 1.7,
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = parse_type_scale_item(type_config, 'body', '1.5');
  // Run the tests
  expect(output).toBe(1.7);
});

test('That parse_type_scale_item returns properly when passed the deprecated "copy" setting', () => {
  // Input
  /** @type {Typography} */
  let type_config = {
    query_key: 'base',
    size: '100%',
    type_scale: '1.125',
    line_heights: {
      copy: 1.7,
    },
  };
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = parse_type_scale_item(type_config, 'copy', '1.5');
  // Run the tests
  expect(output).toBe(1.7);
});
