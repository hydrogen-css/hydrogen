// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions

// Helper functions

// Vendor imports
var colors = require('colors');

// Script ==========================================================================================

const flourish = colors.dim('> ');

const headers = {
  system: colors.magenta('☼') + ' Hydrogen' + colors.dim(' - ') + colors.magenta('System'),
  test: colors.magenta('☼') + ' Hydrogen' + colors.dim(' - ') + colors.magenta('Test'),
  info: colors.magenta('☼') + ' Hydrogen' + colors.dim(' - ') + colors.blue('Alert'),
  warning: colors.magenta('☼') + ' Hydrogen' + colors.dim(' - ') + colors.yellow('Warning'),
  error: colors.magenta('☼') + ' Hydrogen' + colors.dim(' - ') + colors.red('Error'),
  failure: colors.magenta('☼') + ' Hydrogen' + colors.dim(' - ') + colors.red('Failure'),
  success: colors.magenta('☼') + ' Hydrogen' + colors.dim(' - ') + colors.green('Success'),
  timer: colors.magenta('☼') + ' Hydrogen' + colors.dim(' - ') + colors.cyan('Timers'),
};

module.exports = {
  flourish,
  headers,
};
