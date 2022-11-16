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
  date: new Date('2021-11-29'),
  version: '1.1.15',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for the text-transform utility, allowing users to customize text to be capitalized, lowercase, or uppercase.',
        ],
      },
      properties: ['text-transform'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for the auto and content values in the flex-item parameter. These values will allow flex grid items to grow to fill the remaining space or to assume the width of their contents respectively.',
        ],
      },
      properties: ['flex-item'],
    },
  ],
};
