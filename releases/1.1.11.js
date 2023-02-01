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
  author: 'Peter Giles',
  date: new Date('2021-10-29'),
  version: '1.1.11',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Switches to the synchronous version of fs.WriteFile to avoid failures when scripts execute slowly.',
        ],
      },
    },
  ],
};
