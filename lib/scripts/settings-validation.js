// Hydrogen: Validate settings
'use strict';

// Vendor dependencies
var colors = require('colors');

// Hydrogen dependencies
var { h2_error_detail, log_info } = require('./logs');

// Log consolidation
// missing required definition (item)
// invalid definition type (item, valid type, invalid type)
// bad string value (item, options)
// reserved keyword (item, reserved word)
// color number validation

function validate_settings_new(settings) {
  // self as object
  function validate_input(settings) {
    // self as array
    // children as strings
  }
  if (validate_input(settings) === false) {
    return false;
  }
  function validate_output(settings) {
    // self as string
  }
  if (validate_output(settings) === false) {
    return false;
  }
  function validate_build(settings) {
    // self
    // children as respective type
  }
  if (validate_build(settings) === false) {
    return false;
  }
  function validate_styles(settings) {
    // self as object
    function validate_foundations(settings) {
      // self as object
      function validate_media(settings) {
        // self as array
        // children as objects
        // key as string
        // query as string
      }
      if (validate_media(settings) === false) {
        return false;
      }
      function validate_typography(settings) {
        // self as array
        // children as objects
        // query_key as string
        // line height as string
        // size as string
        // type_scale as string
      }
      if (validate_typography(settings) === false) {
        return false;
      }
    }
    if (validate_foundations(settings) === false) {
      return false;
    }
    function validate_tokens(settings) {
      // self as object
      function validate_colors(settings) {
        // self as object
        // children as objects
        // key as string
        // color as string
        function validate_color_modifiers(settings) {
          // self as array
          // children as objects
          // key
          // color
        }
        if (validate_color_modifiers(settings) === false) {
          return false;
        }
      }
      if (validate_colors(settings) === false) {
        return false;
      }
      function validate_containers(settings) {
        // self as array
        // children as objects
        // key as string
        // max width as string
      }
      if (validate_containers(settings) === false) {
        return false;
      }
      function validate_fonts(settings) {
        // self as array
        // children as objects
        // key as string
        // family as string
      }
      if (validate_fonts(settings) === false) {
        return false;
      }
      function validate_gradients(settings) {
        // self
        // key (against color too)
        // gradient
        // fallback
      }
      if (validate_gradients(settings) === false) {
        return false;
      }
      function validate_radii(settings) {
        // self
        // key
        // radii
      }
      if (validate_radii(settings) === false) {
        return false;
      }
      function validate_shadows(settings) {
        // self
        // key
        // shadow
      }
      if (validate_shadows(settings) === false) {
        return false;
      }
      function validate_transitions(settings) {
        // self
        function validate_transition_durations(settings) {
          // self
          // key
          // duration
        }
        if (validate_transition_durations(settings) === false) {
          return false;
        }
        function validate_transition_functions(settings) {
          // self
          // key
          // function
        }
        if (validate_transition_functions(settings) === false) {
          return false;
        }
        function validate_transition_delays(settings) {
          // self
          // key
          // delay
        }
        if (validate_transition_delays(settings) === false) {
          return false;
        }
      }
      if (validate_transitions(settings) === false) {
        return false;
      }
    }
    if (validate_tokens(settings) === false) {
      return false;
    }
  }
  if (validate_styles(settings) === false) {
    return false;
  }
}

// Validation functions
function checkDuplicates(settings, property, property_array) {
  var unique_property_array = [];
  for (let key of property_array) {
    if (unique_property_array.includes(key) === false) {
      unique_property_array = unique_property_array.concat(key);
    } else {
      if (property === 'typography') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The '" +
            property +
            "' definition in your hydrogen.config.json contains a duplicate query_key: " +
            key.red +
            '.'
        );
        return false;
      } else {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
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

function validate_settings(settings) {
  try {
    // Create default message
    var defaultMsg = 'Your hydrogen.config.json is missing ';
    // Validate debug
    if (settings.build.logs == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'debug' definition (type boolean)."
      );
      return false;
    } else if (typeof settings.build.logs != 'boolean') {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'debug' definition in your hydrogen.config.json file must be a boolean."
      );
      return false;
    }

    // Validate input
    if (settings.input == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "an 'input' definition (type array)."
      );
      return false;
    } else if (Array.isArray(settings.input) === false) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'input' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }

    // Validate output
    if (settings.output == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "an 'output' definition (type string)."
      );
      return false;
    } else if (typeof settings.output != 'string') {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'output' definition in your hydrogen.config.json file must be a string."
      );
      return false;
    }

    // Validate variable settings
    if (settings.build.var_export == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'variables' definition (type boolean)."
      );
      return false;
    } else if (typeof settings.build.var_export != 'boolean') {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'variables' definition in your hydrogen.config.json file must be a boolean."
      );
      return false;
    }

    // Validate reset styles
    if (settings.build.reset_styles == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'reset_styles' definition (type boolean)."
      );
      return false;
    } else if (typeof settings.build.reset_styles != 'boolean') {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'reset_styles' definition in your hydrogen.config.json file must be a boolean."
      );
      return false;
    }

    // Validate dark mode
    if (settings.build.dark_mode == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'dark_mode' definition (type string)."
      );
      return false;
    } else if (typeof settings.build.dark_mode != 'string') {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'dark_mode' definition in your hydrogen.config.json file must be a string, either 'preference' or 'toggle'."
      );
      return false;
    }

    // Validate colors
    if (settings.styles.tokens.colors == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'colors' definition (type array)."
      );
      return false;
    } else if (Array.isArray(settings.styles.tokens.colors) === false) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'colors' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let color of settings.styles.tokens.colors) {
      // Check color.key
      if (color.key == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'key' definition for one of your color settings (type string)."
        );
        return false;
      } else if (typeof color.key != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
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
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'color' definition of a color in your hydrogen.config.json file is using a reserved keyword: " +
            color.key.red +
            '. Please use a different name.'
        );
        return false;
      } else if (/^\d+$/.test(color.key) == true) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'color' definition of a color in your hydrogen.config.json file is using only numbers: " +
            color.key.red +
            '. Please set a key with at least one letter.'
        );
        return false;
      }
      // Check color.color
      if (color.color == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'color' definition for one of your color settings (type string)."
        );
        return false;
      } else if (typeof color.color != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'color' definition of a color in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof color.color +
            '.'
        );
        return false;
      }
      // Check color.modifiers
      if (color.modifiers == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'modifiers' definition for one of your color settings (type array). This definition can be left as an empty array if modifiers are not needed."
        );
        return false;
      } else if (Array.isArray(color.modifiers) === false) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'modifiers' definition of a color in your hydrogen.config.json file must be an array."
        );
        return false;
      }
      // Check individual modifier values to make sure the keys are not set to the color's key
      var modifierIntegrity = true;
      color.modifiers.forEach(function (config_modifier, config_index) {
        // Check key existence and type
        if (config_modifier.key == null) {
          h2_error_detail(
            'configuration',
            null,
            [settings.path],
            defaultMsg +
              "a 'key' definition for one of your color's modifier settings (type string)."
          );
          modifierIntegrity = false;
          return false;
        } else if (typeof config_modifier.key != 'string') {
          h2_error_detail(
            'configuration',
            null,
            [settings.path],
            "The 'key' definition of a color modifier in your hydrogen.config.json file must be a string. You've set a(n) " +
              typeof config_modifier.key +
              '.'
          );
          modifierIntegrity = false;
          return false;
        }
        // Check color existence and type
        if (config_modifier.color == null) {
          h2_error_detail(
            'configuration',
            null,
            [settings.path],
            defaultMsg +
              "a 'color' definition for one of your color's modifier settings (type string)."
          );
          modifierIntegrity = false;
          return false;
        } else if (typeof config_modifier.color != 'string') {
          h2_error_detail(
            'configuration',
            null,
            [settings.path],
            "The 'color' definition of a color modifier in your hydrogen.config.json file must be a string. You've set a(n) " +
              typeof config_modifier.color +
              '.'
          );
          modifierIntegrity = false;
          return false;
        }
        // Check for matching keys with the parent
        if (config_modifier.key === color.key) {
          h2_error_detail(
            'configuration',
            null,
            [settings.path],
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
    var colorArray = settings.styles.tokens.colors.map(function (item) {
      return item.key;
    });
    if (checkDuplicates(settings, 'colors', colorArray) === false) {
      return false;
    }

    // Validate containers
    if (settings.styles.tokens.containers == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'containers' definition (type array)."
      );
      return false;
    } else if (Array.isArray(settings.styles.tokens.containers) === false) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'containers' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let container of settings.styles.tokens.containers) {
      // Check container.key
      if (container.key == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'key' definition for one of your container settings (type string)."
        );
        return false;
      } else if (typeof container.key != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'key' definition of a container in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof container.key +
            '.'
        );
        return false;
      }
      // Check container.max_width
      if (container.max_width == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'container' definition for one of your container settings (type string)."
        );
        return false;
      } else if (typeof container.max_width != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'container' definition of a container in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof container.max_width +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate containers
    var containerArray = settings.styles.tokens.containers.map(function (item) {
      return item.key;
    });
    if (checkDuplicates(settings, 'containers', containerArray) === false) {
      return false;
    }

    // Validate fonts
    if (settings.styles.tokens.fonts == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'fonts' definition (type array)."
      );
      return false;
    } else if (Array.isArray(settings.styles.tokens.fonts) === false) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'fonts' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let font of settings.styles.tokens.fonts) {
      // Check font.key
      if (font.key == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'key' definition for one of your font settings (type string)."
        );
        return false;
      } else if (typeof font.key != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'key' definition of a font in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof font.key +
            '.'
        );
        return false;
      }
      // Check font.family
      if (font.family == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'font' definition for one of your font settings (type string)."
        );
        return false;
      } else if (typeof font.family != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'font' definition of a font in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof font.family +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate fonts
    var fontArray = settings.styles.tokens.fonts.map(function (item) {
      return item.key;
    });
    if (checkDuplicates(settings, 'fonts', fontArray) === false) {
      return false;
    }

    // Validate gradients
    if (settings.styles.tokens.gradients == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'gradients' definition (type array)."
      );
      return false;
    } else if (Array.isArray(settings.styles.tokens.gradients) === false) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'gradients' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let gradient of settings.styles.tokens.gradients) {
      // Check gradient.key
      if (gradient.key == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'key' definition for one of your gradient settings (type string)."
        );
        return false;
      } else if (typeof gradient.key != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'key' definition of a gradient in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof gradient.key +
            '.'
        );
        return false;
      }
      // Check gradient.gradient
      if (gradient.gradient == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'gradient' definition for one of your gradient settings (type string)."
        );
        return false;
      } else if (typeof gradient.gradient != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'gradient' definition of a gradient in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof gradient.gradient +
            '.'
        );
        return false;
      }
      // Check gradient.fallback
      if (gradient.fallback == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'fallback' definition for one of your gradient settings (type string)."
        );
        return false;
      } else if (typeof gradient.fallback != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'fallback' definition of a gradient in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof gradient.fallback +
            '.'
        );
        return false;
      }
    }
    // Check for duplicates between colors and gradients
    var gradientArray = settings.styles.tokens.gradients.map(function (item) {
      return item.key;
    });
    if (checkDuplicates(settings, 'gradients', gradientArray) === false) {
      return false;
    }
    for (let color of colorArray) {
      for (let gradient of gradientArray) {
        if (color === gradient) {
          h2_error_detail(
            'configuration',
            null,
            [settings.path],
            "A 'gradient' definition in your hydrogen.config.json file contains a key that is already in use by a color definition: " +
              color.red +
              '.'
          );
          return false;
        }
      }
    }

    // Validate media and check for a base query and make sure it's the only one
    if (settings.styles.foundations.media == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'media' definition (type array)."
      );
      return false;
    } else if (Array.isArray(settings.styles.foundations.media) === false) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'media' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    var baseQuery = false;
    for (let query of settings.styles.foundations.media) {
      // Check media.key
      if (query.key == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'key' definition for one of your media settings (type string)."
        );
        return false;
      } else if (
        query.key == 'dark' ||
        query.key == 'id' ||
        query.key == 'class' ||
        query.key == 'children' ||
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
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "You've defined a media query using a key (" +
            query.key.red +
            ') that is reserved. Please use a different key.'
        );
        return false;
      } else if (typeof query.key != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'key' definition of a media in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.key +
            '.'
        );
        return false;
      }
      // Check to see if the query key is repeated in other queries
      for (let queryCheck of settings.styles.foundations.media) {
        if (queryCheck.key != query.key && queryCheck.key.endsWith(query.key)) {
          h2_error_detail(
            'configuration',
            null,
            [settings.path],
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
          h2_error_detail(
            'configuration',
            null,
            [settings.path],
            "You can only have one query set to 'null' representing your base query in your hydrogen.config.json file."
          );
          return false;
        }
      } else if (typeof query.query != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'query' definition of a media query in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof radius.radius +
            '.'
        );
        return false;
      }
    }
    if (baseQuery === false) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "Your hydrogen.config.json file is missing a base media query. Please define a query and set it's value to 'null' or 'base' to continue."
      );
      return false;
    }
    // Check for duplicate queries
    var mediaArray = settings.styles.foundations.media.map(function (item) {
      return item.key;
    });
    if (checkDuplicates(settings, 'media', mediaArray) === false) {
      return false;
    }

    // Validate radius
    if (settings.styles.tokens.radii == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'radius' definition (type array)."
      );
      return false;
    } else if (Array.isArray(settings.styles.tokens.radii) === false) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'radius' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let radius of settings.styles.tokens.radii) {
      // Check radius.key
      if (radius.key == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'key' definition for one of your radius settings (type string)."
        );
        return false;
      } else if (typeof radius.key != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'key' definition of a radius in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof radius.key +
            '.'
        );
        return false;
      }
      // Check radius.radius
      if (radius.radius == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'radius' definition for one of your radius settings (type string)."
        );
        return false;
      } else if (typeof radius.radius != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'radius' definition of a radius in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof radius.radius +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate radii
    var radiusArray = settings.styles.tokens.radii.map(function (item) {
      return item.key;
    });
    if (checkDuplicates(settings, 'radius', radiusArray) === false) {
      return false;
    }

    // Validate shadows
    if (settings.styles.tokens.shadows == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'shadows' definition (type array)."
      );
      return false;
    } else if (Array.isArray(settings.styles.tokens.shadows) === false) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'shadows' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let shadow of settings.styles.tokens.shadows) {
      // Check shadow.key
      if (shadow.key == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'key' definition for one of your shadow settings (type string)."
        );
        return false;
      } else if (typeof shadow.key != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'key' definition of a shadow in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof shadow.key +
            '.'
        );
        return false;
      }
      // Check shadow.shadow
      if (shadow.shadow == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'shadow' definition for one of your shadow settings (type string)."
        );
        return false;
      } else if (typeof shadow.shadow != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'shadow' definition of a shadow in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof shadow.shadow +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate shadows
    var shadowArray = settings.styles.tokens.shadows.map(function (item) {
      return item.key;
    });
    if (checkDuplicates(settings, 'shadow', shadowArray) === false) {
      return false;
    }

    // Validate transitions
    if (settings.styles.tokens.transitions == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg +
          "a 'transitions' definition for one of your color settings (type object)."
      );
      return false;
    } else if (typeof settings.styles.tokens.transitions != 'object') {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'transitions' definition in your hydrogen.config.json file must be an object. You've set a(n) " +
          typeof settings.styles.tokens.transitions +
          '.'
      );
      return false;
    }
    // Validate transition durations
    if (settings.styles.tokens.transitions.durations == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg +
          "a 'transitions.durations' definition for one of your transition settings (type array)."
      );
      return false;
    } else if (
      Array.isArray(settings.styles.tokens.transitions.durations) === false
    ) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'transitions.durations' definition in your hydrogen.config.json file must be an array. You've set a(n) " +
          typeof settings.styles.tokens.transitions.durations +
          '.'
      );
      return false;
    }
    for (let duration of settings.styles.tokens.transitions.durations) {
      // Check duration.key
      if (duration.key == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'key' definition for one of your transitions.durations settings (type string)."
        );
        return false;
      } else if (typeof duration.key != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'key' definition of a transitions.durations setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof duration.key +
            '.'
        );
        return false;
      }
      // Check duration.duration
      if (duration.duration == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'duration' definition for one of your transitions.durations settings (type string)."
        );
        return false;
      } else if (typeof duration.duration != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'duration' definition of a transitions.durations setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof duration.duration +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate durations
    var durationArray = settings.styles.tokens.transitions.durations.map(
      function (item) {
        return item.key;
      }
    );
    if (
      checkDuplicates(settings, 'transitions.durations', durationArray) ===
      false
    ) {
      return false;
    }
    // Validate transition functions
    if (settings.styles.tokens.transitions.functions == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg +
          "a 'transitions.functions' definition for one of your transition settings (type array)."
      );
      return false;
    } else if (
      Array.isArray(settings.styles.tokens.transitions.functions) === false
    ) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'transitions.functions' definition in your hydrogen.config.json file must be an array. You've set a(n) " +
          typeof settings.styles.tokens.transitions.functions +
          '.'
      );
      return false;
    }
    for (let transitionFunction of settings.styles.tokens.transitions
      .functions) {
      // Check function.key
      if (transitionFunction.key == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'key' definition for one of your transitions.functions settings (type string)."
        );
        return false;
      } else if (typeof transitionFunction.key != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'key' definition of a transitions.functions setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof transitionFunction.key +
            '.'
        );
        return false;
      }
      // Check function.function
      if (transitionFunction.function == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'function' definition for one of your transitions.functions settings (type string)."
        );
        return false;
      } else if (typeof transitionFunction.function != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'function' definition of a transitions.functions setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof transitionFunction.function +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate functions
    var functionArray = settings.styles.tokens.transitions.functions.map(
      function (item) {
        return item.key;
      }
    );
    if (
      checkDuplicates(settings, 'transitions.functions', functionArray) ===
      false
    ) {
      return false;
    }
    // Validate transition delays
    if (settings.styles.tokens.transitions.delays == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg +
          "a 'transitions.delays' definition for one of your transition settings (type array)."
      );
      return false;
    } else if (
      Array.isArray(settings.styles.tokens.transitions.delays) === false
    ) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'transitions.delays' definition in your hydrogen.config.json file must be an array. You've set a(n) " +
          typeof settings.styles.tokens.transitions.delays +
          '.'
      );
      return false;
    }
    for (let delay of settings.styles.tokens.transitions.delays) {
      // Check delay.key
      if (delay.key == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'key' definition for one of your transitions.delays settings (type string)."
        );
        return false;
      } else if (typeof delay.key != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'key' definition of a transitions.delays setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof delay.key +
            '.'
        );
        return false;
      }
      // Check delay.delay
      if (delay.delay == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'delay' definition for one of your transitions.delays settings (type string)."
        );
        return false;
      } else if (typeof delay.delay != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'delay' definition of a transitions.delays setting in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof delay.delay +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate delays
    var delayArray = settings.styles.tokens.transitions.delays.map(function (
      item
    ) {
      return item.key;
    });
    if (checkDuplicates(settings, 'transitions.delays', delayArray) === false) {
      return false;
    }

    // Validate typography
    if (settings.styles.foundations.typography == null) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        defaultMsg + "a 'typography' definition (type array)."
      );
      return false;
    } else if (
      Array.isArray(settings.styles.foundations.typography) === false
    ) {
      h2_error_detail(
        'configuration',
        null,
        [settings.path],
        "The 'typography' definition in your hydrogen.config.json file must be an array."
      );
      return false;
    }
    for (let query of settings.styles.foundations.typography) {
      // Check query.size
      if (query.size == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'size' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.size != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'size' definition of a typography in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.size +
            '.'
        );
        return false;
      }
      // Check query.line_height
      if (query.line_height == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'line_height' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.line_height != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'line_height' definition of a typography in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.line_height +
            '.'
        );
        return false;
      }
      // Check query.query_key and that it matches an existing media query
      if (query.query_key == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'query_key' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.query_key != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
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
          h2_error_detail(
            'configuration',
            null,
            [settings.path],
            "A 'query_key' definition (" +
              query.query_key.red +
              ") inside of your typography settings in your hydrogen.config.json file doesn't match any of your media query settings. Please ensure that it matches at least one of your defined media queries."
          );
          return false;
        }
      }
      // Check type_scale
      if (query.type_scale == null) {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          defaultMsg +
            "a 'type_scale' definition for one of your typography settings (type string)."
        );
        return false;
      } else if (typeof query.type_scale != 'string') {
        h2_error_detail(
          'configuration',
          null,
          [settings.path],
          "The 'type_scale' definition of a typography in your hydrogen.config.json file must be a string. You've set a(n) " +
            typeof query.type_scale +
            '.'
        );
        return false;
      }
    }
    // Check for duplicate query_keys
    var typeArray = settings.styles.foundations.typography.map(function (item) {
      return item.query_key;
    });
    if (checkDuplicates(settings, 'typography', typeArray) === false) {
      return false;
    }
    return true;
  } catch (error) {
    // Catch any errors ========================================================
    log_info(
      'error',
      'Unknown error',
      'Validating settings',
      null,
      null,
      null,
      [settings.path],
      error
    );
    return false;
  }
}

module.exports = {
  validate_settings,
  validate_settings_new,
};
