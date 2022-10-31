// Hydrogen logs: Setup success
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../log-message');
// Vendor imports
var colors = require('colors');

log_message({
  type: 'success',
  step: 'Development setup',
  message:
    'Hydrogen has successfully prepared its development, testing, and documentation environments. Have fun building!',
});
