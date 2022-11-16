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
  date: new Date('2022-06-12'),
  version: '2.0.0-beta.10',
  features: [
    {
      breaking: false,
      changes: { en: ['Adds support for the cursor property.'] },
      properties: ['cursor'],
    },
    {
      breaking: false,
      changes: { en: ['Adds support for the list-style property.'] },
      properties: ['list-style'],
    },
    {
      breaking: false,
      changes: {
        en: [
          "Adds support for both grid-column and grid-row so that you can specify a grid item's placement and size.",
        ],
      },
      properties: ['grid-column', 'grid-row'],
    },
    {
      breaking: false,
      changes: { en: ['Adds support for both min-height and min-width.'] },
      properties: ['min-height', 'min-width'],
    },
  ],
};
