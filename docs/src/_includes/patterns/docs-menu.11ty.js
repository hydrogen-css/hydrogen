const expansion_small = require('../components/expansion-small.11ty.js');

var data = {};

function render(data) {
  function create_page_menu() {
    let output = ``;
    data.main.forEach((item) => {
      if (item.type === 'title') {
        output =
          output +
          String.raw`
          <li data-h2-margin="base(x.25, 0, 0, 0)">
            <a
              href="#${item.id}"
              title="Skip to this section on the page.">${item.label}</a>
          </li>
        `;
      } else if (item.type === 'section') {
        output =
          output +
          String.raw`<ul data-h2-list-style="base(none)" data-h2-padding="base(0, 0, 0, x1)">`;
        item.content.forEach((item) => {
          if (item.type === 'title') {
            output =
              output +
              String.raw`
              <li data-h2-margin="base(x.25, 0, 0, 0)">
                <a
                  href="#${item.id}"
                  title="Skip to this section on the page.">${item.label}</a>
              </li>
            `;
          }
        });
        output = output + String.raw`</ul>`;
      }
    });
    return output;
  }

  function return_menu_item(label, url, external) {
    function external_data() {
      if (external) {
        return 'target="_blank" rel="noreferrer"';
      } else {
        return '';
      }
    }
    return String.raw`
      <li data-h2-margin="base(x.25, 0, 0, 0)" data-h2-position="base(relative)">
        <span
          data-h2-font-size="base(1rem)"
          data-h2-position="base(absolute)"
          data-h2-location="base(-2px, auto, auto, -1.5rem)"
          data-h2-color="base(primary.light)">•</span>
        <a 
          href="${url}"
          title=""
          ${external_data()}>
          ${label}
        </a>
      </li>
    `;
  }

  let page_content = String.raw`
    <ul data-h2-padding="base(0)" data-h2-list-style="base(none)">
      ${create_page_menu()}
    </ul>
  `;

  let installation_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x2)">
      ${return_menu_item(
        'Getting started',
        '/' + data.locale + '/docs/installation/getting-started'
      )}
      ${return_menu_item(
        'Running commands',
        '/' + data.locale + '/docs/installation/running-commands'
      )}
    </ul>
  `;

  let configuration_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x2)">
      ${return_menu_item(
        'Core settings',
        '/' + data.locale + '/docs/configuration/core-settings'
      )}
      ${return_menu_item(
        'Configuring media queries',
        '/' + data.locale + '/docs/configuration/configuring-queries'
      )}
      ${return_menu_item(
        'Configuring dark mode',
        '/' + data.locale + '/docs/configuration/configuring-modes'
      )}
      ${return_menu_item(
        'Creating themes',
        '/' + data.locale + '/docs/configuration/creating-themes'
      )}
    </ul>
  `;

  let styling_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x2)">
      <li data-h2-margin="base(x.25, 0, 0, 0)">
        <a 
          href="/${data.locale}/docs/styling/syntax"
          title="">
          Syntax
        </a>
      </li>
      <li data-h2-margin="base(x.25, 0, 0, 0)">
        <a 
          href="/${data.locale}/docs/styling/typography"
          title="">
          Typography
        </a>
      </li>
      <li data-h2-margin="base(x.25, 0, 0, 0)">
        <a 
          href="/${data.locale}/docs/styling/layout"
          title="">
          Layout
        </a>
      </li>
      <li data-h2-margin="base(x.25, 0, 0, 0)">
        <a 
          href="/${data.locale}/docs/styling/colors"
          title="">
          Colors
        </a>
      </li>
    </ul>
  `;

  let properties_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x2)">
      <li data-h2-margin="base(x.25, 0, 0, 0)">
        <a 
          href="/${data.locale}/docs/properties/standard"
          title="">
          Standard properties
        </a>
      </li>
      <li data-h2-margin="base(x.25, 0, 0, 0)">
        <a 
          href="/${data.locale}/docs/properties/hydrogen"
          title="">
          Hydrogen properties
        </a>
      </li>
    </ul>
  `;

  let menu_content = String.raw`
    <nav>
      <ul data-h2-padding="base(0)" data-h2-list-style="base(none) base:children[ul](none)">
        ${return_menu_item('Home', '/' + data.locale)}
        <li data-h2-margin="base(x.25, 0, 0, 0)">
          <a 
            href="/${data.locale}/docs"
            title="">
            Documentation
          </a>
          <ul data-h2-padding="base(0)">
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              ${expansion_small.render(data, {
                state: false,
                label: 'Installation',
                content: installation_content,
              })}
            </li>
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              ${expansion_small.render(data, {
                state: false,
                label: 'Configuration',
                content: configuration_content,
              })}
            </li>
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              ${expansion_small.render(data, {
                state: false,
                label: 'Styling',
                content: styling_content,
              })}
            </li>
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              ${expansion_small.render(data, {
                state: false,
                label: 'Properties',
                content: properties_content,
              })}
            </li>
          </ul>
        </li>
        ${return_menu_item('Releases', '/' + data.locale + '/docs/releases')}
        ${return_menu_item(
          'Github',
          'https://github.com/hydrogen-design-system/hydrogen',
          true
        )}
      </ul>
    </nav>
  `;

  return String.raw`
    <div
      data-h2-position="base(sticky)"
      data-h2-layer="base(5)"
      data-h2-location="base(0, auto, auto, auto)">
      <div data-h2-padding="base(x1, 0, 0, 0) l-tablet(x2, 0, 0, 0) laptop(x3, 0, 0, 0) desktop(x4, 0, 0, 0)">
        <div
          data-h2-background="
            base(foreground)
            base:children[button](transparent)
            base:children[a:focus-visible, button:focus-visible](focus)"
          data-h2-border="base:children[a, button](none)"
          data-h2-display="base:children[a, button](block)"
          data-h2-outline="base:children[a, button](none)"
          data-h2-color="base:children[a, button](font) base:all:children[a:focus-visible, button:focus-visible](black) base:children[a:hover, button:hover](primary)"
          data-h2-stroke="base:all:children[a:focus-visible path, button:focus-visible path](black)"
          data-h2-radius="base(rounded)"
          data-h2-padding="base(x2)"
          data-h2-shadow="base(large)"
          data-h2-overflow="base(visible, auto)"
          data-h2-height="
            l-tablet(calc(100vh - ((var(--h2-base-whitespace) * 7) * 1rem)))
            laptop(calc(100vh - ((var(--h2-base-whitespace) * 8) * 1rem)))
            desktop(calc(100vh - ((var(--h2-base-whitespace) * 9) * 1rem)))">
            <h1
              data-h2-font-size="base(h2)"
              data-h2-font-weight="base(800)"
              data-h2-text-align="base(center)">
              <a
                href="/${data.locale}/docs"
                title=""
                id="nav"
                data-h2-color="base(black) base:hover(primary) base:all:focus-visible(black)"
                data-h2-transition="base:hover(color, .2s, ease, 0s)"
                data-h2-text-decoration="base(none)">
                Hydrogen
              </a>
            </h1>
            <!-- <form data-h2-margin="base(x1.5, auto, auto, auto)">
              <label
                data-h2-display="base(block)"
                data-h2-font-size="base(caption)"
                data-h2-font-color="base(font)">Search the docs</label>
              <input 
                data-h2-border="base(1px solid black)"
                data-h2-display="base(block)"
                data-h2-radius="base(code)"
                data-h2-padding="base(x.5, x1)"
                data-h2-font-size="base(copy)"
                data-h2-width="base(100%)"
                type="text"
                placeholder="Find something...">
            </form> -->
            <div data-h2-margin="base(x2 0 0 0)">
              <p 
                data-h2-color="base(black)"
                data-h2-font-weight="base(700)" 
                data-h2-text-align="base(left)">
                Main menu
              </p>
              ${menu_content}
            </div>
            <div data-h2-margin="base(x1 0 0 0)">
              <p 
                data-h2-color="base(black)"
                data-h2-font-weight="base(700)" 
                data-h2-text-align="base(left)">
                On this page
              </p>
              ${page_content}
            </div>
          </div>
      </div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};