// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */

// Data imports
const { get_settings_data } = require('../../data/settings-model');

// Functions
const { calculate_line_height } = require('./calculate-line-height');

// Tests

test('Calculate the closest multiple of base_line_height that is larger than the font_size provided and convert it to a float', () => {
  // Input / output
  let args = {
    settings: get_settings_data(),
    font_size: 1.125,
    base_line_height: 1.4,
  };
  let output = 1.2444444444444445;
  process.env.H2DEBUG = true;
  expect(calculate_line_height(args)).toBe(output);
});
