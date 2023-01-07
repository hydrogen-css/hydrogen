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
  date: new Date('2022-09-08'),
  version: '2.0.0-beta.26',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: ['Blank version due to an incorrect NPM publish.'],
        fr: ['Version vierge due à une publication NPM incorrecte.'],
      },
    },
  ],
};
