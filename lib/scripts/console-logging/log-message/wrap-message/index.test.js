// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions
const { wrap_message } = require('./index');

// Helper functions

// Vendor imports

// Tests ===========================================================================================

test('That wrap message returns a properly broken string', () => {
  // Input
  let message =
    'This is a really long console message that tests whether or not wrapping the text based on the window width works.';
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = wrap_message(message);
  // Run the tests
  expect(output && typeof output === 'string').toBe(true);
});
