// Hydrogen: Log functions
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies

// Log headers
var console_flourish = '> '.dim;
var error_header = '☼ Hydrogen'.magenta + ' - ' + ' Error '.black.bgRed;
var warning_header = '☼ Hydrogen'.magenta + ' - ' + ' Warning '.black.bgYellow;
var success_header = '☼ Hydrogen'.magenta + ' - ' + ' Success '.black.bgGreen;
var alert_header = '☼ Hydrogen'.magenta + ' - ' + ' Alert '.black.bgBlue;
var start_header = '☼ Hydrogen'.magenta + ' - ' + ' Start '.black.bgMagenta;
var clean_header = '☼ Hydrogen'.magenta + ' - ' + ' Clean '.black.bgMagenta;
var watch_header = '☼ Hydrogen'.magenta + ' - ' + ' Watch '.black.bgMagenta;
var init_header = '☼ Hydrogen'.magenta + ' - ' + ' Init '.black.bgMagenta;
var tests_header = '☼ Hydrogen'.magenta + ' - ' + ' Tests '.black.bgMagenta;
var timer_header = '☼ Hydrogen'.magenta + ' - ' + ' Timer '.black.bgCyan;

module.exports = {
  console_flourish,
  error_header,
  warning_header,
  success_header,
  alert_header,
  start_header,
  clean_header,
  watch_header,
  init_header,
  tests_header,
  timer_header,
};
