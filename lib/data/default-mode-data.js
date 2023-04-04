// Hydrogen
'use strict';

// Data models
/**
 * @typedef {["default", "dark"]} DefaultModes
 */
/**
 * @typedef {["default", "dark", "contrast", "all"]} ReservedModes
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Hydrogen's system-level mode support options.
 *
 * @returns {DefaultModes}
 */
function get_default_mode_data() {
  /** @type {DefaultModes} */
  return ['default', 'dark'];
}

/**
 * Creates an array containing a list of reserved mode words.
 *
 * @returns {ReservedModes}
 */
function get_reserved_mode_data() {
  /** @type {ReservedModes} */
  return ['default', 'dark', 'contrast', 'all'];
}

module.exports = {
  get_default_mode_data,
  get_reserved_mode_data,
};
