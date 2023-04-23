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
  date: new Date('2022-07-07'),
  version: '2.0.0-beta.19',
  features: [
    {
      breaking: true,
      changes: {
        en: [
          'Reworks the color scale configuration into a custom modifier setting.',
          'The modifier configuration no longer has to be set - tints and shades will automatically generate for you regardless, unless you choose to overwrite them using their key.',
          "This also means you can create custom modifiers, as long as their key isn't set to the name of the color",
          'This also breaks the current iteration of exported color variables, which have new name syntax.',
        ],
      },
      properties: ['background-color', 'border', 'color', 'overlay'],
    },
    {
      breaking: false,
      changes: {
        en: [
          "Adds a third syntax for borders that allows a single 'none' value to be used to remove borders entirely.",
        ],
      },
      properties: ['border'],
    },
    {
      breaking: false,
      changes: {
        en: [
          "Adds a new key option for position called 'center' that applies not only a CSS position, but a top, left, and transform value to mathematically center an object inside of a relative element.",
        ],
      },
      properties: ['position'],
    },
  ],
};
