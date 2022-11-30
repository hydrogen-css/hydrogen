// Hydrogen
'use strict';

// Data models
/**
 * @typedef {import('../../../../data/settings-model-definition').Settings} Settings
 * @typedef {import('../../../../data/settings-model-definition').Logging} Logging
 */

// Data imports
const { get_state_data } = require('../../../../data/state-model');

// Logging
const { log_message } = require('../../../logs/log-message');
const { log_timer } = require('../../../logs/log-timer');

// Functions

// Vendor imports

// Script
// Script
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
