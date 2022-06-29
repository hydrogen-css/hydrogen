// Hydrogen: Validate config

'use strict';

// Third party dependencies
var colors = require('colors');

// Local dependencies
var { loadSettings } = require('./load-settings');
var { h2Error, h2Timer } = require('./logs');

function checkDuplicates(property, propertyArray) {
  var uniquePropertyArray = [];
  for (let key of propertyArray) {
    if (uniquePropertyArray.includes(key) === false) {
      uniquePropertyArray = uniquePropertyArray.concat(key);
    } else {
      if (property === 'typography') {
        h2Error(
          "The '" +
            property +
            "' definition in your hydrogen.config.json contains a duplicate queryKey: " +
            key.red +
            '.'
        );
        return false;
      } else {
        h2Error(
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
    // Load user settings
    var settings = loadSettings();
    var defaultMsg = 'Your hydrogen.config.json is missing ';

    // Validate debug
    if (settings.debug == null) {
      h2Error(defaultMsg + "a 'debug' definition (type boolean).");
      return false;
    } else if (typeof settings.debug != 'boolean') {
      h2Error(
        "The 'debug' definition in your hydrogen.config.json file must be a boolean."
      );
      return false;
    }

    // Validate input
    if (settings.input == null) {
      h2Error(defaultMsg + "an 'input' definition (type array).");
      return false;
    } else if (Array.isArray(settings.input) === false) {
      h2Error(
        "The 'input' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }

    // Validate output
    if (settings.output == null) {
      h2Error(defaultMsg + "an 'output' definition (type string).");
      return false;
    } else if (typeof settings.output != 'string') {
      h2Error(
        "The 'output' definition in your hydrogen.config.json file must be a string."
      );
      return false;
    }

    // Validate variable settings
    if (settings.variables == null) {
      h2Error(defaultMsg + "a 'variables' definition (type boolean).");
      return false;
    } else if (typeof settings.variables != 'boolean') {
      h2Error(
        "The 'variables' definition in your hydrogen.config.json file must be a boolean."
      );
      return false;
    }

    // Validate reset styles
    if (settings.resetStyles == null) {
      h2Error(defaultMsg + "a 'resetStyles' definition (type boolean).");
      return false;
    } else if (typeof settings.resetStyles != 'boolean') {
      h2Error(
        "The 'resetStyles' definition in your hydrogen.config.json file must be a boolean."
      );
      return false;
    }

    // Validate dark mode
    if (settings.darkMode == null) {
      h2Error(defaultMsg + "a 'darkMode' definition (type string).");
      return false;
    } else if (typeof settings.darkMode != 'string') {
      h2Error(
        "The 'darkMode' definition in your hydrogen.config.json file must be a string, either 'preference' or 'toggle'."
      );
      return false;
    }

    // Validate colors
    if (settings.colors == null) {
      h2Error(defaultMsg + "a 'colors' definition (type array).");
      return false;
    } else if (Array.isArray(settings.colors) === false) {
      h2Error(
        "The 'colors' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let color of settings.colors) {
      // Check color.key
      if (color.key == null) {
        h2Error(
          defaultMsg +
            "a 'key' definition for one of your color settings (type string)."
        );
        return false;
      } else if (typeof color.key != 'string') {
        h2Error(
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
        h2Error(
          "The 'color' definition of a color in your hydrogen.config.json file is using a reserved keyword: " +
            color.key.red +
            '. Please use a different name.'
        );
        return false;
      } else if (/^\d+$/.test(color.key) == true) {
        h2Error(
          "The 'color' definition of a color in your hydrogen.config.json file is using only numbers: " +
            color.key.red +
            '. Please set a key with at least one letter.'
        );
        return false;
      }
      // Check color.color
      if (color.color == null) {
        h2Error(
          defaultMsg +
            "a 'color' definition for one of your color settings (type string)."
        );
        return false;
      } else if (typeof color.color != 'string') {
        h2Error(
          "The 'color' definition of a color in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof color.color +
            '.'
        );
        return false;
      }
      // Check color.scale
      if (color.scale == null) {
        h2Error(
          defaultMsg +
            "a 'scale' definition for one of your color settings (type object)."
        );
        return false;
      } else if (typeof color.scale != 'object') {
        h2Error(
          "The 'scale' definition of a color in your hydrogen.config.json file must be an object. You've set a(n) " +
            typeof color.scale +
            '.'
        );
        return false;
      }
      // Check scale.light
      if (color.scale.light == null) {
        h2Error(
          "The scale definition inside of the color setting '" +
            color.key.red +
            "' is missing a 'light' definition in your hydrogen.config.json file. It can be set to 'auto' or a color value."
        );
        return false;
      } else if (typeof color.scale.light != 'string') {
        h2Error(
          "The 'scale.light' definition of a color (" +
            color.key.red +
            ") in your hydrogen.config.json file must be an string. You've set a(n) " +
            typeof color.scale.light +
            '.'
        );
        return false;
      }
      // Check scale.lighter
      if (color.scale.lighter == null) {
        h2Error(
          "The scale definition inside of the color setting '" +
            color.key.red +
            "' is missing a 'lighter' definition in your hydrogen.config.json file. It can be set to 'auto' or a color value."
        );
        return false;
      } else if (typeof color.scale.lighter != 'string') {
        h2Error(
          "The 'scale.lighter' definition of a color (" +
            color.key.red +
            ") in your hydrogen.config.json file must be an string. You've set a(n) " +
            typeof color.scale.lighter +
            '.'
        );
        return false;
      }
      // Check scale.lightest
      if (color.scale.lightest == null) {
        h2Error(
          "The scale definition inside of the color setting '" +
            color.key.red +
            "' is missing a 'lightest' definition in your hydrogen.config.json file. It can be set to 'auto' or a color value."
        );
        return false;
      } else if (typeof color.scale.lightest != 'string') {
        h2Error(
          "The 'scale.lightest' definition of a color (" +
            color.key.red +
            ") in your hydrogen.config.json file must be an string. You've set a(n) " +
            typeof color.scale.lightest +
            '.'
        );
        return false;
      }
      // Check scale.dark
      if (color.scale.dark == null) {
        h2Error(
          "The scale definition inside of the color setting '" +
            color.key.red +
            "' is missing a 'dark' definition in your hydrogen.config.json file. It can be set to 'auto' or a color value."
        );
        return false;
      } else if (typeof color.scale.dark != 'string') {
        h2Error(
          "The 'scale.dark' definition of a color (" +
            color.key.red +
            ") in your hydrogen.config.json file must be an string. You've set a(n) " +
            typeof color.scale.dark +
            '.'
        );
        return false;
      }
      // Check scale.darker
      if (color.scale.darker == null) {
        h2Error(
          "The scale definition inside of the color setting '" +
            color.key.red +
            "' is missing a 'darker' definition in your hydrogen.config.json file. It can be set to 'auto' or a color value."
        );
        return false;
      } else if (typeof color.scale.darker != 'string') {
        h2Error(
          "The 'scale.darker' definition of a color (" +
            color.key.red +
            ") in your hydrogen.config.json file must be an string. You've set a(n) " +
            typeof color.scale.darker +
            '.'
        );
        return false;
      }
      // Check scale.darkest
      if (color.scale.darkest == null) {
        h2Error(
          "The scale definition inside of the color setting '" +
            color.key.red +
            "' is missing a 'darkest' definition in your hydrogen.config.json file. It can be set to 'auto' or a color value."
        );
        return false;
      } else if (typeof color.scale.darkest != 'string') {
        h2Error(
          "The 'scale.darkest' definition of a color (" +
            color.key.red +
            ") in your hydrogen.config.json file must be an string. You've set a(n) " +
            typeof color.scale.darkest +
            '.'
        );
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
      h2Error(defaultMsg + "a 'containers' definition (type array).");
      return false;
    } else if (Array.isArray(settings.containers) === false) {
      h2Error(
        "The 'containers' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let container of settings.containers) {
      // Check container.key
      if (container.key == null) {
        h2Error(
          defaultMsg +
            "a 'key' definition for one of your container settings (type string)."
        );
        return false;
      } else if (typeof container.key != 'string') {
        h2Error(
          "The 'key' definition of a container in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof container.key +
            '.'
        );
        return false;
      }
      // Check container.maxWidth
      if (container.maxWidth == null) {
        h2Error(
          defaultMsg +
            "a 'container' definition for one of your container settings (type string)."
        );
        return false;
      } else if (typeof container.maxWidth != 'string') {
        h2Error(
          "The 'container' definition of a container in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof container.maxWidth +
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
      h2Error(defaultMsg + "a 'fonts' definition (type array).");
      return false;
    } else if (Array.isArray(settings.fonts) === false) {
      h2Error(
        "The 'fonts' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let font of settings.fonts) {
      // Check font.key
      if (font.key == null) {
        h2Error(
          defaultMsg +
            "a 'key' definition for one of your font settings (type string)."
        );
        return false;
      } else if (typeof font.key != 'string') {
        h2Error(
          "The 'key' definition of a font in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof font.key +
            '.'
        );
        return false;
      }
      // Check font.family
      if (font.family == null) {
        h2Error(
          defaultMsg +
            "a 'font' definition for one of your font settings (type string)."
        );
        return false;
      } else if (typeof font.family != 'string') {
        h2Error(
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
      h2Error(defaultMsg + "a 'gradients' definition (type array).");
      return false;
    } else if (Array.isArray(settings.gradients) === false) {
      h2Error(
        "The 'gradients' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let gradient of settings.gradients) {
      // Check gradient.key
      if (gradient.key == null) {
        h2Error(
          defaultMsg +
            "a 'key' definition for one of your gradient settings (type string)."
        );
        return false;
      } else if (typeof gradient.key != 'string') {
        h2Error(
          "The 'key' definition of a gradient in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof gradient.key +
            '.'
        );
        return false;
      }
      // Check gradient.gradient
      if (gradient.gradient == null) {
        h2Error(
          defaultMsg +
            "a 'gradient' definition for one of your gradient settings (type string)."
        );
        return false;
      } else if (typeof gradient.gradient != 'string') {
        h2Error(
          "The 'gradient' definition of a gradient in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof gradient.gradient +
            '.'
        );
        return false;
      }
      // Check gradient.fallback
      if (gradient.fallback == null) {
        h2Error(
          defaultMsg +
            "a 'fallback' definition for one of your gradient settings (type string)."
        );
        return false;
      } else if (typeof gradient.fallback != 'string') {
        h2Error(
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
          h2Error(
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
      h2Error(defaultMsg + "a 'media' definition (type array).");
      return false;
    } else if (Array.isArray(settings.media) === false) {
      h2Error(
        "The 'media' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    var baseQuery = false;
    for (let query of settings.media) {
      // Check media.key
      if (query.key == null) {
        h2Error(
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
        query.key == 'visited' ||
        query.key == 'checked' ||
        query.key == 'link' ||
        query.key == 'enabled' ||
        query.key == 'valid' ||
        query.key == 'required' ||
        query.key == 'optional'
      ) {
        h2Error(
          "You've defined a media query using a key (" +
            query.key.red +
            ') that is reserved. Please use a different key.'
        );
        return false;
      } else if (typeof query.key != 'string') {
        h2Error(
          "The 'key' definition of a media in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.key +
            '.'
        );
        return false;
      }
      // Check to see if the query key is repeated in other queries
      for (let queryCheck of settings.media) {
        if (queryCheck.key != query.key && queryCheck.key.endsWith(query.key)) {
          h2Error(
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
          h2Error(
            "You can only have one query set to 'null' representing your base query in your hydrogen.config.json file."
          );
          return false;
        }
      } else if (typeof query.query != 'string') {
        h2Error(
          "The 'query' definition of a media query in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof radius.radius +
            '.'
        );
        return false;
      }
    }
    if (baseQuery === false) {
      h2Error(
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
      h2Error(defaultMsg + "a 'radius' definition (type array).");
      return false;
    } else if (Array.isArray(settings.radius) === false) {
      h2Error(
        "The 'radius' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let radius of settings.radius) {
      // Check radius.key
      if (radius.key == null) {
        h2Error(
          defaultMsg +
            "a 'key' definition for one of your radius settings (type string)."
        );
        return false;
      } else if (typeof radius.key != 'string') {
        h2Error(
          "The 'key' definition of a radius in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof radius.key +
            '.'
        );
        return false;
      }
      // Check radius.radius
      if (radius.radius == null) {
        h2Error(
          defaultMsg +
            "a 'radius' definition for one of your radius settings (type string)."
        );
        return false;
      } else if (typeof radius.radius != 'string') {
        h2Error(
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
      h2Error(defaultMsg + "a 'shadows' definition (type array).");
      return false;
    } else if (Array.isArray(settings.shadows) === false) {
      h2Error(
        "The 'shadows' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let shadow of settings.shadows) {
      // Check shadow.key
      if (shadow.key == null) {
        h2Error(
          defaultMsg +
            "a 'key' definition for one of your shadow settings (type string)."
        );
        return false;
      } else if (typeof shadow.key != 'string') {
        h2Error(
          "The 'key' definition of a shadow in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof shadow.key +
            '.'
        );
        return false;
      }
      // Check shadow.shadow
      if (shadow.shadow == null) {
        h2Error(
          defaultMsg +
            "a 'shadow' definition for one of your shadow settings (type string)."
        );
        return false;
      } else if (typeof shadow.shadow != 'string') {
        h2Error(
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
      h2Error(
        defaultMsg +
          "a 'transitions' definition for one of your color settings (type object)."
      );
      return false;
    } else if (typeof settings.transitions != 'object') {
      h2Error(
        "The 'transitions' definition in your hydrogen.config.json file must be an object. You've set a(n) " +
          typeof settings.transitions +
          '.'
      );
      return false;
    }
    // Validate transition durations
    if (settings.transitions.durations == null) {
      h2Error(
        defaultMsg +
          "a 'transitions.durations' definition for one of your transition settings (type array)."
      );
      return false;
    } else if (Array.isArray(settings.transitions.durations) === false) {
      h2Error(
        "The 'transitions.durations' definition in your hydrogen.config.json file must be an array. You've set a(n) " +
          typeof settings.transitions.durations +
          '.'
      );
      return false;
    }
    for (let duration of settings.transitions.durations) {
      // Check duration.key
      if (duration.key == null) {
        h2Error(
          defaultMsg +
            "a 'key' definition for one of your transitions.durations settings (type string)."
        );
        return false;
      } else if (typeof duration.key != 'string') {
        h2Error(
          "The 'key' definition of a transitions.durations setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof duration.key +
            '.'
        );
        return false;
      }
      // Check duration.duration
      if (duration.duration == null) {
        h2Error(
          defaultMsg +
            "a 'duration' definition for one of your transitions.durations settings (type string)."
        );
        return false;
      } else if (typeof duration.duration != 'string') {
        h2Error(
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
      h2Error(
        defaultMsg +
          "a 'transitions.functions' definition for one of your transition settings (type array)."
      );
      return false;
    } else if (Array.isArray(settings.transitions.functions) === false) {
      h2Error(
        "The 'transitions.functions' definition in your hydrogen.config.json file must be an array. You've set a(n) " +
          typeof settings.transitions.functions +
          '.'
      );
      return false;
    }
    for (let transitionFunction of settings.transitions.functions) {
      // Check function.key
      if (transitionFunction.key == null) {
        h2Error(
          defaultMsg +
            "a 'key' definition for one of your transitions.functions settings (type string)."
        );
        return false;
      } else if (typeof transitionFunction.key != 'string') {
        h2Error(
          "The 'key' definition of a transitions.functions setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof transitionFunction.key +
            '.'
        );
        return false;
      }
      // Check function.function
      if (transitionFunction.function == null) {
        h2Error(
          defaultMsg +
            "a 'function' definition for one of your transitions.functions settings (type string)."
        );
        return false;
      } else if (typeof transitionFunction.function != 'string') {
        h2Error(
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
      h2Error(
        defaultMsg +
          "a 'transitions.delays' definition for one of your transition settings (type array)."
      );
      return false;
    } else if (Array.isArray(settings.transitions.delays) === false) {
      h2Error(
        "The 'transitions.delays' definition in your hydrogen.config.json file must be an array. You've set a(n) " +
          typeof settings.transitions.delays +
          '.'
      );
      return false;
    }
    for (let delay of settings.transitions.delays) {
      // Check delay.key
      if (delay.key == null) {
        h2Error(
          defaultMsg +
            "a 'key' definition for one of your transitions.delays settings (type string)."
        );
        return false;
      } else if (typeof delay.key != 'string') {
        h2Error(
          "The 'key' definition of a transitions.delays setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof delay.key +
            '.'
        );
        return false;
      }
      // Check delay.delay
      if (delay.delay == null) {
        h2Error(
          defaultMsg +
            "a 'delay' definition for one of your transitions.delays settings (type string)."
        );
        return false;
      } else if (typeof delay.delay != 'string') {
        h2Error(
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
      h2Error(defaultMsg + "a 'typography' definition (type array).");
      return false;
    } else if (Array.isArray(settings.typography) === false) {
      h2Error(
        "The 'typography' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let query of settings.typography) {
      // Check query.size
      if (query.size == null) {
        h2Error(
          defaultMsg +
            "a 'size' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.size != 'string') {
        h2Error(
          "The 'size' definition of a typography in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.size +
            '.'
        );
        return false;
      }
      // Check query.lineHeight
      if (query.lineHeight == null) {
        h2Error(
          defaultMsg +
            "a 'lineHeight' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.lineHeight != 'string') {
        h2Error(
          "The 'lineHeight' definition of a typography in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.lineHeight +
            '.'
        );
        return false;
      }
      // Check query.queryKey and that it matches an existing media query
      if (query.queryKey == null) {
        h2Error(
          defaultMsg +
            "a 'queryKey' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.queryKey != 'string') {
        h2Error(
          "The 'queryKey' definition of a typography in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.queryKey +
            '.'
        );
        return false;
      } else {
        var mediaCheck = false;
        for (let item of mediaArray) {
          if (item === query.queryKey) {
            mediaCheck = true;
          }
        }
        if (mediaCheck === false) {
          h2Error(
            "A 'queryKey' definition (" +
              query.queryKey.red +
              ") inside of your typography settings in your hydrogen.config.json file doesn't match any of your media query settings. Please ensure that it matches at least one of your defined media queries."
          );
          return false;
        }
      }
      // Check typeScale
      if (query.typeScale == null) {
        h2Error(
          defaultMsg +
            "a 'typeScale' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.typeScale != 'string') {
        h2Error(
          "The 'typeScale' definition of a typography in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.typeScale +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate queryKeys
    var typeArray = settings.typography.map(function (item) {
      return item.queryKey;
    });
    if (checkDuplicates('typography', typeArray) === false) {
      return false;
    }

    // End validation timer
    const validationTimerEnd = process.hrtime.bigint();
    h2Timer(
      'Configuration validation time was',
      validationTimerStart,
      validationTimerEnd
    );
    return true;
  } catch (error) {
    h2Error(error);
    return false;
  }
}

module.exports = {
  validateConfig,
};
