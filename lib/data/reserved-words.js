// Hydrogen
'use strict';

// Data models

// Data imports
const { get_modifier_data } = require('./modifiers-model');
const { get_state_data } = require('./state-model');

// Logging

// Functions

// Vendor imports

// Scripts
function get_reserved_modes() {
  return [
    'default',
    'dark',
    'contrast',
    'all',
    'selectors',
    'children',
    'id',
    'class',
  ];
}
function get_reserved_modifiers() {
  let modifiers = get_modifier_data();
  let modifier_array = [];
  modifiers.forEach((i) => {
    modifier_array.push(i.key);
  });
  return modifier_array;
}
/**
 * Creates an array containing a list of reserved keywords
 * @returns {string[]}
 */
function get_reserved_words() {
  let reserved_words = [];
  reserved_words.push(get_reserved_modes());
  reserved_words.push(get_reserved_modifiers());
  reserved_words.push(get_state_data());
  return reserved_words;
}
function get_reserved_modes() {
  return ['default', 'dark', 'contrast', 'all'];
}

module.exports = {
  get_reserved_words,
  get_reserved_modes,
};
