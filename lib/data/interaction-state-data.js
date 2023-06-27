// Hydrogen
'use strict';

// Data models
/**
 * @typedef {['visited', 'checked', 'link', 'enabled', 'optional', 'required', 'valid', 'invalid', 'hover', 'disabled', 'focus-visible', 'focus', 'active']} InteractionStates
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * A list of Hydrogen's supported CSS interaction states.
 *
 * @returns {InteractionStates}
 */
function get_interaction_state_data() {
  /** @type {InteractionStates} */
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
  get_interaction_state_data,
};
