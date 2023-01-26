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
  version: '2.0.0-beta.39',
  date: new Date('2023-01-26'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: true,
      changes: {
        en: [
          'Fixes the behaviour of modifiers requiring their opposite to be used in <code>:dark</code> mode if the <code>automatic_modifiers</code> setting is enabled.',
          "For example. previously, you'd need to use <code>:dark(primary.light)</code> to access <code>primary.dark</code> but Hydrogen is now smart enough to process the color literally by swapping the opposite color in.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Updates the console output to display the current Hydrogen version being run.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: true,
      changes: {
        en: [
          'Fixes a bug that occurred if you tried to use multiple transition values that was caused by transition being given compatibility support.It has been removed, which has caused a breaking change and requires transition attributes to be reformatted to match standard CSS syntax.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug with the setup script requiring the color module before it has been installed.',
        ],
      },
    },
  ],
};
