// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '1.1.1',
  date: new Date('2021-08-02'),
  author: 'Josh Beveridge',
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'The clean scripts now remove duplicate entries once the markup has been scraped to help reduce build time.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          "Fixes an issue where the clean script wasn't properly accounting for CSS rules that required multiple selectors to work.",
        ],
      },
    },
  ],
};
