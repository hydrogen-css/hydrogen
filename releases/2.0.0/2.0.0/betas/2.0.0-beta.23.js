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
  date: new Date('2022-08-04'),
  version: '2.0.0-beta.23',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Adds development scripts in the root package.json for quick test setup and compiling without the need to navigate to the tests folder.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          "Updated the cssnano configuration to use the default preset with a series of exclusions, rather than the lite preset to ensure that duplicate rules are removed from Hydrogen's final output.",
        ],
      },
    },
  ],
};
