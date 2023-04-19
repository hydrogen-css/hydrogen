var data = {};

function render(data) {
  let expansion_small = require('./expansion-small.11ty.js');
  function return_menu_item(label, url, { external, children }) {
    function external_data() {
      if (external) {
        return 'target="_blank" rel="noreferrer"';
      } else {
        return '';
      }
    }
    function child_data() {
      if (children) {
        return children;
      } else {
        return '';
      }
    }
    return String.raw`
      <li data-h2-margin="base(x.25, 0, 0, 0)">
        <div data-h2-display="base(flex)" data-h2-gap="base(x.25)">
          <div 
            data-h2-height="base(x1)" 
            data-h2-width="base(x.75)" 
            data-h2-position="base(relative)">
            <span
              data-h2-font-size="base(1rem)"
              data-h2-color="base(primary.dark)"
              data-h2-position="base(center)">•</span>
          </div>
          <a 
            href="${url}"
            title=""
            ${external_data()}>
            ${label}
          </a>
        </div>
        ${child_data()}
      </li>
    `;
  }

  let installation_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x.75)">
      ${return_menu_item(
        'Getting started',
        '/' + data.locale + '/docs/installation/getting-started',
        {
          external: false,
          children: false,
        }
      )}
      ${return_menu_item(
        'Running commands',
        '/' + data.locale + '/docs/installation/running-commands',
        {
          external: false,
          children: false,
        }
      )}
    </ul>
  `;

  let configuration_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x.75)">
      ${return_menu_item(
        'Core settings',
        '/' + data.locale + '/docs/configuration/core-settings',
        {
          external: false,
          children: false,
        }
      )}
      ${return_menu_item(
        'Configuring media queries',
        '/' + data.locale + '/docs/configuration/configuring-queries',
        {
          external: false,
          children: false,
        }
      )}
      ${return_menu_item(
        'Configuring dark mode',
        '/' + data.locale + '/docs/configuration/configuring-modes',
        {
          external: false,
          children: false,
        }
      )}
      ${return_menu_item(
        'Creating themes',
        '/' + data.locale + '/docs/configuration/creating-themes',
        {
          external: false,
          children: false,
        }
      )}
    </ul>
  `;

  let styling_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x.75)">
      ${return_menu_item('Syntax', '/' + data.locale + '/docs/styling/syntax', {
        external: false,
        children: false,
      })}
      ${return_menu_item(
        'Typography',
        '/' + data.locale + '/docs/styling/typography',
        {
          external: false,
          children: false,
        }
      )}
      ${return_menu_item('Layout', '/' + data.locale + '/docs/styling/layout', {
        external: false,
        children: false,
      })}
      ${return_menu_item('Colors', '/' + data.locale + '/docs/styling/colors', {
        external: false,
        children: false,
      })}
    </ul>
  `;

  let properties_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x.75)">
      ${return_menu_item(
        'Standard properties',
        '/' + data.locale + '/docs/properties/standard',
        {
          external: false,
          children: false,
        }
      )}
      ${return_menu_item(
        'Hydrogen properties',
        '/' + data.locale + '/docs/properties/hydrogen',
        {
          external: false,
          children: false,
        }
      )}
    </ul>
  `;

  let docs_menu = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x.75)">
      <li data-h2-margin="base(x.25, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: false,
          label: 'Installation',
          link: {
            url: '/' + data.locale + '/docs/installation',
            label: 'Installation',
          },
          content: installation_content,
        })}
      </li>
      <li data-h2-margin="base(x.25, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: false,
          label: 'Configuration',
          link: {
            url: '/' + data.locale + '/docs/configuration',
            label: 'Configuration',
          },
          content: configuration_content,
        })}
      </li>
      <li data-h2-margin="base(x.25, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: false,
          label: 'Styling',
          link: {
            url: '/' + data.locale + '/docs/styling',
            label: 'Styling',
          },
          content: styling_content,
        })}
      </li>
      <li data-h2-margin="base(x.25, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: false,
          label: 'Properties',
          link: {
            url: '/' + data.locale + '/docs/properties',
            label: 'Properties',
          },
          content: properties_content,
        })}
      </li>
    </ul>
  `;

  function menu_content() {
    let output = String.raw`
      <div>
        <div
          data-h2-display="base(flex)"
          data-h2-align-items="base(center)"
          data-h2-gap="base(x1)">
          <p 
            data-h2-color="base(black)"
            data-h2-font-weight="base(700)" 
            data-h2-text-align="base(left)">
            Main menu
          </p>
          <div
            data-h2-height="base(1px)"
            data-h2-background="base(primary)"
            data-h2-flex-grow="base(1)"></div>
        </div>
    `;
    output =
      output +
      String.raw`
      <nav>
        <ul data-h2-padding="base(0)" data-h2-list-style="base(none) base:children[ul](none)">
          ${return_menu_item('Home', '/' + data.locale, {
            external: false,
            children: false,
          })}
          <li data-h2-margin="base(x.25, 0, 0, 0)">
            ${expansion_small.render(data, {
              state: false,
              label: 'Documentation',
              link: {
                url: '/' + data.locale + '/docs',
                label: 'Documentation',
              },
              content: docs_menu,
            })}
          </li>
          ${return_menu_item('Releases', '/' + data.locale + '/docs/releases', {
            external: false,
            children: false,
          })}
          ${return_menu_item(
            'Github',
            'https://github.com/hydrogen-design-system/hydrogen',
            {
              external: true,
              children: false,
            }
          )}
        </ul>
      </nav>
    `;
    output = output + String.raw`</div>`;
    return output;
  }

  function page_content() {
    if (data.navigation.key != 'home') {
      let output = String.raw`
      <div data-h2-margin="base(x1 0 0 0)">
        <div
          data-h2-display="base(flex)"
          data-h2-align-items="base(center)"
          data-h2-gap="base(x1)">
          <p 
            data-h2-color="base(black)"
            data-h2-font-weight="base(700)" 
            data-h2-text-align="base(left)">
            On this page
          </p>
          <div
            data-h2-height="base(1px)"
            data-h2-background="base(primary)"
            data-h2-flex-grow="base(1)"></div>
        </div>
        <ul data-h2-padding="base(0)" data-h2-list-style="base(none)">
      `;
      data.main.forEach((item) => {
        if (item.type === 'title') {
          output =
            output +
            return_menu_item(item.label, '#' + item.id, {
              external: false,
              children: false,
            });
        } else if (item.type === 'section') {
          output =
            output +
            String.raw`<ul data-h2-list-style="base(none)" data-h2-padding="base(0, 0, 0, x.75)">`;
          item.content.forEach((item) => {
            if (item.type === 'title') {
              output =
                output +
                return_menu_item(item.label, '#' + item.id, {
                  external: false,
                  children: false,
                });
            }
          });
          output = output + String.raw`</ul>`;
        }
      });
      output = output + String.raw`</ul></div>`;
      return output;
    } else {
      return String.raw``;
    }
  }

  return String.raw`
    ${menu_content()}
    ${page_content()}
  `;
}

module.exports = {
  data,
  render,
};
