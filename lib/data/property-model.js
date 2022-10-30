// Hydrogen: Property model
'use strict';

// Type imports
let Types = require('../data/property-model-definition');

/**
 * @typedef {import('./property-model-definition').Properties} Properties
 */

/**
 * Hydrogen's property model
 * @type {Properties}
 */
let property_data = {
  hydrogen: false,
  properties: [
    {
      group: 'basic',
      id: 'background-color',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'background-color',
        },
        {
          instances: [],
          name: 'bg-color',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['color'],
                tokens: ['color', 'gradient'],
              },
              value: 'color | gradient',
            },
          ],
        },
      ],
      title: {
        en: 'Background color',
        fr: '',
      },
    },
    {
      group: 'basic',
      id: 'border',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'border',
        },
      ],
      syntaxes: [
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: [],
                tokens: ['none'],
              },
              value: 'none',
            },
          ],
        },
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: [],
                tokens: [
                  'all',
                  'top-bottom',
                  'right-left',
                  'top',
                  'right',
                  'bottom',
                  'left',
                ],
              },
              value: 'side',
            },
            {
              required: true,
              types: {
                css: ['border shorthand'],
                tokens: [],
              },
              value: 'border',
            },
          ],
        },
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: [],
                tokens: [
                  'all',
                  'top-bottom',
                  'right-left',
                  'top',
                  'right',
                  'bottom',
                  'left',
                ],
              },
              value: 'side',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'width',
            },
            {
              required: true,
              types: {
                css: ['CSS border-style'],
                tokens: [],
              },
              value: 'style',
            },
            {
              required: true,
              types: {
                css: ['color'],
                tokens: ['color'],
              },
              value: 'color',
            },
          ],
        },
      ],
      title: {
        en: 'Border',
        fr: '',
      },
    },
    {
      group: 'typography',
      id: 'color',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'color',
        },
        {
          instances: [],
          name: 'font-color',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['color'],
                tokens: ['color', 'gradient'],
              },
              value: 'color | gradient',
            },
          ],
        },
      ],
      title: {
        en: 'Color',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'container',
      incompatibilities: ['margin', 'padding'],
      keys: [
        {
          instances: [],
          name: 'container',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: [],
                tokens: ['left', 'center', 'right'],
              },
              value: 'alignment',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['container', 'whitespace multiplier'],
              },
              value: 'max-width',
            },
            {
              required: false,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'side-padding',
            },
          ],
        },
      ],
      title: {
        en: 'Container',
        fr: '',
      },
    },
    {
      group: 'basic',
      id: 'fill',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'fill',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['color'],
                tokens: ['color'],
              },
              value: 'color',
            },
          ],
        },
      ],
      title: {
        en: 'Fill',
        fr: '',
      },
    },
    {
      group: 'flexbox',
      id: 'flex-grid',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'flex-grid',
        },
      ],
      syntaxes: [
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['align-items'],
                tokens: [],
              },
              value: 'alignment',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'gutter',
            },
          ],
        },
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['align-items'],
                tokens: [],
              },
              value: 'alignment',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'column-gutter',
            },
            {
              required: true,
              types: {
                css: ['CSS unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'row-gutter',
            },
          ],
        },
      ],
      title: {
        en: 'Flex grid',
        fr: '',
      },
    },
    {
      group: 'flexbox',
      id: 'flex-item',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'flex-item',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: [],
                tokens: ['XofY', 'X/Y', 'auto', 'content', 'fill'],
              },
              value: 'span',
            },
          ],
        },
      ],
      title: {
        en: 'Flex item',
        fr: '',
      },
    },
    {
      group: 'typography',
      id: 'font-family',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'font-family',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: [],
                tokens: ['font family'],
              },
              value: 'family',
            },
          ],
        },
      ],
      title: {
        en: 'Font family',
        fr: '',
      },
    },
    {
      group: 'typography',
      id: 'font-size',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'font-size',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: [
                  'display',
                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'copy',
                  'caption',
                ],
              },
              value: 'size',
            },
            {
              required: false,
              types: {
                css: ['number', 'unit'],
                tokens: [],
              },
              value: 'line-height',
            },
          ],
        },
      ],
      title: {
        en: 'Font size',
        fr: '',
      },
    },
    {
      group: 'grid',
      id: 'gap',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'gap',
        },
      ],
      syntaxes: [
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'column-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'row-size',
            },
          ],
        },
      ],
      title: {
        en: 'Gap',
        fr: '',
      },
    },
    {
      group: 'grid',
      id: 'grid-template-columns',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'grid-template-columns',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['grid template'],
                tokens: [],
              },
              value: 'template',
            },
          ],
        },
      ],
      title: {
        en: 'Grid template columns',
        fr: '',
      },
    },
    {
      group: 'grid',
      id: 'grid-template-rows',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'grid-template-rows',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['grid template'],
                tokens: [],
              },
              value: 'template',
            },
          ],
        },
      ],
      title: {
        en: 'Grid template rows',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'height',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'height',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Height',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'layer',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'layer',
        },
        {
          instances: [],
          name: 'z-index',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['number'],
                tokens: [],
              },
              value: 'z-index',
            },
            {
              required: false,
              types: {
                css: ['position'],
                tokens: [],
              },
              value: 'position',
            },
          ],
        },
      ],
      title: {
        en: 'Layer',
        fr: '',
      },
    },
    {
      group: 'typography',
      id: 'line-height',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'line-height',
        },
        {
          instances: [],
          name: 'leading',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['number', 'unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'line-height',
            },
          ],
        },
      ],
      title: {
        en: 'Line height',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'margin',
      incompatibilities: ['container'],
      keys: [
        {
          instances: [],
          name: 'margin',
        },
      ],
      syntaxes: [
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'top-bottom-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'right-left-size',
            },
          ],
        },
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'top-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'right-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'bottom-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'left-size',
            },
          ],
        },
      ],
      title: {
        en: 'Margin',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'margin-top',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'margin-top',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Margin top',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'margin-right',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'margin-right',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Margin right',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'margin-bottom',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'margin-bottom',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Margin bottom',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'margin-left',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'margin-left',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Margin left',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'max-height',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'max-height',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Maximum height',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'max-width',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'max-width',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Maximum width',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'min-height',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'min-height',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Minimum height',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'min-width',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'min-width',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Minimum width',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'offset',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'offset',
        },
        {
          instances: [],
          name: 'location',
        },
      ],
      syntaxes: [
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'top-bottom-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'right-left-size',
            },
          ],
        },
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'top-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'right-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'bottom-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'left-size',
            },
          ],
        },
      ],
      title: {
        en: 'Offset',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'overflow',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'overflow',
        },
      ],
      syntaxes: [
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['overflow'],
                tokens: [],
              },
              value: 'overflow',
            },
          ],
        },
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['overflow'],
                tokens: [],
              },
              value: 'x-overflow',
            },
            {
              required: true,
              types: {
                css: ['overflow'],
                tokens: [],
              },
              value: 'y-overflow',
            },
          ],
        },
      ],
      title: {
        en: 'Overflow',
        fr: '',
      },
    },
    {
      group: 'basic',
      id: 'overlay',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'overlay',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['color'],
                tokens: ['color', 'gradient'],
              },
              value: 'color | gradient',
            },
            {
              required: false,
              types: {
                css: ['number'],
                tokens: [],
              },
              value: 'opacity',
            },
          ],
        },
      ],
      title: {
        en: 'Overlay',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'padding',
      incompatibilities: ['container'],
      keys: [
        {
          instances: [],
          name: 'padding',
        },
      ],
      syntaxes: [
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'top-bottom-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'right-left-size',
            },
          ],
        },
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'top-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'right-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'bottom-size',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'left-size',
            },
          ],
        },
      ],
      title: {
        en: 'Padding',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'padding-top',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'padding-top',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Padding top',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'padding-right',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'padding-right',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Padding right',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'padding-bottom',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'padding-bottom',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Padding bottom',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'padding-left',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'padding-left',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Padding left',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'position',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'position',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['position'],
                tokens: ['center'],
              },
              value: 'position',
            },
          ],
        },
      ],
      title: {
        en: 'Position',
        fr: '',
      },
    },
    {
      group: 'basic',
      id: 'radius',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'radius',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['radius'],
              },
              value: 'radius',
            },
          ],
        },
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['radius'],
              },
              value: 'top-left-bottom-right-radius',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['radius'],
              },
              value: 'top-right-bottom-left-radius',
            },
          ],
        },
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['radius'],
              },
              value: 'top-left-radius',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['radius'],
              },
              value: 'top-right-bottom-left-radius',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['radius'],
              },
              value: 'bottom-right-radius',
            },
          ],
        },
        {
          default: false,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['radius'],
              },
              value: 'top-left-radius',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['radius'],
              },
              value: 'top-right-radius',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['radius'],
              },
              value: 'bottom-right-radius',
            },
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['radius'],
              },
              value: 'bottom-left-radius',
            },
          ],
        },
      ],
      title: {
        en: 'Radius',
        fr: '',
      },
    },
    {
      group: 'basic',
      id: 'shadow',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'shadow',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['box-shadow'],
                tokens: ['shadow'],
              },
              value: 'shadow',
            },
          ],
        },
      ],
      title: {
        en: 'Shadow',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'transform',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'transform',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['transform'],
                tokens: ['whitespace multiplier'],
              },
              value: 'transformation',
            },
          ],
        },
      ],
      title: {
        en: 'Transform',
        fr: '',
      },
    },
    {
      group: 'basic',
      id: 'transition',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'transition',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['CSS property'],
                tokens: [],
              },
              value: 'property',
            },
            {
              required: true,
              types: {
                css: ['time unit'],
                tokens: ['duration'],
              },
              value: 'duration',
            },
            {
              required: true,
              types: {
                css: ['transition function'],
                tokens: ['function'],
              },
              value: 'function',
            },
            {
              required: true,
              types: {
                css: ['time unit'],
                tokens: ['delay'],
              },
              value: 'delay',
            },
          ],
        },
      ],
      title: {
        en: 'Transition',
        fr: '',
      },
    },
    {
      group: 'basic',
      id: 'visibility',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'visibility',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: [],
                tokens: ['visible', 'invisible', 'hidden'],
              },
              value: 'visibility',
            },
          ],
        },
      ],
      title: {
        en: 'Visibility',
        fr: '',
      },
    },
    {
      group: 'space',
      id: 'width',
      incompatibilities: [],
      keys: [
        {
          instances: [],
          name: 'width',
        },
      ],
      syntaxes: [
        {
          default: true,
          options: [
            {
              required: true,
              types: {
                css: ['unit'],
                tokens: ['whitespace multiplier'],
              },
              value: 'size',
            },
          ],
        },
      ],
      title: {
        en: 'Width',
        fr: '',
      },
    },
  ],
};

module.exports = property_data;
