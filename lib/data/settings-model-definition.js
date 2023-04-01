/**
 * @typedef {object} Info
 * @prop {string} [code]
 * @prop {string} [docs]
 * @prop {string} [feedback]
 * @prop {string} [roadmap]
 * @prop {string} [settings]
 */

/**
 * @typedef {object} Config
 * @prop {string} path
 * @prop {string} directory
 */

/**
 * @typedef {object} ParsedPaths
 * @prop {string[]} array
 * @prop {string} glob
 * @prop {string} string
 */

/**
 * @typedef {object} Input
 * @prop {string[]} raw
 * @prop {ParsedPaths} parsed
 */

/**
 * @typedef {object} Output
 * @prop {string[]} raw
 * @prop {ParsedPaths} parsed
 */

/**
 * @typedef {object} Dark
 * @prop {boolean} auto_apply_styles
 * @prop {boolean} swap_default_modifiers
 */

/**
 * @typedef {object} Contrast
 * @prop {boolean} auto_apply_styles
 */

/**
 * @typedef {object} Modes
 * @prop {"preference" | "toggle"} method
 * @prop {Dark} dark
 * @prop {Contrast} contrast
 */

/**
 * @typedef {object} Processing
 * @prop {boolean} wrapper
 * @prop {boolean} minify_css
 * @prop {boolean} browser_prefix_css
 * @prop {boolean} include_reset_css
 * @prop {boolean} export_variable_file
 * @prop {float} default_line_height
 */

/**
 * @typedef {object} Errors
 * @prop {number} count
 */

/**
 * @typedef {object} Warnings
 * @prop {number} count
 */

/**
 * @typedef {object} Logging
 * @prop {boolean} generate_logs
 * @prop {boolean} show_timers
 * @prop {boolean} verbose_console_output
 * @prop {Errors} errors
 * @prop {Warnings} warnings
 * @prop {boolean} clean
 * @prop {string} time
 * @prop {string} directory
 */

/**
 * @typedef {object} Query
 * @prop {string} key
 * @prop {string} query
 */

/**
 * @typedef {object} Media
 * @prop {string} base_key
 * @prop {Query[]} queries
 */

/**
 * @typedef {object} Typography
 * @prop {string} query_key
 * @prop {string} size
 * @prop {string} type_scale
 * @prop {{caption: undefined | "auto" | string, copy: undefined | "auto" | string, h6: undefined | "auto" | string, h5: undefined | "auto" | string, h4: undefined | "auto" | string, h3: undefined | "auto" | string, h2: undefined | "auto" | string, h1: undefined | "auto" | string, display: undefined | "auto" | string}} line_heights
 * @prop {string} query
 * @prop {{size: string, line_height: float}} caption
 * @prop {{size: string, line_height: string}} copy
 * @prop {{size: string, line_height: float}} h6
 * @prop {{size: string, line_height: float}} h5
 * @prop {{size: string, line_height: float}} h4
 * @prop {{size: string, line_height: float}} h3
 * @prop {{size: string, line_height: float}} h2
 * @prop {{size: string, line_height: float}} h1
 * @prop {{size: string, line_height: float}} display
 * @prop {string} line_height
 */

/**
 * @typedef {object} VariableData
 * @prop {string | null} name
 * @prop {string | null} value
 */

/**
 * @typedef {object} Modifier
 * @prop {string} key
 * @prop {boolean} default
 * @prop {boolean} overwritten
 * @prop {string | false} color
 * @prop {VariableData} var_data
 */

/**
 * @typedef {object} ColorSetting
 * @prop {string} color
 * @prop {Modifier[]} [modifiers]
 */

/**
 * @typedef {object} Color
 * @prop {string} key
 * @prop {VariableData} var_data
 * @prop {ColorSetting} default
 * @prop {ColorSetting} [dark]
 * @prop {ColorSetting} [contrast]
 */

/**
 * @typedef {object} ContainerSetting
 * @prop {string} max_width
 */

/**
 * @typedef {object} Container
 * @prop {string} key
 * @prop {ContainerSetting} default
 * @prop {ContainerSetting} [dark]
 * @prop {ContainerSetting} [contrast]
 */

/**
 * @typedef {object} FontFamilySetting
 * @prop {string} family
 */

/**
 * @typedef {object} FontFamily
 * @prop {string} key
 * @prop {FontFamilySetting} default
 * @prop {FontFamilySetting} [dark]
 * @prop {FontFamilySetting} [contrast]
 */

/**
 * @typedef {object} GradientSetting
 * @prop {string} gradient
 * @prop {string} fallback
 */

/**
 * @typedef {object} Gradient
 * @prop {string} key
 * @prop {GradientSetting} default
 * @prop {GradientSetting} [dark]
 * @prop {GradientSetting} [contrast]
 */

/**
 * @typedef {object} RadiusSetting
 * @prop {string} radius
 */

/**
 * @typedef {object} Radius
 * @prop {string} key
 * @prop {RadiusSetting} default
 * @prop {RadiusSetting} [dark]
 * @prop {RadiusSetting} [contrast]
 */

/**
 * @typedef {object} ShadowSetting
 * @prop {string} shadow
 */

/**
 * @typedef {object} Shadow
 * @prop {string} key
 * @prop {ShadowSetting} default
 * @prop {ShadowSetting} [dark]
 * @prop {ShadowSetting} [contrast]
 */

/**
 * @typedef {object} DurationSetting
 * @prop {string} duration
 */

/**
 * @typedef {object} Duration
 * @prop {string} key
 * @prop {DurationSetting} default
 * @prop {DurationSetting} [dark]
 * @prop {DurationSetting} [contrast]
 */

/**
 * @typedef {object} FunctionSetting
 * @prop {string} function
 */

/**
 * @typedef {object} Function
 * @prop {string} key
 * @prop {FunctionSetting} default
 * @prop {FunctionSetting} [dark]
 * @prop {FunctionSetting} [contrast]
 */

/**
 * @typedef {object} DelaySetting
 * @prop {string} delay
 */

/**
 * @typedef {object} Delay
 * @prop {string} key
 * @prop {DelaySetting} default
 * @prop {DelaySetting} [dark]
 * @prop {DelaySetting} [contrast]
 */

/**
 * @typedef {object} Transitions
 * @prop {Duration[]} [durations]
 * @prop {Function[]} [functions]
 * @prop {Delay[]} [delays]
 */

/**
 * @typedef {object} Theme
 * @prop {string} key
 * @prop {Typography[]} typography
 * @prop {Color[]} [colors]
 * @prop {Container[]} [containers]
 * @prop {Font[]} [fonts]
 * @prop {Gradient[]} [gradients]
 * @prop {Radius[]} [radii]
 * @prop {Shadow[]} [shadows]
 * @prop {Transitions} [transitions]
 */

/**
 * The transformed settings model that stores both user configurations and runtime data
 * @version 2.0.0-beta.30
 * @typedef {object} Settings
 * @prop {Info} [info]
 * @prop {Config} config
 * @prop {Input} input
 * @prop {Output} output
 * @prop {Modes} modes
 * @prop {Processing} processing
 * @prop {Logging} logging
 * @prop {Media} media
 * @prop {Object<string,Theme>} themes
 */

/**
 * A temporary data store for warnings and errors that mimics the settings' logging object
 * @typedef {object} TempLogging
 * @prop {Logging} logging
 */

module.exports = {};
