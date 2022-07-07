// Hydrogen: Build variables

// Third party dependencies
var colors = require('colors');
var Color = require('color');
var fs = require('fs');
var path = require('path');

// Local dependencies
var { getUserOutput } = require('./generate-paths');
var { h2_load_settings } = require('./load-settings');
var { h2_error, h2_warning, h2_timer } = require('./logs');
var { base_modifiers, tint_shade } = require('./parse-color');
var { buildTypography } = require('./build-typography');
const { config } = require('process');

function buildVariables() {
  try {
    // Start the timer
    const buildVariablesTimerStart = process.hrtime.bigint();
    // Get the environment and the user settings
    var settings = h2_load_settings();
    // Set up the variable
    var variableString = '';
    // Set up the CSS root
    variableString = variableString + ':root {\n';
    // Core units
    settings.typography.forEach(function (setting) {
      var typeQuery = null;
      settings.media.forEach(function (query) {
        if (query.key == setting.query_key) {
          typeQuery = query.query;
        }
      });
      if (typeQuery == null || typeQuery == 'base') {
        variableString = variableString + '/* Core units */\n';
        variableString =
          variableString +
          '--h2-base-line-height: ' +
          setting.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-base-whitespace: ' +
          setting.line_height +
          ';\n';
      }
    });
    // Colors & gradients
    variableString = variableString + '/* Colors */\n';
    if (
      settings.colors != null ||
      settings.colors != undefined ||
      settings.colors != []
    ) {
      settings.colors.forEach(function (userColor) {
        variableString =
          variableString +
          '--h2-color-' +
          userColor.key +
          ': ' +
          userColor.color +
          ';\n';
        if (userColor.modifiers == null || userColor.modifiers.length === 0) {
          // They've chosen strictly automated modifiers
          base_modifiers.forEach(function (base_modifier, base_index) {
            // Generate the auto modifier
            var modifiedColor = tint_shade(
              base_modifiers,
              userColor.color,
              base_modifier.key
            );
            variableString =
              variableString +
              '--h2-color-' +
              userColor.key +
              '-' +
              base_modifier.key +
              ': ' +
              modifiedColor +
              ';\n';
          });
        } else {
          // Create automated modifiers, but check for overwritten ones
          base_modifiers.forEach(function (base_modifier, base_index) {
            var overwrite = false;
            var overwriteColor;
            userColor.modifiers.forEach(function (
              config_modifier,
              config_index
            ) {
              if (config_modifier.key === base_modifier.key) {
                overwrite = true;
                overwriteColor = config_modifier.color;
              }
            });
            if (overwrite === false) {
              // Generate the auto key
              var modifiedColor = tint_shade(
                base_modifiers,
                userColor.color,
                base_modifier.key
              );
              variableString =
                variableString +
                '--h2-color-' +
                userColor.key +
                '-' +
                base_modifier.key +
                ': ' +
                modifiedColor +
                ';\n';
            } else {
              // They've overwritten an auto key
              variableString =
                variableString +
                '--h2-color-' +
                userColor.key +
                '-' +
                base_modifier.key +
                ': ' +
                overwriteColor +
                ';\n';
            }
          });
          // Create remaining custom modifiers
          userColor.modifiers.forEach(function (config_modifier, config_index) {
            var customState = true;
            base_modifiers.forEach(function (base_modifier, base_index) {
              if (config_modifier.key === base_modifier.key) {
                customState = false;
              }
            });
            if (customState === true) {
              // They've added a custom modifier, build a variable for it
              variableString =
                variableString +
                '--h2-color-' +
                userColor.key +
                '-' +
                config_modifier.key +
                ': ' +
                config_modifier.color +
                ';\n';
            }
          });
        }
      });
    }
    // Containers
    variableString = variableString + '/* Containers */\n';
    if (settings.containers != null && settings.containers != []) {
      settings.containers.forEach(function (containerSetting) {
        variableString =
          variableString +
          '--h2-container-' +
          containerSetting.key +
          ': ' +
          containerSetting.max_width +
          ';\n';
      });
    }
    // Font families
    variableString = variableString + '/* Font families */\n';
    if (settings.fonts != null && settings.fonts != []) {
      settings.fonts.forEach(function (fontSetting) {
        variableString =
          variableString +
          '--h2-font-family-' +
          fontSetting.key +
          ': ' +
          fontSetting.family +
          ';\n';
      });
    }
    // Font size
    var typographySettings = buildTypography();
    typographySettings.forEach(function (setting) {
      if (setting.query == null || setting.query == 'base') {
        // Sizes
        variableString = variableString + '/* Font sizes */\n';
        variableString =
          variableString +
          '--h2-font-size-caption: ' +
          setting.caption.size +
          ';\n';
        variableString =
          variableString + '--h2-font-size-copy: ' + setting.copy.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h6: ' + setting.h6.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h5: ' + setting.h5.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h4: ' + setting.h4.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h3: ' + setting.h3.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h2: ' + setting.h2.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h1: ' + setting.h1.size + ';\n';
        // Line height
        variableString = variableString + '/* Line heights */\n';
        variableString =
          variableString +
          '--h2-line-height-caption: ' +
          setting.caption.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-copy: ' +
          setting.copy.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h6: ' +
          setting.h6.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h5: ' +
          setting.h5.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h4: ' +
          setting.h4.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h3: ' +
          setting.h3.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h2: ' +
          setting.h2.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h1: ' +
          setting.h1.line_height +
          ';\n';
      }
    });
    // Gradients
    if (settings.gradients == null) {
      var error = 'Your configuration file is missing a "gradients" array.';
      h2_warning(error);
    } else {
      variableString = variableString + '/* Gradients */\n';
      settings.gradients.forEach(function (userGradient) {
        variableString =
          variableString +
          '--h2-gradient-' +
          userGradient.key +
          ': ' +
          userGradient.gradient +
          ';\n';
      });
    }
    // Radius
    variableString = variableString + '/* Radius */\n';
    if (settings.radius != null && settings.radius != []) {
      settings.radius.forEach(function (radiusSetting) {
        variableString =
          variableString +
          '--h2-radius-' +
          radiusSetting.key +
          ': ' +
          radiusSetting.radius +
          ';\n';
      });
    }
    // Shadows
    variableString = variableString + '/* Shadows */\n';
    if (settings.shadows != null && settings.shadows != []) {
      settings.shadows.forEach(function (shadowSetting) {
        variableString =
          variableString +
          '--h2-shadow-' +
          shadowSetting.key +
          ': ' +
          shadowSetting.shadow +
          ';\n';
      });
    }
    // Transitions
    variableString = variableString + '/* Transition values */\n';
    if (settings.transitions != null && settings.transitions != {}) {
      if (settings.transitions.durations != null) {
        settings.transitions.durations.forEach(function (durationSetting) {
          variableString =
            variableString +
            '--h2-transition-duration-' +
            durationSetting.key +
            ': ' +
            durationSetting.duration +
            ';\n';
        });
      }
      if (settings.transitions.functions != null) {
        settings.transitions.functions.forEach(function (functionSetting) {
          variableString =
            variableString +
            '--h2-transition-function-' +
            functionSetting.key +
            ': ' +
            functionSetting.function +
            ';\n';
        });
      }
      if (settings.transitions.delays != null) {
        settings.transitions.delays.forEach(function (delaySetting) {
          variableString =
            variableString +
            '--h2-transition-delay-' +
            delaySetting.key +
            ': ' +
            delaySetting.delay +
            ';\n';
        });
      }
    }
    // Whitespace shortcuts
    variableString = variableString + '/* Whitespace shortcuts */\n';
    variableString =
      variableString +
      '/* Note that these are merely for convenience. You can create any calc function you need using the --h2-base-whitespace variable */\n';
    for (let i = 1; i < 11; i++) {
      variableString =
        variableString +
        '--h2-whitespace-' +
        i +
        ': calc(var(--h2-base-whitespace) * ' +
        i +
        ');\n';
    }
    // Close the CSS root
    variableString = variableString + '}\n';
    // Build remaining typography settings inside their own media queries
    typographySettings.forEach(function (setting) {
      if (setting.query != null && setting.query != 'base') {
        // Media query and root element
        variableString = variableString + '@media ' + setting.query + ' {\n';
        variableString = variableString + ':root {\n';
        // Core units
        settings.typography.forEach(function (rawSetting) {
          settings.media.forEach(function (mediaSetting) {
            if (
              mediaSetting.key == rawSetting.query_key &&
              mediaSetting.query == setting.query
            ) {
              variableString = variableString + '/* Core units */\n';
              variableString =
                variableString +
                '--h2-base-line-height: ' +
                rawSetting.line_height +
                ';\n';
              variableString =
                variableString +
                '--h2-base-whitespace: ' +
                rawSetting.line_height +
                ';\n';
            }
          });
        });
        // Sizes
        variableString = variableString + '/* Font sizes */\n';
        variableString =
          variableString +
          '--h2-font-size-caption: ' +
          setting.caption.size +
          ';\n';
        variableString =
          variableString + '--h2-font-size-copy: ' + setting.copy.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h6: ' + setting.h6.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h5: ' + setting.h5.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h4: ' + setting.h4.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h3: ' + setting.h3.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h2: ' + setting.h2.size + ';\n';
        variableString =
          variableString + '--h2-font-size-h1: ' + setting.h1.size + ';\n';
        // Line height
        variableString = variableString + '/* Line heights */\n';
        variableString =
          variableString +
          '--h2-line-height-caption: ' +
          setting.caption.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-copy: ' +
          setting.copy.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h6: ' +
          setting.h6.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h5: ' +
          setting.h5.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h4: ' +
          setting.h4.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h3: ' +
          setting.h3.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h2: ' +
          setting.h2.line_height +
          ';\n';
        variableString =
          variableString +
          '--h2-line-height-h1: ' +
          setting.h1.line_height +
          ';\n';
        variableString = variableString + '}\n';
        variableString = variableString + '}\n';
      }
    });
    // Check to see if the file exists, and if it does, delete it
    if (
      fs.existsSync(
        path.join(getUserOutput('string') + '/hydrogen.vars.css')
      ) == true
    ) {
      fs.unlinkSync(path.join(getUserOutput('string') + '/hydrogen.vars.css'));
    }
    // Write the file
    fs.writeFileSync(
      path.join(getUserOutput('string') + '/hydrogen.vars.css'),
      variableString
    );
    // End the timer
    const buildVariablesTimerEnd = process.hrtime.bigint();
    h2_timer(
      'CSS var file build time was',
      buildVariablesTimerStart,
      buildVariablesTimerEnd
    );
  } catch (error) {
    h2_error(error);
    return error;
  }
}

module.exports = {
  buildVariables,
};
