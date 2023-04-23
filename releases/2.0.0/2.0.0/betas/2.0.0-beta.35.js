// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.0-beta.35',
  date: new Date('2023-01-08'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Adds support and an accompanying setting to enable automatic swapping of automated color modifiers in dark mode. For example, if <code>primary.dark</code> is used in light mode, it will automatically swap to <code>primary.light</code> when dark mode is toggled.',
        ],
      },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: ['Default shadow values have been darkened in dark mode.'],
      },
      properties: ['shadow'],
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: ["Fixes CLI flags by allowing them to accept an empty value or 'true' to enable them."],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Opacity modifiers now process single digit decimals as their x10 counterpart. For example, <code>.3</code> will now be processed as <code>.30</code>.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a bug with space unit processing where the unit value was omitted, causing some properties to break.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ["Fixes a bug where <code>flex-grid</code>'s gap property was being ignored."],
      },
    },
  ],
};
