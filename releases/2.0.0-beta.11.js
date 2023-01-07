// Hydrogen data models
let Release = require('../lib/data/release-model-definition');
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  author: 'Josh Beveridge',
  date: new Date('2022-06-15'),
  version: '2.0.0-beta.11',
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          "Adds a debug configuration option that generates a series of log files for Hydrogen's media array, attribute parsing, and value generation processes.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'The configuration validation script now checks to see if color keys are reserved keywords or numbers that would conflict with opacity modifiers.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug where Hydrogen's own files were being scraped and processed for attributes.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where empty media queries (e.g. b()) would result in undefined CSS, breaking the parse script.',
        ],
      },
    },
  ],
};
