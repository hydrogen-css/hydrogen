// Hydrogen: Validate config

'use strict';

// Third party dependencies
var colors = require('colors');
var fs = require('fs');
var path = require('path');

// Local dependencies
var { h2_load_settings } = require('./load-settings');
var { h2_error, h2_timer } = require('./logs');

function checkDuplicates(property, propertyArray) {
  var uniquePropertyArray = [];
  for (let key of propertyArray) {
    if (uniquePropertyArray.includes(key) === false) {
      uniquePropertyArray = uniquePropertyArray.concat(key);
    } else {
      if (property === 'typography') {
        h2_error(
          "The '" +
            property +
            "' definition in your hydrogen.config.json contains a duplicate query_key: " +
            key.red +
            '.'
        );
        return false;
      } else {
        h2_error(
          "The '" +
            property +
            "' definition in your hydrogen.config.json contains a duplicate key: " +
            key.red +
            '.'
        );
        return false;
      }
    }
  }
}

function validateConfig() {
  try {
    // Start validation timer
    const validationTimerStart = process.hrtime.bigint();

    // Check to see if the configuration file exists
    if (
      fs.existsSync(path.join(process.cwd() + '/hydrogen.config.json')) != true
    ) {
      h2_error(
        "It looks like you don't have a hydrogen.config.json file in this directory. Please run npx h2-init to create one."
      );
      return false;
    }

    // Load user settings
    var settings = h2_load_settings();
    var defaultMsg = 'Your hydrogen.config.json is missing ';

    // Validate debug
    if (settings.debug == null) {
      h2_error(defaultMsg + "a 'debug' definition (type boolean).");
      return false;
    } else if (typeof settings.debug != 'boolean') {
      h2_error(
        "The 'debug' definition in your hydrogen.config.json file must be a boolean."
      );
      return false;
    }

    // Validate input
    if (settings.input == null) {
      h2_error(defaultMsg + "an 'input' definition (type array).");
      return false;
    } else if (Array.isArray(settings.input) === false) {
      h2_error(
        "The 'input' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }

    // Validate output
    if (settings.output == null) {
      h2_error(defaultMsg + "an 'output' definition (type string).");
      return false;
    } else if (typeof settings.output != 'string') {
      h2_error(
        "The 'output' definition in your hydrogen.config.json file must be a string."
      );
      return false;
    }

    // Validate variable settings
    if (settings.variables == null) {
      h2_error(defaultMsg + "a 'variables' definition (type boolean).");
      return false;
    } else if (typeof settings.variables != 'boolean') {
      h2_error(
        "The 'variables' definition in your hydrogen.config.json file must be a boolean."
      );
      return false;
    }

    // Validate reset styles
    if (settings.reset_styles == null) {
      h2_error(defaultMsg + "a 'reset_styles' definition (type boolean).");
      return false;
    } else if (typeof settings.reset_styles != 'boolean') {
      h2_error(
        "The 'reset_styles' definition in your hydrogen.config.json file must be a boolean."
      );
      return false;
    }

    // Validate dark mode
    if (settings.dark_mode == null) {
      h2_error(defaultMsg + "a 'dark_mode' definition (type string).");
      return false;
    } else if (typeof settings.dark_mode != 'string') {
      h2_error(
        "The 'dark_mode' definition in your hydrogen.config.json file must be a string, either 'preference' or 'toggle'."
      );
      return false;
    }

    // Validate colors
    if (settings.colors == null) {
      h2_error(defaultMsg + "a 'colors' definition (type array).");
      return false;
    } else if (Array.isArray(settings.colors) === false) {
      h2_error(
        "The 'colors' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let color of settings.colors) {
      // Check color.key
      if (color.key == null) {
        h2_error(
          defaultMsg +
            "a 'key' definition for one of your color settings (type string)."
        );
        return false;
      } else if (typeof color.key != 'string') {
        h2_error(
          "The 'key' definition of a color in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof color.key +
            '.'
        );
        return false;
      } else if (
        color.key == 'light' ||
        color.key == 'lighter' ||
        color.key == 'lightest' ||
        color.key == 'dark' ||
        color.key == 'darker' ||
        color.key == 'darkest'
      ) {
        h2_error(
          "The 'color' definition of a color in your hydrogen.config.json file is using a reserved keyword: " +
            color.key.red +
            '. Please use a different name.'
        );
        return false;
      } else if (/^\d+$/.test(color.key) == true) {
        h2_error(
          "The 'color' definition of a color in your hydrogen.config.json file is using only numbers: " +
            color.key.red +
            '. Please set a key with at least one letter.'
        );
        return false;
      }
      // Check color.color
      if (color.color == null) {
        h2_error(
          defaultMsg +
            "a 'color' definition for one of your color settings (type string)."
        );
        return false;
      } else if (typeof color.color != 'string') {
        h2_error(
          "The 'color' definition of a color in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof color.color +
            '.'
        );
        return false;
      }
      // Check color.modifiers
      if (color.modifiers == null) {
        h2_error(
          defaultMsg +
            "a 'modifiers' definition for one of your color settings (type array). This definition can be left as an empty array if modifiers are not needed."
        );
        return false;
      } else if (Array.isArray(color.modifiers) === false) {
        h2_error(
          "The 'modifiers' definition of a color in your hydrogen.config.json file must be an array."
        );
        return false;
      }
      // Check individual modifier values to make sure the keys are not set to the color's key
      var modifierIntegrity = true;
      color.modifiers.forEach(function (config_modifier, config_index) {
        // Check key existence and type
        if (config_modifier.key == null) {
          h2_error(
            defaultMsg +
              "a 'key' definition for one of your color's modifier settings (type string)."
          );
          modifierIntegrity = false;
          return false;
        } else if (typeof config_modifier.key != 'string') {
          h2_error(
            "The 'key' definition of a color modifier in your hydrogen.config.json file must be a string. You've set a(n) " +
              typeof config_modifier.key +
              '.'
          );
          modifierIntegrity = false;
          return false;
        }
        // Check color existence and type
        if (config_modifier.color == null) {
          h2_error(
            defaultMsg +
              "a 'color' definition for one of your color's modifier settings (type string)."
          );
          modifierIntegrity = false;
          return false;
        } else if (typeof config_modifier.color != 'string') {
          h2_error(
            "The 'color' definition of a color modifier in your hydrogen.config.json file must be a string. You've set a(n) " +
              typeof config_modifier.color +
              '.'
          );
          modifierIntegrity = false;
          return false;
        }
        // Check for matching keys with the parent
        if (config_modifier.key === color.key) {
          h2_error(
            'One of your modifier key values for the color ' +
              '"'.red +
              color.key.red +
              '"'.red +
              ' is set to the same name as its parent color. Please use a different modifier name.'
          );
          modifierIntegrity = false;
          return false;
        }
      });
      if (modifierIntegrity === false) {
        return false;
      }
    }
    // Check for duplicate colors
    var colorArray = settings.colors.map(function (item) {
      return item.key;
    });
    if (checkDuplicates('colors', colorArray) === false) {
      return false;
    }

    // Validate containers
    if (settings.containers == null) {
      h2_error(defaultMsg + "a 'containers' definition (type array).");
      return false;
    } else if (Array.isArray(settings.containers) === false) {
      h2_error(
        "The 'containers' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let container of settings.containers) {
      // Check container.key
      if (container.key == null) {
        h2_error(
          defaultMsg +
            "a 'key' definition for one of your container settings (type string)."
        );
        return false;
      } else if (typeof container.key != 'string') {
        h2_error(
          "The 'key' definition of a container in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof container.key +
            '.'
        );
        return false;
      }
      // Check container.max_width
      if (container.max_width == null) {
        h2_error(
          defaultMsg +
            "a 'container' definition for one of your container settings (type string)."
        );
        return false;
      } else if (typeof container.max_width != 'string') {
        h2_error(
          "The 'container' definition of a container in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof container.max_width +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate containers
    var containerArray = settings.containers.map(function (item) {
      return item.key;
    });
    if (checkDuplicates('containers', containerArray) === false) {
      return false;
    }

    // Validate fonts
    if (settings.fonts == null) {
      h2_error(defaultMsg + "a 'fonts' definition (type array).");
      return false;
    } else if (Array.isArray(settings.fonts) === false) {
      h2_error(
        "The 'fonts' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let font of settings.fonts) {
      // Check font.key
      if (font.key == null) {
        h2_error(
          defaultMsg +
            "a 'key' definition for one of your font settings (type string)."
        );
        return false;
      } else if (typeof font.key != 'string') {
        h2_error(
          "The 'key' definition of a font in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof font.key +
            '.'
        );
        return false;
      }
      // Check font.family
      if (font.family == null) {
        h2_error(
          defaultMsg +
            "a 'font' definition for one of your font settings (type string)."
        );
        return false;
      } else if (typeof font.family != 'string') {
        h2_error(
          "The 'font' definition of a font in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof font.family +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate fonts
    var fontArray = settings.fonts.map(function (item) {
      return item.key;
    });
    if (checkDuplicates('fonts', fontArray) === false) {
      return false;
    }

    // Validate gradients
    if (settings.gradients == null) {
      h2_error(defaultMsg + "a 'gradients' definition (type array).");
      return false;
    } else if (Array.isArray(settings.gradients) === false) {
      h2_error(
        "The 'gradients' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let gradient of settings.gradients) {
      // Check gradient.key
      if (gradient.key == null) {
        h2_error(
          defaultMsg +
            "a 'key' definition for one of your gradient settings (type string)."
        );
        return false;
      } else if (typeof gradient.key != 'string') {
        h2_error(
          "The 'key' definition of a gradient in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof gradient.key +
            '.'
        );
        return false;
      }
      // Check gradient.gradient
      if (gradient.gradient == null) {
        h2_error(
          defaultMsg +
            "a 'gradient' definition for one of your gradient settings (type string)."
        );
        return false;
      } else if (typeof gradient.gradient != 'string') {
        h2_error(
          "The 'gradient' definition of a gradient in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof gradient.gradient +
            '.'
        );
        return false;
      }
      // Check gradient.fallback
      if (gradient.fallback == null) {
        h2_error(
          defaultMsg +
            "a 'fallback' definition for one of your gradient settings (type string)."
        );
        return false;
      } else if (typeof gradient.fallback != 'string') {
        h2_error(
          "The 'fallback' definition of a gradient in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof gradient.fallback +
            '.'
        );
        return false;
      }
    }
    // Check for duplicates between colors and gradients
    var gradientArray = settings.gradients.map(function (item) {
      return item.key;
    });
    if (checkDuplicates('gradients', gradientArray) === false) {
      return false;
    }
    for (let color of colorArray) {
      for (let gradient of gradientArray) {
        if (color === gradient) {
          h2_error(
            "A 'gradient' definition in your hydrogen.config.json file contains a key that is already in use by a color definition: " +
              color.red +
              '.'
          );
          return false;
        }
      }
    }

    // Validate media and check for a base query and make sure it's the only one
    if (settings.media == null) {
      h2_error(defaultMsg + "a 'media' definition (type array).");
      return false;
    } else if (Array.isArray(settings.media) === false) {
      h2_error(
        "The 'media' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    var baseQuery = false;
    for (let query of settings.media) {
      // Check media.key
      if (query.key == null) {
        h2_error(
          defaultMsg +
            "a 'key' definition for one of your media settings (type string)."
        );
        return false;
      } else if (
        query.key == 'dark' ||
        query.key == 'hover' ||
        query.key == 'active' ||
        query.key == 'disabled' ||
        query.key == 'focus' ||
        query.key == 'focus-visible' ||
        query.key == 'visited' ||
        query.key == 'checked' ||
        query.key == 'link' ||
        query.key == 'enabled' ||
        query.key == 'valid' ||
        query.key == 'invalid' ||
        query.key == 'required' ||
        query.key == 'optional'
      ) {
        h2_error(
          "You've defined a media query using a key (" +
            query.key.red +
            ') that is reserved. Please use a different key.'
        );
        return false;
      } else if (typeof query.key != 'string') {
        h2_error(
          "The 'key' definition of a media in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.key +
            '.'
        );
        return false;
      }
      // Check to see if the query key is repeated in other queries
      for (let queryCheck of settings.media) {
        if (queryCheck.key != query.key && queryCheck.key.endsWith(query.key)) {
          h2_error(
            'Do the nature of wildcard attribute selectors, query keys cannot end in the same string as another query key. It seems that ' +
              '"'.red +
              query.key.red +
              '"'.red +
              ' and ' +
              '"'.red +
              queryCheck.key.red +
              '"'.red +
              ' are in conflict.'
          );
          return false;
        }
      }
      // Check media.query
      if (query.query == null || query.query == 'base') {
        if (baseQuery === false) {
          baseQuery = true;
        } else if (baseQuery === true) {
          h2_error(
            "You can only have one query set to 'null' representing your base query in your hydrogen.config.json file."
          );
          return false;
        }
      } else if (typeof query.query != 'string') {
        h2_error(
          "The 'query' definition of a media query in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof radius.radius +
            '.'
        );
        return false;
      }
    }
    if (baseQuery === false) {
      h2_error(
        "Your hydrogen.config.json file is missing a base media query. Please define a query and set it's value to 'null' or 'base' to continue."
      );
      return false;
    }
    // Check for duplicate queries
    var mediaArray = settings.media.map(function (item) {
      return item.key;
    });
    if (checkDuplicates('media', mediaArray) === false) {
      return false;
    }

    // Validate radius
    if (settings.radius == null) {
      h2_error(defaultMsg + "a 'radius' definition (type array).");
      return false;
    } else if (Array.isArray(settings.radius) === false) {
      h2_error(
        "The 'radius' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let radius of settings.radius) {
      // Check radius.key
      if (radius.key == null) {
        h2_error(
          defaultMsg +
            "a 'key' definition for one of your radius settings (type string)."
        );
        return false;
      } else if (typeof radius.key != 'string') {
        h2_error(
          "The 'key' definition of a radius in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof radius.key +
            '.'
        );
        return false;
      }
      // Check radius.radius
      if (radius.radius == null) {
        h2_error(
          defaultMsg +
            "a 'radius' definition for one of your radius settings (type string)."
        );
        return false;
      } else if (typeof radius.radius != 'string') {
        h2_error(
          "The 'radius' definition of a radius in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof radius.radius +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate radii
    var radiusArray = settings.radius.map(function (item) {
      return item.key;
    });
    if (checkDuplicates('radius', radiusArray) === false) {
      return false;
    }

    // Validate shadows
    if (settings.shadows == null) {
      h2_error(defaultMsg + "a 'shadows' definition (type array).");
      return false;
    } else if (Array.isArray(settings.shadows) === false) {
      h2_error(
        "The 'shadows' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let shadow of settings.shadows) {
      // Check shadow.key
      if (shadow.key == null) {
        h2_error(
          defaultMsg +
            "a 'key' definition for one of your shadow settings (type string)."
        );
        return false;
      } else if (typeof shadow.key != 'string') {
        h2_error(
          "The 'key' definition of a shadow in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof shadow.key +
            '.'
        );
        return false;
      }
      // Check shadow.shadow
      if (shadow.shadow == null) {
        h2_error(
          defaultMsg +
            "a 'shadow' definition for one of your shadow settings (type string)."
        );
        return false;
      } else if (typeof shadow.shadow != 'string') {
        h2_error(
          "The 'shadow' definition of a shadow in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof shadow.shadow +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate shadows
    var shadowArray = settings.shadows.map(function (item) {
      return item.key;
    });
    if (checkDuplicates('shadow', shadowArray) === false) {
      return false;
    }

    // Validate transitions
    if (settings.transitions == null) {
      h2_error(
        defaultMsg +
          "a 'transitions' definition for one of your color settings (type object)."
      );
      return false;
    } else if (typeof settings.transitions != 'object') {
      h2_error(
        "The 'transitions' definition in your hydrogen.config.json file must be an object. You've set a(n) " +
          typeof settings.transitions +
          '.'
      );
      return false;
    }
    // Validate transition durations
    if (settings.transitions.durations == null) {
      h2_error(
        defaultMsg +
          "a 'transitions.durations' definition for one of your transition settings (type array)."
      );
      return false;
    } else if (Array.isArray(settings.transitions.durations) === false) {
      h2_error(
        "The 'transitions.durations' definition in your hydrogen.config.json file must be an array. You've set a(n) " +
          typeof settings.transitions.durations +
          '.'
      );
      return false;
    }
    for (let duration of settings.transitions.durations) {
      // Check duration.key
      if (duration.key == null) {
        h2_error(
          defaultMsg +
            "a 'key' definition for one of your transitions.durations settings (type string)."
        );
        return false;
      } else if (typeof duration.key != 'string') {
        h2_error(
          "The 'key' definition of a transitions.durations setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof duration.key +
            '.'
        );
        return false;
      }
      // Check duration.duration
      if (duration.duration == null) {
        h2_error(
          defaultMsg +
            "a 'duration' definition for one of your transitions.durations settings (type string)."
        );
        return false;
      } else if (typeof duration.duration != 'string') {
        h2_error(
          "The 'duration' definition of a transitions.durations setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof duration.duration +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate durations
    var durationArray = settings.transitions.durations.map(function (item) {
      return item.key;
    });
    if (checkDuplicates('transitions.durations', durationArray) === false) {
      return false;
    }
    // Validate transition functions
    if (settings.transitions.functions == null) {
      h2_error(
        defaultMsg +
          "a 'transitions.functions' definition for one of your transition settings (type array)."
      );
      return false;
    } else if (Array.isArray(settings.transitions.functions) === false) {
      h2_error(
        "The 'transitions.functions' definition in your hydrogen.config.json file must be an array. You've set a(n) " +
          typeof settings.transitions.functions +
          '.'
      );
      return false;
    }
    for (let transitionFunction of settings.transitions.functions) {
      // Check function.key
      if (transitionFunction.key == null) {
        h2_error(
          defaultMsg +
            "a 'key' definition for one of your transitions.functions settings (type string)."
        );
        return false;
      } else if (typeof transitionFunction.key != 'string') {
        h2_error(
          "The 'key' definition of a transitions.functions setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof transitionFunction.key +
            '.'
        );
        return false;
      }
      // Check function.function
      if (transitionFunction.function == null) {
        h2_error(
          defaultMsg +
            "a 'function' definition for one of your transitions.functions settings (type string)."
        );
        return false;
      } else if (typeof transitionFunction.function != 'string') {
        h2_error(
          "The 'function' definition of a transitions.functions setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof transitionFunction.function +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate functions
    var functionArray = settings.transitions.functions.map(function (item) {
      return item.key;
    });
    if (checkDuplicates('transitions.functions', functionArray) === false) {
      return false;
    }
    // Validate transition delays
    if (settings.transitions.delays == null) {
      h2_error(
        defaultMsg +
          "a 'transitions.delays' definition for one of your transition settings (type array)."
      );
      return false;
    } else if (Array.isArray(settings.transitions.delays) === false) {
      h2_error(
        "The 'transitions.delays' definition in your hydrogen.config.json file must be an array. You've set a(n) " +
          typeof settings.transitions.delays +
          '.'
      );
      return false;
    }
    for (let delay of settings.transitions.delays) {
      // Check delay.key
      if (delay.key == null) {
        h2_error(
          defaultMsg +
            "a 'key' definition for one of your transitions.delays settings (type string)."
        );
        return false;
      } else if (typeof delay.key != 'string') {
        h2_error(
          "The 'key' definition of a transitions.delays setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof delay.key +
            '.'
        );
        return false;
      }
      // Check delay.delay
      if (delay.delay == null) {
        h2_error(
          defaultMsg +
            "a 'delay' definition for one of your transitions.delays settings (type string)."
        );
        return false;
      } else if (typeof delay.delay != 'string') {
        h2_error(
          "The 'delay' definition of a transitions.delays setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof delay.delay +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate delays
    var delayArray = settings.transitions.delays.map(function (item) {
      return item.key;
    });
    if (checkDuplicates('transitions.delays', delayArray) === false) {
      return false;
    }

    // Validate typography
    if (settings.typography == null) {
      h2_error(defaultMsg + "a 'typography' definition (type array).");
      return false;
    } else if (Array.isArray(settings.typography) === false) {
      h2_error(
        "The 'typography' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let query of settings.typography) {
      // Check query.size
      if (query.size == null) {
        h2_error(
          defaultMsg +
            "a 'size' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.size != 'string') {
        h2_error(
          "The 'size' definition of a typography in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.size +
            '.'
        );
        return false;
      }
      // Check query.line_height
      if (query.line_height == null) {
        h2_error(
          defaultMsg +
            "a 'line_height' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.line_height != 'string') {
        h2_error(
          "The 'line_height' definition of a typography in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.line_height +
            '.'
        );
        return false;
      }
      // Check query.query_key and that it matches an existing media query
      if (query.query_key == null) {
        h2_error(
          defaultMsg +
            "a 'query_key' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.query_key != 'string') {
        h2_error(
          "The 'query_key' definition of a typography in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.query_key +
            '.'
        );
        return false;
      } else {
        var mediaCheck = false;
        for (let item of mediaArray) {
          if (item === query.query_key) {
            mediaCheck = true;
          }
        }
        if (mediaCheck === false) {
          h2_error(
            "A 'query_key' definition (" +
              query.query_key.red +
              ") inside of your typography settings in your hydrogen.config.json file doesn't match any of your media query settings. Please ensure that it matches at least one of your defined media queries."
          );
          return false;
        }
      }
      // Check type_scale
      if (query.type_scale == null) {
        h2_error(
          defaultMsg +
            "a 'type_scale' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.type_scale != 'string') {
        h2_error(
          "The 'type_scale' definition of a typography in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.type_scale +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate query_keys
    var typeArray = settings.typography.map(function (item) {
      return item.query_key;
    });
    if (checkDuplicates('typography', typeArray) === false) {
      return false;
    }

    // End validation timer
    const validationTimerEnd = process.hrtime.bigint();
    h2_timer(
      'Configuration validation time was',
      validationTimerStart,
      validationTimerEnd
    );
    return true;
  } catch (error) {
    h2_error(error);
    return false;
  }
}

module.exports = {
  validateConfig,
};
