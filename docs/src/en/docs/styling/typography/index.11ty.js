const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    order: 12,
    key: 'typography',
    parent: 'styling',
    pagination: true,
  },
  title: 'Typography',
  title_long: 'Setting typography',
  subtitle:
    'Learn how Hydrogen generates type styles and how you can apply them to elements.',
  main: [
    {
      type: 'title',
      label: 'The type scale',
      id: 'scale',
    },
    {
      type: 'copy',
      items: [
        "Based on your theme's <code>typography</code> settings, Hydrogen builds a custom <a href='https://type-scale.com/' title='Visit the Type Scale website to play around with type scale values.' target='_blank' rel='noreferrer'>type scale</a> that contains automated, incremental typography styles.",
        'Hydrogen uses both the <code>type_scale</code> and <code>line_height</code> values to assign copy, heading, and caption font sizes and accompanying line heights that will automatically adapt to their respective media <code>query_key</code>.',
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Configuring the scale',
          id: 'scale-configuration',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "As described in the typography theme configuration section, Hydrogen's typography system is configured using 4 key values:",
              ],
            },
            {
              type: 'list',
              style: 'unordered',
              items: [
                '<code>query_key</code>: is the <code>key</code> value that defines a particular media query. This value tells Hydrogen when to apply this specific set of typography styles.',
                "<code>size</code>: determines the base value for your paragraph body copy. It's recommended that you use a percentage value for this setting to avoid unexpected accessibility limitations. <code>100%</code> will equal the user's current browser value (often <code>16px</code> by default).",
                '<code>line_height</code>: determines the base value for your paragraph body copy. This value will be applied to headings in multiples and also determines Hydrogen\'s <a href="#rhythm" title="Learn more about how vertical rhythm works.">vertical rhythm system</a>.',
                "<code>type_scale</code>: is the ratio at which headings should be increased in size from your base paragraph. If you're unsure what value to set, you can use the <a href='https://type-scale.com/' title='Visit the Type Scale website to play around with type scale values.' target='_blank' rel='noreferrer'>type scale</a> website to find one that suits your needs.",
              ],
            },
            {
              type: 'code',
              file: 'hydrogen.config.json',
              lines: [
                '"typography": [',
                '  {',
                '    "query_key": "base",',
                '    "size": "100%",',
                '    "line_height": "1.5",',
                '    "type_scale": "1.15"',
                '  },',
                '  ...',
                '],',
              ],
            },
          ],
        },
        {
          type: 'title',
          label: 'Using scale values',
          id: 'scale-usage',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                'Based on the configuration, Hydrogen then creates a series of values that can be used in the <code>data-h2-font-size</code> attribute:',
              ],
            },
            {
              type: 'list',
              style: 'unordered',
              items: [
                '<code>display</code>: the largest font size, used for display elements like hero text.',
                '<code>h1</code>, <code>h2</code>, <code>h3</code>, <code>h4</code>, <code>h5</code>, <code>h6</code>: heading font sizes that increase in size based on the scale, with level 6 being the smallest and level 1 being the largest.',
                '<code>copy</code>: the base font size, applied to all standard elements.',
                '<code>caption</code>: the smallest font size, used for contextual copy and image captions, among other things.',
              ],
            },
            {
              type: 'copy',
              items: [
                'If <code>include_reset_css</code> is enabled in your configuration, standard elements will be automatically set to their Hydrogen value counterpart. For example, <code>heading</code> elements will be given their relevant heading scale value and calculated line height.',
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              lines: [
                '<span data-h2-font-size="base(h1)">',
                '  This would be heading 1 sized.',
                '</span>',
                '',
                '<span data-h2-font-size="base(copy)">',
                '  This would be paragraph sized.',
                '</span>',
                '',
                '<span data-h2-font-size="base(display)">',
                '  This would be extra-large display text sized.',
                '</span>',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Type and vertical rhythm',
      id: 'rhythm',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            'The next page, <a href="/en/docs/styling/layout" title="Learn more about whitespace and grids.">Layout</a>, goes into detail about how Hydrogen provides you with handy, consistent whitespace units. It\'s important to note, however, that these values have their root in your typography settings.',
            'These space units are generated and adapt based on your configured line height, allowing you to set typography in a consistent vertical rhythm. These units use a common syntax inside of attributes: <code>x1</code>, <code>x2</code>, etc. These multipliers set space between elements in a way that echoes your content, creating a pleasant reading experience for your user.',
          ],
        },
        {
          type: 'code',
          file: 'index.html',
          lines: [
            '<div data-h2-height="base(x2)"></div>',
            '',
            '<div data-h2-padding-top="base(x1.5)"></div>',
            '',
            '<div data-h2-gap="base(x3)"></div>',
          ],
        },
      ],
    },
    {
      type: 'group',
      items: [
        {
          type: 'rhythm-clear',
        },
        {
          type: 'rhythm',
        },
      ],
    },
  ],
};

function render(data) {
  return data;
}

module.exports = {
  data,
  render,
};
