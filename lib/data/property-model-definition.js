// 2.0.0-beta.30

/**
 * @typedef {object} PropertyKeyInstanceValueModifiers
 * @prop {string[]} children An array of child selectors
 * @prop {string} class A string containing a constructed class selector
 * @prop {string} id A string containing a constructed class selector
 * @prop {string} media The media query associated with this query
 * @prop {string} mode The mode (i.e. dark) associated with this query
 * @prop {string} state The state associated with this query
 */

/**
 * @typedef {object} PropertyKeyInstanceValues
 * @prop {PropertyKeyInstanceValueModifiers} modifiers An object containing information on the modifiers linked to this query
 * @prop {string[]} options The options passed to the query (data-h2-property="base(THESE)")
 * @prop {string} prefix The full prefix string of the query (data-h2-property="THIS(options)")
 * @prop {string} query A string of the full query being parsed (data-h2-property="THIS, ...")
 * @prop {string[]} selectors An array containing the selectors built for this query
 */

/**
 * @typedef {object} PropertyKeyInstances
 * @prop {string} attribute The full attribute
 * @prop {string[]} files An array of file paths this attribute was found in
 * @prop {PropertyKeyInstanceValues[]} values An array of individual query objects containing parsed data for the query
 */

/**
 * @typedef {object} PropertyKeys
 * @prop {string} name A string containing the property name (data-h2-THIS="media:modifiers(options)")
 * @prop {PropertyKeyInstances[]} instances An array of instances of the property being called using this key
 */

/**
 * @typedef {object} PropertySyntaxOptionTypes
 * @prop {string[]} css An array containing CSS values that this syntax accepts
 * @prop {string[]} tokens An array containing Hydrogen token values that this syntax accepts
 */

/**
 * @typedef {object} PropertySyntaxOptions
 * @prop {boolean} required Whether this syntax option is required or not
 * @prop {PropertySyntaxOptionTypes[]} types The types of values available to this syntax option
 * @prop {string} value The documented name of the option (data-h2-property="media:modifiers(THIS)")
 */

/**
 * @typedef {object} PropertySyntaxes
 * @prop {boolean} default Whether this syntax is the default syntax for documentation purposes
 * @prop {PropertySyntaxOptions[]} options An array of options available to this syntax
 */

/**
 * @typedef {object} PropertyTitle
 * @prop {string} en The english name of this property
 * @prop {string} fr The french name of this property
 */

/**
 * @typedef {object} Property
 * @prop {string} group The property's classified group in the documentation
 * @prop {string} id The property's unique id
 * @prop {string[]} incompatibilities An array containing ids of other properties that are incompatible with this property
 * @prop {PropertyKeys[]} keys An array of keys that can be used to call this property, and the instances of them found in the user's input
 * @prop {PropertySyntaxes[]} syntaxes An array of different syntaxes that can be used for this property
 * @prop {PropertyTitle} title The english and french title for this property
 */

/**
 * Hydrogen's property model
 * @version 2.0.0-beta.30
 * @typedef {{properties: Property[]}} Properties
 */

/**
 * Hydrogen's property model
 * @version 2.0.0-beta.29
 * @typedef {{properties: {property: {title: {en: string, fr: string}, group: string, property_keys: {key: [{attribute: string[]?}]?}, syntax: {version: {default: boolean, options: {parameter: {required: boolean, types: {key: boolean, css: boolean}, values: string[]}}}}, incompatibilities?: string[]?}}}} Properties_2_0_0_beta_29
 */

module.exports = {};
