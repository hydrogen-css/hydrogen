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
var Color = require('color');
var colors = require('colors');
var fs = require('fs');
var path = require('path');

/**
 * Takes a color object and generates variable and value pairs that are then assigned to the color object, as well as concatenated into a single string to be returned as CSS output
 * @param {object} color
 * @param {"default" | "dark"} mode
 * @returns {string | false} A modified color object and a CSS variable string
 */
function parse_color_variable(color, mode) {
  try {
    let color_variables = '';
    // Default color variable
    // prettier-ignore
    let var_name = '--h2-color-' + color.key;
    let var_value =
      Color(color[mode].color).red() +
      ', ' +
      Color(color[mode].color).green() +
      ', ' +
      Color(color[mode].color).blue();
    // Add the variable and its value to the color object for later use
    color.var_data.name = var_name;
    color.var_data.value = var_value;
    // Add the variable to the output
    // prettier-ignore
    color_variables = color_variables + var_name + ': ' + var_value + ';\n';
    // Color modifier variables
    if (
      color[mode] &&
      color[mode].modifiers &&
      color[mode].modifiers.length > 0
    ) {
      color[mode].modifiers.forEach(function (modifier_setting) {
        let mod_color = false;
        base_modifiers.forEach(function (base_modifier) {
          if (
            modifier_setting.key === base_modifier.key &&
            modifier_setting.default === true &&
            modifier_setting.overwritten === false
          ) {
            // Generate the automated color
            mod_color = tint_shade(
              base_modifiers,
              color[mode].color,
              base_modifier.key
            );
          }
        });
        if (!mod_color) {
          mod_color = modifier_setting.color;
        }
        // prettier-ignore
        let mod_var_name = '--h2-color-' + color.key + '-' + modifier_setting.key;
        let mod_var_value =
          Color(mod_color).red() +
          ', ' +
          Color(mod_color).green() +
          ', ' +
          Color(mod_color).blue();
        // Add the variable and its value to the color object for later use
        modifier_setting.var_data.name = mod_var_name;
        modifier_setting.var_data.value = mod_var_value;
        // Add the variable to the output
        // prettier-ignore
        color_variables = color_variables + mod_var_name + ': ' + mod_var_value + ';\n';
      });
    }
    return color_variables;
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Color parsing',
      message: error,
    });
    return false;
  }
}

/**
 * Takes a theme and mode and builds variables that are applied to the theme object, as well as returns a string for CSS use
 * @param {Settings} settings
 * @param {"default" | "theme key"} theme
 * @param {"default" | "dark"} mode
 * @param {string} [core_units]
 * @param {string} [root_typography]
 * @returns {string | false} A modified theme object and a CSS variable string
 */
function build_theme_variables(settings, theme, mode) {
  try {
    let root_start = '';
    let root_string = '';
    let root_close = '';
    if (theme === 'default' && mode === 'default') {
      root_start = ':root{\n';
      root_close = '}';
    } else if (theme === 'default' && mode === 'dark') {
      if (settings.modes.dark.method === 'preference') {
        // prettier-ignore
        root_start = '\n@media screen and (prefers-color-scheme: dark) {\n:root{\n';
        root_close = '}\n}';
      } else if (settings.modes.dark.method === 'toggle') {
        root_start = '\n[data-h2*="dark"]{\n';
        root_close = '}';
      }
    } else if (theme != 'default' && mode === 'default') {
      // prettier-ignore
      root_start = '\n[data-h2*="' + theme + '"]{\n';
      root_close = '}';
    } else if (theme != 'default' && mode === 'dark') {
      if (settings.modes.dark.method === 'preference') {
        // prettier-ignore
        root_start = '\n@media screen and (prefers-color-scheme: dark) {\n [data-h2*="' + theme + '"]{\n';
        root_close = '}\n}';
      } else if (settings.modes.dark.method === 'toggle') {
        root_start = '\n[data-h2*="dark"][data-h2*="' + theme + '"]{\n';
        root_close = '}';
      }
    }
    let units = '';
    let typography = '';
    let colors = '';
    let containers = '';
    let fonts = '';
    let gradients = '';
    let radii = '';
    let shadows = '';
    let transition_durations = '';
    let transition_functions = '';
    let transition_delays = '';
    // Build the root core units
    if (mode === 'default') {
      if (
        settings.themes[theme].typography &&
        settings.themes[theme].typography.length > 0
      ) {
        settings.themes[theme].typography.forEach(function (type) {
          // This can refer to base because while the key changes, the query never does
          if (type.query === 'base') {
            // Core units
            units = units + '/* Core units */\n';
            // prettier-ignore
            units = units + '--h2-base-font-size: ' + type.size + ';\n';
            // prettier-ignore
            units = units + '--h2-base-line-height: ' + type.line_height + ';\n';
            // prettier-ignore
            units = units + '--h2-base-whitespace: ' + type.line_height + ';\n';
            // Typography
            typography = '/* Font sizes and line heights */\n';
            let new_type = build_size_and_line_height(type);
            if (new_type) {
              typography = typography + new_type;
            }
          }
        });
      }
    }
    // Colors
    if (
      settings.themes[theme].colors &&
      settings.themes[theme].colors.length > 0
    ) {
      colors = colors + '/* Colors */\n';
      settings.themes[theme].colors.forEach(function (color) {
        if (color[mode] && color[mode].color) {
          let new_color = parse_color_variable(color, mode);
          if (new_color) {
            // prettier-ignore
            colors = colors + parse_color_variable(color, mode);
          }
        }
      });
    }
    // Containers
    if (
      settings.themes[theme].containers &&
      settings.themes[theme].containers.length > 0
    ) {
      containers = containers + '/* Container widths */\n';
      settings.themes[theme].containers.forEach(function (container) {
        if (container[mode] && container[mode].max_width) {
          // prettier-ignore
          let container_variables = '--h2-container-' + container.key + ': ' + container[mode].max_width + ';\n';
          containers = containers + container_variables;
        }
      });
    }
    // Font families
    if (
      settings.themes[theme].fonts &&
      settings.themes[theme].fonts.length > 0
    ) {
      fonts = fonts + '/* Font families */\n';
      settings.themes[theme].fonts.forEach(function (font) {
        if (font[mode] && font[mode].family) {
          // prettier-ignore
          let font_variables = '--h2-font-family-' + font.key + ': ' + font[mode].family + ';\n';
          fonts = fonts + font_variables;
        }
      });
    }
    // Gradients
    if (
      settings.themes[theme].gradients &&
      settings.themes[theme].gradients.length > 0
    ) {
      gradients = gradients + '/* Gradients */\n';
      settings.themes[theme].gradients.forEach(function (gradient) {
        if (
          gradient[mode] &&
          gradient[mode].gradient &&
          gradient[mode].fallback
        ) {
          // prettier-ignore
          let gradient_variables = '--h2-gradient-' + gradient.key + ': ' + gradient[mode].gradient + ';\n';
          // prettier-ignore
          gradient_variables = gradient_variables + '--h2-gradient-fallback-' + gradient.key + ': ' + gradient[mode].fallback + ';\n';
          gradients = gradients + gradient_variables;
        }
      });
    }
    // Radii
    if (
      settings.themes[theme].radii &&
      settings.themes[theme].radii.length > 0
    ) {
      radii = radii + '/* Radii */\n';
      settings.themes[theme].radii.forEach(function (radius) {
        if (radius[mode] && radius[mode].radius) {
          // prettier-ignore
          let radius_variables = '--h2-radius-' + radius.key + ': ' + radius[mode].radius + ';\n';
          radii = radii + radius_variables;
        }
      });
    }
    // Shadows
    if (
      settings.themes[theme].shadows &&
      settings.themes[theme].shadows.length > 0
    ) {
      shadows = shadows + '/* Shadows */\n';
      settings.themes[theme].shadows.forEach(function (shadow) {
        if (shadow[mode] && shadow[mode].shadow) {
          // prettier-ignore
          let shadow_variables = '--h2-shadow-' + shadow.key + ': ' + shadow[mode].shadow + ';\n';
          shadows = shadows + shadow_variables;
        }
      });
    }
    // Transition durations
    if (
      settings.themes[theme].transitions &&
      settings.themes[theme].transitions.durations &&
      settings.themes[theme].transitions.durations.length > 0
    ) {
      transition_durations =
        transition_durations + '/* Transitions / Durations */\n';
      settings.themes[theme].transitions.durations.forEach(function (duration) {
        if (duration[mode] && duration[mode].duration) {
          // prettier-ignore
          let duration_variables = '--h2-transition-duration-' + duration.key + ': ' + duration[mode].duration + ';\n';
          transition_durations = transition_durations + duration_variables;
        }
      });
    }
    // Transition functions
    if (
      settings.themes[theme].transitions &&
      settings.themes[theme].transitions.functions &&
      settings.themes[theme].transitions.functions.length > 0
    ) {
      transition_functions =
        transition_functions + '/* Transitions / Functions */\n';
      settings.themes[theme].transitions.functions.forEach(function (
        t_function
      ) {
        if (t_function[mode] && t_function[mode].function) {
          // prettier-ignore
          let function_variables = '--h2-transition-function-' + t_function.key + ': ' + t_function[mode].function + ';\n';
          transition_functions = transition_functions + function_variables;
        }
      });
    }
    // Transition delays
    if (
      settings.themes[theme].transitions &&
      settings.themes[theme].transitions.delays &&
      settings.themes[theme].transitions.delays.length > 0
    ) {
      transition_delays = transition_delays + '/* Transitions / Delays */\n';
      settings.themes[theme].transitions.delays.forEach(function (delay) {
        if (delay[mode] && delay[mode].delay) {
          // prettier-ignore
          let delay_variables = '--h2-transition-delay-' + delay.key + ': ' + delay[mode].delay + ';\n';
          transition_delays = transition_delays + delay_variables;
        }
      });
    }
    // Assemble the root string
    root_string =
      root_start +
      units +
      colors +
      containers +
      fonts +
      typography +
      gradients +
      radii +
      shadows +
      transition_durations +
      transition_functions +
      transition_delays +
      root_close;
    // Append it to the variable string
    return root_string;
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Theme variable construction',
      message: error,
    });
  }
}

/**
 * Assembles a string containing all the size and line heights for a particular type setting
 * @param {*} type_setting
 * @returns {string} A string containing type variables for use in CSS
 */
function build_size_and_line_height(type_setting) {
  try {
    // Captions
    // prettier-ignore
    let caption_size = '--h2-font-size-caption: ' + type_setting.caption.size + ';\n';
    // prettier-ignore
    let caption_line = '--h2-line-height-caption: ' + type_setting.caption.line_height + ';\n';
    // Copy
    // prettier-ignore
    let copy_size = '--h2-font-size-copy: ' + type_setting.copy.size + ';\n';
    // prettier-ignore
    let copy_line = '--h2-line-height-copy: ' + type_setting.copy.line_height + ';\n';
    // Heading 6
    // prettier-ignore
    let h6_size = '--h2-font-size-h6: ' + type_setting.h6.size + ';\n';
    // prettier-ignore
    let h6_line = '--h2-line-height-h6: ' + type_setting.h6.line_height + ';\n';
    // Heading 5
    // prettier-ignore
    let h5_size = '--h2-font-size-h5: ' + type_setting.h5.size + ';\n';
    // prettier-ignore
    let h5_line = '--h2-line-height-h5: ' + type_setting.h5.line_height + ';\n';
    // Heading 4
    // prettier-ignore
    let h4_size = '--h2-font-size-h4: ' + type_setting.h4.size + ';\n';
    // prettier-ignore
    let h4_line = '--h2-line-height-h4: ' + type_setting.h4.line_height + ';\n';
    // Heading 3
    // prettier-ignore
    let h3_size = '--h2-font-size-h3: ' + type_setting.h3.size + ';\n';
    // prettier-ignore
    let h3_line = '--h2-line-height-h3: ' + type_setting.h3.line_height + ';\n';
    // Heading 2
    // prettier-ignore
    let h2_size = '--h2-font-size-h2: ' + type_setting.h2.size + ';\n';
    // prettier-ignore
    let h2_line = '--h2-line-height-h2: ' + type_setting.h2.line_height + ';\n';
    // Heading 1
    // prettier-ignore
    let h1_size = '--h2-font-size-h1: ' + type_setting.h1.size + ';\n';
    // prettier-ignore
    let h1_line = '--h2-line-height-h1: ' + type_setting.h1.line_height + ';\n';
    // Display
    // prettier-ignore
    let display_size = '--h2-font-size-display: ' + type_setting.display.size + ';\n';
    // prettier-ignore
    let display_line = '--h2-line-height-display: ' + type_setting.display.line_height + ';\n';
    // Assemble the type string and return it
    let typography =
      caption_size +
      caption_line +
      copy_size +
      copy_line +
      h6_size +
      h6_line +
      h5_size +
      h5_line +
      h4_size +
      h4_line +
      h3_size +
      h3_line +
      h2_size +
      h2_line +
      h1_size +
      h1_line +
      display_size +
      display_line;
    return typography;
  } catch (error) {
    log_message({
      type: 'error',
      step: 'Building type variables',
      message: error,
    });
    return false;
  }
}

/**
 * Generates a list of variables that enables automatic switching of values based on mode and theme
 * @param {Settings} settings
 */
function build_variables(settings) {
  try {
    let variables = '';
    // Build the root
    // Check for a default theme and build it if it exists
    if (settings.themes['default']) {
      // Build the variables
      let root_default_variables = build_theme_variables(
        settings,
        'default',
        'default'
      );
      // Append it to the variable string
      if (root_default_variables) {
        variables = variables + root_default_variables;
      }
      // Build the root modes
      if (
        settings.modes &&
        settings.modes.dark &&
        settings.modes.dark.automatic &&
        settings.modes.dark.method
      ) {
        if (settings.modes.dark.automatic === true) {
          // Build the variables
          let root_dark_variables = build_theme_variables(
            settings,
            'default',
            'dark'
          );
          // Append it to the variable string
          if (root_dark_variables) {
            variables = variables + root_dark_variables;
          }
        }
      }
    }
    // Build the root themes
    if (settings.themes) {
      Object.keys(settings.themes).forEach(function (theme_key) {
        if (theme_key != 'default') {
          // Build the variables
          let theme_default_variables = build_theme_variables(
            settings,
            theme_key,
            'default'
          );
          // Append it to the variable string
          if (theme_default_variables) {
            variables = variables + theme_default_variables;
          }
          // Build the theme modes
          if (
            settings.modes &&
            settings.modes.dark &&
            settings.modes.dark.automatic &&
            settings.modes.dark.method
          ) {
            if (settings.modes.dark.automatic === true) {
              // Build the variables
              let theme_dark_variables = build_theme_variables(
                settings,
                theme_key,
                'dark'
              );
              // Append it to the variable string
              if (theme_dark_variables) {
                variables = variables + theme_dark_variables;
              }
            }
          }
        }
      });
      // Build remaining typography queries
      Object.keys(settings.themes).forEach(function (theme_key) {
        if (
          settings.themes[theme_key].typography &&
          settings.themes[theme_key].typography.length > 0
        ) {
          settings.themes[theme_key].typography.forEach(function (type) {
            // This can refer to base because while the key changes, the query never does
            if (type.query != 'base') {
              let query_typography = '';
              if (theme_key === 'default') {
                query_typography = '\n@media ' + type.query + '{\n:root {\n';
              } else {
                // prettier-ignore
                query_typography = '\n@media ' + type.query + '{\n [data-h2*="' + theme_key + '"]{\n';
              }
              // Core units
              query_typography = query_typography + '/* Core units */\n';
              // prettier-ignore
              query_typography = query_typography + '--h2-base-font-size: ' + type.size + ';\n';
              // prettier-ignore
              query_typography = query_typography + '--h2-base-line-height: ' + type.line_height + ';\n';
              // prettier-ignore
              query_typography = query_typography + '--h2-base-whitespace: ' + type.line_height + ';\n';
              // Size and line heights
              // prettier-ignore
              query_typography = query_typography + '/* Font sizes and line heights */\n';
              let new_type = build_size_and_line_height(type);
              if (new_type) {
                query_typography = query_typography + new_type;
              }
              // Add the query's typography to the variable list
              variables = variables + query_typography + '}\n}';
            }
          });
        }
      });
    }
    return variables;
  } catch (error) {
    log_message({
      type: 'error',
      step: 'New variable construction',
      message: error,
    });
    console.log(error);
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
    const timer_start_export_variables = process.hrtime.bigint();
    // Load the variables
    let css_variables = build_variables(settings);
    // Delete existing files
    if (
      fs.existsSync(
        path.join(settings.output.parsed.string + '/hydrogen.vars.css')
      ) == true
    ) {
      fs.unlinkSync(
        path.join(settings.output.parsed.string + '/hydrogen.vars.css')
      );
    }
    // Write the new file
    fs.writeFileSync(
      path.join(settings.output.parsed.string + '/hydrogen.vars.css'),
      css_variables
    );
    // End the timer and print results
    const timer_end_export_variables = process.hrtime.bigint();
    log_timer({
      settings: settings,
      step: 'CSS variable export',
      times: {
        start: timer_start_export_variables,
        end: timer_end_export_variables,
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
