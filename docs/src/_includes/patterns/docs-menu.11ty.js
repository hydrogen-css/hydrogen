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
        output = output + String.raw`<ul data-h2-padding="base(0, 0, 0, x1)">`;
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

  let page_content = String.raw`
    <ul data-h2-padding="base(0 0 0 x1)" data-h2-list-style="base(none)">
      ${create_page_menu()}
    </ul>
  `;

  let menu_content = String.raw`
    <nav id="nav">
      <ul data-h2-padding="base(0, 0, 0, x1)" data-h2-list-style="base(none) base:children[ul](none)">
        <li data-h2-margin="base(x.25, 0, 0, 0)">
          <a 
            href="/${data.locale}"
            title="">
            Home
          </a>
        </li>
        <li data-h2-margin="base(x.25, 0, 0, 0)">
          <a 
            href="/${data.locale}/docs"
            title="">
            Docs
          </a>
          <ul data-h2-padding="base(0, 0, 0, x1)" data-h2-display="base(none)">
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              <a 
                href="/${data.locale}/docs/installation"
                title="">
                Installation
              </a>
            </li>
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              <a 
                href="/${data.locale}/docs/commands"
                title="">
                Commands
              </a>
            </li>
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              <a 
                href="/${data.locale}/docs/tooling"
                title="">
                Tooling
              </a>
            </li>
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              <a 
                href="/${data.locale}/docs/configuration"
                title="">
                Configuration
              </a>
            </li>
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              <a 
                href="/${data.locale}/docs/syntax"
                title="">
                Syntax
              </a>
            </li>
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              <a 
                href="/${data.locale}/docs/typography"
                title="">
                Typography
              </a>
            </li>
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              <a 
                href="/${data.locale}/docs/layout"
                title="">
                Layout
              </a>
            </li>
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              <a 
                href="/${data.locale}/docs/colors"
                title="">
                Colors
              </a>
            </li>
            <li data-h2-margin="base(x.25, 0, 0, 0)">
              <a 
                href="/${data.locale}/docs/properties"
                title="">
                Properties
              </a>
            </li>
          </ul>
        </li>
        <li data-h2-margin="base(x.25, 0, 0, 0)">
          <a 
            href="https://github.com/hydrogen-design-system/hydrogen"
            title="">
            Github
          </a>
        </li>
        <li data-h2-margin="base(x.25, 0, 0, 0)">
          <a 
            href="/en/releases"
            title="">
            Releases
          </a>
        </li>
        <li data-h2-margin="base(x.25, 0, 0, 0)">
          <a 
            href="https://forms.office.com/r/vz80dsUabZ"
            title="Submit generic, usability, or bug feedback.">
            Feedback
          </a>
        </li>
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
          data-h2-background="base(foreground)"
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
              data-h2-font-color="base(font.dark) base:dark(white)"
              data-h2-text-align="base(center)">
              <a
                href="/${data.locale}/docs"
                title=""
                data-h2-background-color="base:focus-visible(focus)"
                data-h2-color="base(black) base:focus-visible(black) base:hover(primary)"
                data-h2-transition="base:hover(color, .2s, ease, 0s)"
                data-h2-text-decoration="base(none)">
                Hydrogen
              </a>
            </h1>
            <form data-h2-margin="base(x2, auto, auto, auto)">
              <label
                data-h2-display="base(block)"
                data-h2-font-size="base(caption)"
                data-h2-font-color="base(font.dark) base:dark(white)">Search</label>
              <input 
                data-h2-border="base(1px solid black)"
                data-h2-display="base(block)"
                data-h2-radius="base(code)"
                data-h2-padding="base(x.5, x1)"
                data-h2-font-size="base(copy)"
                data-h2-width="base(100%)"
                type="text"
                placeholder="Find something...">
            </form>
            <div data-h2-margin="base(x2 0 0 0)">
              ${expansion_small.render(data, {
                state: true,
                label: 'On this page',
                content: page_content,
              })}
            </div>
            <div data-h2-margin="base(x1 0 0 0)">
              ${expansion_small.render(data, {
                state: true,
                label: 'Main menu',
                content: menu_content,
              })}
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
