// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../../../../data/config-data').Config} Config
 * @typedef {import('../../../../../../../data/config-data').Theme} Theme
 */
/**
 * @typedef {{property: string, options: Option[]}} Property
 * @typedef {{name: string, type: string}} Option
 */

// Data imports
const { get_reserved_words } = require('../../../../../../../data/reserved-words-data');
const { get_reserved_mode_data } = require('../../../../../../../data/default-mode-data');

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Validates individual theme properties in a user's theme settings.
 *
 * @param {Theme} theme
 * @param {Property} prop_model
 * @param {string | null} parent
 * @returns {boolean}
 */
function validate_theme_property(theme, prop_model, parent) {
  try {
    let errors = [];
    let modes = get_reserved_mode_data();
    let reserved_words = get_reserved_words();
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
          errors = errors.concat(
            new Error(
              'A ' +
                prop_model.property +
                ' property definition is missing a key value. Key values must be a unique string.'
            )
          );
        }
        // Color-specific property key - doesn't use a reserved color modifier
        if (prop_model.property === 'colors') {
          reserved_words.forEach(function (reserved_key) {
            if (reserved_key === prop_definition.key) {
              errors = errors.concat([
                new Error(
                  'A ' +
                    prop_model.property +
                    ' property key is using a reserved word as a key value.'
                ),
              ]);
            }
          });
        }
        // Property key - isn't just numbers
        if (/^\d+$/.test(prop_definition.key)) {
          errors = errors.concat([
            new Error(
              'A ' +
                prop_model.property +
                ' property key is using only numbers. Keys must use letters.'
            ),
          ]);
        }
        // Property key - check for spaces, periods
        if (/\s/g.test(prop_definition.key) || prop_definition.key.includes('.')) {
          errors = errors.concat([
            new Error('A ' + prop_model.property + ' property key contains a space or period.'),
          ]);
        }
        // Property key - doesn't match other keys for this property
        let remaining = property.slice();
        remaining.splice(index, 1);
        remaining.forEach(function (option) {
          if (option.key && option.key === prop_definition.key) {
            errors = errors.concat([
              new Error(
                'Two or more ' +
                  prop_model.property +
                  ' property keys are the same. Keys must be unique.'
              ),
            ]);
          }
        });
        // Property modes - the default settings exist
        if (!prop_definition.default || typeof prop_definition.default != 'object') {
          errors = errors.concat([
            new Error(
              'The ' +
                prop_definition.key +
                ' definition in the ' +
                prop_model.property +
                ' section of your configuration is missing a "default" mode definition. While dark mode is optional, all properties must have default values.'
            ),
          ]);
        }
        // Property modes - remaining modes exist and are the correct type
        modes.forEach(function (mode) {
          if (prop_definition[mode] && typeof prop_definition[mode] != 'object') {
            errors = errors.concat([
              new Error(
                'The ' +
                  prop_definition.key +
                  ' definition in the ' +
                  prop_model.property +
                  ' section of your configuration has a "' +
                  mode +
                  "\" definition that isn't an object. All mode definitions must be an object containing the property's configurable options."
              ),
            ]);
          } else if (prop_definition[mode]) {
            // Property modes - contain the required configurations and that they're the correct type
            prop_model.options.forEach(function (option_model) {
              if (
                !prop_definition[mode][option_model.name] ||
                (prop_definition[mode][option_model.name] &&
                  typeof prop_definition[mode][option_model.name] != option_model.type)
              ) {
                errors = errors.concat([
                  new Error(
                    'All ' +
                      option_model.name +
                      ' values defined in your ' +
                      prop_model.property +
                      ' configuration must a ' +
                      option_model.type +
                      ' value.'
                  ),
                ]);
              }
            });
            // Color-specific modifiers
            if (prop_model.property === 'colors') {
              if (
                prop_definition[mode].modifiers &&
                Array.isArray(prop_definition[mode].modifiers)
              ) {
                if (prop_definition[mode].modifiers.length > 0) {
                  prop_definition[mode].modifiers.forEach(function (modifier_setting) {
                    // Modifier key - exists and is the correct type
                    if (!modifier_setting.key) {
                      errors = errors.concat([
                        new Error('Color modifier definitions require a unique "key" value.'),
                      ]);
                    } else if (typeof modifier_setting.color != 'string') {
                      errors = errors.concat([
                        new Error(
                          'Color modifier "key" definitions must be a unique string value.'
                        ),
                      ]);
                    } else {
                      // Modifier key - doesn't match this or other color keys
                      if (modifier_setting.key === prop_definition.key) {
                        errors = errors.concat([
                          new Error(
                            'Color modifier "key" definitions cannot use the same value as their parent color\'s "key" value.'
                          ),
                        ]);
                      }
                      // Modifier key - doesn't match other modifiers for this color
                      if (theme.colors && Array.isArray(theme.colors) && theme.colors.length > 0) {
                        theme.colors.forEach(function (other_color) {
                          if (other_color.key) {
                            if (other_color.key === modifier_setting.key) {
                              errors = errors.concat([
                                new Error(
                                  'Color modifier "key" definitions cannot use the same value as other color definition "key" values.'
                                ),
                              ]);
                            }
                          }
                        });
                      }
                      // Modifier key - isn't just numbers
                      if (/^\d+$/.test(modifier_setting.key)) {
                        errors = errors.concat([
                          new Error(
                            'Color modifier "key" values cannot exclusively use numbers. They must contain at least one letter.'
                          ),
                        ]);
                      }
                      // Modifier key - doesn't contain spaces or periods
                      if (/\s/g.test(modifier_setting.key) || modifier_setting.key.includes('.')) {
                        errors = errors.concat([
                          new Error(
                            'Color modifier "key" values cannot contain spaces or periods.'
                          ),
                        ]);
                      }
                      // Modifier color - exists and is the correct type
                      if (!modifier_setting.color) {
                        errors = errors.concat([
                          new Error('Color modifier definitions require a "color" value.'),
                        ]);
                      } else if (typeof modifier_setting.color != 'string') {
                        errors = errors.concat([
                          new Error(
                            'Color modifier "color" definitions must be a string containing a CSS color value.'
                          ),
                        ]);
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
      step: 'Validating theme property configurations',
      errors: error,
    };
  }
}

module.exports = {
  validate_theme_property,
};
