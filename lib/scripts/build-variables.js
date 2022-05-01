// Hydrogen: Build variables

// Third party dependencies
var colors = require('colors');
var fs = require('fs');

// Local dependencies
var { parseENV } = require('./parse-env');
var { loadSettings } = require('./load-settings');

function buildVariables(argv, format, marginMap) {
  try {
    // Start the timer
    console.time(
      'Hydrogen ' + '[LOGGING]'.magenta + ' Variable (' + format + ') file generation time was',
      'CSSVarTime'
    );
    // Get the environment and the user settings
    var envObject = parseENV(argv);
    var envState = envObject.state;
    var envSrc = envObject.src;
    var settings = loadSettings(argv);
    // Set up the variable
    var variableString = '';
    // Set up the variable prefix value based on the format
    var variablePrefix;
    if (format == 'css') {
      variablePrefix = '--';
    } else if (format == 'scss') {
      variablePrefix = '$';
    }
    // Set up the CSS root if compiling the CSS variables
    if (format == 'css') {
      variableString = variableString + ':root {'
    }
    // Colors & gradients
    // Containers
    // Font size
    // Line height
    // Media queries (if scss)
    // Radius
    // Shadows
    // Whitespace
    // Close the CSS root if compiling the CSS variables
    if (format == 'css') {
      variableString = variableString + '}'
    }
    // Check to see if the file exists, and if it does, delete it
    if (fs.existsSync(envSrc + settings.output + '/hydrogen.vars.' + format) == true) {
      fs.unlinkSync(envSrc + settings.output + '/hydrogen.vars.' + format);
    }
    // Write the file
    fs.writeFileSync(
      envSrc + settings.output + '/hydrogen.vars.' + format,
      variableString,
      function (err) {
        if (err) {
          console.log('Hydrogen', '[ERROR]'.red, err);
        }
      }
    );
    // End the timer
    console.timeEnd(
      'Hydrogen ' + '[LOGGING]'.magenta + ' Variable (' + format + ') file generation time was',
      'CSSVarTime'
    );
  } catch (err) {
    console.log('Hydrogen', '[ERROR]'.red, err);
    return err;
  }
}

module.exports = {
  buildVariables
}