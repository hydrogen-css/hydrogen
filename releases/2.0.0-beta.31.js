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
  date: new Date('2022-10-31'),
  version: '2.0.0-beta.31',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Hydrogen will now check for configuration files until it reaches a dead end, allowing you to store your configuration multiple parent directories above the command.',
        ],
      },
      notes: {
        en: ['This is specifically useful for Node workspaces.'],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'Fixed a bug where the process script was failing due to an invalid promise rejection.',
        ],
      },
    },
  ],
};
