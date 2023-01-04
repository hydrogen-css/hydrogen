// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../../data/settings-model-definition').Theme} Theme
 */

// Data imports

// Logging

// Functions
const { validate_theme_property } = require('./validate-theme-property');

// Vendor imports

// Script
/**
 * Validates the user's individual themes
 * @param {Settings} settings
 * @param {Theme} theme
 * @returns {boolean}
 */
function validate_theme(settings, theme) {
  try {
    let errors = [];
    // Theme key - checks for proper type
    if (!theme.key || typeof theme.key != 'string') {
      errors = errors.concat(new Error('Theme keys must be strings.'));
    } else {
      // Theme key - checks for reserved words
      reserved_data.forEach(function (word) {
        if (word === theme.key) {
          errors = errors.concat(
            new Error('A theme key is using a reserved word.')
          );
        }
      });
      // Theme key - checks for spaces and periods
      if (/\s/g.test(theme.key) || theme.key.includes('.')) {
        errors = errors.concat(
          new Error('A theme key contains a space or period.')
        );
      }
      // Theme key - checks for matching base query key
      if (
        settings.media &&
        settings.media.base_key &&
        settings.media.base_key === theme.key
      ) {
        errors = errors.concat(
          new Error(
            'A theme key is using the same name as the base_query definition in the media settings.'
          )
        );
      }
      // Theme key - checks for matching media query keys
      if (
        settings.media &&
        settings.media.queries &&
        settings.media.queries.length > 0
      ) {
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
        (!theme.typography ||
          !Array.isArray(theme.typography) ||
          theme.typography.length === 0)
      ) {
        errors = errors.concat(
          new Error(
            'The default theme must contain at least one typography configuration.'
          )
        );
      }
      if (theme.typography && !Array.isArray(theme.typography)) {
        errors = errors.concat(
          new Error(
            'Typography configurations must be an array of typography objects.'
          )
        );
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
            errors = errors.concat(
              new Error('Typography query_key values must be a string.')
            );
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
              (!settings.media ||
                (settings.media && !settings.media.base_key)) &&
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
              errors = errors.concat(
                new Error(
                  'Typography query_key values must match either your base_query key or one of your media query keys.'
                )
              );
            }
            // Periods, spaces
            if (
              /\s/g.test(type_setting.query_key) ||
              type_setting.query_key.includes('.')
            ) {
              errors = errors.concat(
                new Error(
                  'A typography query_key value contains a space or period.'
                )
              );
            }
            // Duplicates
            let remaining = theme.typography.slice();
            remaining.splice(index, 1);
            remaining.forEach(function (option) {
              if (
                option.query_key &&
                option.query_key === type_setting.query_key
              ) {
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
              new Error(
                'Typography definitions must contain a size configuration.'
              )
            );
          }
          // line height
          if (
            !type_setting.line_height ||
            typeof type_setting.line_height != 'string'
          ) {
            errors = errors.concat(
              new Error(
                'Typography definitions must contain a line_height configuration.'
              )
            );
          }
          // type scale
          if (
            !type_setting.type_scale ||
            typeof type_setting.type_scale != 'string'
          ) {
            errors = errors.concat(
              new Error(
                'Typography settings must contain a type_scale configuration.'
              )
            );
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
        try {
          validate_theme_property(theme, prop_to_test, null);
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
              validate_theme_property(theme, prop_to_test, 'transitions');
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
    throw {
      step: 'Validating theme configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_theme,
};
