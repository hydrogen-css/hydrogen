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
  return String.raw`
    <div
      data-h2-position="base(sticky)"
      data-h2-layer="base(5)"
      data-h2-offset="base(0, auto, auto, auto)">
      <div data-h2-padding="base(x1, 0, 0, 0) l-tablet(x2, 0, 0, 0) laptop(x3, 0, 0, 0) desktop(x4, 0, 0, 0)">
        <div
          data-h2-bg-color="base(white) base:dark(dark.font)"
          data-h2-radius="base(rounded)"
          data-h2-padding="base(x2)"
          data-h2-shadow="base(large)"
          data-h2-overflow="base(visible, auto)"
          data-h2-height="base(70vh)">
            <h1
              data-h2-font-size="base(h2)"
              data-h2-font-weight="base(800)"
              data-h2-font-color="base(dark.font) base:dark(white)"
              data-h2-text-align="base(center)">
              <a
                href="/${data.locale}/docs"
                title=""
                data-h2-background-color="base:focus-visible(focus)"
                data-h2-color="base(black) base:focus-visible(black) base:hover(primary) base:dark(white) base:dark:hover(primary.lighter)"
                data-h2-transition="base:hover(color, .2s, ease, 0s)"
                data-h2-text-decoration="base(none)">
                Hydrogen
              </a>
            </h1>
            <form data-h2-margin="base(x2, auto, auto, auto)">
              <label
                data-h2-display="base(block)"
                data-h2-font-size="base(caption)"
                data-h2-font-color="base(dark.font) base:dark(white)">Search</label>
              <input 
                data-h2-border="base(all, 1px, solid, black)"
                data-h2-display="base(block)"
                data-h2-radius="base(code)"
                data-h2-padding="base(x.5, x1)"
                data-h2-font-size="base(copy)"
                data-h2-width="base(100%)"
                type="text"
                placeholder="Find something...">
            </form>
            <div
              class="main_menu" 
              data-h2-margin="base(x2, 0, 0, 0)">
              <button
                type="button"
                onclick="toggle_main_menu(this)"
                class="main_menu_toggle"
                data-h2-cursor="base(pointer)"
                data-h2-display="base(block)"
                data-h2-background-color="base(transparent) base:focus-visible(focus)"
                data-h2-border="base(none)"
                data-h2-width="base(100%)"
                data-h2-font-weight="base(700)"
                data-h2-padding="base(0)"
                data-h2-margin="base(0, 0, x.25, 0)"
                data-h2-text-align="base(left)"
                data-h2-color="base(primary.dark) base:hover(black) base:focus-visible(black) base:dark(primary.lighter) base:dark:hover(white)"
                data-h2-transition="base:hover(color, .2s, ease, 0s)"
                data-h2-text-decoration="base(underline)"
                style="outline: none;">
                <span class="show_label">Show</span><span class="hide_label">Hide</span> the main menu
              </button>
              <nav 
                id="nav"
                class="menu_list">
                <ul data-h2-padding="base(0, 0, 0, x1)">
                  <li data-h2-margin="base(x.25, 0, 0, 0)">
                    <a 
                      href="/{{ locale }}"
                      title=""
                      data-h2-font-color="base:hover(primary) base:dark:hover(lighter.primary)">
                      Home
                    </a>
                  </li>
                  <li data-h2-margin="base(x.25, 0, 0, 0)">
                    <a 
                      href="/en/docs"
                      title=""
                      data-h2-font-color="base:hover(primary) base:dark:hover(lighter.primary)">
                      Docs
                    </a>
                  </li>
                  <li data-h2-margin="base(x.25, 0, 0, 0)">
                    <a 
                      href="https://github.com/hydrogen-design-system/hydrogen"
                      title=""
                      data-h2-font-color="base:hover(primary) base:dark:hover(lighter.primary)">
                      Github
                    </a>
                  </li>
                  <li data-h2-margin="base(x.25, 0, 0, 0)">
                    <a 
                      href="/en/releases"
                      title=""
                      data-h2-font-color="base:hover(primary) base:dark:hover(lighter.primary)">
                      Releases
                    </a>
                  </li>
                  <li data-h2-margin="base(x.25, 0, 0, 0)">
                    <a 
                      href="https://forms.office.com/r/vz80dsUabZ"
                      title="Submit generic, usability, or bug feedback."
                      data-h2-font-color="base:hover(primary) base:dark:hover(lighter.primary)">
                      Feedback
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <p 
              data-h2-margin="base(x1, 0, x.25, 0)"
              data-h2-font-weight="base(700)">On this page</p>
            <ul data-h2-padding="base(0, 0, 0, x1)">
              ${create_page_menu()}
            </ul>
          </div>
      </div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
