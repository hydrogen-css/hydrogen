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
  date: new Date('2022-06-28'),
  version: '2.0.0-beta.17',
  bugfixes: [
    {
      breaking: true,
      changes: {
        en: [
          'Hydrogen now requires a data-h2 attribute to be present on a parent element for Hydrogen attributes to work.',
          'Completely overhauls how dark mode works due to a severe specificity bug where light class elements would overwrite base elements inside of media queries.',
          [
            "If dark mode is set to toggle, you can apply 'dark' to the data-h2 attribute's value to toggle dark mode styles.",
            'Dark mode now requires a config that specifies whether the user wants to use preference-based dark mode or toggle-based.',
            "Toggle based now requires minor JavaScript to work properly, as you'll need to add and remove the dark value to the parent data-h2 element.",
            "This also highlights the importance of the cascade in Hydrogen's output, and the documentation should reflect that merging media queries will break the output completely.",
          ],
        ],
      },
      notes: {
        en: [
          'The bug that highlighted this issue was caused when an element had a base display value of none and a base:dark value of block.',
          'The issue occurred when a later element tried to apply a base display value of none and a l-tablet value of block.',
          'The second element would only display in dark mode, because the first element generated an .h2-light class for the original base display none.',
          'This .h2-light display none was more specific than the l-tablet value of block, meaning that the second element would disappear in forced light mode.',
          'In order to resolve this, experiments were performed in this JSFiddle: https://jsfiddle.net/mqvguaf7/191/',
          'The first attempt tried to reorder the CSS output to the following: base, base preference dark, base dark class, base light class, l-tablet, l-tablet preference dark, l-tablet dark class, and l-tablet light class.',
          "This worked until a media query was set after a dark mode setting. From an expectation perspective the media query should overwrite the base style, but not the dark mode setting, and this wasn't the case.",
          'The third attempt normalized specificity so that all attributes were prefixed with a data-h2 attribute which was then given a dark value for toggle-specific styles. Preference based dark mode was broken out so that the user has to choose between preference based or toggle based.',
          'This works and substantially simplified the output CSS, because there was no longer a reason to generate redundant light classes.',
        ],
      },
    },
  ],
};
