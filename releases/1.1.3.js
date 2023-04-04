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
  date: new Date('2021-08-06'),
  version: '1.1.3',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          "The clean script now warns the user if they try to use an opacity value that isn't defined in their configuration.",
        ],
      },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          'Enhances color opacity so that the user can specify target opacities, rather than toggling the array on/off, offering more control and less bloat.',
        ],
      },
      properties: ['background-color', 'color'],
    },
  ],
};
