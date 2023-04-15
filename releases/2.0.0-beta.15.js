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
  date: new Date('2022-06-27'),
  version: '2.0.0-beta.15',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for a third container value that will apply padding to the left or right.',
        ],
      },
      properties: ['container'],
    },
  ],
  optimizations: [
    {
      breaking: true,
      changes: {
        en: [
          'Removes support for the Sass variable export given that Sass supports CSS variables, making the output more uniform and consistent.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Updates the default values for media and typography to reflect the new syntax and validation.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Updates the whitespace parser to swap 0 to 0px for consistency across all attributes in the same way it swaps out 'none'.",
        ],
      },
      properties: [
        'border',
        'container',
        'flex-grid',
        'gap',
        'grid-template-columns',
        'grid-template-rows',
        'height',
        'margin',
        'max-height',
        'max-width',
        'min-height',
        'min-width',
        'padding',
        'offset',
        'radius',
        'width',
      ],
    },
  ],
  bugfixes: [
    {
      breaking: true,
      changes: {
        en: [
          'Reworks media queries and requires that they do not contain repeating values at the end of their key.',
          [
            'This is the result of a complex bug that occurs due to the wildcard selector used with the data-attributes. The wildcard causes queries like xl(green) to trigger matching queries such as l(green).',
            'There were two options discussed to solve this problem: moving away from the wildcard selector in favor of the more concrete ~ selector, or adding more robust validation to media queries to avoid repetition.',
            "While moving to the ~ selector was preferred, it required that whitespace be stripped out of attribute values entirely; something that isn't possible due to whitespace requirements by certain CSS values.",
          ],
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes a whitespace variable bug caused by the variable scripts not being updated to work with the new typography configuration.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds validation to prevent bad query values from causing an error.'],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds validation to prevent empty query matches from making it into the parser.'],
      },
    },
  ],
};
