// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/config-data').Config} Config
 */
/**
 * @typedef {import('../../../data/media-array-data').MediaArray} MediaArray
 * @typedef {import('../../../data/media-array-data').QueryData} QueryData
 */

// Data imports
const { get_parsed_config } = require('../../../data/config-parsed-data');

// Local functions
const { build_media_array } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That build_media_array returns an array of objects containing the correct strings', () => {
  // Input
  /** @type {Config} */
  let parsed_config = get_parsed_config();
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  /** @type {QueryData[]} */
  let output = build_media_array(parsed_config);
  // Run the tests
  expect(Array.isArray(output)).toBe(true);
  output.forEach((item) => {
    expect(typeof item.key).toBe('string');
    expect(typeof item.mode).toBe('string');
    expect(typeof item.state).toBe('string');
    expect(typeof item.theme).toBe('string');
    expect(typeof item.query === 'string' || item.query === null).toBe(true);
    expect(typeof item.query_string).toBe('string');
    expect(typeof item.closing_string).toBe('string');
  });
});
