// Hydrogen: Build variables
'use strict';

// Hydrogen type imports
let Settings = require('../data/settings-model-definition');
/**
 * @typedef {import('../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
// Hydrogen function imports
const { log_message } = require('./logs/log-message');
const { log_timer } = require('../scripts/logs/log-timer');
const { base_modifiers, tint_shade } = require('./parse-color');
// Vendor imports
var colors = require('colors');
var fs = require('fs');
var path = require('path');

/**
 * Builds CSS variables from the user's configuration and ensures that typography settings are adjusted for each media query they've specified.
 * @param {Settings} settings The user's settings
 * @returns {string} CSS variables
 */
function build_variables(settings) {
  try {
    // Create a string to store the final variable output
    let variable_string = '';
    // Loop through the typography settings
    settings.styles.foundations.typography.forEach(function (
      typography_setting
    ) {
      // Check for a media query - most variables are only built in the base query
      if (typography_setting.query != 'base') {
        variable_string =
          variable_string + '@media ' + typography_setting.query + '{\n';
      }
      // Open the root variable declaration
      variable_string = variable_string + ':root{\n';
      // Build the core units
      variable_string = variable_string + '/* Core units */\n';
      variable_string =
        variable_string +
        '--h2-base-font-size: ' +
        typography_setting.size +
        ';\n';
      variable_string =
        variable_string +
        '--h2-base-line-height: ' +
        typography_setting.line_height +
        ';\n';
      variable_string =
        variable_string +
        '--h2-base-whitespace: ' +
        typography_setting.line_height +
        ';\n';
      // Build colors and gradients
      if (typography_setting.query === 'base') {
        variable_string = variable_string + '/* Colors */\n';
        if (
          settings.styles.tokens != null &&
          settings.styles.tokens.colors != null &&
          settings.styles.tokens.colors.length != 0
        ) {
          settings.styles.tokens.colors.forEach(function (color_setting) {
            // Build the standard color variable
            variable_string =
              variable_string +
              '--h2-color-' +
              color_setting.key +
              ': ' +
              color_setting.color +
              ';\n';
            // Build variables for the modifiers
            if (
              color_setting.modifiers == null ||
              color_setting.modifiers.length === 0
            ) {
              // They've chosen strictly automated modifiers
              base_modifiers.forEach(function (base_modifier) {
                // Generate the auto modifier
                let modified_color = tint_shade(
                  base_modifiers,
                  color_setting.color,
                  base_modifier.key
                );
                variable_string =
                  variable_string +
                  '--h2-color-' +
                  color_setting.key +
                  '-' +
                  base_modifier.key +
                  ': ' +
                  modified_color +
                  ';\n';
              });
            } else {
              // Create automated modifiers, but check for overwritten ones
              base_modifiers.forEach(function (base_modifier) {
                // Set up override variables
                let custom_override_status = false;
                let overwritten_color;
                // Loop through the modifier settings
                color_setting.modifiers.forEach(function (
                  modifier_setting,
                  config_index
                ) {
                  // Check to see if a modifier key matches the reserved modifiers
                  if (modifier_setting.key === base_modifier.key) {
                    custom_override_status = true;
                    overwritten_color = modifier_setting.color;
                  }
                });
                // Build the modifier variable based on whether they've overwritten a reserved modifier
                let final_color;
                if (custom_override_status === false) {
                  // They haven't overwritten the modifier, so generate the automatic value
                  let modified_color = tint_shade(
                    base_modifiers,
                    color_setting.color,
                    base_modifier.key
                  );
                  final_color = modified_color;
                } else {
                  // They have overwritten a reserved modifier, so generate the custom value
                  final_color = overwritten_color;
                }
                variable_string =
                  variable_string +
                  '--h2-color-' +
                  color_setting.key +
                  '-' +
                  base_modifier.key +
                  ': ' +
                  final_color +
                  ';\n';
              });
              // Create any remaining custom modifiers
              color_setting.modifiers.forEach(function (modifier_setting) {
                // Set up a modifier check to make sure the modifier doesn't match a reserved modifier
                let custom_modifier_state = true;
                base_modifiers.forEach(function (base_modifier) {
                  if (modifier_setting.key === base_modifier.key) {
                    custom_modifier_state = false;
                  }
                });
                // If the modifier is in fact custom, build the variable
                if (custom_modifier_state === true) {
                  variable_string =
                    variable_string +
                    '--h2-color-' +
                    color_setting.key +
                    '-' +
                    modifier_setting.key +
                    ': ' +
                    modifier_setting.color +
                    ';\n';
                }
              });
            }
          });
        }
      }
      // Build containers
      if (typography_setting.query === 'base') {
        variable_string = variable_string + '/* Container max widths */\n';
        if (
          settings.styles.tokens != null &&
          settings.styles.tokens.containers != null &&
          settings.styles.tokens.containers.length != 0
        ) {
          settings.styles.tokens.containers.forEach(function (
            container_setting
          ) {
            variable_string =
              variable_string +
              '--h2-container-' +
              container_setting.key +
              ': ' +
              container_setting.max_width +
              ';\n';
          });
        }
      }
      // Build font families
      if (typography_setting.query === 'base') {
        variable_string = variable_string + '/* Font families */\n';
        if (
          settings.styles.tokens != null &&
          settings.styles.tokens.fonts != null &&
          settings.styles.tokens.fonts.length != 0
        ) {
          settings.styles.tokens.fonts.forEach(function (container_setting) {
            variable_string =
              variable_string +
              '--h2-font-family-' +
              container_setting.key +
              ': ' +
              container_setting.family +
              ';\n';
          });
        }
      }
      // Build font sizes and line heights
      variable_string = variable_string + '/* Font sizes and line heights */\n';
      // Captions
      variable_string =
        variable_string +
        '--h2-font-size-caption: ' +
        typography_setting.caption.size +
        ';\n';
      variable_string =
        variable_string +
        '--h2-line-height-caption: ' +
        typography_setting.caption.line_height +
        ';\n';
      // Copy
      variable_string =
        variable_string +
        '--h2-font-size-copy: ' +
        typography_setting.copy.size +
        ';\n';
      variable_string =
        variable_string +
        '--h2-line-height-copy: ' +
        typography_setting.copy.line_height +
        ';\n';
      // h6
      variable_string =
        variable_string +
        '--h2-font-size-h6: ' +
        typography_setting.h6.size +
        ';\n';
      variable_string =
        variable_string +
        '--h2-line-height-h6: ' +
        typography_setting.h6.line_height +
        ';\n';
      // h5
      variable_string =
        variable_string +
        '--h2-font-size-h5: ' +
        typography_setting.h5.size +
        ';\n';
      variable_string =
        variable_string +
        '--h2-line-height-h5: ' +
        typography_setting.h5.line_height +
        ';\n';
      // h4
      variable_string =
        variable_string +
        '--h2-font-size-h4: ' +
        typography_setting.h4.size +
        ';\n';
      variable_string =
        variable_string +
        '--h2-line-height-h4: ' +
        typography_setting.h4.line_height +
        ';\n';
      // h3
      variable_string =
        variable_string +
        '--h2-font-size-h3: ' +
        typography_setting.h3.size +
        ';\n';
      variable_string =
        variable_string +
        '--h2-line-height-h3: ' +
        typography_setting.h3.line_height +
        ';\n';
      // h2
      variable_string =
        variable_string +
        '--h2-font-size-h2: ' +
        typography_setting.h2.size +
        ';\n';
      variable_string =
        variable_string +
        '--h2-line-height-h2: ' +
        typography_setting.h2.line_height +
        ';\n';
      // h1
      variable_string =
        variable_string +
        '--h2-font-size-h1: ' +
        typography_setting.h1.size +
        ';\n';
      variable_string =
        variable_string +
        '--h2-line-height-h1: ' +
        typography_setting.h1.line_height +
        ';\n';
      // display
      variable_string =
        variable_string +
        '--h2-font-size-display: ' +
        typography_setting.display.size +
        ';\n';
      variable_string =
        variable_string +
        '--h2-line-height-display: ' +
        typography_setting.display.line_height +
        ';\n';
      // Build gradients
      if (typography_setting.query === 'base') {
        variable_string = variable_string + '/* Gradients */\n';
        if (
          settings.styles.tokens != null &&
          settings.styles.tokens.gradients != null &&
          settings.styles.tokens.gradients.length != 0
        ) {
          settings.styles.tokens.gradients.forEach(function (gradient_setting) {
            variable_string =
              variable_string +
              '--h2-gradient-' +
              gradient_setting.key +
              ': ' +
              gradient_setting.gradient +
              ';\n';
          });
        }
      }
      // Build radii
      if (typography_setting.query === 'base') {
        variable_string = variable_string + '/* Radii */\n';
        if (
          settings.styles.tokens != null &&
          settings.styles.tokens.radii != null &&
          settings.styles.tokens.radii.length != 0
        ) {
          settings.styles.tokens.radii.forEach(function (radius_setting) {
            variable_string =
              variable_string +
              '--h2-radius-' +
              radius_setting.key +
              ': ' +
              radius_setting.radius +
              ';\n';
          });
        }
      }
      // Build shadows
      if (typography_setting.query === 'base') {
        variable_string = variable_string + '/* Radii */\n';
        if (
          settings.styles.tokens != null &&
          settings.styles.tokens.shadows != null &&
          settings.styles.tokens.shadows.length != 0
        ) {
          settings.styles.tokens.shadows.forEach(function (shadow_setting) {
            variable_string =
              variable_string +
              '--h2-shadow-' +
              shadow_setting.key +
              ': ' +
              shadow_setting.shadow +
              ';\n';
          });
        }
      }
      // Build transition values
      if (typography_setting.query === 'base') {
        variable_string = variable_string + '/* Transitions */\n';
        if (
          settings.styles.tokens != null &&
          settings.styles.tokens.transitions != null &&
          Object.keys(settings.styles.tokens.transitions).length != 0
        ) {
          // Build transition duration variables
          if (
            settings.styles.tokens.transitions.durations != null &&
            settings.styles.tokens.transitions.durations.length != 0
          ) {
            settings.styles.tokens.transitions.durations.forEach(function (
              duration_setting
            ) {
              variable_string =
                variable_string +
                '--h2-transition-duration-' +
                duration_setting.key +
                ': ' +
                duration_setting.duration +
                ';\n';
            });
          }
          // Build transition function variables
          if (
            settings.styles.tokens.transitions.functions != null &&
            settings.styles.tokens.transitions.functions.length != 0
          ) {
            settings.styles.tokens.transitions.functions.forEach(function (
              function_setting
            ) {
              variable_string =
                variable_string +
                '--h2-transition-function-' +
                function_setting.key +
                ': ' +
                function_setting.function +
                ';\n';
            });
          }
          // Build transition delay variables
          if (
            settings.styles.tokens.transitions.delays != null &&
            settings.styles.tokens.transitions.delays.length != 0
          ) {
            settings.styles.tokens.transitions.delays.forEach(function (
              delay_setting
            ) {
              variable_string =
                variable_string +
                '--h2-transition-delay-' +
                delay_setting.key +
                ': ' +
                delay_setting.delay +
                ';\n';
            });
          }
        }
      }
      // Build whitespace convenience variables
      if (typography_setting.query === 'base') {
        variable_string = variable_string + '/* Whitespace shortcuts */\n';
        variable_string =
          variable_string +
          '/* Note that these are merely for convenience. You can create any calc function you need using the --h2-base-whitespace variable */\n';
        for (let i = 1; i < 11; i++) {
          variable_string =
            variable_string +
            '--h2-whitespace-' +
            i +
            ': calc(var(--h2-base-whitespace) * ' +
            i +
            ');\n';
        }
      }
      // Close the root
      variable_string = variable_string + '}\n';
      // Close the query loop if one has been opened
      if (typography_setting.query != 'base') {
        variable_string = variable_string + '}\n';
      }
    });
    // Return the final variable string
    return variable_string;
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Variable construction',
      message: error,
    });
    return false;
  }
}

/**
 * Loads build_variables and then writes them to a unique CSS file that can be imported on the user's project.
 * @param {Settings} settings The user's settings
 * @returns {boolean} CSS file containing CSS variables
 */
function write_variable_file(settings) {
  try {
    // Start the timer
    const buildVariablesTimerStart = process.hrtime.bigint();
    // Load the variables
    let css_variables = build_variables(settings);
    // Delete existing files
    if (
      fs.existsSync(
        path.join(settings.runtime.output.string + '/hydrogen.vars.css')
      ) == true
    ) {
      fs.unlinkSync(
        path.join(settings.runtime.output.string + '/hydrogen.vars.css')
      );
    }
    // Write the new file
    fs.writeFileSync(
      path.join(settings.runtime.output.string + '/hydrogen.vars.css'),
      css_variables
    );
    // End the timer and print results
    const buildVariablesTimerEnd = process.hrtime.bigint();
    log_timer({
      settings: settings,
      step: 'CSS variable export',
      times: {
        start: buildVariablesTimerStart,
        end: buildVariablesTimerEnd,
      },
    });
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Exporting variables',
      message: error,
    });
    return false;
  }
}

module.exports = {
  build_variables,
  write_variable_file,
};
