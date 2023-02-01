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
  version: '1.1.2',
  date: new Date('2021-08-04'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Adds a new watch script that will only rerun the build script if the user modifies the configuration file, otherwise it only performs the code match and CSS file construction.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "The init script now copies the default settings file over to the user's project to ensure that future updates don't break their configuration.",
        ],
      },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'Enhances the clean script such that it now searches individually compiled utility files rather than the library in its entirety on each call, speeding things up.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Reworks the compile script to meet the newly optimized requirements and adds compression to help alleviate large file implications.',
        ],
      },
    },
  ],
};
