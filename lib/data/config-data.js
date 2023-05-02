// Hydrogen
'use strict';

// Data models
/**
 * The configurable options provided to end users
 * @typedef {object} Config
 * @prop {Input} input
 * @prop {Output} output
 * @prop {Modes} [modes]
 * @prop {Processing} [processing]
 * @prop {Logging} [logging]
 * @prop {Media} [media]
 * @prop {Theme[]} [themes]
 *
 * @typedef {object} ParsedConfig
 * @prop {ParsedPath} path
 * @prop {ParsedInput} input
 * @prop {ParsedOutput} output
 * @prop {Modes} modes
 * @prop {Processing} processing
 * @prop {ParsedLogging} logging
 * @prop {Media} media
 * @prop {Object<string,ParsedTheme>} themes
 */
/**
 * @typedef {object} ParsedPath
 * @prop {string} path
 * @prop {string} directory
 */
/**
 * An array of paths that Hydrogen should parse
 * @typedef {string[]} Input
 *
 * @typedef {object} ParsedInput
 * @prop {string[]} raw
 * @prop {object} parsed
 * @prop {string[]} parsed.array
 * @prop {string} parsed.string
 * @prop {string} parsed.glob
 */
/**
 * The path to the output directory in which Hydrogen will place its CSS
 * @typedef {string} Output
 *
 * @typedef {object} ParsedOutput
 * @prop {string} raw
 * @prop {object} parsed
 * @prop {string[]} parsed.array
 * @prop {string} parsed.string
 * @prop {string} parsed.glob
 */
/**
 * @typedef {object} Modes
 * @prop {"preference" | "toggle"} [method]
 * @prop {DarkMode} [dark]
 */
/**
 * @typedef {object} DarkMode
 * @prop {boolean} [auto_apply_styles]
 * @prop {boolean} [swap_default_modifiers]
 */
/**
 * @typedef {object} Processing
 * @prop {boolean} browser_prefix_css
 * @prop {boolean} export_variable_file
 * @prop {boolean} include_reset_css
 * @prop {boolean} minify_css
 */
/**
 * @typedef {object} Logging
 * @prop {boolean} generate_logs
 * @prop {boolean} show_timers
 * @prop {boolean} verbose_console_output
 *
 * @typedef {object} ParsedLogging
 * @prop {boolean} generate_logs
 * @prop {boolean} show_timers
 * @prop {boolean} verbose_console_output
 * @prop {{count: number, storage: Error[]}} errors
 * @prop {{count: number, storage: Error[]}} warnings
 * @prop {boolean} clean
 * @prop {string} time
 * @prop {string} directory
 */
/**
 * @typedef {object} Media
 * @prop {string} [base_key]
 * @prop {Query[]} [queries]
 */
/**
 * @typedef {object} Query
 * @prop {string} key
 * @prop {string} query
 */
/**
 * @typedef {object} Theme
 * @prop {string} key
 * @prop {Typography[]} [typography]
 * @prop {Color[]} [colors]
 * @prop {Container[]} [containers]
 * @prop {FontFamily[]} [fonts]
 * @prop {Gradient[]} [gradients]
 * @prop {Radius[]} [radii]
 * @prop {Shadow[]} [shadows]
 * @prop {Transitions} [transitions]
 *
 * @typedef {object} ParsedTheme
 * @prop {string} key
 * @prop {ParsedTypography[]} [typography]
 * @prop {ParsedColor[]} [colors]
 * @prop {Container[]} [containers]
 * @prop {FontFamily[]} [fonts]
 * @prop {Gradient[]} [gradients]
 * @prop {Radius[]} [radii]
 * @prop {Shadow[]} [shadows]
 * @prop {Transitions} [transitions]
 */
/**
 * @typedef {object} Typography
 * @prop {string} query_key
 * @prop {string} size
 * @prop {string | number} type_scale
 * @prop {LineHeights} [line_heights]
 *
 * @typedef {object} ParsedTypography
 * @prop {string} query_key
 * @prop {string} size
 * @prop {string | number} type_scale
 * @prop {LineHeights} [line_heights]
 * @prop {string} query
 * @prop {object} caption
 * @prop {string} caption.size
 * @prop {string | number} caption.line_height
 * @prop {object} body
 * @prop {string} body.size
 * @prop {string | number} body.line_height
 * @prop {object} h6
 * @prop {string} h6.size
 * @prop {string | number} h6.line_height
 * @prop {object} h5
 * @prop {string} h5.size
 * @prop {string | number} h5.line_height
 * @prop {object} h4
 * @prop {string} h4.size
 * @prop {string | number} h4.line_height
 * @prop {object} h3
 * @prop {string} h3.size
 * @prop {string | number} h3.line_height
 * @prop {object} h2
 * @prop {string} h2.size
 * @prop {string | number} h2.line_height
 * @prop {object} h1
 * @prop {string} h1.size
 * @prop {string | number} h1.line_height
 * @prop {object} display
 * @prop {string} display.size
 * @prop {string | number} display.line_height
 */
/**
 * @typedef {object} LineHeights
 * @prop {"auto" | string | number} [caption]
 * @prop {"auto" | string | number} [body]
 * @prop {"auto" | string | number} [h6]
 * @prop {"auto" | string | number} [h5]
 * @prop {"auto" | string | number} [h4]
 * @prop {"auto" | string | number} [h3]
 * @prop {"auto" | string | number} [h2]
 * @prop {"auto" | string | number} [h1]
 * @prop {"auto" | string | number} [display]
 */
/**
 * @typedef {object} Color
 * @prop {string} key
 * @prop {object} default The theme settings for the default color mode
 * @prop {string} default.color
 * @prop {Modifier[]} [default.modifiers]
 * @prop {object} [dark] The theme settings for dark mode
 * @prop {string} dark.color
 * @prop {Modifier[]} [dark.modifiers]
 *
 * @typedef {object} ParsedColor
 * @prop {string} key
 * @prop {object} default The theme settings for the default color mode
 * @prop {string} default.color
 * @prop {ParsedModifier[]} [default.modifiers]
 * @prop {object} [dark] The theme settings for dark mode
 * @prop {string} dark.color
 * @prop {ParsedModifier[]} [dark.modifiers]
 * @prop {object} var_data
 * @prop {string | null} var_data.name
 * @prop {string | null} var_data.value
 */
/**
 * @typedef {object} Modifier
 * @prop {string} key
 * @prop {string} color
 *
 * @typedef {object} ParsedModifier
 * @prop {string} key
 * @prop {string | false} color
 * @prop {object} var_data
 * @prop {string | null} var_data.name
 * @prop {string | null} var_data.value
 * @prop {boolean} default
 * @prop {boolean} overwritten
 */
/**
 * @typedef {object} Container
 * @prop {string} key
 * @prop {object} default The theme settings for the default color mode
 * @prop {string} default.max_width
 * @prop {object} [dark] The theme settings for dark mode
 * @prop {string} dark.max_width
 */
/**
 * @typedef {object} FontFamily
 * @prop {string} key
 * @prop {object} default The theme settings for the default color mode
 * @prop {string} default.family
 * @prop {object} [dark] The theme settings for dark mode
 * @prop {string} dark.family
 */
/**
 * @typedef {object} Gradient
 * @prop {string} key
 * @prop {object} default The theme settings for the default color mode
 * @prop {string} default.gradient
 * @prop {object} [dark] The theme settings for dark mode
 * @prop {string} dark.gradient
 */
/**
 * @typedef {object} Radius
 * @prop {string} key
 * @prop {object} default The theme settings for the default color mode
 * @prop {string} default.radius
 * @prop {object} [dark] The theme settings for dark mode
 * @prop {string} dark.radius
 */
/**
 * @typedef {object} Shadow
 * @prop {string} key
 * @prop {object} default The theme settings for the default color mode
 * @prop {string} default.shadow
 * @prop {object} [dark] The theme settings for dark mode
 * @prop {string} dark.shadow
 */
/**
 * @typedef {object} Transitions
 * @prop {TransitionDuration[]} [durations]
 * @prop {TransitionFunction[]} [functions]
 * @prop {TransitionDelay[]} [delays]
 */
/**
 * @typedef {object} TransitionDuration
 * @prop {string} key
 * @prop {object} default The theme settings for the default color mode
 * @prop {string} default.duration
 * @prop {object} [dark] The theme settings for dark mode
 * @prop {string} dark.duration
 */
/**
 * @typedef {object} TransitionFunction
 * @prop {string} key
 * @prop {object} default The theme settings for the default color mode
 * @prop {string} default.function
 * @prop {object} [dark] The theme settings for dark mode
 * @prop {string} dark.function
 */
/**
 * @typedef {object} TransitionDelay
 * @prop {string} key
 * @prop {object} default The theme settings for the default color mode
 * @prop {string} default.delay
 * @prop {object} [dark] The theme settings for dark mode
 * @prop {string} dark.delay
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Returns Hydrogen's default settings as a config object.
 *
 * @returns {Config}
 */
function get_default_config() {
  /** @type {Config} */
  let defaults = {
    info: {
      code: 'https://github.com/hydrogen-css/hydrogen',
      docs: 'https://hydrogen.design/',
      feedback: 'https://forms.office.com/r/vz80dsUabZ',
      roadmap: 'https://workflowy.com/s/hydrogen/7Gjmdbjiqc0Wst1R',
      settings: 'https://hydrogen.design/en/docs/configuration/',
    },
    /** @type {Input} */
    input: ['array/of/input/folders'],
    /** @type {Output} */
    output: 'path/to/output/folder',
    /** @type {Modes} */
    modes: {
      method: 'preference',
      /** @type {DarkMode} */
      dark: {
        auto_apply_styles: true,
        swap_default_modifiers: true,
      },
    },
    /** @type {Processing} */
    processing: {
      include_reset_css: true,
      browser_prefix_css: true,
      minify_css: true,
      export_variable_file: false,
    },
    /** @type {Logging} */
    logging: {
      generate_logs: false,
      show_timers: true,
      verbose_console_output: true,
    },
    /** @type {Media} */
    media: {
      base_key: 'base',
      /** @type {Query[]} */
      queries: [
        {
          key: 'print',
          query: 'print',
        },
        {
          key: 'p-tablet',
          query: 'screen and (min-width: 48em)',
        },
        {
          key: 'l-tablet',
          query: 'screen and (min-width: 73em)',
        },
        {
          key: 'laptop',
          query: 'screen and (min-width: 80em)',
        },
        {
          key: 'desktop',
          query: 'screen and (min-width: 100em)',
        },
      ],
    },
    /** @type {Theme[]} */
    themes: [
      {
        key: 'default',
        /** @type {Typography[]} */
        typography: [
          {
            query_key: 'base',
            size: '100%',
            type_scale: '1.15',
            /** @type {LineHeights} */
            line_heights: {
              caption: '1.5',
              body: '1.45',
              h6: '1.1',
              h5: '1.1',
              h4: '1.1',
              h3: '1.1',
              h2: '1.1',
              h1: '1.1',
              display: '1.1',
            },
          },
          {
            query_key: 'laptop',
            size: '100%',
            type_scale: '1.2',
            /** @type {LineHeights} */
            line_heights: {
              caption: '1.5',
              body: '1.45',
              h6: '1.1',
              h5: '1.1',
              h4: '1.1',
              h3: '1.1',
              h2: '1.1',
              h1: '1.1',
              display: '1.1',
            },
          },
          {
            query_key: 'desktop',
            size: '112.5%',
            type_scale: '1.2',
            /** @type {LineHeights} */
            line_heights: {
              caption: '1.5',
              body: '1.45',
              h6: '1.1',
              h5: '1.1',
              h4: '1.1',
              h3: '1.1',
              h2: '1.1',
              h1: '1.1',
              display: '1.1',
            },
          },
        ],
        /** @type {Color[]} */
        colors: [
          {
            key: 'white',
            default: {
              color: 'rgba(255, 255, 255, 1)',
              /** @type {Modifier[]} */
              modifiers: [],
            },
            dark: {
              color: '#212130',
              /** @type {Modifier[]} */
              modifiers: [],
            },
          },
          {
            key: 'black',
            default: {
              color: '#212130',
              /** @type {Modifier[]} */
              modifiers: [],
            },
            dark: {
              color: 'rgba(255, 255, 255, 1)',
              /** @type {Modifier[]} */
              modifiers: [],
            },
          },
          {
            key: 'primary',
            default: {
              color: '#9D5CFF',
              /** @type {Modifier[]} */
              modifiers: [],
            },
          },
          {
            key: 'secondary',
            default: {
              color: '#53FFE0',
              /** @type {Modifier[]} */
              modifiers: [],
            },
          },
          {
            key: 'focus',
            default: {
              color: '#fbce3a',
              /** @type {Modifier[]} */
              modifiers: [],
            },
          },
          {
            key: 'error',
            default: {
              color: 'red',
              /** @type {Modifier[]} */
              modifiers: [],
            },
          },
          {
            key: 'warning',
            default: {
              color: 'orange',
              /** @type {Modifier[]} */
              modifiers: [],
            },
          },
          {
            key: 'success',
            default: {
              color: 'green',
              /** @type {Modifier[]} */
              modifiers: [],
            },
          },
        ],
        /** @type {Container[]} */
        containers: [
          {
            key: 'small',
            default: {
              max_width: '39rem',
            },
          },
          {
            key: 'medium',
            default: {
              max_width: '75rem',
            },
          },
          {
            key: 'large',
            default: {
              max_width: '90rem',
            },
          },
        ],
        /** @type {FontFamily[]} */
        fonts: [
          {
            key: 'sans',
            default: {
              family: 'sans-serif',
            },
          },
          {
            key: 'serif',
            default: {
              family: 'serif',
            },
          },
          {
            key: 'script',
            default: {
              family: 'script',
            },
          },
          {
            key: 'mono',
            default: {
              family: 'monospace',
            },
          },
        ],
        /** @type {Gradient[]} */
        gradients: [],
        /** @type {Radius[]} */
        radii: [],
        /** @type {Shadow[]} */
        shadows: [
          {
            key: 'small',
            default: {
              shadow: '0 0.1rem 0.2rem 0 rgba(0, 0, 0, .2)',
            },
            dark: {
              shadow: '0 0.1rem 0.2rem 0 rgba(0, 0, 0, .8)',
            },
          },
          {
            key: 'medium',
            default: {
              shadow: '0 0.25rem 0.5rem -0.05rem rgba(0, 0, 0, .2)',
            },
            dark: {
              shadow: '0 0.25rem 0.5rem -0.05rem rgba(0, 0, 0, .8)',
            },
          },
          {
            key: 'large',
            default: {
              shadow: '0 0.4rem 0.7rem -0.1rem rgba(0, 0, 0, .2)',
            },
            dark: {
              shadow: '0 0.4rem 0.7rem -0.1rem rgba(0, 0, 0, .8)',
            },
          },
          {
            key: 'larger',
            default: {
              shadow: '0 0.55rem 1rem -0.2rem rgba(0, 0, 0, .2)',
            },
            dark: {
              shadow: '0 0.55rem 1rem -0.2rem rgba(0, 0, 0, .8)',
            },
          },
          {
            key: 'largest',
            default: {
              shadow: '0 0.7rem 1.5rem -0.3rem rgba(0, 0, 0, .2)',
            },
            dark: {
              shadow: '0 0.7rem 1.5rem -0.3rem rgba(0, 0, 0, .8)',
            },
          },
        ],
        /** @type {Transitions} */
        transitions: {
          /** @type {TransitionDuration[]} */
          durations: [],
          /** @type {TransitionFunction[]} */
          functions: [],
          /** @type {TransitionDelay[]} */
          delays: [],
        },
      },
    ],
  };
  return defaults;
}

/**
 * A centralized function that returns Hydrogen's default line height setting.
 *
 * @returns {number}
 */
function get_default_line_height() {
  return 1.45;
}

module.exports = {
  get_default_config,
  get_default_line_height,
};
