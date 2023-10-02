let data = {
  layout: 'docs.11ty.js',
  navigation: {
    order: 17,
    key: 'hydrogen-properties',
    parent: 'properties',
    pagination: true,
  },
  terms: [
    'property',
    'properties',
    'custom',
    'supports',
    'containers',
    'data',
    'h2',
    'flex',
    'grids',
    'flex',
    'item',
    'font',
    'sizes',
    'layers',
    'locations',
    'overlays',
    'visually',
    'hidden',
    'invisible',
    'assistive',
    'technology',
    'technologies',
    'ats',
    'hide',
    'hidden',
    'show',
    'screens',
    'readers',
  ],
  title: 'Hydrogen properties',
  subtitle: "A list of helper properties provided by Hydrogen's syntax.",
  main: [
    {
      type: 'title',
      label: 'Custom properties?',
      id: 'what',
    },
    {
      type: 'copy',
      items: [
        "Alongside standard CSS properties, Hydrogen offers a handful of helpful custom properties that provide access to common or frustrating styles. This includes things like containers, positioning shortcuts for <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, and overlays. These properties will always yield to CSS syntax, so should new CSS properties emerge, Hydrogen's custom properties will be modified to fit the situation. New properties are always in the works!",
      ],
    },
    {
      type: 'title',
      label: "What's available",
      id: 'available',
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Container',
          id: 'container',
        },
        {
          type: 'copy',
          items: [
            '<code>data-h2-container="base(alignment, size, inline-padding)"</code>',
            'The container property applies a <code>max-width</code> to an element, aligns it using various left/right margin values, and optionally, does the math to add padding to the left and right sides. The container property accepts the following comma-separated arguments:',
          ],
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            '<code>alignment</code>: accepts <code>center</code>, <code>left</code>, and <code>right</code>',
            '<code>size</code>: accepts configured container settings, any CSS unit value, as well as Hydrogen space multipliers',
            '<code>inline-padding</code>: accepts any CSS unit value, as well as Hydrogen space multipliers',
          ],
        },
        {
          type: 'title',
          label: 'Flex grid and flex item',
          id: 'flex-grid',
        },
        {
          type: 'section',
          content: [
            {
              type: 'title',
              label: 'Flex grid',
              id: 'flex-grid',
            },
            {
              type: 'copy',
              items: [
                '<code>data-h2-flex-grid="base(alignment, column-gap, row-gap)"</code>',
                'The flexbox grid and item system is unique to Hydrogen and provides instant access to an easy-to-learn layout option. <a href="/en/docs/styling/layout" title="Learn more about layout options in Hydrogen.">You can learn more about using it in the layout styling section.</a>',
                'The parent grid attribute allows you to customize the grid item alignment, as well as whether or not gap values should be applied to the columns and rows.',
              ],
            },
            {
              type: 'list',
              style: 'unordered',
              items: [
                '<code>alignment</code>: accepts any valid CSS <code>align-items</code> value',
                '<code>column-gap</code>: accepts any CSS unit value, as well as Hydrogen space multipliers',
                '<code>row-gap</code>: accepts any CSS unit value, as well as Hydrogen space multipliers',
              ],
            },
            {
              type: 'title',
              label: 'Flex items',
              id: 'flex-grid',
            },
            {
              type: 'copy',
              items: [
                '<code>data-h2-flex-item="base(XofY)"</code>',
                'Flexbox grid items allow you to tell the item exactly how much space to span. Unlike CSS grid, this syntax is explicitly applied to the item itself, rather than aligning the items within a parent grid system.',
              ],
            },
            {
              type: 'list',
              style: 'unordered',
              items: [
                '<code>XofY</code>: accepts two numbers that represent the number of columns to span and the total number of columns in the grid. For example, <code>1of2</code> would tell the element to span half the available space, because it is occupying 1 of 2 equal sized columns. Similarly, <code>3of7</code> would occupy 42.8% of the available space, with 4 remaining equally sized columns left to be filled.',
              ],
            },
          ],
        },
        {
          type: 'title',
          label: 'Font size',
          id: 'font-size',
        },
        {
          type: 'copy',
          items: [
            '<code>data-h2-font-size="base(size, line-height)"</code>',
            'You can style font sizes using standard CSS syntax if you prefer, but Hydrogen also automatically <a href="/en/docs/styling/typography" title="Learn more about how Hydrogen constructs typography.">generates a configurable typography scale</a> for you. You can access these generated values by specifying a heading level or copy keyword.',
            "The <code>font-size</code> property also supports a second option if you'd like to configure the element's line-height value in the same line.",
          ],
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            '<code>size</code>: accepts standard CSS unit values, Hydrogen space multiplier values, as well as the following typography scale keywords: <code>display</code>, <code>h1</code>, <code>h2</code>, <code>h3</code>, <code>h4</code>, <code>h5</code>, <code>h6</code>, <code>copy</code>, <code>caption</code>',
            '<code>line-height</code>: accepts standard CSS line-height values',
          ],
        },
        {
          type: 'title',
          label: 'Layer',
          id: 'layer',
        },
        {
          type: 'copy',
          items: [
            '<code>data-h2-layer="base(z-index, position)"</code>',
            'This property provides an easy shortcut for combining <code>z-index</code> and <code>position</code> to make layering elements faster.',
          ],
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            '<code>z-index</code>: accepts standard CSS z-index numbers',
            '<code>position</code>: accepts standard CSS position values',
          ],
        },
        {
          type: 'title',
          label: 'Location',
          id: 'location',
        },
        {
          type: 'copy',
          items: [
            '<code>data-h2-location="base(top, right, bottom, left)"</code>',
            "This property acts as a shortcut for the <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> CSS properties. It's provided as an easy way to apply positioning to an element in a single line.",
          ],
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            '<code>top</code>: accepts any CSS unit value, as well as Hydrogen space multipliers',
            '<code>right</code>: accepts any CSS unit value, as well as Hydrogen space multipliers',
            '<code>bottom</code>: accepts any CSS unit value, as well as Hydrogen space multipliers',
            '<code>left</code>: accepts any CSS unit value, as well as Hydrogen space multipliers',
          ],
        },
        {
          type: 'title',
          label: 'Overlay',
          id: 'overlay',
        },
        {
          type: 'copy',
          items: [
            '<code>data-h2-overlay="base(color, opacity)"</code>',
            'This property applies an absolutely positioned pseudo element that occupies the same height and width as its parent, creating a colored overlay effect. You can control both the color and opacity of the overlay.',
          ],
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            '<code>color</code>: accepts configured Hydrogen color and gradient keys, as well as standard CSS color values',
            '<code>opacity</code>: accepts standard CSS opacity numbers',
          ],
        },
        {
          type: 'title',
          label: 'Visually hidden',
          id: 'visually-hidden',
        },
        {
          type: 'copy',
          items: [
            '<code>data-h2-visually-hidden="base(visibility)"</code>',
            'This property provides a more complex combination of styles than the standard CSS <code>visibility</code> property that helps apply styles for screen-reader and assistive technologies.',
            'Applying <code>invisible</code> will make an element visually disappear, but it will still show up in the document for assistive tech, while applying <code>hidden</code> will remove the element both visually <strong>and</strong> programmatically.',
          ],
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            '<code>visibility</code>: accepts either <code>visible</code>, <code>invisible</code>, or <code>hidden</code>',
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
