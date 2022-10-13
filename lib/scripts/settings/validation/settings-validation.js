// Hydrogen: Validate settings
'use strict';

const { media } = require('../../../data/settings-model');
// Hydrogen type imports
let Settings = require('../../../data/settings-model-definition');
/**
 * @typedef {import('../../../data/settings-model-definition').Settings} Settings
 */
// Hydrogen data imports
let state_data = require('../../../data/state-model');
// Hydrogen function imports
const { log_message } = require('../../logs/log-message');
// Vendor imports

// See lib/scripts/settings/README.md for guidance on validation

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
      settings.processing.validation &&
      typeof settings.processing.validation != 'boolean'
    ) {
      throw 'The "validation" option in the "processing" section of your configuration must either be "true" or "false".';
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

function validate_themes(settings, path) {
  try {
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
 * @param {Settings} settings The user's settings
 * @param {string[]} path The path to the user's settings
 * @returns {boolean} True if valid
 */
function validate_settings(settings, path) {
  try {
    let valid = true;
    if (!settings) {
      throw "The settings object doesn't exist and is required.";
    } else {
      if (typeof settings != 'object') {
        throw 'Settings must be an object.';
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
          if (validate_themes(settings, path) === false) {
            valid = false;
          }
        }
        if (!valid) {
          return false;
        } else {
          return true;
        }
      }
    }
  } catch (error) {
    log_message({
      type: 'error',
      message: error,
      step: 'Settings validation',
      files: path,
    });
    return false;
  }
}

module.exports = {
  validate_settings,
};
