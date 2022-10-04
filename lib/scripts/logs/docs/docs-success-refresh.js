// Hydrogen logs: Docs refresh success
'use strict';

// Hydrogen type imports
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('../log-message');
// Vendor imports
var colors = require('colors');

log_message({
  type: 'success',
  step: 'Refreshing docs',
  message:
    'Hydrogen has successfully refreshed its documentation environment. Have fun building!',
});
