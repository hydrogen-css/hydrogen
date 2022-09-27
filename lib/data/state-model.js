// Hydrogen: State array
'use strict';

// Type imports
let Types = require('../data/state-model-definition');

/**
 * @typedef {import('./state-model-definition').States} States
 */

/**
 * Hydrogen's state array
 * @type {States}
 */
const state_array = [
  'visited',
  'checked',
  'link',
  'enabled',
  'optional',
  'required',
  'valid',
  'invalid',
  'hover',
  'disabled',
  'focus-visible',
  'focus',
  'active',
];

module.exports = state_array;
