// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions
const { configured_option_match } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('Return a regular expression containing the option passed', () => {
  // Input / output
  let output = /((?<![a-zA-Z0-9-_])medium(?![a-zA-Z0-9-_]))/gm;
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Run the test
  expect(configured_option_match('medium')).toStrictEqual(output);
});
