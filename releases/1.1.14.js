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
  version: '1.1.14',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug where Hydrogen wouldn't compile if the flex grid was disabled because it was still trying to process the order utility.",
        ],
      },
      properties: ['order'],
    },
  ],
};
