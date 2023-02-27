const get_menu_data = require('../components/menu.11ty');

var data = {};

function render(data) {
  return String.raw`
    <div
      class="mobile-menu"
      data-h2-display="
        base(block) 
        l-tablet(none)
        base:children[>div>button>span:first-child](block)
        base:children[>div>button>span:last-child](none)
        base:selectors[.active]:children[>div>button>span:first-of-type](none)
        base:selectors[.active]:children[>div>button>span:last-child](block)"
      data-h2-location="base(auto, auto, -5px, 0)"
      data-h2-width="base(100%)"
      data-h2-layer="base(100, fixed)"
      data-h2-transform="
        base:children[>nav](translate(0, 100%)) 
        base:selectors[.active]:children[>nav](translate(0, -100%))">
      <div data-h2-padding="base(x1, x1, 0, x1)">
        <button
          class="mobile-menu-trigger"
          data-h2-background="base:all(black) base:all:focus-visible(focus)"
          data-h2-border="base(none)"
          data-h2-padding="base(x1, x1, calc(x1 + 5px), x1)"
          data-h2-radius="base(rounded rounded 0px 0px)"
          data-h2-shadow="base(0 5px 25px rgba(0, 0, 0, .5))"
          data-h2-overflow="base(hidden)"
          data-h2-width="base(100%)"
          data-h2-outline="base(none)"
          data-h2-display="base:focus-visible:children[>div](none)"
          data-h2-layer="base(2, relative) base:children[>span](2, relative)"
          data-h2-font-weight="base:children[>span](700)"
          data-h2-font-size="base:children[>span](h6)"
          data-h2-text-decoration="base:children[>span](underline)"
          data-h2-color="base:all:children[>span](white) base:all:focus-visible:children[>span](black)"
          onclick="toggle_menu(this)">
          <div 
            data-h2-background="base(accentRadial)"
            data-h2-position="base(absolute)"
            data-h2-height="base(300%)"
            data-h2-width="base(200%)"
            data-h2-opacity="base(20%)"
            data-h2-location="base(-150%, auto, auto, -100%)"></div>
          <div 
            data-h2-background="base(primaryRadial)"
            data-h2-position="base(absolute)"
            data-h2-height="base(300%)"
            data-h2-width="base(200%)"
            data-h2-opacity="base(20%)"
            data-h2-location="base(auto, -100%, -150%, auto)"></div>
          <span>Open menu</span>
          <span>Close menu</span>
        </button>
      </div>
      <nav 
        data-h2-padding="base(x1, x1, 0, x1)"
        data-h2-position="base(absolute)"
        data-h2-layer="base(1)"
        data-h2-location="base(0, auto, auto, 0)"
        data-h2-transition="base(.2s ease-in-out)"
        data-h2-height="base(60vh)"
        data-h2-width="base(100%)"
        aria-hidden="true">
        <div
          data-h2-background="base(foreground)"
          data-h2-shadow="base(0 5px 25px rgba(0, 0, 0, .5))"
          data-h2-height="base(100%)"
          data-h2-radius="base(rounded)"
          data-h2-overflow="base(auto)">
          <div
            data-h2-padding="base(x1)"
            data-h2-min-height="base(100%)">
            ${get_menu_data.render(data)}
          </div>
        </div>
      </nav>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
