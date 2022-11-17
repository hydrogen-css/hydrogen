// Hydrogen: Custom property array
'use strict';

// border                - bad - because of format and sides
// container             - bad - custom
// flex-grid             - bad - custom
// flex-item             - bad - custom
// font-family           - bad - because of configured families
// font-size             - bad - because of configured sizes
// layer                 - bad - because of added position
// z-index               - bad - because of added position
// offset                - bad - because of CSS overlap
// location              - bad - custom
// overlay               - bad - custom
// position              - bad - because of center
// radius                - bad - because of configured radii
// shadow                - bad - because of configured shadows
// transition            - bad - because of configured transitions
// visibility            - bad - because CSS overlap

/**
 * Hydrogen's custom property array
 */
let custom_props = [
  'border',
  'container',
  'flex-grid',
  'flex-item',
  'font-family',
  'font-size',
  'layer',
  'z-index',
  'offset',
  'location',
  'overlay',
  'position',
  'radius',
  'shadow',
  'transition',
  'visibility',
];

module.exports = custom_props;
