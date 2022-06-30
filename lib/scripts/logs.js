// Hydrogen: Log functions

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies

function h2_error(error) {
  console.log('⛔ [' + 'Hydrogen'.magenta + ']', error);
}

function h2_warning(error) {
  console.log('🔔 [' + 'Hydrogen'.magenta + ']', error);
}

function h2_timer(msg, start, end) {
  var ms = (end - start) / BigInt(1000000);
  ms = Number(ms);
  if (ms === 0) {
    ms = '< 0';
  }
  console.log(
    '⌚ [' + 'Hydrogen'.magenta + '] ' + msg + ':',
    colors.magenta(ms) + 'ms'.magenta + '.'
  );
}

module.exports = {
  h2_error,
  h2_warning,
  h2_timer,
};
