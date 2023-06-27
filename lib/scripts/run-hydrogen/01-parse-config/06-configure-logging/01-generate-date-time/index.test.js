// Hydrogen
'use strict';

// Data models

// Data imports

// Logging

// Functions
const { generate_date_time } = require('./index');

// Vendor imports

// Tests

test('That generate_date_time properly returns a string', () => {
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = generate_date_time();
  // Run the tests
  expect(typeof output).toBe('string');
});
