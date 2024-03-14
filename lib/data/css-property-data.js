// Hydrogen
'use strict';

// Data models
/**
 * @typedef {object} PropertyModel
 * @prop {object} properties
 * @prop {string[]} properties.color
 * @prop {string[]} properties.container
 * @prop {string[]} properties.custom
 * @prop {string[]} properties.font
 * @prop {string[]} properties.font_weight
 * @prop {string[]} properties.gradient
 * @prop {string[]} properties.radius
 * @prop {string[]} properties.shadow
 * @prop {string[]} properties.space
 * @prop {string[]} properties.transition
 * @prop {Object<string,ParsedAttribute[]>} attributes During processing, this object is filled with attributes found in the user's input, along with the attributes parsed information
 */
/**
 * @typedef {object} ParsedAttribute
 * @prop {string} attribute The actual attribute found in the user's code
 * @prop {ParsedQuery[]} queries The queries parsed from the attribute (e.g. data-h2-color="THESE")
 * @prop {string[]} files An array of files this exact attribute was found in
 */
/**
 * @typedef {object} ParsedQuery
 * @prop {string} query The full query string
 * @prop {string} prefix The prefix values from the query (e.g. THESE(primary.30))
 * @prop {ParsedModifiers} modifiers The parsed modifiers found inside the prefix
 * @prop {string[]} values The values found inside the query (e.g. base(THESE))
 * @prop {string[]} selectors The CSS selectors generated for this query
 */
/**
 * @typedef {object} ParsedModifierChild
 * @prop {string} child The child string
 * @prop {boolean} pseudo Whether the child string contains a pseudo element
 */
/**
 * @typedef {object} ParsedModifiers
 * @prop {string} media The media query modifier applied to this query
 * @prop {string} theme The theme applied to this query (default if none specified)
 * @prop {"default" | "all" | "dark"} mode The mode applied to this query (default if none specified)
 * @prop {string | null} state The interaction state applied to this query
 * @prop {string[] | null} selectors Selectors (ids, classes, attributes) that this query should target
 * @prop {ParsedModifierChild[] | null} children Child elements that this query should target, including whether they contain pseudo elements
 * @prop {string[]} child_states States that are being called inside the :children[] modifier
 */

// Data imports

// Local functions

// Helper functions

// Vendor imports

// Script ==========================================================================================

/**
 * Returns an object containing Hydrogen's property support model, as well as an empty attribute object for storing parsed attributes during runtime.
 *
 * @returns {PropertyModel}
 */
function get_css_property_data() {
  return {
    properties: {
      color: [
        'accent-color',
        'background',
        'background-color',
        'border',
        'border-color',
        'border-top',
        'border-right',
        'border-bottom',
        'border-left',
        'border-top-color',
        'border-right-color',
        'border-bottom-color',
        'border-left-color',
        'border-block',
        'border-block-color',
        'border-block-start',
        'border-block-end',
        'border-block-start-color',
        'border-block-end-color',
        'border-inline',
        'border-inline-color',
        'border-inline-start',
        'border-inline-end',
        'border-inline-start-color',
        'border-inline-end-color',
        'box-shadow',
        'color',
        'fill',
        'font-color',
        'outline',
        'outline-color',
        'overlay',
        'shadow',
        'stroke',
        'text-emphasis',
        'text-emphasis-color',
        'text-decoration',
        'text-decoration-color',
        'text-shadow',
      ],
      compatibility: ['gap', 'margin', 'overflow', 'padding', 'radius'],
      container: ['container'],
      custom: [
        'container',
        'flex-grid',
        'flex-item',
        'font-size',
        'layer',
        'location',
        'overlay',
        'visually-hidden',
      ],
      custom_identifiers: [
        'container',
        'flex-grid',
        'flex-item',
        'font-color',
        'layer',
        'location',
        'overlay',
        'radius',
        'shadow',
        'visually-hidden',
      ],
      'font-family': ['font', 'font-family'],
      'font-weight': ['font-weight'],
      gradient: ['background', 'background-image', 'overlay'],
      radius: [
        'radius',
        'border-radius',
        'border-top-left-radius',
        'border-top-right-radius',
        'border-bottom-right-radius',
        'border-bottom-left-radius',
        'border-start-start-radius',
        'border-start-end-radius',
        'border-end-start-radius',
        'border-end-end-radius',
      ],
      shadow: ['box-shadow', 'shadow', 'text-shadow'],
      space: [
        'background',
        'background-position',
        'background-position-x',
        'background-position-y',
        'background-size',
        'border',
        'radius',
        'border-radius',
        'border-width',
        'border-top',
        'border-right',
        'border-bottom',
        'border-left',
        'border-top-width',
        'border-right-width',
        'border-bottom-width',
        'border-left-width',
        'border-block',
        'border-block-width',
        'border-block-start',
        'border-block-end',
        'border-block-start-width',
        'border-block-end-width',
        'border-inline',
        'border-inline-width',
        'border-inline-start',
        'border-inline-end',
        'border-inline-start-width',
        'border-inline-end-width',
        'border-top-left-radius',
        'border-top-right-radius',
        'border-bottom-right-radius',
        'border-bottom-left-radius',
        'border-start-start-radius',
        'border-start-end-radius',
        'border-end-start-radius',
        'border-end-end-radius',
        'shadow',
        'box-shadow',
        'column-rule',
        'column-rule-width',
        'column-width',
        'columns',
        'contain',
        'contain-intrinsic-block-size',
        'contain-intrinsic-height',
        'contain-intrinsic-inline-size',
        'contain-intrinsic-size',
        'contain-intrinsic-width',
        'container',
        'flex',
        'flex-basis',
        'flex-grid',
        'gap',
        'column-gap',
        'row-gap',
        'grid',
        'grid-template',
        'grid-template-columns',
        'grid-template-rows',
        'height',
        'width',
        'line-height',
        'leading',
        'list-style-position',
        'location',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'margin-block',
        'margin-block-start',
        'margin-block-end',
        'margin-inline',
        'margin-inline-start',
        'margin-inline-end',
        'max-inline-size',
        'max-block-size',
        'max-height',
        'max-width',
        'min-inline-size',
        'min-block-size',
        'min-height',
        'min-width',
        'offset',
        'outline',
        'outline-width',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'padding-block',
        'padding-block-start',
        'padding-block-end',
        'padding-inline',
        'padding-inline-start',
        'padding-inline-end',
        'position',
        'scroll-margin',
        'scroll-margin-top',
        'scroll-margin-right',
        'scroll-margin-bottom',
        'scroll-margin-left',
        'scroll-margin-block',
        'scroll-margin-block-start',
        'scroll-margin-block-end',
        'scroll-margin-inline',
        'scroll-margin-inline-start',
        'scroll-margin-inline-end',
        'scroll-padding',
        'scroll-padding-top',
        'scroll-padding-right',
        'scroll-padding-bottom',
        'scroll-padding-left',
        'scroll-padding-block',
        'scroll-padding-block-start',
        'scroll-padding-block-end',
        'scroll-padding-inline',
        'scroll-padding-inline-start',
        'scroll-padding-inline-end',
        'scrollbar-width',
        'shape-margin',
        'tab-size',
        'text-decoration',
        'text-decoration-thickness',
        'text-indent',
        'text-shadow',
        'top',
        'right',
        'bottom',
        'left',
        'transform',
      ],
      transition: [
        'transition',
        'transition-duration',
        'transition-timing-function',
        'transition-delay',
      ],
    },
    /** @type {Object<string,ParsedAttribute[]>} */
    attributes: {},
  };
}

module.exports = {
  get_css_property_data,
};
