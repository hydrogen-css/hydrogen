// Hydrogen: Validate settings
'use strict';

// Hydrogen type imports
let Settings = require('../../data/settings-model-definition');
/**
 * @typedef {import('../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../data/settings-model-definition').TempLogging} TempLogging
 */
// Hydrogen data imports
let state_data = require('../../data/state-model');
// Hydrogen function imports
const { log_message } = require('../logs/log-message');
// Vendor imports

function validate_input(settings, path) {
  try {
    if (
      !settings.input ||
      !Array.isArray(settings.input) ||
      settings.input.length === 0
    ) {
      throw 'The "input" option in your configuration should be an array containing paths to the input directories that Hydrogen should parse.';
    } else {
      return true;
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Settings validation: input',
      files: path,
    });
    return false;
  }
}

function validate_output(settings, path) {
  try {
    if (!settings.output || typeof settings.output != 'string') {
      throw 'The "output" option in your configuration should be a string that contains the path to the output directory Hydrogen will put its CSS file in.';
    } else {
      return true;
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Settings validation: output',
      files: path,
    });
    return false;
  }
}

function validate_modes(settings, path) {
  try {
    if (settings.modes.dark) {
      if (
        !settings.modes.dark.automatic ||
        typeof settings.modes.dark.automatic != 'boolean'
      ) {
        throw 'The dark mode defined in your configuration requires that "automatic" be set to either true or false.';
      } else {
        if (
          !settings.modes.dark.method ||
          typeof settings.modes.dark.method != 'string' ||
          (settings.modes.dark.method != 'preference' &&
            settings.modes.dark.method != 'toggle')
        ) {
          throw 'The dark mode defined in your configuration requires that "method" be set to either "preference" or "toggle".';
        }
      }
    }
    if (settings.modes.contrast) {
      if (
        !settings.modes.contrast.automatic ||
        typeof settings.modes.contrast.automatic != 'boolean'
      ) {
        throw 'The contrast mode defined in your configuration requires that "automatic" be set to either true or false.';
      } else {
        if (
          !settings.modes.contrast.method ||
          typeof settings.modes.contrast.method != 'string' ||
          (settings.modes.contrast.method != 'preference' &&
            settings.modes.contrast.method != 'toggle')
        ) {
          throw 'The contrast mode defined in your configuration requires that "method" be set to either "preference" or "toggle".';
        }
      }
    }
    return true;
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Settings validation: modes',
      files: path,
    });
    return false;
  }
}

function validate_processing(settings, path) {
  try {
    if (
      settings.processing.minification &&
      typeof settings.processing.minification != 'boolean'
    ) {
      throw 'The "minification" option in the "processing" section of your configuration must either be "true" or "false".';
    }
    if (
      settings.processing.prefixing &&
      typeof settings.processing.prefixing != 'boolean'
    ) {
      throw 'The "prefixing" option in the "processing" section of your configuration must either be "true" or "false".';
    }
    if (
      settings.processing.reset_styles &&
      typeof settings.processing.reset_styles != 'boolean'
    ) {
      throw 'The "reset_styles" option in the "processing" section of your configuration must either be "true" or "false".';
    }
    if (
      settings.processing.var_export &&
      typeof settings.processing.var_export != 'boolean'
    ) {
      throw 'The "var_export" option in the "processing" section of your configuration must either be "true" or "false".';
    }
    return true;
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Settings validation: processing',
      files: path,
    });
    return false;
  }
}

function validate_logging(settings, path) {
  try {
    if (settings.logging.logs && typeof settings.logging.logs != 'boolean') {
      throw 'The "logs" option in the "logging" section of your configuration must either be "true" or "false".';
    }
    if (
      settings.logging.timers &&
      typeof settings.logging.timers != 'boolean'
    ) {
      throw 'The "timers" option in the "logging" section of your configuration must either be "true" or "false".';
    }
    return true;
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Settings validation: logging',
      files: path,
    });
    return false;
  }
}

let modifier_data = ['dark', 'selectors', 'children', 'id', 'class'];
let reserved_data = modifier_data.concat(state_data);
let reserved_string = '';
reserved_data.forEach(function (word, index) {
  if (index === reserved_data.length - 1) {
    reserved_string = reserved_string + word;
  } else {
    reserved_string = reserved_string + word + ', ';
  }
});

function validate_media(settings, path) {
  try {
    if (settings.media.base_key) {
      let key = settings.media.base_key;
      if (typeof key != 'string') {
        throw 'The "base_key" option in the "media" section of your configuration must be a string.';
      }
      if (/\s/g.test(key) || key.includes('.')) {
        throw 'The "base_key" option in the "media" section of your configuration can\'t contain spaces or periods.';
      }
      reserved_data.forEach(function (word) {
        if (key === word) {
          throw (
            'The "base_key" option in the "media" section of your configuration is using a reserved state modifier word. Media keys can\'t be any of the following: ' +
            reserved_string +
            '.'
          );
        }
      });
      if (settings.media.queries) {
        settings.media.queries.forEach(function (query) {
          if (query.key && query.key === key) {
            throw 'One or more "key" options in the "queries" definition in the "media" section of your configuration are using the same value as their "key". All media keys must be unique.';
          }
          if (query.key.endsWith(key)) {
            throw 'Due to the nature of wildcard attribute selectors, "key" options in the "queries" definition in the "media" section of your configuration cannot end in the same string as another. A media key ends with the same string as another query definition\'s "key" value.';
          }
        });
      }
    }
    if (settings.media.queries) {
      let queries = settings.media.queries;
      if (queries.length > 0) {
        queries.forEach(function (query, index) {
          // Create an array for duplicate checking
          let unique = queries.slice();
          unique.splice(index, 1);
          // Media keys
          if (typeof query.key != 'string') {
            throw 'A "key" option in a "queries" definition in the "media" section of your configuration must be a string.';
          }
          if (/\s/g.test(query.key) || query.key.includes('.')) {
            throw 'A "key" option in a "queries" definition in the "media" section of your configuration can\'t contain spaces or periods.';
          }
          if (settings.media.base_key) {
            if (settings.media.base_key === query.key) {
              throw 'A "key" option in a "queries" definition in the "media" section of your configuration is using the same value as your "base_key". All media keys must be unique.';
            }
            if (settings.media.base_key.endsWith(query.key)) {
              throw 'Due to the nature of wildcard attribute selectors, "key" options in the "queries" definition in the "media" section of your configuration cannot end in the same string as another. A media key ends with the same string used as your "base_key" option.';
            }
          }
          reserved_data.forEach(function (word) {
            if (word === query.key) {
              throw (
                'A "key" option in a "queries" definition in the "media" section of your configuration is using a reserved state modifier word. Media keys can\'t be any of the following: ' +
                reserved_string +
                '.'
              );
            }
          });
          unique.forEach(function (other) {
            if (other.key && other.key === query.key) {
              throw 'One or more "key" options in the "queries" definition in the "media" section of your configuration are using the same value as their "key". All media keys must be unique.';
            }
            if (other.key.endsWith(query.key)) {
              throw 'Due to the nature of wildcard attribute selectors, "key" options in the "queries" definition in the "media" section of your configuration cannot end in the same string as another. A media key ends with the same string as another query definition\'s "key" value.';
            }
          });
          // Media queries
          if (
            !query.query ||
            typeof query.query != 'string' ||
            query.query === 'base'
          ) {
            throw 'The "query" option in the "queries" definition in the "media" section of your configuration must be a string and a valid CSS media query value (e.g. screen and (min-width: 48em))';
          }
          unique.forEach(function (other) {
            if (other.query && other.query === query.query) {
              throw 'One or more "query" options in the "queries" definition in the "media" section of your configuration are using the same value. All media query values must be unique.';
            }
          });
        });
      }
    }
    return true;
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Settings validation: media',
      files: path,
    });
    return false;
  }
}

let modes = ['default', 'dark', 'all', 'contrast'];

function validate_theme_property(theme, prop_model, parent, path) {
  try {
    let property;
    if (theme[prop_model.property]) {
      property = theme[prop_model.property];
    } else if (parent && theme[parent][prop_model.property]) {
      property = theme[parent][prop_model.property];
    }
    if (property && Array.isArray(property) && property.length > 0) {
      property.forEach(function (prop_definition, index) {
        // Property key
        if (!prop_definition.key || typeof prop_definition.key != 'string') {
          throw (
            'A ' +
            prop_model.property +
            ' property definition is missing a key value. Key values must be a unique string.'
          );
        }
        // Color-specific property key - doesn't use a reserved color modifier
        const color_modifiers = [
          'light',
          'lighter',
          'lightest',
          'dark',
          'darker',
          'darkest',
        ];
        if (prop_model.property === 'colors') {
          color_modifiers.forEach(function (reserved_key) {
            if (reserved_key === prop_definition.key) {
              // prettier-ignore
              throw 'A ' + prop_model.property + ' property key is using a reserved color modifier as a key value.';
            }
          });
        }
        // Property key - isn't just numbers
        if (/^\d+$/.test(prop_definition.key)) {
          // prettier-ignore
          throw 'A ' + prop_model.property + ' property key is using only numbers. Keys must use letters.';
        }
        // Property key - check for spaces, periods
        if (
          /\s/g.test(prop_definition.key) ||
          prop_definition.key.includes('.')
        ) {
          throw (
            'A ' +
            prop_model.property +
            ' property key contains a space or period.'
          );
        }
        // Property key - doesn't match other keys for this property
        let remaining = property.slice();
        remaining.splice(index, 1);
        remaining.forEach(function (option) {
          if (option.key && option.key === prop_definition.key) {
            throw (
              'Two or more ' +
              prop_model.property +
              ' property keys are the same. Keys must be unique.'
            );
          }
        });
        // Property modes - the default settings exist
        if (
          !prop_definition.default ||
          typeof prop_definition.default != 'object'
        ) {
          throw (
            'The ' +
            prop_definition.key +
            ' definition in the ' +
            prop_model.property +
            ' section of your configuration is missing a "default" mode definition. While dark mode is optional, all properties must have default values.'
          );
        }
        // Property modes - remaining modes exist and are the correct type
        modes.forEach(function (mode) {
          if (
            prop_definition[mode] &&
            typeof prop_definition[mode] != 'object'
          ) {
            throw (
              'The ' +
              prop_definition.key +
              ' definition in the ' +
              prop_model.property +
              ' section of your configuration has a "' +
              mode +
              "\" definition that isn't an object. All mode definitions must be an object containing the property's configurable options."
            );
          } else if (prop_definition[mode]) {
            // Property modes - contain the required configurations and that they're the correct type
            prop_model.options.forEach(function (option_model) {
              if (
                prop_definition[mode][option_model.name] &&
                typeof prop_definition[mode][option_model.name] !=
                  option_model.type
              ) {
                throw (
                  'All ' +
                  prop_definition[mode][option_model.name] +
                  ' values defined in your ' +
                  prop_model.property +
                  ' configuration must a ' +
                  option_model.type +
                  ' value.'
                );
              }
            });
            // Color-specific modifiers
            if (prop_model.property === 'colors') {
              if (
                prop_definition[mode].modifiers &&
                Array.isArray(prop_definition[mode].modifiers)
              ) {
                if (prop_definition[mode].modifiers.length > 0) {
                  prop_definition[mode].modifiers.forEach(function (
                    modifier_setting
                  ) {
                    // Modifier key - exists and is the correct type
                    if (!modifier_setting.key) {
                      // prettier-ignore
                      throw 'Color modifier definitions require a unique "key" value.'
                    } else if (typeof modifier_setting.color != 'string') {
                      // prettier-ignore
                      throw 'Color modifier "key" definitions must be a unique string value.'
                    } else {
                      // Modifier key - doesn't match this or other color keys
                      if (modifier_setting.key === prop_definition.key) {
                        // prettier-ignore
                        throw 'Color modifier "key" definitions cannot use the same value as their parent color\'s "key" value.'
                      }
                      // Modifier key - doesn't match other modifiers for this color
                      if (
                        theme.colors &&
                        Array.isArray(theme.colors) &&
                        theme.colors.length > 0
                      ) {
                        theme.colors.forEach(function (other_color) {
                          if (other_color.key) {
                            if (other_color.key === modifier_setting.key) {
                              // prettier-ignore
                              throw 'Color modifier "key" definitions cannot use the same value as other color definition "key" values.'
                            }
                          }
                        });
                      }
                      // Modifier key - isn't just numbers
                      if (/^\d+$/.test(modifier_setting.key)) {
                        // prettier-ignore
                        throw 'Color modifier "key" values cannot exclusively use numbers. They must contain at least one letter.'
                      }
                      // Modifier key - doesn't contain spaces or periods
                      if (
                        /\s/g.test(modifier_setting.key) ||
                        modifier_setting.key.includes('.')
                      ) {
                        // prettier-ignore
                        throw 'Color modifier "key" values cannot contain spaces or periods.'
                      }
                      // Modifier color - exists and is the correct type
                      if (!modifier_setting.color) {
                        // prettier-ignore
                        throw 'Color modifier definitions require a "color" value.'
                      } else if (typeof modifier_setting.color != 'string') {
                        // prettier-ignore
                        throw 'Color modifier "color" definitions must be a string containing a CSS color value.';
                      }
                    }
                  });
                }
              }
            }
          }
        });
      });
    }
    return true;
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Settings validation: themes',
      files: path,
    });
    return false;
  }
}

function validate_theme(settings, theme, path) {
  try {
    // Theme key - checks for proper type
    if (!theme.key || typeof theme.key != 'string') {
      throw 'Theme keys must be strings.';
    }
    // Theme key - checks for reserved words
    reserved_data.forEach(function (word) {
      if (word === theme.key) {
        throw 'A theme key is using a reserved word.';
      }
    });
    // Theme key - checks for spaces and periods
    if (/\s/g.test(theme.key) || theme.key.includes('.')) {
      throw 'A theme key contains a space or period.';
    }
    // Theme key - checks for matching base query key
    if (
      settings.media &&
      settings.media.base_key &&
      settings.media.base_key === theme.key
    ) {
      throw 'A theme key is using the same name as the base_query definition in the media settings.';
    }
    // Theme key - checks for matching media query keys
    if (
      settings.media &&
      settings.media.queries &&
      settings.media.queries.length > 0
    ) {
      settings.media.queries.forEach(function (query) {
        if (query.key && query.key === theme.key) {
          throw 'A theme key is using the same name as a media query key in the media settings.';
        }
      });
    }
    // Typography
    if (
      theme.key === 'default' &&
      (!theme.typography ||
        !Array.isArray(theme.typography) ||
        theme.typography.length === 0)
    ) {
      throw 'The default theme must contain at least one typography configuration.';
    }
    if (theme.typography && !Array.isArray(theme.typography)) {
      throw 'Typography configurations must be an array of typography objects.';
    }
    if (
      theme.typography &&
      Array.isArray(theme.typography) &&
      theme.typography.length > 0
    ) {
      theme.typography.forEach(function (type_setting, index) {
        // key
        if (
          !type_setting.query_key ||
          typeof type_setting.query_key != 'string'
        ) {
          throw 'Typography query_key values must be a string.';
        } else {
          // Matches the base_query or a media query
          let match = false;
          if (
            settings.media &&
            settings.media.base_key &&
            settings.media.base_key === type_setting.query_key
          ) {
            match = true;
          }
          if (
            (!settings.media || (settings.media && !settings.media.base_key)) &&
            type_setting.query_key === 'base'
          ) {
            match = true;
          }
          // Theme key - checks for matching media query keys
          if (
            settings.media &&
            settings.media.queries &&
            settings.media.queries.length > 0
          ) {
            settings.media.queries.forEach(function (query) {
              if (query.key && query.key === type_setting.query_key) {
                match = true;
              }
            });
          }
          if (!match) {
            throw 'Typography query_key values must match either your base_query key or one of your media query keys.';
          }
          // Periods, spaces
          if (
            /\s/g.test(type_setting.query_key) ||
            type_setting.query_key.includes('.')
          ) {
            throw 'A typography query_key value contains a space or period.';
          }
          // Duplicates
          let remaining = theme.typography.slice();
          remaining.splice(index, 1);
          remaining.forEach(function (option) {
            if (
              option.query_key &&
              option.query_key === type_setting.query_key
            ) {
              throw 'Two or more typography query_key values are using the same name. Typography query_key values must be unique.';
            }
          });
        }
        // size
        if (!type_setting.size || typeof type_setting.size != 'string') {
          throw 'Typography definitions must contain a size configuration.';
        }
        // line height
        if (
          !type_setting.line_height ||
          typeof type_setting.line_height != 'string'
        ) {
          throw 'Typography definitions must contain a line_height configuration.';
        }
        // type scale
        if (
          !type_setting.type_scale ||
          typeof type_setting.type_scale != 'string'
        ) {
          throw 'Typography settings must contain a type_scale configuration.';
        }
      });
    }
    // Colors, containers, fonts, gradients, radii, shadows
    const config_data = [
      {
        property: 'colors',
        options: [
          {
            name: 'color',
            type: 'string',
          },
        ],
      },
      {
        property: 'containers',
        options: [
          {
            name: 'max_width',
            type: 'string',
          },
        ],
      },
      {
        property: 'fonts',
        options: [
          {
            name: 'family',
            type: 'string',
          },
        ],
      },
      {
        property: 'gradients',
        options: [
          {
            name: 'gradient',
            type: 'string',
          },
          {
            name: 'fallback',
            type: 'string',
          },
        ],
      },
      {
        property: 'radii',
        options: [
          {
            name: 'radius',
            type: 'string',
          },
        ],
      },
      {
        property: 'shadows',
        options: [
          {
            name: 'shadow',
            type: 'string',
          },
        ],
      },
    ];
    config_data.forEach(function (prop_to_test) {
      let test = validate_theme_property(theme, prop_to_test, null, path);
      if (!test) {
        return false;
      }
    });
    // Transitions
    if (theme.transitions) {
      if (typeof theme.transitions != 'object') {
        // prettier-ignore
        throw 'The "transitions" definition in your theme must be an object that can optionally contain "durations", "functions", and/or "delays".'
      } else {
        const transition_config_data = [
          {
            property: 'durations',
            options: [
              {
                name: 'duration',
                type: 'string',
              },
            ],
          },
          {
            property: 'functions',
            options: [
              {
                name: 'function',
                type: 'string',
              },
            ],
          },
          {
            property: 'delays',
            options: [
              {
                name: 'delay',
                type: 'string',
              },
            ],
          },
        ];
        transition_config_data.forEach(function (prop_to_test) {
          let test = validate_theme_property(
            theme,
            prop_to_test,
            'transitions',
            path
          );
          if (!test) {
            return false;
          }
        });
      }
    }
    return true;
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Settings validation: themes',
      files: path,
    });
    return false;
  }
}

/**
 * Runs the main settings validation
 * @param {Settings} settings
 * @param {TempLogging} temp_logging
 * @returns {Promise<Settings>}
 */
function validate_configuration(settings, temp_logging) {
  return new Promise((resolve, reject) => {
    try {
      let path = [settings.config.path];
      let valid = true;
      if (!settings) {
        reject({
          type: 'error',
          settings: temp_logging,
          step: 'Settings validation',
          message: "The settings object doesn't exist and is required.",
        });
      } else {
        if (typeof settings != 'object') {
          reject({
            type: 'error',
            settings: temp_logging,
            step: 'Settings validation',
            message: 'Settings must be an object.',
          });
        } else {
          if (validate_input(settings, path) === false) {
            valid = false;
          }
          if (validate_output(settings, path) === false) {
            valid = false;
          }
          if (settings.modes) {
            if (validate_modes(settings, path) === false) {
              valid = false;
            }
          }
          if (settings.processing) {
            if (validate_processing(settings, path) === false) {
              valid = false;
            }
          }
          if (settings.logging) {
            if (validate_logging(settings, path) === false) {
              valid = false;
            }
          }
          if (settings.media) {
            if (validate_media(settings, path) === false) {
              valid = false;
            }
          }
          if (settings.themes) {
            if (
              !Array.isArray(settings.themes) ||
              settings.themes.length === 0
            ) {
              reject({
                type: 'error',
                settings: temp_logging,
                step: 'Settings validation',
                message:
                  'The "themes" setting in your configuration must be an array containing at least one default theme object.',
              });
            } else {
              // Check for a default theme
              let state = false;
              settings.themes.forEach(function (theme) {
                // Theme key - checks for the existence of a default theme
                if (
                  theme.key &&
                  typeof theme.key === 'string' &&
                  (theme.key === 'default' || theme.key == null)
                ) {
                  state = true;
                }
              });
              if (!state) {
                reject({
                  type: 'error',
                  settings: temp_logging,
                  step: 'Settings validation',
                  message:
                    'Your Hydrogen settings are missing a default theme. At least one theme must be defined before compiling.',
                });
              }
              // Validate themes
              settings.themes.forEach(function (theme) {
                let test = validate_theme(settings, theme, path);
                if (!test) {
                  valid = false;
                }
              });
            }
          }
          if (!valid) {
            reject({
              type: 'error',
              settings: temp_logging,
              step: 'Settings validation',
            });
          } else {
            resolve(settings);
          }
        }
      }
    } catch (error) {
      reject({
        type: 'error',
        settings: temp_logging,
        step: 'Settings validation',
        error: error,
      });
    }
  });
}

module.exports = {
  validate_configuration,
};
