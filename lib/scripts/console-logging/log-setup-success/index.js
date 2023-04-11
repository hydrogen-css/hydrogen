// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions

// Helper functions
const { log_message } = require('../log-message');

// Vendor imports

// Script ==========================================================================================

/**
 * Logs a success message to the console when the development environment is successfully built and ready to use.
 */
log_message({
  type: 'success',
  step: 'Development setup',
  message:
    'Hydrogen has successfully prepared its development, testing, and documentation environments. Have fun building!',
  buffers: {
    bottom: true,
  },
});
