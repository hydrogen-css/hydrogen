// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../data/modifiers-model-definition').Modifier} Modifier
 */

// Data imports

// Logging

// Functions

// Vendor imports

// Script
/**
 * Hydrogen's default color modifier list
 * @returns {Modifier[]}
 */
function get_modifier_data() {
  return [
    {
      key: 'light',
      opposite: 'dark',
      mixer: '255, 255, 255',
      value: 0.25,
      dark: {
        mixer: '0, 0, 0',
      },
    },
    {
      key: 'lighter',
      opposite: 'darker',
      mixer: '255, 255, 255',
      value: 0.5,
      dark: {
        mixer: '0, 0, 0',
      },
    },
    {
      key: 'lightest',
      opposite: 'darkest',
      mixer: '255, 255, 255',
      value: 0.75,
      dark: {
        mixer: '0, 0, 0',
      },
    },
    {
      key: 'dark',
      opposite: 'light',
      mixer: '0, 0, 0',
      value: 0.25,
      dark: {
        mixer: '255, 255, 255',
      },
    },
    {
      key: 'darker',
      opposite: 'lighter',
      mixer: '0, 0, 0',
      value: 0.5,
      dark: {
        mixer: '255, 255, 255',
      },
    },
    {
      key: 'darkest',
      opposite: 'lightest',
      mixer: '0, 0, 0',
      value: 0.75,
      dark: {
        mixer: '255, 255, 255',
      },
    },
  ];
}

module.exports = {
  get_modifier_data,
};
