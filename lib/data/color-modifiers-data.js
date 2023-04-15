// Hydrogen
'use strict';

// Data models
/**
 * @typedef {DefaultColorModifier[]} DefaultColorModifiers
 */
/**
 * @typedef {object} DefaultColorModifier
 * @prop {string} key
 * @prop {string} opposite
 * @prop {string} mixer
 * @prop {number} value
 * @prop {object} dark
 * @prop {string} dark.mixer
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Returns an array containing Hydrogen's default color modifier data, including mixer values for light and dark mode.
 *
 * @returns {DefaultColorModifiers}
 */
function get_color_modifier_data() {
  /** @type {DefaultColorModifier[]} */
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
  get_color_modifier_data,
};
