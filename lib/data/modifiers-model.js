// Hydrogen: Modifier data model
'use strict';

// Hydrogen data models
let Modifiers = require('../data/modifiers-model-definition');
/** @typedef {import('../data/modifiers-model-definition').Modifiers} Modifiers */

// Hydrogen data imports

// Hydrogen core functions

// Hydrogen helper functions

// Hydrogen log functions

// Vendor imports

// Model data

/**
 * Hydrogen's base modifier list
 * @type {Modifiers}
 */
let modifier_data = [
  {
    key: 'light',
    mixer: '255, 255, 255',
    value: 0.25,
  },
  {
    key: 'lighter',
    mixer: '255, 255, 255',
    value: 0.5,
  },
  {
    key: 'lightest',
    mixer: '255, 255, 255',
    value: 0.75,
  },
  {
    key: 'dark',
    mixer: '0, 0, 0',
    value: 0.25,
  },
  {
    key: 'darker',
    mixer: '0, 0, 0',
    value: 0.5,
  },
  {
    key: 'darkest',
    mixer: '0, 0, 0',
    value: 0.75,
  },
];

module.exports = modifier_data;
