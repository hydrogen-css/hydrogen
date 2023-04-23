let data = {
  layout: 'docs.11ty.js',
  navigation: {
    order: 13,
    key: 'layout',
    parent: 'styling',
    pagination: true,
  },
  title: 'Layout',
  title_long: 'Applying layouts',
  subtitle:
    "Learn about whitespace units, layout tips, and Hydrogen's flexbox grid system.",
  main: [
    {
      type: 'title',
      label: 'Whitespace multiplier units',
      id: 'multipliers',
    },
    {
      type: 'copy',
      items: [
        'Hydrogen enhances standard CSS layout by introducing a new unit called vertical rhythm multipliers. While Hydrogen attributes will accept standard CSS units like <code>px</code>, <code>rem</code>, and <code>vw</code> where you would expect them to work, you can also use vertical rhythm multipliers in these same properties.',
      ],
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "As described in the <a href='/en/docs/styling/typography/#rhythm' title='Learn more about vertical rhythm.'>typography styling section</a>, these multiplier units are created by, and adapt to, your project's current typography settings. At their core, multipliers are rooted in your typography's <code>body</code> line-height value.",
          ],
        },
        {
          type: 'code',
          lines: [
            'x1 : (line-height x 1)',
            'x2 : (line-height x 2)',
            'x3 : (line-height x 4)',
            '...',
          ],
        },
      ],
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            'By using multipliers to apply whitespace (<code>padding</code>, <code>margin</code>, <code>gap</code>, etc.), your interface creates a harmony and sustained rhythm with your typography, even across media queries.',
          ],
        },
        {
          type: 'code',
          lines: [
            'data-h2-padding="base(x2 x1)"',
            'data-h2-margin-top="base(x3)"',
            'data-h2-gap="base(x1.5)"',
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Approaching grids',
      id: 'grids',
    },
    {
      type: 'copy',
      items: [
        'Beyond whitespace, your most powerful layout tool will be grids. Hydrogen supports all of the standard CSS layout properties you know and love, including CSS grid and flexbox.',
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Standard CSS options',
          id: 'css-options',
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                "For detailed information on <a href='https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids' title='Learn more about CSS grids on MDN.' target='_blank' rel='noreferrer'>CSS grid</a> or <a href='https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox' title='Learn more about flexbox on MDN.' target='_blank' rel='noreferrer'>flexbox</a> and their respective properties, please refer to <a href='https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout' title='Learn more about CSS layout on MDN.' target='_blank' rel='noreferrer'>the guides found on MDN</a>. You can combine these properties with Hydrogen's query functionality to rapidly create dynamic, adaptable layouts that meet your project's needs.",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              copy: true,
              lines: [
                '<div',
                '  data-h2-display="base(grid)"',
                '  data-h2-grid-template-columns="',
                '    base(1fr)',
                '    p-tablet(1fr 1fr)',
                '    desktop(1fr 1fr 1fr)"',
                '  data-h2-gap="base(x1) desktop(x3)">',
                '  <div></div>',
                '  <div></div>',
                '  <div></div>',
                '</div>',
              ],
            },
          ],
        },
        {
          type: 'title',
          label: "Hydrogen's flexbox grid",
          id: 'flexbox-grid',
        },
        {
          type: 'copy',
          items: [
            'Beyond standard CSS properties, Hydrogen also offers a custom-built, ready to use flexbox-based grid system that makes layouts a breeze. By applying the <code>data-h2-flex-grid</code> property and nesting child <code>data-h2-flex-item</code> elements, you can create dynamic grids in seconds.',
          ],
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                '<strong>Flex grids</strong>',
                'The first step in using the flex-grid system is to apply the <code>data-h2-flex-grid</code> property to the parent grid wrapper. The grid item accepts the following parameters:',
              ],
            },
            {
              type: 'list',
              style: 'unordered',
              items: [
                '<code>alignment</code>: accepts any standard <code>align-items</code> CSS value.',
                '<code>column-gap</code>: applies a CSS unit or Hydrogen multiplier to the space between columns.',
                '<code>row-gap</code>: applies a CSS unit or Hydrogen multiplier to the space between rows.',
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              copy: true,
              lines: [
                '<div data-h2-flex-grid="base(alignment, column-gap, row-gap)">',
                '  children',
                '</div>',
              ],
            },
          ],
        },
        {
          type: 'group',
          items: [
            {
              type: 'copy',
              items: [
                '<strong>Flex items</strong>',
                "The next step is to add the <code>data-h2-flex-item</code> attribute to the grid's child elements. Each grid item's width in the grid can be controlled using the following syntax:",
              ],
            },
            {
              type: 'list',
              style: 'unordered',
              items: [
                '<code>XofY</code>: where <code>X</code> is the width you want the item span, and <code>Y</code> is the total number of columns in the grid.',
              ],
            },
            {
              type: 'copy',
              items: [
                'This approach is unique in the sense that each item can have a different value for the "total columns in the grid" value. The <code>XofY</code> syntax functions as a fraction that is divided, resulting in a percentage width for the item. The goal then, is to have items add up to 100%, at which point, the following items will start a new row.',
                "For example, <code>1of2</code> will span 50% of the grid's width, meaning subsequent items you want in the same row need to add up to 50% (e.g. <code>3of10</code> + <code>1of5</code>).",
              ],
            },
            {
              type: 'code',
              file: 'index.html',
              copy: true,
              lines: [
                '<div data-h2-flex-grid="base(flex-start, x2, x1)">',
                '  <div data-h2-flex-item="base(1of1) desktop(1of2)></div>"',
                '  <div data-h2-flex-item="base(1of1) desktop(3of10)></div>"',
                '  <div data-h2-flex-item="base(1of1) desktop(1of5)></div>"',
                '</div>',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Theme-specific layouts',
      id: 'themes',
    },
    {
      type: 'copy',
      items: [
        "In rare cases, you might want to alter a layout based on the currently active theme. While the styles you define will apply to all themes by default, you can add the theme's unique <code>key</code> value to a query to specify styles for that theme specifically.",
        'For example, changing a grid\'s column template: <code>data-h2-grid-template-columns="base(1fr) base:myTheme(1fr 1fr)"</code>.',
        'You can use this technique to alter layouts, hide or show elements, and even swap out copy or images.',
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
