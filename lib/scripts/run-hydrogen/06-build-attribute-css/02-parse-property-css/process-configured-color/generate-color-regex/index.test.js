// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions
const { color_match } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('Return a regular expression containing the color value passed based on a type of find', () => {
  // Input / output
  let output = /((?<![a-zA-Z0-9-_])primary(?![a-zA-Z0-9-_]))(\.+[a-zA-Z]+)*(\.+[0-9]+)*/gm;
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Run the test
  expect(color_match('primary', 'find')).toStrictEqual(output);
});

test('Return a regular expression containing the color value passed based on a type of replace', () => {
  // Input / output
  let output = /((?<![a-zA-Z0-9-_])primary(?![a-zA-Z0-9-_\.]))/gm;
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Run the test
  expect(color_match('primary', 'replace')).toStrictEqual(output);
});
