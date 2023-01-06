// Hydrogen logs: Docs setup
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../log-message');
// Vendor imports
var colors = require('colors');

log_message({
  type: 'system',
  step: 'Creating docs environment...',
  buffers: {
    top: false,
    bottom: true,
  },
});
