// Hydrogen data models
/**
 * @typedef {import('../lib/data/release-model-definition').Release} Release
 * @typedef {import('../lib/data/release-model-definition').Change} Change
 * @typedef {import('../lib/data/release-model-definition').Language} Language
 */

// Release
/** @type {Release} */
module.exports = {
  version: '2.0.0-beta.34',
  date: new Date('2023-01-06'),
  author: 'Josh Beveridge',
  features: [
    {
      breaking: true,
      changes: {
        en: [
          'Adds support for parsing configured colors (and their modifiers) as well as space multipliers inside of almost all standard CSS properties.',
        ],
      },
      notes: [],
    },
    {
      breaking: false,
      changes: {
        en: ['The snippets file has been updated with many common CSS properties for ease-of-use.'],
      },
      notes: [],
    },
  ],
  optimizations: [
    {
      breaking: true,
      changes: {
        en: [
          "CSS properties and their syntax have been prioritized over Hydrogen's custom attributes, resulting in a handful of breaking changes that were necessary for future proofing the project.",
        ],
      },
      notes: [
        'border has been migrated to CSS syntax, meaning that the side option is no longer available and commas are invalid.',
        'background-color no longer supports configured gradients and should be replaced with background or background-image.',
        "offset now represents CSS offset and should be replaced with location to retain Hydrogen's original functionality.",
        'visibility continues to support invisible as a custom value, but the styles associated with visible have been moved to the revealed key in favor of supporting the actual CSS visible value.',
      ],
      properties: ['border', 'background-color', 'offset', 'location', 'visibility'],
    },
    {
      breaking: true,
      changes: {
        en: [
          'As a part of processing configured values, color modifiers now have to be appended to color keys as a suffix, rather than a prefix.',
        ],
      },
      notes: [],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Scripts have been rewritten and broken apart for better maintenance, testing, and synchronous error reporting.',
        ],
      },
      notes: [],
    },
    {
      breaking: false,
      changes: {
        en: [
          'The property model has been updated to include new categories to better support existing CSS properties.',
        ],
      },
      notes: [],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Repetitive data has been centralized and standardized to make maintenance and access much easier.',
        ],
      },
      notes: [],
    },
  ],
  bugfixes: [
    {
      breaking: true,
      changes: {
        en: [
          "Hydrogen now presents a targeted error if it can't find your <code>input</code> or <code>output</code> directories, rather than providing unrelated error information,",
        ],
      },
    },
    {
      breaking: true,
      changes: {
        en: [
          'Offset was preventing the use of the true CSS <code>offset</code> value, so it has been removed in favor of <code>location</code>.',
        ],
      },
      properties: ['offset', 'location'],
    },
    {
      breaking: true,
      changes: {
        en: [
          'Support for <code>z-index</code> has been migrated away from being an alias for <code>layer</code> in favor of true CSS <code>z-index</code> syntax, but this means that existing uses of <code>z-index</code> will no longer apply a position value.',
        ],
      },
      properties: ['offset', 'location'],
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixes an error that caused the watch script to retain error/warning counts accumulated from previous runs.',
        ],
      },
    },
    {
      breaking: false,
      changes: {
        en: [
          'Fixed a bug where captions were being assigned the wrong variable, resulting in incorrect computed values.',
        ],
      },
    },
  ],
};
