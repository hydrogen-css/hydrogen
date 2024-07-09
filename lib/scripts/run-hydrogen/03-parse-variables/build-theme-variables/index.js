// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/config-data').ParsedConfig} ParsedConfig
 */

// Data imports

// Local functions
const { generate_type_units } = require('../generate-type-units');
const { process_color_variable } = require('./process-color-variable');

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Takes a theme and mode and builds variables that are applied to the theme object, as well as returns a string for CSS use.
 *
 * @param {ParsedConfig} settings
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
        root_start = '\n@media screen and (prefers-color-scheme: dark) {\n:root{\n';
        root_close = '}\n}';
      } else if (settings.modes.method === 'toggle') {
        root_start = '\n[data-h2*="dark"]{\n';
        root_close = '}';
      }
    } else if (theme != 'default' && mode === 'default') {
      root_start = '\n[data-h2*="' + theme + '"]{\n';
      root_close = '}';
    } else if (theme != 'default' && mode === 'dark') {
      if (settings.modes.method === 'preference') {
        root_start =
          '\n@media screen and (prefers-color-scheme: dark) {\n [data-h2*="' + theme + '"]{\n';
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
    let font_weights = '';
    let gradients = '';
    let radii = '';
    let shadows = '';
    let transition_durations = '';
    let transition_functions = '';
    let transition_delays = '';
    let wrappers = '';
    // Build the root core units
    if (mode === 'default') {
      if (settings.themes[theme].typography && settings.themes[theme].typography.length > 0) {
        settings.themes[theme].typography.forEach(function (type) {
          // Because we only want to apply the CSS type variables on the base query in this context, we need to check against the type setting's query value - while the user can set whatever query key they want, during the settings parsing, the equivalent query value is always set to "base", and so we can always check for "base" as a value here
          if (type.query === 'base') {
            // Generate the core rhythm units and typography variables
            let generated_type_units = generate_type_units(settings, type);
            // Add the units and variables to the relevant typography strings
            units = generated_type_units.type_units;
            typography = generated_type_units.type_vars;
          }
        });
      }
    }
    // Colors
    if (settings.themes[theme].colors && settings.themes[theme].colors.length > 0) {
      colors = colors + '/* Colors */\n';
      settings.themes[theme].colors.forEach(function (color) {
        if (color[mode] && color[mode].color) {
          colors = colors + process_color_variable(settings, color, mode);
        }
      });
    }
    // Containers
    if (settings.themes[theme].containers && settings.themes[theme].containers.length > 0) {
      containers = containers + '/* Container widths */\n';
      settings.themes[theme].containers.forEach(function (container) {
        if (container[mode] && container[mode].max_width) {
          let container_variables =
            '--h2-container-' + container.key + ': ' + container[mode].max_width + ';\n';
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            container_variables =
              container_variables +
              '--h2-container-' +
              container.key +
              '-locked: ' +
              container[mode].max_width +
              ';\n';
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
    if (settings.themes[theme].fonts && settings.themes[theme].fonts.length > 0) {
      fonts = fonts + '/* Font families */\n';
      settings.themes[theme].fonts.forEach(function (font) {
        if (font[mode] && font[mode].family) {
          let font_variables = '--h2-font-family-' + font.key + ': ' + font[mode].family + ';\n';
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            font_variables =
              font_variables +
              '--h2-font-family-' +
              font.key +
              '-locked: ' +
              font[mode].family +
              ';\n';
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
    // Font weights
    if (settings.themes[theme].font_weights && settings.themes[theme].font_weights.length > 0) {
      font_weights = font_weights + '/* Font weights */\n';
      settings.themes[theme].font_weights.forEach(function (weight) {
        if (weight[mode] && weight[mode].weight) {
          let weight_variables =
            '--h2-font-weight-' + weight.key + ': ' + weight[mode].weight + ';\n';
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            weight_variables =
              weight_variables +
              '--h2-font-weight-' +
              weight.key +
              '-locked: ' +
              weight[mode].weight +
              ';\n';
          }
          // Add the font to the unique font variable list
          if (!settings.variables.font_weights[weight.key]) {
            settings.variables.font_weights[weight.key] = {
              default: 'var(--h2-font-weight-' + weight.key + ')',
              all: 'var(--h2-font-weight-' + weight.key + '-locked)',
            };
          }
          font_weights = font_weights + weight_variables;
        }
      });
    }
    // Gradients
    if (settings.themes[theme].gradients && settings.themes[theme].gradients.length > 0) {
      gradients = gradients + '/* Gradients */\n';
      settings.themes[theme].gradients.forEach(function (gradient) {
        if (gradient[mode] && gradient[mode].gradient) {
          let gradient_variables =
            '--h2-gradient-' + gradient.key + ': ' + gradient[mode].gradient + ';\n';
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
    if (settings.themes[theme].radii && settings.themes[theme].radii.length > 0) {
      radii = radii + '/* Radii */\n';
      settings.themes[theme].radii.forEach(function (radius) {
        if (radius[mode] && radius[mode].radius) {
          let radius_variables = '--h2-radius-' + radius.key + ': ' + radius[mode].radius + ';\n';
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            radius_variables =
              radius_variables +
              '--h2-radius-' +
              radius.key +
              '-locked: ' +
              radius[mode].radius +
              ';\n';
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
    if (settings.themes[theme].shadows && settings.themes[theme].shadows.length > 0) {
      shadows = shadows + '/* Shadows */\n';
      settings.themes[theme].shadows.forEach(function (shadow) {
        if (shadow[mode] && shadow[mode].shadow) {
          let shadow_variables = '--h2-shadow-' + shadow.key + ': ' + shadow[mode].shadow + ';\n';
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            shadow_variables =
              shadow_variables +
              '--h2-shadow-' +
              shadow.key +
              '-locked: ' +
              shadow[mode].shadow +
              ';\n';
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
      transition_durations = transition_durations + '/* Transitions / Durations */\n';
      settings.themes[theme].transitions.durations.forEach(function (duration) {
        if (duration[mode] && duration[mode].duration) {
          let duration_variables =
            '--h2-transition-duration-' + duration.key + ': ' + duration[mode].duration + ';\n';
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            duration_variables =
              duration_variables +
              '--h2-transition-duration-' +
              duration.key +
              '-locked: ' +
              duration[mode].duration +
              ';\n';
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
      transition_functions = transition_functions + '/* Transitions / Functions */\n';
      settings.themes[theme].transitions.functions.forEach(function (t_function) {
        if (t_function[mode] && t_function[mode].function) {
          let function_variables =
            '--h2-transition-function-' + t_function.key + ': ' + t_function[mode].function + ';\n';
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            function_variables =
              function_variables +
              '--h2-transition-function-' +
              t_function.key +
              '-locked: ' +
              t_function[mode].function +
              ';\n';
          }
          if (!settings.variables.transition_functions[t_function.key]) {
            settings.variables.transition_functions[t_function.key] = {
              default: 'var(--h2-transition-function-' + t_function.key + ')',
              all: 'var(--h2-transition-function-' + t_function.key + '-locked)',
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
          let delay_variables =
            '--h2-transition-delay-' + delay.key + ': ' + delay[mode].delay + ';\n';
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            delay_variables =
              delay_variables +
              '--h2-transition-delay-' +
              delay.key +
              '-locked: ' +
              delay[mode].delay +
              ';\n';
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
    // 2.0.6: Wrappers are replacing containers in order to properly support container CSS properties
    if (settings.themes[theme].wrappers && settings.themes[theme].wrappers.length > 0) {
      wrappers = wrappers + '/* Wrapper widths */\n';
      settings.themes[theme].wrappers.forEach(function (wrapper) {
        if (wrapper[mode] && wrapper[mode].max_width) {
          let wrapper_variables =
            '--h2-wrapper-' + wrapper.key + ': ' + wrapper[mode].max_width + ';\n';
          // Add a locked value for use with the :all mode modifier
          if (mode === 'default') {
            wrapper_variables =
              wrapper_variables +
              '--h2-wrapper-' +
              wrapper.key +
              '-locked: ' +
              wrapper[mode].max_width +
              ';\n';
          }
          // Add the wrapper to the unique wrapper variable list
          if (!settings.variables.wrappers[wrapper.key]) {
            settings.variables.wrappers[wrapper.key] = {
              default: 'var(--h2-wrapper-' + wrapper.key + ')',
              all: 'var(--h2-wrapper-' + wrapper.key + '-locked)',
            };
          }
          wrappers = wrappers + wrapper_variables;
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
      font_weights +
      typography +
      gradients +
      radii +
      shadows +
      transition_durations +
      transition_functions +
      transition_delays +
      wrappers +
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
