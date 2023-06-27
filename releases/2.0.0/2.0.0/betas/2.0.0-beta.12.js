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
  date: new Date('2022-06-15'),
  version: '2.0.0-beta.12',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Introduces a temporary while loop to check for the existence of the raw CSS file before running PostCSS.',
          'Forces the read of the raw CSS output to be synchronous to avoid it trying to process PostCSS on an empty file.',
        ],
      },
    },
  ],
};
