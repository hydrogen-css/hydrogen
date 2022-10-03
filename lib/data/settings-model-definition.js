/**
 * @typedef {object} SettingsInfo
 * @prop {string} [code]
 * @prop {string} [docs]
 * @prop {string} [feedback]
 * @prop {string} [roadmap]
 * @prop {string} [settings]
 */

/**
 * @typedef {object} SettingsRuntimeSettings
 * @prop {string} directory
 * @prop {string} path
 */

/**
 * @typedef {object} SettingsRuntimeInput
 * @prop {string[]} array
 * @prop {string} string
 * @prop {string} glob
 */

/**
 * @typedef {object} SettingsRuntimeOutput
 * @prop {string[]} array
 * @prop {string} string
 * @prop {string} glob
 */

/**
 * @typedef {object} SettingsRuntimeLogging
 * @prop {boolean} clean
 * @prop {string} time
 * @prop {string} directory
 */

/**
 * @typedef {object} SettingsRuntime
 * @prop {SettingsRuntimeSettings} settings
 * @prop {SettingsRuntimeInput} input
 * @prop {SettingsRuntimeOutput} output
 * @prop {SettingsRuntimeLogging} logging
 */

/**
 * @typedef {object} SettingsBuild
 * @prop {string} [base_query_key]
 * @prop {"preference" | "toggle"} [dark_mode]
 * @prop {boolean} [logs]
 * @prop {boolean} [minification]
 * @prop {boolean} [prefixing]
 * @prop {boolean} [timers]
 * @prop {boolean} [reset_styles]
 * @prop {boolean} [validation]
 * @prop {boolean} [var_export]
 */

/**
 * @typedef {object} SettingsStylesFoundationsMedia
 * @prop {string} key
 * @prop {"css media query"} query
 */

/**
 * @typedef {object} SettingsStylesFoundationsTypographyLevel
 * @prop {string} size
 * @prop {string} line_height
 */

/**
 * @typedef {object} SettingsStylesFoundationsTypography
 * @prop {"media key"} query_key
 * @prop {"css line height"} line_height
 * @prop {"css font size"} size
 * @prop {"X.XXX"} type_scale
 * @prop {string} query
 * @prop {SettingsStylesFoundationsTypographyLevel} caption
 * @prop {SettingsStylesFoundationsTypographyLevel} copy
 * @prop {SettingsStylesFoundationsTypographyLevel} h6
 * @prop {SettingsStylesFoundationsTypographyLevel} h5
 * @prop {SettingsStylesFoundationsTypographyLevel} h4
 * @prop {SettingsStylesFoundationsTypographyLevel} h3
 * @prop {SettingsStylesFoundationsTypographyLevel} h2
 * @prop {SettingsStylesFoundationsTypographyLevel} h1
 * @prop {SettingsStylesFoundationsTypographyLevel} display
 */

/**
 * @typedef {object} SettingsStylesFoundations
 * @prop {SettingsStylesFoundationsMedia[]?} [media]
 * @prop {SettingsStylesFoundationsTypography[]} typography
 */

/**
 * @typedef {object} SettingsStylesTokensColorsModifiers
 * @prop {string} key
 * @prop {"css color"} color
 */

/**
 * @typedef {object} SettingsStylesTokensColors
 * @prop {string} key
 * @prop {"css color"} color
 * @prop {SettingsStylesTokensColorsModifiers[]?} [modifiers]
 */

/**
 * @typedef {object} SettingsStylesTokensContainers
 * @prop {string} key
 * @prop {"css unit"} max_width
 */

/**
 * @typedef {object} SettingsStylesTokensFonts
 * @prop {string} key
 * @prop {"css font family"} family
 */

/**
 * @typedef {object} SettingsStylesTokensGradients
 * @prop {string} key
 * @prop {"css gradient"} gradient
 * @prop {"css color"} fallback
 */

/**
 * @typedef {object} SettingsStylesTokensRadii
 * @prop {string} key
 * @prop {"css unit"} radius
 */

/**
 * @typedef {object} SettingsStylesTokensShadows
 * @prop {string} key
 * @prop {"css shadow"} shadow
 */

/**
 * @typedef {object} SettingsStylesTokensTransitionsDurations
 * @prop {string} key
 * @prop {"css time unit"} duration
 */

/**
 * @typedef {object} SettingsStylesTokensTransitionsFunctions
 * @prop {string} key
 * @prop {"css transition function"} function
 */

/**
 * @typedef {object} SettingsStylesTokensTransitionsDelays
 * @prop {string} key
 * @prop {"css time unit"} delay
 */

/**
 * @typedef {object} SettingsStylesTokensTransitions
 * @prop {SettingsStylesTokensTransitionsDurations[]?} [durations]
 * @prop {SettingsStylesTokensTransitionsFunctions[]?} [functions]
 * @prop {SettingsStylesTokensTransitionsDelays[]?} [delays]
 */

/**
 * @typedef {object} SettingsStylesTokens
 * @prop {SettingsStylesTokensColors[]?} [colors]
 * @prop {SettingsStylesTokensContainers[]?} [containers]
 * @prop {SettingsStylesTokensFonts[]?} [fonts]
 * @prop {SettingsStylesTokensGradients[]?} [gradients]
 * @prop {SettingsStylesTokensRadii[]?} [radii]
 * @prop {SettingsStylesTokensShadows[]?} [shadows]
 * @prop {SettingsStylesTokensTransitions?} [transitions]
 */

/**
 * @typedef {object} SettingsStyles
 * @prop {SettingsStylesFoundations} foundations
 * @prop {SettingsStylesTokens?} [tokens]
 */

/**
 * Hydrogen's settings model
 * @version 2.0.0-beta.30
 * @typedef {object} Settings
 * @prop {SettingsInfo?} [info]
 * @prop {string[]} input
 * @prop {string} output
 * @prop {SettingsRuntime} runtime
 * @prop {SettingsBuild} build
 * @prop {SettingsStyles} styles
 */

module.exports = {};
