// Hydrogen: Parse ENV

'use strict';

function parseENV(argv) {
  try {
    // Set the defaults
    var env = {
      'state': 'prod',
      'src': './'
    }
    // Check to see if dev has been passed as an argument
    argv.forEach(function(argument) {
      if (argument == 'dev') {
        // Set dev specific values
        env.state = 'dev';
        env.src = './tests/';
      }
    });
    // Return the object for use
    return env;
  } catch (err) {
    console.log(
      '⛔ [' + 'Hydrogen'.magenta + ']',
      err
    );
    return false;
  }
}

module.exports = {
  parseENV
}