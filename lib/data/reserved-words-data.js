// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('./color-modifiers-data').DefaultColorModifiers} DefaultColorModifiers
 * @typedef {import('./color-modifiers-data').DefaultColorModifier} DefaultColorModifier
 */
/**
 * @typedef {import('./default-mode-data').ReservedModes} ReservedModes
 */
/**
 * @typedef {import('./interaction-state-data').InteractionStates} InteractionStates
 */

// Data imports
const { get_color_modifier_data } = require('./color-modifiers-data');
const { get_reserved_mode_data } = require('./default-mode-data');
const { get_interaction_state_data } = require('./interaction-state-data');

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Creates an array containing a list of reserved keywords.
 *
 * @returns {string[]}
 */
function get_reserved_words() {
  // Create an empty array
  let reserved_words = [];
  // Grab the default mode words
  /** @type {ReservedModes} */
  reserved_words.push(get_reserved_mode_data());
  // Add selector-specific words
  reserved_words.push(['selectors', 'children', 'id', 'class']);
  // Get the color modifier data and strip the words from it
  /** @type {DefaultColorModifier[]} */
  let color_modifier_data = get_color_modifier_data();
  let color_modifier_words = [];
  color_modifier_data.forEach((i) => {
    color_modifier_words.push(i.key);
  });
  reserved_words.push(color_modifier_words);
  // Add the interaction state data words
  /** @type {InteractionStates} */
  let interaction_states = get_interaction_state_data();
  reserved_words.push(interaction_states);
  // Return the reserved words
  return reserved_words;
}

module.exports = {
  get_reserved_words,
};
