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
  date: new Date('2022-06-27'),
  version: '2.0.0-beta.16',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug introduced in beta.16 where the variable file was calculating rem values for the whitespace unit by default, causing calc functions to break.',
        ],
      },
    },
  ],
};
