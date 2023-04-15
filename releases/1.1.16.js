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
  date: new Date('2021-11-29'),
  version: '1.1.16',
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: ["Fixes a bug where the content value didn't reset the flex value."],
      },
      properties: ['flex-item'],
    },
  ],
};
