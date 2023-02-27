// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 */

// Data imports

// Logging

// Functions
const { build_typography_variables } = require('./build-typography-variables');
const { process_color_variable } = require('./process-color-variable');

// Vendor imports

// Scripts
/**
 * Takes a theme and mode and builds variables that are applied to the theme object, as well as returns a string for CSS use
 * @param {Settings} settings
 * @param {"default" | string} theme
 * @param {"default" | "all" | "dark"} mode
 * @returns {string} A modified theme object and a CSS variable string
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
      if (settings.modes.method === 'preference') {
        // prettier-ignore
        root_start = '\n@media screen and (prefers-color-scheme: dark) {\n:root{\n';
        root_close = '}\n}';
      } else if (settings.modes.method === 'toggle') {
        root_start = '\n[data-h2*="dark"]{\n';
        root_close = '}';
      }
    } else if (theme != 'default' && mode === 'default') {
      // prettier-ignore
      root_start = '\n[data-h2*="' + theme + '"]{\n';
      root_close = '}';
    } else if (theme != 'default' && mode === 'dark') {
      if (settings.modes.method === 'preference') {
        // prettier-ignore
        root_start = '\n@media screen and (prefers-color-scheme: dark) {\n [data-h2*="' + theme + '"]{\n';
        root_close = '}\n}';
      } else if (settings.modes.method === 'toggle') {
        root_start = '\n[data-h2*="dark"][data-h2*="' + theme + '"]{\n';
        root_close = '}';
      }
    }
    // Create CSS string storage variables
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
            typography =
              typography + build_typography_variables(settings, type);
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
          colors = colors + process_color_variable(settings, color, mode);
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
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            // prettier-ignore
            container_variables = container_variables + '--h2-container-' + container.key + '-locked: ' + container[mode].max_width + ';\n';
          }
          // Add the container to the unique container variable list
          if (!settings.variables.containers[container.key]) {
            settings.variables.containers[container.key] = {
              default: 'var(--h2-container-' + container.key + ')',
              all: 'var(--h2-container-' + container.key + '-locked)',
            };
          }
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
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            // prettier-ignore
            font_variables = font_variables + '--h2-font-family-' + font.key + '-locked: ' + font[mode].family + ';\n';
          }
          // Add the font to the unique font variable list
          if (!settings.variables.fonts[font.key]) {
            settings.variables.fonts[font.key] = {
              default: 'var(--h2-font-family-' + font.key + ')',
              all: 'var(--h2-font-family-' + font.key + '-locked)',
            };
          }
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
        if (gradient[mode] && gradient[mode].gradient) {
          let gradient_variables =
            '--h2-gradient-' +
            gradient.key +
            ': ' +
            gradient[mode].gradient +
            ';\n';
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            gradient_variables =
              gradient_variables +
              '--h2-gradient-' +
              gradient.key +
              '-locked: ' +
              gradient[mode].gradient +
              ';\n';
          }
          // Add the gradient to the unique gradient variable list
          if (!settings.variables.gradients[gradient.key]) {
            settings.variables.gradients[gradient.key] = {
              default: 'var(--h2-gradient-' + gradient.key + ')',
              all: 'var(--h2-gradient-' + gradient.key + '-locked)',
            };
          }
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
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            // prettier-ignore
            radius_variables = radius_variables + '--h2-radius-' + radius.key + '-locked: ' + radius[mode].radius + ';\n';
          }
          // Add the radius to the unique radii variable list
          if (!settings.variables.radii[radius.key]) {
            settings.variables.radii[radius.key] = {
              default: 'var(--h2-radius-' + radius.key + ')',
              all: 'var(--h2-radius-' + radius.key + '-locked)',
            };
          }
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
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            // prettier-ignore
            shadow_variables = shadow_variables + '--h2-shadow-' + shadow.key + '-locked: ' + shadow[mode].shadow + ';\n';
          }
          // Add the shadow to the unique shadow variable list
          if (!settings.variables.shadows[shadow.key]) {
            settings.variables.shadows[shadow.key] = {
              default: 'var(--h2-shadow-' + shadow.key + ')',
              all: 'var(--h2-shadow-' + shadow.key + '-locked)',
            };
          }
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
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            // prettier-ignore
            duration_variables = duration_variables + '--h2-transition-duration-' + duration.key + '-locked: ' + duration[mode].duration + ';\n';
          }
          // Add the duration to the unique duration variable list
          if (!settings.variables.transition_durations[duration.key]) {
            settings.variables.transition_durations[duration.key] = {
              default: 'var(--h2-transition-duration-' + duration.key + ')',
              all: 'var(--h2-transition-duration-' + duration.key + '-locked)',
            };
          }
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
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            // prettier-ignore
            function_variables = function_variables + '--h2-transition-function-' + t_function.key + '-locked: ' + t_function[mode].function + ';\n';
          }
          if (!settings.variables.transition_functions[t_function.key]) {
            settings.variables.transition_functions[t_function.key] = {
              default: 'var(--h2-transition-function-' + t_function.key + ')',
              all:
                'var(--h2-transition-function-' + t_function.key + '-locked)',
            };
          }
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
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            // prettier-ignore
            delay_variables = delay_variables + '--h2-transition-delay-' + delay.key + '-locked: ' + delay[mode].delay + ';\n';
          }
          if (!settings.variables.transition_delays[delay.key]) {
            settings.variables.transition_delays[delay.key] = {
              default: 'var(--h2-transition-delay-' + delay.key + ')',
              all: 'var(--h2-transition-delay-' + delay.key + '-locked)',
            };
          }
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
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    if (error.step) {
      throw error;
    } else {
      throw {
        step: 'Building theme variables',
        error: error,
      };
    }
  }
}

module.exports = {
  build_theme_variables,
};
