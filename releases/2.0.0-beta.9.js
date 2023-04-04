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
  date: new Date('2022-06-12'),
  version: '2.0.0-beta.9',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'The configuration validation script now prevents you from using reserved dark-mode or pseudo class words as media query keys.',
        ],
      },
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          "Reworked how media queries and their modifiers are parsed, away from REGEX towards a more consistent execution that relies on splitting the query at ':' characters and interpreting the values independently.",
          [
            'This opens the door for further query modifiers in the future, like custom configured themes.',
          ],
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Hover styles are now applied through the hover media query to prevent them from activating on devices that do not support hover effects.',
        ],
      },
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          'The cascade order was broken for pseudo-classes when an element with a dark modifier applied a light class.',
          [
            'This was the result of the light class coming after the hover declaration in the cascade, making it take priority.',
            'To fix this, the media array was completely rewritten and restructured so that the output provided the expected behaviour of interactions like hover overwriting light mode styles.',
            'The array now outputs in the following order: standard attributes, light class attributes, dark class attributes, standard pseudo class attributes, light class pseudo class attributes, dark class pseudo class attributes, preference-based dark attributes, and finally preference-based dark pseudo class attributes.',
          ],
        ],
      },
    },
  ],
};
