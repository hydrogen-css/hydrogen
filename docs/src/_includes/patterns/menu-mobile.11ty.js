var data = {};

function render(data) {
  let menu_data = require('../components/menu.11ty');
  return String.raw`
    <div
      class="menu mobile-menu"
      data-h2-display="
        base(block) 
        l-tablet(none)
        base:children[>div>button>span:first-child](block)
        base:children[>div>button>span:last-child](none)
        base:selectors[.active]:children[>div>button>span:first-of-type](none)
        base:selectors[.active]:children[>div>button>span:last-child](block)"
      data-h2-location="base(auto, auto, 0, 0)"
      data-h2-width="base(100%)"
      data-h2-layer="base(100, fixed)"
      data-h2-opacity="base:children[.old-nav >a](0%) base:selectors[.active]:children[.old-nav >a](100%)"
      data-h2-transform="
        base:children[.old-nav](translate(0, 100%)) 
        base:selectors[.active]:children[.old-nav](translate(0, -100%))"
      data-h2-transition="
        base:children[.old-nav](.5s ease) 
        base:selectors[.active]:children[.old-nav](.5s ease)
        base:selectors[.active]:children[.old-nav >a](.2s ease)">
      <div data-h2-padding="base(x.5, x.5, 0, x.5)">
        <button
          class="mobile-menu-trigger"
          id="mobileNav"
          data-h2-background="base:all(code) base:all:focus-visible(focus)"
          data-h2-border="base:all(1px solid primary.lightest.2)"
          data-h2-radius="base(rounded, rounded, 0, 0)"
          data-h2-padding="base(x1, x1, calc(x1 + 5px), x1)"
          data-h2-shadow="base(largest)"
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
          <span>Open menu</span>
          <span>Close menu</span>
        </button>
      </div>
      <div 
        class="old-nav"
        data-h2-padding="base(x.5, x.5, 0, x.5)"
        data-h2-position="base(absolute)"
        data-h2-layer="base(1)"
        data-h2-location="base(0, auto, auto, 0)"
        data-h2-height="base(x24)"
        data-h2-max-height="base(calc(100vh - x3.5 - 5px))"
        data-h2-width="base(100%)"
        aria-hidden="true">
        <div
          data-h2-background="base(foreground)"
          data-h2-border="base(1px solid primary.darkest.2)"
          data-h2-shadow="base(largest)"
          data-h2-height="base(100%)"
          data-h2-radius="base(rounded)"
          data-h2-overflow="base(auto)"
          data-h2-max-width="base(x18)"
          data-h2-margin="base(0, auto)">
          <div
            data-h2-padding="base(x1.5) mobile(x2)"
            data-h2-min-height="base(100%)">
            ${menu_data.render(data, 'mobile')}
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
