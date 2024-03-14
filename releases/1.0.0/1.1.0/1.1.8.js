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
  date: new Date('2021-09-27'),
  version: '1.1.8',
  features: [
    {
      breaking: false,
      changes: {
        en: [
          'Adds a new configuration option for exporting your settings as Sass variables where possible; this means you can now import things like your whitespace scale into Sass files outside of Hydrogen.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds a default configuration in the color settings for transparent.'],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Adds the ability to use negative whitespace values in the margin attribute.'],
      },
      properties: ['margin'],
    },
    {
      breaking: false,
      changes: {
        en: ["Adds the opacity attribute so that you can now control an element's opacity."],
      },
      properties: ['opacity'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for the order attribute when flex grids are enabled, allowing you to control the order of your grid items.',
        ],
      },
      properties: ['order'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for the overlay attribute, allowing you to add an overlay to an element.',
        ],
      },
      properties: ['overlay'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds support for the layer attribute, allowing you to create layers and apply them to elements, along with positioning.',
        ],
      },
      properties: ['layer'],
    },
  ],
  optimizations: [
    {
      breaking: false,
      changes: {
        en: ['Removes some legacy code and cleans up some dependencies in the script files.'],
      },
    },
    { breaking: false, changes: { en: ['Adds Prettier support.'] } },
    {
      breaking: false,
      changes: {
        en: [
          'Updates the default set of variables to be more thoughtful and use standardized nomenclature.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Renames the default theme colors to use agnostic language (e.g. purple => primary).'],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Overhauls color variants so that they can be overwritten with custom values or disabled entirely.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: ['Renames the default radius keys to be more descriptive.'],
      },
    },
  ],
};
