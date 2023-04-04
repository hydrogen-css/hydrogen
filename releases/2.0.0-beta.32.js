// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  author: 'Josh Beveridge',
  date: new Date('2022-11-01'),
  version: '2.0.0-beta.32',
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'Added new test functionality that supports running full Hydrogen builds and returning test results.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixed a bug where attributes were ignored during file processing if there was whitespace between key/value pairs.',
        ],
      },
    },
  ],
};
