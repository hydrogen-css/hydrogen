const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    order: 14,
    key: 'colors',
    parent: 'styling',
    pagination: true,
  },
  title: 'Colors',
  title_long: 'Using color',
  subtitle:
    'Learn about standard vs. configured colors, color modifiers, and applying colors across themes and modes.',
  main: [
    {
      type: 'title',
      label: 'Color basics',
      id: 'basics',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Using color in Hydrogen works as you would expect when using color in CSS, with the addition of Hydrogen's configured color values. This means the properties that accept color values will properly understand <code>rgba</code>, <code>hex</code> values, and the like.",
            'Where the real magic shines is in the use of configured color values. When you define a color in your configuration file, its key becomes usable inside any property that accepts color values, as outlined in the <a href="/en/docs/properties/standard/#color" title="Find out which properties support configured colors.">color section of the properties page</a>.',
          ],
        },
        {
          type: 'code',
          file: 'hydrogen.config.json',
          copy: true,
          lines: [
            '"colors": [',
            '  {',
            '    "key": "primary",',
            '    "default": {',
            '      "color": "#9D5CFF",',
            '      "modifiers": []',
            '    },',
            '  },',
            '  ...',
            '],',
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Working with modifiers',
      id: 'modifiers',
    },
    {
      type: 'copy',
      items: [
        "Modifiers allow you to define custom color modifications for your color settings. This can be helpful for defining context-specific variations of a color. Using modifiers is as simple as appending the modifier's key to the color's key using dot notation: <code>color.modifier</code>.",
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Built-in color modifiers',
          id: 'built-in-color',
        },
        {
          type: 'copy',
          items: [
            'Hydrogen provides every color you configure with 6 automated color modifiers that generate tint and shade options for convenience. The <code>automated_modifiers</code> mode setting will further enhance these built-in modifiers by swapping their values for you in dark mode.',
            'These modifiers can be accessed in the same way others are used: <code>color.dark</code> and can be chained with the built-in opacity modifiers explained below: <code>color.dark.3</code>.',
          ],
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            '<code>light</code>',
            '<code>lighter</code>',
            '<code>lightest</code>',
            '<code>dark</code>',
            '<code>darker</code>',
            '<code>darkest</code>',
          ],
        },
        {
          type: 'title',
          label: 'Built-in opacity modifiers',
          id: 'built-in-opacity',
        },
        {
          type: 'copy',
          items: [
            "The system also allows you to use numeric values as color modifiers in order to manipulate the color's opacity value. You can use values such as <code>color.2</code> or <code>color.20</code> to set a color to 20% opacity.",
            "One thing to note is that if you're trying to set 100% opacity, you must use <code>color.100</code> because <code>color.1</code> and <code>color.10</code> will set the color to 10%.",
          ],
        },
        {
          type: 'title',
          label: 'Custom modifiers',
          id: 'custom',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "Beyond the built-in values, you can use a color's <code>modifiers</code> setting to create your own color modifications. Each one you create will require a <code>key</code> and a <code>color</code> value that will then be accessible to you using the same dot notation: <code>color.key</code>.",
              ],
            },
            {
              type: 'code',
              file: 'hydrogen.config.json',
              copy: true,
              lines: [
                '"colors": [',
                '  {',
                '    "key": "primary",',
                '    "default": {',
                '      "color": "#9D5CFF",',
                '      "modifiers": [',
                '        {',
                '          "key": "myModifier",',
                '          "color": "#784fb5"',
                '        },',
                '        ...',
                '      ]',
                '    },',
                '  },',
                '  ...',
                '],',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Colors across modes',
      id: 'modes',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "You can also manage a color's value and modifiers per mode. By adding a <code>dark</code> key alongside your color's <code>default</code> configuration, you can control exactly how the value works in a dark mode context.",
            'The <code>auto_apply_styles</code> and <code>swap_default_modifiers</code> mode settings are also helpful tools for managing how colors work across modes.',
            "By enabling <code>auto_apply_styles</code> whatever value you set under the color's <code>dark</code> configuration will automatically be applied if dark mode is triggered. This setting will also apply the same logic to your custom modifiers if you give them dark mode counterparts with a matching key.",
            'The <code>swap_default_modifiers</code> setting will tell Hydrogen to programmatically swap the built-in color modifiers (<code>light</code>, <code>darker</code>, etc.) with their natural opposite when dark mode is triggered. This can be helpful if you want all <code>color.light</code> values to automatically switch to <code>color.dark</code> and so on.',
          ],
        },
        {
          type: 'code',
          file: 'hydrogen.config.json',
          copy: true,
          lines: [
            '"colors": [',
            '  {',
            '    "key": "primary",',
            '    "default": {',
            '      "color": "#9D5CFF",',
            '      "modifiers": []',
            '    },',
            '    "dark": {',
            '      "color": "#390c7c",',
            '      "modifiers": []',
            '    }',
            '  },',
            '  ...',
            '],',
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Colors across themes',
      id: 'themes',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Colors are arguably the most powerful tool available when it comes to creating and using themes. By using the same key between different themes (<code>primary</code> for example), you can instantly swap your project's palette by applying the theme's <code>key</code> value to the <code>data-h2</code>. This allows you to customize your entire palette for each theme (modifiers included) and have them apply to the whole page at the click of a button.",
          ],
        },
        {
          type: 'code',
          file: 'hydrogen.config.json',
          copy: true,
          lines: [
            '"themes": [',
            '  {',
            '    "key": "default",',
            '    "colors": [],',
            '    ...',
            '  },',
            '  {',
            '    "key": "myTheme",',
            '    "colors": [],',
            '    ...',
            '  }',
            '  ...',
            ']',
          ],
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
