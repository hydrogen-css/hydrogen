// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('./state-model-definition').States} States
 */

// Data imports

// Logging

// Functions

// Vendor imports

// Script
/**
 * Hydrogen's interaction state support
 * @returns {States}
 */
function get_state_data() {
  return [
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
}

module.exports = {
  get_state_data,
};
