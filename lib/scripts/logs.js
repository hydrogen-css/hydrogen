// Hydrogen: Log functions

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies

function h2Error(error) {
  console.log('⛔ [' + 'Hydrogen'.magenta + ']', error);
}

function h2Warning(error) {
  console.log('🔔 [' + 'Hydrogen'.magenta + ']', error);
}

function h2Timer(msg, start, end) {
  var ms = (end - start) / BigInt(1000000);
  ms = Number(ms);
  if (ms === 0) {
    ms = '< 0';
  }
  console.log('⌚ [' + 'Hydrogen'.magenta + '] ' + msg + ':', colors.magenta(ms) + 'ms'.magenta + '.');
}

module.exports = {
  h2Error,
  h2Warning,
  h2Timer,
};
