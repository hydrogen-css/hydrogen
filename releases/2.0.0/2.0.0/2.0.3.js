// Hydrogen data models
/**
 * @typedef {import('../../../lib/data/release-template-data').Release} Release
 * @typedef {import('../../../lib/data/release-template-data').Change} Change
 * @typedef {import('../../../lib/data/release-template-data').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.3',
  summary:
    'This release focuses primarily on improvements to the documentation website, including a new menu, search capabilities, and more. Alongside these updates, a minor bugfix was also included that addresses color keys being ignored in the <code>shadow</code> attribute.',
  featured: false,
  date: new Date('2023-09-30'),
  author: 'Josh Beveridge',
  features: [],
  optimizations: [],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          "Fixes a bug where <code>data-h2-shadow</code> wasn't processing configured color values.",
        ],
      },
    },
  ],
  documentation: [
    {
      breaking: false,
      changes: {
        en: [
          'Reworks the menu on both desktop and mobile so that page content is nested inside of its relevant page and so that the menu opens to and highlights your current location for better navigation.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds a search bar to the documentation menu to help you quickly find specific pages or terms.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Adds a new glossary page for variable generated during Hydrogen's build that you can use in your CSS.",
        ],
      },
    },
  ],
};
