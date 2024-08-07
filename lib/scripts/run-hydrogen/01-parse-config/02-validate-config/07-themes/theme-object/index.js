// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../../data/config-data').Theme} Theme
 */

// Data imports
const { get_reserved_words } = require('../../../../../../data/reserved-words-data');

// Local functions
const { validate_theme_property } = require('./theme-property');

/**
 * Validates the user's individual themes.
 * @param {Config} defaults
 * @param {Config} settings
 * @param {Theme} theme
 * @returns {boolean}
 */
function validate_theme(defaults, settings, theme) {
  try {
    let errors = [];
    let reserved_data = get_reserved_words();
    // Theme key - checks for proper type
    if (!theme.key || typeof theme.key != 'string') {
      errors = errors.concat(new Error('Theme keys must be strings.'));
    } else {
      // Theme key - checks for reserved words
      reserved_data.forEach(function (word) {
        if (word === theme.key) {
          errors = errors.concat(new Error('A theme key is using a reserved word.'));
        }
      });
      // Theme key - checks for spaces and periods
      if (/\s/g.test(theme.key) || theme.key.includes('.')) {
        errors = errors.concat(new Error('A theme key contains a space or period.'));
      }
      // Theme key - checks for matching base query key
      if (settings.media && settings.media.base_key && settings.media.base_key === theme.key) {
        errors = errors.concat(
          new Error(
            'A theme key is using the same name as the base_query definition in the media settings.'
          )
        );
      }
      // Theme key - checks for matching media query keys
      if (settings.media && settings.media.queries && settings.media.queries.length > 0) {
        settings.media.queries.forEach(function (query) {
          if (query.key && query.key === theme.key) {
            errors = errors.concat(
              new Error(
                'A theme key is using the same name as a media query key in the media settings.'
              )
            );
          }
        });
      }
      // Typography
      if (
        theme.key === 'default' &&
        (!theme.typography || !Array.isArray(theme.typography) || theme.typography.length === 0)
      ) {
        errors = errors.concat(
          new Error('The default theme must contain at least one typography configuration.')
        );
      }
      if (theme.typography && !Array.isArray(theme.typography)) {
        errors = errors.concat(
          new Error('Typography configurations must be an array of typography objects.')
        );
      }
      if (theme.typography && Array.isArray(theme.typography) && theme.typography.length > 0) {
        theme.typography.forEach(function (type_setting, index) {
          // key
          if (!type_setting.query_key || typeof type_setting.query_key != 'string') {
            errors = errors.concat(new Error('Typography query_key values must be a string.'));
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
            if (settings.media && settings.media.queries && settings.media.queries.length > 0) {
              settings.media.queries.forEach(function (query) {
                if (query.key && query.key === type_setting.query_key) {
                  match = true;
                }
              });
            }
            if (!match) {
              errors = errors.concat(
                new Error(
                  'Typography query_key values must match either your base_query key or one of your media query keys.'
                )
              );
            }
            // Periods, spaces
            if (/\s/g.test(type_setting.query_key) || type_setting.query_key.includes('.')) {
              errors = errors.concat(
                new Error('A typography query_key value contains a space or period.')
              );
            }
            // Duplicates
            let remaining = theme.typography.slice();
            remaining.splice(index, 1);
            remaining.forEach(function (option) {
              if (option.query_key && option.query_key === type_setting.query_key) {
                errors = errors.concat(
                  new Error(
                    'Two or more typography query_key values are using the same name. Typography query_key values must be unique.'
                  )
                );
              }
            });
          }
          // size
          if (!type_setting.size || typeof type_setting.size != 'string') {
            errors = errors.concat(
              new Error('Typography definitions must contain a size configuration.')
            );
          }
          // type scale
          if (!type_setting.type_scale || typeof type_setting.type_scale != 'string') {
            errors = errors.concat(
              new Error('Typography settings must contain a type_scale configuration.')
            );
          }
          // line heights / line height
          if (type_setting.line_heights) {
            let heights = type_setting.line_heights;
            if (typeof heights === 'object') {
              let options = {
                caption: 'string',
                copy: 'string',
                body: 'string',
                h6: 'string',
                h5: 'string',
                h4: 'string',
                h3: 'string',
                h2: 'string',
                h1: 'string',
                display: 'string',
              };
              Object.keys(heights).forEach((scale) => {
                let valid = false;
                Object.keys(options).forEach((option) => {
                  if (scale === option) {
                    valid = true;
                  }
                });
                if (!valid) {
                  errors = errors.concat(
                    new Error(
                      '"' +
                        scale +
                        '" is not a valid typography "line_heights" setting. Available options include "caption", "copy", "h6", "h5", "h4", "h3", "h2", "h1", and "display".'
                    )
                  );
                } else {
                  if (typeof heights[scale] != options[scale]) {
                    errors = errors.concat(
                      new Error(
                        'The "' +
                          scale +
                          '" typography "line_heights" configuration must be set to "auto" or a string containing a decimal value.'
                      )
                    );
                  }
                }
              });
            } else {
              errors = errors.concat(
                new Error(
                  'The "line_heights" typography configuration must be an object containing one or more of the following settings: "caption", "copy", "h6", "h5", "h4", "h3", "h2", "h1", and "display".'
                )
              );
            }
          } else if (type_setting.line_height) {
            if (typeof type_setting.line_height != 'string') {
              errors = errors.concat(
                new Error(
                  'The deprecated "line_height" typography configuration must be a string containing a decimal value.'
                )
              );
            }
          } else if (!type_setting.line_heights && !type_setting.line_height) {
            errors = errors.concat(
              new Error('Typography definitions must contain a line_heights configuration.')
            );
          }
        });
      }
      // Colors, containers/wrappers, fonts, weights, gradients, radii, shadows
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
          property: 'font_weights',
          options: [
            {
              name: 'weight',
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
        {
          property: 'wrappers',
          options: [
            {
              name: 'max_width',
              type: 'string',
            },
          ],
        },
      ];
      config_data.forEach(function (prop_to_test) {
        try {
          validate_theme_property(defaults, settings, theme, prop_to_test, null);
        } catch (error) {
          error.errors.forEach((i) => {
            errors = errors.concat(i);
          });
        }
      });
      // Transitions
      if (theme.transitions) {
        if (typeof theme.transitions != 'object') {
          errors = errors.concat(
            new Error(
              'The "transitions" definition in your theme must be an object that can optionally contain "durations", "functions", and/or "delays".'
            )
          );
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
            try {
              validate_theme_property(defaults, settings, theme, prop_to_test, 'transitions');
            } catch (error) {
              error.errors.forEach((i) => {
                errors = errors.concat(i);
              });
            }
          });
        }
      }
    }
    if (errors.length === 0) {
      return true;
    } else {
      throw errors;
    }
  } catch (error) {
    if (process.env.H2DEBUG) {
      console.log(error);
    }
    throw {
      step: 'Validating theme configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_theme,
};
