const docs_layout = require('../../../../_includes/pages/docs.11ty');

let data = {
  layout: 'pages/docs.11ty.js',
  navigation: {
    order: 8,
    key: 'configuring-modes',
    parent: 'configuration',
    pagination: true,
  },
  title: 'Dark mode',
  title_long: 'Configuring dark mode',
  subtitle:
    'Learn how to configure dark mode and automatically apply it to your project.',
  main: [
    {
      type: 'title',
      label: 'Understanding modes',
      id: 'modes',
    },
    {
      type: 'copy',
      items: [
        'Modes allow you to control common visual states that allow for both accessibility and comfort. For now, Hydrogen supports <strong>dark mode</strong>, but there are plans to also introduce a high contrast mode down the road.',
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Modes vs. themes',
          id: 'themes',
        },
        {
          type: 'copy',
          items: [
            'Modes and themes are both ways of applying specific styles to a context. The biggest difference between the two is that modes are applied on a per-theme basis. This means that <a href="http://localhost:8080/en/docs/configuration/creating-themes/" title="Find out how to create custom themes.">each theme you create in your configuration</a> will have access to its own unique light and dark modes.',
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Applying modes to your project',
      id: 'methods',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            "Hydrogen offers two ways to take advantage of mode-specific styles. By default, your configuration will have the <code>method</code> option set to <code>preference</code>, because this method doesn't require any intervention on your end to work. Alternatively, you can choose to take advantage of the more complex, but more useful <code>toggle</code> method. This option does require extra work to apply, but provides a much better user experience.",
          ],
        },
        {
          type: 'code',
          file: 'hydrogen.config.json',
          lines: [
            '"modes": {',
            '  "method: "preference"',
            '  "dark": {',
            '    ...',
            '  }',
            '}',
          ],
        },
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'The "preference" mode',
          id: 'preference',
        },
        {
          type: 'copy',
          items: [
            "The preference-based approach relies on the <code>prefers-color-scheme</code> media query to enable styles when the user has set their browser to request a particular mode. These styles are automatic and will instantly apply when the end user sets their browser configuration. This option is great because it's low maintenance and doesn't require custom scripting or interactivity to work. The downside is that your application won't be able to be customized independently of the browser's setting, which can sometimes be frustrating for users who prefer a specific setting on individual applications.",
          ],
        },
        {
          type: 'title',
          label: 'The "toggle" mode',
          id: 'toggle',
        },
        {
          type: 'copy',
          items: [
            "The toggle-based approach is more complex and relies on data attributes to trigger styles. In order for it to work, you'll need to build a toggle UI element on your project that allows the user to make their theme choice. A basic working toggle can be found below.",
            'The advantage to using <code>toggle</code> is that it allows your end user to choose between 3 options:',
          ],
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Their browser setting',
            'Manual light mode',
            'Manual dark mode',
          ],
        },
        {
          type: 'expansion',
          label: 'How to build a basic mode toggle',
          expanded: '',
          items: [
            {
              type: 'group',
              items: [
                {
                  type: 'copy',
                  items: [
                    'Toggle-based dark mode requires an interface so that the user can make a selection based on their preference. An example of one in action can be found in the topbar area of this website.',
                    'At its core, the toggle should contain 3 <code>button</code> elements; one for each option. Using the <code>onclick</code> attribute, each button will trigger a script (outlined for you below) that enables the mode selected.',
                  ],
                },
                {
                  type: 'code',
                  file: 'index.html',
                  lines: [
                    '<div>',
                    '  <button onclick="enable_mode_preference()">',
                    '    Browser setting',
                    '  </button>',
                    '  <button onclick="enable_mode_light()">',
                    '    Light mode',
                    '  </button>',
                    '  <button onclick="enable_mode_dark()">',
                    '    Dark mode',
                    '  </button>',
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
                    "The first part of our script will be to grab the relevant Hydrogen elements from the DOM. We use <code>querySelectorAll</code> to grab all instances of <code>data-h2</code> on your project just in case you're using multiple instances.",
                  ],
                },
                {
                  type: 'code',
                  file: 'app.js',
                  lines: [
                    "let instances = document.querySelectorAll('[data-h2]');",
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
                    'The next part of our script will add an event listener to the window to help us detect when a user changes their mode setting. This part of the script only really applies if the user has selected the preference-based mode, but it will enable automatic switching between modes if the user changes their browser or system settings.',
                    "You'll notice that we also check for <code>localStorage.mode</code> here - this prevents the function from running if the user has manually chosen a fixed mode independently of their browser setting.",
                  ],
                },
                {
                  type: 'code',
                  file: 'app.js',
                  lines: [
                    'function check_for_dark_mode() {',
                    '  if (',
                    "    (window.matchMedia('(prefers-color-scheme: dark)').matches &&",
                    "      (localStorage.mode === undefined || localStorage.mode != 'light')) ||",
                    "    (localStorage.mode != undefined && localStorage.mode === 'dark')",
                    '  ) {',
                    '    instances.forEach((hydrogen) => {',
                    "      hydrogen.dataset.h2 = hydrogen.dataset.h2 + ' dark';",
                    '    });',
                    '  } else {',
                    '    instances.forEach((hydrogen) => {',
                    "      hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '');",
                    '    });',
                    '  }',
                    '}',
                    'window',
                    "  .matchMedia('(prefers-color-scheme: dark)')",
                    "  .addEventListener('change', (e) => e.matches && check_for_dark_mode());",
                    'window',
                    "  .matchMedia('(prefers-color-scheme: light)')",
                    "  .addEventListener('change', (e) => e.matches && check_for_dark_mode());",
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
                    "Now we can focus on saving the user's preferred setting so that when they return to your site it remembers what they've chosen.",
                    'To do this, we leverage <code>localStorage</code> to store data labelled as <code>mode</code>. This function looks at that storage object and applies the correct mode based on what it finds.',
                  ],
                },
                {
                  type: 'code',
                  file: 'app.js',
                  lines: [
                    'if (localStorage.mode != undefined) {',
                    "  if (localStorage.mode === 'dark') {",
                    '    instances.forEach((hydrogen) => {',
                    "      hydrogen.dataset.h2 = hydrogen.dataset.h2 + ' dark';",
                    '    });',
                    "  } else if (localStorage.mode === 'light') {",
                    '    instances.forEach((hydrogen) => {',
                    "      hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '');",
                    '    });',
                    '  }',
                    '} else if (',
                    '  localStorage.mode == undefined &&',
                    "  window.matchMedia('(prefers-color-scheme: dark)').matches",
                    ') {',
                    '  instances.forEach((hydrogen) => {',
                    "    hydrogen.dataset.h2 = hydrogen.dataset.h2 + ' dark';",
                    '  });',
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
                    "Now we can add the functions triggered by our toggle element. To start, the <code>enable_mode_preference()</code> will reset the mode settings to match the user's browser setting.",
                    'Notice how we also clear out <code>localStorage.mode</code> to ensure that their browser settings are respected when they return.',
                  ],
                },
                {
                  type: 'code',
                  file: 'app.js',
                  lines: [
                    'function enable_mode_preference() {',
                    "  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {",
                    '    instances.forEach((hydrogen) => {',
                    "      if (!hydrogen.dataset.h2.includes('dark'))",
                    "        hydrogen.dataset.h2 = hydrogen.dataset.h2 + ' dark';",
                    '    });',
                    '  } else {',
                    '    instances.forEach((hydrogen) => {',
                    "      hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '');",
                    '    });',
                    '  }',
                    "  localStorage.removeItem('mode');",
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
                    "Next up is the manual light mode toggle function, <code>enable_mode_light()</code>. When selected, this option will override the browser's setting and force the default light mode to appear. Don't forget to add their choice to <code>localStorage</code>.",
                  ],
                },
                {
                  type: 'code',
                  file: 'app.js',
                  lines: [
                    'function enable_mode_light() {',
                    '  instances.forEach((hydrogen) => {',
                    "    hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '');",
                    '  });',
                    "  localStorage.mode = 'light';",
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
                    "Finally, we have the manual dark mode toggle function, <code>enable_mode_dark()</code>. Just like the light toggle, when selected, this option will override the browser's setting and force dark mode to appear.",
                  ],
                },
                {
                  type: 'code',
                  file: 'app.js',
                  lines: [
                    'function enable_mode_dark() {',
                    '  instances.forEach((hydrogen) => {',
                    "    if (!hydrogen.dataset.h2.includes('dark'))",
                    "      hydrogen.dataset.h2 = hydrogen.dataset.h2 + ' dark';",
                    '  });',
                    "  localStorage.mode = 'dark';",
                    '}',
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'title',
      label: 'Dark mode',
      id: 'dark-mode',
    },
    {
      type: 'group',
      items: [
        {
          type: 'copy',
          items: [
            'Because Hydrogen only supports dark mode for now, the <code>dark</code> object is the only available mode you can configure.',
          ],
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            '<code>auto_apply_styles</code> tells Hydrogen whether or not you want dark mode styles to apply automatically in your code. This setting allows you to <a href="/en/docs/configuration/creating-themes/#styles" title="Learn more about creating themes.">define dark mode values for your theme</a> and have them apply without any extra work. Disabling this setting allows you to apply your dark mode styles by hand, preventing unexpected results.',
            '<code>swap_default_modifiers</code> will tell Hydrogen if you want it to automatically swap its default color modifiers for their opposite in dark mode. For example, if you set <code>primary.darker</code> as a color in light mode, this setting will automatically apply the <code>primary.lighter</code> value in dark mode.',
          ],
        },
        {
          type: 'code',
          file: 'hydrogen.config.json',
          lines: [
            '"modes": {',
            '  "dark": {',
            '    "auto_apply_styles": true,',
            '    "swap_default_modifiers": true,',
            '  }',
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
            'Dark mode styles are applied to elements using the <code>:dark</code> modifier on the <code>base</code> or a custom media query.',
          ],
        },
        {
          type: 'code',
          file: 'index.html',
          lines: ['data-h2-color="base:dark(primary)"'],
        },
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'title',
          label: 'Automatic vs. manual styling',
          id: 'automatic-vs-manual',
        },
        {
          type: 'copy',
          items: [
            'Hydrogen provides the option to <a href="/en/docs/configuration/creating-themes/#styles" title="Learn how to create dark mode theme configurations.">specify mode-specific values for theme configurations</a> in your <code>hydrogen.config.json</code> file. Using these values, Hydrogen can handle the heavy-lifting of applying dark mode styles to your project for you. This functionality is further broken down into two control settings you can enable or disable to meet your needs.',
          ],
        },
        {
          type: 'section',
          content: [
            {
              type: 'title',
              label: 'Automatic dark mode',
              id: 'automatic',
            },
            {
              type: 'copy',
              items: [
                'The <code>auto_apply_styles</code> option will tell Hydrogen to automatically apply your dark mode specific values for you. This is a blanket application, so if you choose to tell the theme to swap out <code>white</code> for <code>black</code> in dark mode, every instance of <code>white</code> will automatically be black.',
                "In a majority of cases, this is extremely helpful, because it will allow you to focus your effort on the handful of instances where the color swap doesn't make sense. <strong>This is particularly important when performing accessibility audits to ensure that your swapped color hasn't created contrast problems.</strong>",
                "To extend this even further, a second control is provided through the <code>swap_default_modifiers</code> option that will automatically swap Hydrogen's default color modifiers for their opposite when dark mode is enabled. For example, <code>primary.dark</code> in light mode will swap to the value generated for <code>primary.light</code> when dark mode is toggled on. This allows for intuitive theme building by ensuring that a majority of contrast instances are accounted for when dark mode is automatically applied.",
              ],
            },
            {
              type: 'section',
              content: [
                {
                  type: 'title',
                  label: 'Manual overrides',
                  id: 'manual-overrides',
                },
                {
                  type: 'copy',
                  items: [
                    "For times when the automatic swap isn't working as you'd expect, you can override automatic dark mode styles using the <code>:dark</code> modifier on your query. This is especially useful for accessibility corrections.",
                    'For objects that need to retain their styles across both light and dark modes, you can use the <code>:all</code> modifier on your query to force the styles to stay the same.',
                  ],
                },
              ],
            },
            {
              type: 'title',
              label: 'Styling dark mode manually',
              id: 'manual',
            },
            {
              type: 'copy',
              items: [
                "If you'd rather not use Hydrogen's automated mode settings, you can still use the <code>:dark</code> query modifier in your attributes to apply styles that are unique to dark mode. This gives you full control over how dark mode styles work, but requires much more manual work to ensure that all of your elements and interfaces have been considered.",
              ],
            },
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
