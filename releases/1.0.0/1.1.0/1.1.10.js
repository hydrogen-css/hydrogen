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
  date: new Date('2021-09-29'),
  version: '1.1.10',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          "Adds ignore values to the markup scraper so that Hydrogen doesn't scrape its own files, causing it to crash.",
        ],
      },
    },
  ],
};
