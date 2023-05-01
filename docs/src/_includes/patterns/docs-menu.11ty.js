let data = {};

function render(data) {
  let get_menu = require('../components/menu.11ty');
  return String.raw`
    <div
      data-h2-position="base(sticky)"
      data-h2-layer="base(5)"
      data-h2-location="base(0, auto, auto, auto)">
      <div data-h2-padding="base(x1, 0, 0, 0) l-tablet(x2, 0, 0, 0) laptop(x3, 0, 0, 0) desktop(x4, 0, 0, 0)">
        <div
          id="nav"
          data-h2-background="
            base(foreground)
            base:children[button](transparent)
            base:children[a:focus-visible, button:focus-visible](focus)"
          data-h2-border="base(1px solid primary.darkest.2) base:children[a, button](none)"
          data-h2-border-top="base:focus-visible(x.5 solid focus)"
          data-h2-display="base:children[a, button](block)"
          data-h2-outline="
            base:focus-visible(none)
            base:children[a, button](none)"
          data-h2-color="base:children[a, button](font) base:all:children[a:focus-visible, button:focus-visible](black) base:children[a:hover, button:hover](primary)"
          data-h2-stroke="base:all:children[a:focus-visible path, button:focus-visible path](black)"
          data-h2-radius="base(rounded)"
          data-h2-padding="base(x2, x2, x3, x2)"
          data-h2-shadow="base(large)"
          data-h2-overflow="base(visible, auto)"
          data-h2-max-height="
            base(calc(100vh - x5.25 - x1))
            l-tablet(calc(100vh - x5.25 - x2))
            laptop(calc(100vh - x6.25 - x3))
            desktop(calc(100vh - x7.25 - x4))">
            ${get_menu.render(data)}
        </div>
      </div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
