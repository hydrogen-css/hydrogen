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
  date: new Date('2021-11-15'),
  version: '1.1.12',
  optimizations: [
    {
      breaking: false,
      changes: {
        en: [
          "When checking the user's markup, rather than compiling all files into a single text file that is then scraped, the clean script now processes each file independently.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "The clean script's scraping logic has been rewritten so that the CSS matching expression is now up to 40 times faster.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Basic utilities now share a centralized set of scripts, rather than each utility having its own.',
        ],
      },
      properties: [
        'border',
        'container',
        'opacity',
        'radius',
        'shadow',
        'width',
      ],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Begins preliminary work on deprecating the folders configuration in favor of simplified, more consistent input and output configurations.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Adds a transition so that state changes now ease from one value to another.',
        ],
      },
      properties: ['background-color', 'color', 'opacity', 'overlay'],
    },
  ],
  bugfixes: [
    {
      breaking: false,
      changes: {
        en: [
          "Duplicate keys for most configuration options are now handled by prioritizing the user's first definition using that key, including over legacy default values.",
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          "Position's sticky value now comes with a default top value of 0 so that it works without the need for another attribute; this value can be overidden by location.",
        ],
      },
      properties: ['location', 'position'],
    },
  ],
};
