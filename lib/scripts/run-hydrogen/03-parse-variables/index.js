// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../data/config-data').ParsedConfig} ParsedConfig
 */

// Data imports

// Local functions
const { build_theme_variables } = require('./build-theme-variables');
const { generate_type_units } = require('./generate-type-units');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Generates a list of variables that enables automatic switching of values based on mode and theme.
 *
 * @param {ParsedConfig} config The user's settings
 * @returns {string} A string containing parsed CSS variables ready for use
 */
function parse_variables(config) {
  try {
    let variable_css = '';
    config.variables = {
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
    if (config.themes['default']) {
      // Build the variables
      let root_default_variables = build_theme_variables(settings, 'default', 'default');
      // Append it to the variable string
      if (root_default_variables) {
        variable_css = variable_css + root_default_variables;
      }
      // Build the root modes
      if (
        config.modes &&
        config.modes.method &&
        config.modes.dark &&
        config.modes.dark.auto_apply_styles
      ) {
        if (config.modes.dark.auto_apply_styles === true) {
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
    if (config.themes) {
      Object.keys(config.themes).forEach(function (theme_key) {
        if (theme_key != 'default') {
          // Build the variables
          let theme_default_variables = build_theme_variables(settings, theme_key, 'default');
          // Append it to the variable string
          if (theme_default_variables) {
            variable_css = variable_css + theme_default_variables;
          }
          // Build the theme modes
          if (
            config.modes &&
            config.modes.method &&
            config.modes.dark &&
            config.modes.dark.auto_apply_styles != undefined
          ) {
            if (config.modes.dark.auto_apply_styles === true) {
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
      Object.keys(config.themes).forEach(function (theme_key) {
        if (config.themes[theme_key].typography && config.themes[theme_key].typography.length > 0) {
          config.themes[theme_key].typography.forEach(function (type) {
            // Because we only want to apply the CSS type variables on the base query in this context, we need to check against the type setting's query value - while the user can set whatever query key they want, during the settings parsing, the equivalent query value is always set to "base", and so we can always check for "base" as a value here
            if (type.query != 'base') {
              let typography = '';
              if (theme_key === 'default') {
                typography = '\n@media ' + type.query + '{\n:root {\n';
              } else {
                typography = '\n@media ' + type.query + '{\n [data-h2*="' + theme_key + '"]{\n';
              }
              // Generate the core rhythm units and typography variables
              let type_units = generate_type_units(settings, type);
              // Add the units and variables to the typography string
              typography = typography + type_units.type_units;
              typography = typography + type_units.type_vars;
              // Add the query's typography to the variable list
              variable_css = variable_css + typography + '}\n}';
            }
          });
        }
      });
    }
    config.variables.css = variable_css;
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
