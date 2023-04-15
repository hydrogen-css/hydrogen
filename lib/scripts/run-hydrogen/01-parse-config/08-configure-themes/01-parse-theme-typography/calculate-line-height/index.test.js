// Hydrogen
'use strict';

// Data models

// Data imports

// Functions
const { calculate_line_height } = require('./index');

// Tests

test('That calculate_line_height finds the closest multiple of base_line_height that is larger than the font_size provided and converts it to a float', () => {
  // Set the debug variable to catch important error output
  process.env.H2DEBUG = true;
  // Grab test output
  let output = calculate_line_height(1.125, 1.4);
  // Run the tests
  expect(output).toBe(1.2444444444444445);
});
