let data = {
  layout: 'docs.11ty.js',
  navigation: {
    order: 18,
    key: 'variables',
    parent: 'docs',
    pagination: true,
  },
  terms: [
    'variables',
    'h2',
    'css',
    'colors',
    'colours',
    'fonts',
    'weights',
    'sizes',
    'line',
    'heights',
    'gradients',
    'containers',
    'whitespace',
    'box',
    'shadows',
    'family',
    'families',
    'radius',
    'radii',
    'corner',
    'border',
  ],
  title: 'Variables',
  title_long: 'Hydrogen CSS variables',
  subtitle:
    'A glossary of possible CSS variables created by Hydrogen that are available to you when styling.',
  main: [
    {
      type: 'title',
      label: 'Overview',
      id: 'overview',
    },
    {
      type: 'copy',
      items: [
        'When Hydrogen processes your configuration file it begins by generating a list of custom CSS variables based on your chosen settings. These variables are designed to automatically adapt to media queries, your themes, as well as light and dark modes.',
        "By default theses variables are included at the top of the <code>hydrogen.css</code> file produced during each build. This means that you can access them in your CSS at any time if you need to write something custom while maintaining the standards you've set in your configuration.",
        "If, for whatever reason, you need to access these variables in your CSS but don't want Hydrogen's full CSS file, <a href='/en/docs/configuration/core-settings/#processing' title='Learn more about setting up variable export in your configuration file.'>you can enable the <code>export_variable_file</code> setting in the <code>processing</code> area of your configuration file</a>. Hydrogen will export these variables into an independent file that can be then loaded into your project.",
      ],
    },
    {
      type: 'title',
      label: 'Core variables',
      id: 'core',
    },
    {
      type: 'copy',
      items: [
        'The following variables are generated and used as foundation values across site-wide elements such as font size, whitespace, and more. These variables are always named consistently.',
        `<pre><code>--h2-base-font-size
--h2-base-line-height
--h2-base-whitespace</code></pre>`,
      ],
    },
    {
      type: 'title',
      label: 'Color and gradient variables',
      id: 'colors',
    },
    {
      type: 'copy',
      items: [
        "Color and gradient variables leverage the color settings you've set in your configuration. As a result, their variable names reflect the <code>key</code> values you've assigned to your colors.",
        '<code>--h2-color-[KEY]</code>',
      ],
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "The values returned by these variables aren't actual valid colors, rather, they return the individual <code>RGB</code> values of the color so that you can then pair the variable with an alpha value if you need one.",
            "For example, if you've set your <code>primary</code> color to <code class='color-value'><span class='color-sample-7440d6'></span>#7440d6</code>, Hydrogen generates a variable called <code>--h2-color-primary</code> with a value of <code>116, 64, 214</code>. To use this variable in CSS, you would access it by nesting it inside an <code>RGB()</code> or <code>RGBA()</code> function.",
          ],
        },
        {
          type: 'code',
          file: 'app.css',
          language: 'css',
          count: 3,
          lines: [
            '.primary-color: {',
            '  background-color: rgba(var(--h2-color-primary), 1);',
            '}',
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
            "Color variables in particular can be appended with Hydrogen's default modifier keys or your own custom modifier keys to reference a modified value.",
            '<code>--h2-color-[KEY]-[MODIFIER]</code>',
          ],
        },
        {
          type: 'code',
          file: 'app.css',
          language: 'css',
          count: 3,
          lines: [
            '.modified-color: {',
            '  background-color: rgba(var(--h2-color-primary-lighter), 1);',
            '}',
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
            'Gradient variables are assembled in a similar manner but they return a full CSS gradient value, meaning they can be used as-is without any further modification.',
            '<code>--h2-gradient-[KEY]</code>',
          ],
        },
        {
          type: 'code',
          file: 'app.css',
          language: 'css',
          count: 3,
          lines: ['.gradient: {', '  background-image: var(--h2-gradient-linear-red);', '}'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Container variables (deprecated)',
      id: 'containers',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            'Container variables have been deprecated. Please see wrapper variables for the newest implementation.',
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Font family variables',
      id: 'font-families',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Font family variables follow the standard pattern and are named using your specified <code>key</code> value and return the <code>font-family</code> value you've chosen.",
            '<code>--h2-font-family-[KEY]</code>',
          ],
        },
        {
          type: 'code',
          file: 'app.css',
          language: 'css',
          count: 3,
          lines: ['.font: {', '  font-family: var(--h2-font-family-sans-serif);', '}'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Font size and line height variables',
      id: 'font-sizes',
    },
    {
      type: 'copy',
      items: [
        'Hydrogen generates font size and line height values for your entire typography scale based on the settings in your <code>typography</code> configuration. Both types of variable follow a standard naming approach that matches the values you would specify inside of Hydrogen attributes. Theses variables, like others, automatically adapt to your media query settings.',
        'Font size variables will return <code>rem</code> values inside of a <code>calc()</code> function.',
        `<pre><code>--h2-font-size-caption
--h2-font-size-body
--h2-font-size-h6
--h2-font-size-h5
--h2-font-size-h4
--h2-font-size-h3
--h2-font-size-h2
--h2-font-size-h1
--h2-font-size-display</code></pre>`,
        'Line height variables will return a <code>number</code> or unit value depending on your configuration.',
        `<pre><code>--h2-line-height-caption
--h2-line-height-body
--h2-line-height-h6
--h2-line-height-h5
--h2-line-height-h4
--h2-line-height-h3
--h2-line-height-h2
--h2-line-height-h1
--h2-line-height-display</code></pre>`,
      ],
    },
    {
      type: 'title',
      label: 'Font weight variables',
      id: 'font-weights',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Font weight variables follow the standard pattern and are named using your specified <code>key</code> value and return the <code>font-weight</code> value you've chosen.",
            '<code>--h2-font-weight-[KEY]</code>',
          ],
        },
        {
          type: 'code',
          file: 'app.css',
          language: 'css',
          count: 3,
          lines: ['.weight: {', '  font-weight: var(--h2-font-weight-thin);', '}'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Radius variables',
      id: 'radii',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Border radius variables follow the standard pattern and are named using your specified <code>key</code> value and return the <code>border-radius</code> value you've chosen.",
            '<code>--h2-radius-[KEY]</code>',
          ],
        },
        {
          type: 'code',
          file: 'app.css',
          language: 'css',
          count: 3,
          lines: ['.radius: {', '  border-radius: var(--h2-radius-rounded);', '}'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Shadow variables',
      id: 'shadows',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Box shadow variables follow the standard pattern and are named using your specified <code>key</code> value and return the <code>box-shadow</code> value you've chosen.",
            '<code>--h2-shadow-[KEY]</code>',
          ],
        },
        {
          type: 'code',
          file: 'app.css',
          language: 'css',
          count: 3,
          lines: ['.shadow: {', '  box-shadow: var(--h2-shadow-small);', '}'],
        },
      ],
    },
    {
      type: 'title',
      label: 'Transition variables',
      id: 'transitions',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Transition delay variables follow the standard pattern and are named using your specified <code>key</code> value and return the <code>delay</code> time value you've chosen.",
            '<code>--h2-transition-delay-[KEY]</code>',
          ],
        },
        {
          type: 'code',
          file: 'app.css',
          language: 'css',
          count: 3,
          lines: [
            '.transition-delay: {',
            '  transition: all .2s ease var(--h2-transition-delay-fast);',
            '}',
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
            "Transition duration variables follow the standard pattern and are named using your specified <code>key</code> value and return the <code>duration</code> time value you've chosen.",
            '<code>--h2-transition-duration-[KEY]</code>',
          ],
        },
        {
          type: 'code',
          file: 'app.css',
          language: 'css',
          count: 3,
          lines: [
            '.transition-duration: {',
            '  transition: all var(--h2-transition-duration-slow) ease;',
            '}',
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
            "Transition easing function variables follow the standard pattern and are named using your specified <code>key</code> value and return the <code>function</code> value you've chosen.",
            '<code>--h2-transition-function-[KEY]</code>',
          ],
        },
        {
          type: 'code',
          file: 'app.css',
          language: 'css',
          count: 3,
          lines: [
            '.transition-function: {',
            '  transition: all .2s var(--h2-transition-function-swish);',
            '}',
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Wrapper variables',
      id: 'wrappers',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Wrapper variables follow the standard pattern and are named using your specified <code>key</code> value and return the <code>max-width</code> value you've chosen.",
            '<code>--h2-wrapper-[KEY]</code>',
          ],
        },
        {
          type: 'code',
          file: 'app.css',
          language: 'css',
          count: 3,
          lines: ['.wrapper: {', '  max-width: var(--h2-wrapper-large);', '}'],
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
