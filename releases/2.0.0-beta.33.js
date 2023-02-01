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
  version: '2.0.0-beta.33',
  date: new Date('2022-11-03'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Enhanced the parser to accurately find query values located inside of backtick characters.',
        ],
      },
      notes: ['An automated test was written for this feature.'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds a new verbose setting to control how much console output Hydrogen produces.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixed a bug caused by the Glob package where it doesn\'t accept "\\" characters, causing the build to fail on Windows.',
        ],
      },
    },
  ],
};
