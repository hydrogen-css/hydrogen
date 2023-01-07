/**
 * @typedef {object} Properties
 * @prop {string[]} color The list of properties that support Hydrogen color functionality
 * @prop {string[]} container The list of properties that support configured containers
 * @prop {string[]} custom The list of properties that are unique to Hydrogen and have custom functionality
 * @prop {string[]} font-family The list of properties that support configured font families
 * @prop {string[]} gradient The list of properties that support configured gradients
 * @prop {string[]} radius The list of properties that support configured radius values
 * @prop {string[]} shadow The list of properties that support configured shadow values
 * @prop {string[]} space The list of properties that support Hydrogen whitespace multipliers
 * @prop {string[]} duration The list of properties that support configured transition duration values
 * @prop {string[]} timing-function The list of properties that support configured transition function values
 * @prop {string[]} delay The list of properties that support configured transition delay values
 */

/**
 * @typedef {object} Modifiers
 * @prop {string} media The media query modifier applied to this query
 * @prop {string} theme The theme applied to this query (default if none specified)
 * @prop {"default" | "all" | "dark"} mode The mode applied to this query (default if none specified)
 * @prop {string | null} state The interaction state applied to this query
 * @prop {string[] | null} selectors Selectors (ids, classes, attributes) that this query should target
 * @prop {string[] | null} children Child elements that this query should target
 * @prop {string[] | null} id DEPRECATED
 * @prop {string[] | null} class DEPRECATED
 */

/**
 * @typedef {object} Query
 * @prop {string} query The full query string
 * @prop {string} prefix The prefix values from the query (e.g. THESE(primary.30))
 * @prop {Modifiers} modifiers The parsed modifiers found inside the prefix
 * @prop {string[]} values The values found inside the query (e.g. base(THESE))
 * @prop {string[]} selectors The CSS selectors generated for this query
 */

/**
 * @typedef {object} Attribute
 * @prop {string} attribute The actual attribute found in the user's code
 * @prop {Query[]} queries The queries parsed from the attribute (e.g. data-h2-color="THESE")
 * @prop {string[]} files An array of files this exact attribute was found in
 */

/**
 * @typedef {object} PropertyModel
 * @prop {Properties} properties An object containing arrays that define which properties are processed for each Hydrogen feature
 * @prop {Object<string,Attribute[]>} attributes During processing, this object is filled with attributes found in the user's input, along with the attributes parsed information
 */

module.exports = {};
