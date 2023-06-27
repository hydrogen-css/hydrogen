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
  date: new Date('2022-06-22'),
  version: '2.0.0-beta.14',
  features: [
    {
      breaking: false,
      changes: {
        en: ['Adds reset styles to buttons, inputs, select elements, and text areas.'],
      },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: ['Migrates the watch script away from node-watch in favor of chokidar.'],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          "Completely reworks all path references to take advantage of process.cwd() and Node's path module.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug where div elements were being assigned the base font size, making it difficult to overwrite.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug with overlay not assigning a relative position to the pseudo element's parent.",
        ],
      },
      properties: ['overlay'],
    },
  ],
};
