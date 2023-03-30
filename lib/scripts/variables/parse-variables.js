// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */

// Data imports

// Logging

// Functions
const { build_theme_variables } = require('./build-theme-variables');
const { build_typography_variables } = require('./build-typography-variables');

// Vendor imports

// Scripts
/**
 * Generates a list of variables that enables automatic switching of values based on mode and theme
 * @param {Settings} settings The user's settings
 * @returns {string} A string containing parsed CSS variables ready for use
 */
function parse_variables(settings) {
  try {
    let variable_css = '';
    settings.variables = {
      css: '',
      colors: {},
      containers: {},
      fonts: {},
      gradients: {},
      radii: {},
      shadows: {},
      transition_durations: {},
      transition_functions: {},
      transition_delays: {},
    };
    // Build the root
    // Check for a default theme and build it if it exists
    if (settings.themes['default']) {
      // Build the variables
      let root_default_variables = build_theme_variables(settings, 'default', 'default');
      // Append it to the variable string
      if (root_default_variables) {
        variable_css = variable_css + root_default_variables;
      }
      // Build the root modes
      if (
        settings.modes &&
        settings.modes.method &&
        settings.modes.dark &&
        settings.modes.dark.auto_apply_styles
      ) {
        if (settings.modes.dark.auto_apply_styles === true) {
          // Build the variables
          let root_dark_variables = build_theme_variables(settings, 'default', 'dark');
          // Append it to the variable string
          if (root_dark_variables) {
            variable_css = variable_css + root_dark_variables;
          }
        }
      }
    }
    // Build the root themes
    if (settings.themes) {
      Object.keys(settings.themes).forEach(function (theme_key) {
        if (theme_key != 'default') {
          // Build the variables
          let theme_default_variables = build_theme_variables(settings, theme_key, 'default');
          // Append it to the variable string
          if (theme_default_variables) {
            variable_css = variable_css + theme_default_variables;
          }
          // Build the theme modes
          if (
            settings.modes &&
            settings.modes.method &&
            settings.modes.dark &&
            settings.modes.dark.auto_apply_styles != undefined
          ) {
            if (settings.modes.dark.auto_apply_styles === true) {
              // Build the variables
              let theme_dark_variables = build_theme_variables(settings, theme_key, 'dark');
              // Append it to the variable string
              if (theme_dark_variables) {
                variable_css = variable_css + theme_dark_variables;
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
            // This can refer to base because while the key changes, the query never does (the user can set whatever key, but the default query's value is always set to 'base' in parse_media_settings)
            if (type.query != 'base') {
              let typography = '';
              if (theme_key === 'default') {
                typography = '\n@media ' + type.query + '{\n:root {\n';
              } else {
                typography = '\n@media ' + type.query + '{\n [data-h2*="' + theme_key + '"]{\n';
              }
              // Core units
              typography = typography + '/* Core units */\n';
              typography = typography + '--h2-base-font-size: ' + type.size + ';\n';
              let dlh = settings.processing.default_line_height;
              if (type.line_heights && type.line_heights.copy) {
                typography =
                  typography + '--h2-base-line-height: ' + type.line_heights.copy + ';\n';
                typography = typography + '--h2-base-whitespace: ' + type.line_heights.copy + ';\n';
              } else if (type.line_heights) {
                typography = typography + '--h2-base-line-height: ' + dlh + ';\n';
                typography = typography + '--h2-base-whitespace: ' + dlh + ';\n';
              } else if (type.line_height) {
                typography = typography + '--h2-base-line-height: ' + type.line_height + ';\n';
                typography = typography + '--h2-base-whitespace: ' + type.line_height + ';\n';
              } else {
                typography = typography + '--h2-base-line-height: ' + dlh + ';\n';
                typography = typography + '--h2-base-whitespace: ' + dlh + ';\n';
              }
              // Size and line heights
              // prettier-ignore
              typography = typography + '/* Font sizes and line heights */\n';
              let new_type = build_typography_variables(settings, type);
              if (new_type) {
                typography = typography + new_type;
              }
              // Add the query's typography to the variable list
              variable_css = variable_css + typography + '}\n}';
            }
          });
        }
      });
    }
    settings.variables.css = variable_css;
    return variable_css;
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Parsing variables',
        error: error,
      };
    }
  }
}

module.exports = {
  parse_variables,
};
