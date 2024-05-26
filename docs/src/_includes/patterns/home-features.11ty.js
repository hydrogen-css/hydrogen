// Create pattern-specific data
var data = {};

/**
 * Render the homepage's features pattern
 * @param {Object} data 11ty's data
 * @returns {String} the rendered pattern
 */
function render(data) {
  // Local dependencies
  let heading = require('../components/headings.11ty');
  let flourish = require('../components/flourish.11ty');
  let rule = require('../components/rule.11ty');
  let code = require('../components/code.11ty');
  let chip = require('../components/chip.11ty.js');
  // Generate main features
  let main_features = ``;
  data.features.main.list.forEach(function (item, index) {
    let example;
    if (item.example === 'themes') {
      example = String.raw`
        <div 
          data-h2-display="base(grid)" 
          data-h2-grid-template-columns="base(1fr 1fr)" 
          data-h2-gap="base(x.5)" 
          data-h2-height="base(100%)"
          data-h2-background="base:children[button](foreground) base:children[button:focus-visible](focus)"
          data-h2-cursor="base:children[button](pointer)"
          data-h2-border="base:children[button](1px solid primary.darkest.2)"
          data-h2-outline="base:children[button:focus-visible](none)"
          data-h2-radius="base:children[button](rounded)"
          data-h2-padding="base:children[button](x1)"
          data-h2-color="base:children[button](black) base:all:children[button:focus-visible](black)"
          data-h2-text-decoration="base:children[button](underline)"
          data-h2-shadow="
            base:children[button](medium)
            base:children[button:hover](larger)"
          data-h2-transition="base:children[button](box-shadow .2s ease)">
          <button onclick="toggle_neon(this)">Neon</button>
          <button onclick="toggle_fern(this)">Fern</button>
          <button onclick="toggle_wave(this)">Wave</button>
          <button onclick="toggle_glow(this)">Glow</button>
        </div>
      `;
    } else if (item.example === 'properties') {
      examples = [
        'background',
        'color',
        'gap',
        'grid',
        'flex',
        'font-family',
        'font-size',
        'font-weight',
        'margin',
        'padding',
        'position',
        'shadow',
        'transform',
        'transition',
        'z-index',
      ];
      let example_pills = ``;
      examples.forEach((item) => {
        example_pills = example_pills + chip.render(data, { label: item, color: 'primary' });
      });
      example = String.raw`
        <div
          data-h2-display="base(flex)"
          data-h2-align-items="base(center)"
          data-h2-flex-wrap="base(wrap)"
          data-h2-gap="base(x.25)"
          data-h2-padding="base(x.5, 0, 0, 0)">
          ${example_pills}
          <p data-h2-vertical-align="base(middle)">and more...</p>
        </div>
      `;
    } else {
      example = code.render(data, item.code);
    }
    main_features =
      main_features +
      String.raw`
      <div 
        data-h2-margin="base(x2, 0, 0, 0) p-tablet(x3, 0, 0, 0)"
        data-h2-display="base(grid)"
        data-h2-grid-template-columns="base(100%) p-tablet(4rem auto)"
        data-h2-gap="base(x1)">
        <div>
          ${flourish.render(data, { heading: 'h6' })}
        </div>
        <div>
          <div 
            data-h2-display="base(grid)"
            data-h2-align-items="base(center)"
            data-h2-grid-template-columns="base(100%) l-tablet(repeat(2, minmax(0, 1fr)))"
            data-h2-gap="base(x1) p-tablet(x2) l-tablet(x4)">
            <div>
              ${heading.render(data, {
                tag: 'h3',
                size: 'h6',
                label: item.title.label,
                id: item.title.id,
                margin: "data-h2-margin='base(0, 0, x.5, 0)'",
                alignment: 'left',
              })}
              ${(function () {
                let items = ``;
                item.content.forEach(function (child) {
                  items = items + String.raw`<p>${child}</p>`;
                });
                return items;
              })()}
            </div>
            <div>
              ${example}
            </div>
          </div>
        </div>
      </div>
    `;
  });
  // Generate sub features
  let sub_features = ``;
  data.features.sub.list.forEach(function (item, index) {
    sub_features =
      sub_features +
      String.raw`
      <div>
        <p>${item.title}</p>
        ${(function () {
          let items = ``;
          item.content.forEach(function (child) {
            items = items + String.raw`<p>${child}</p>`;
          });
          return items;
        })()}
      </div>
    `;
  });
  // Render the pattern
  return String.raw`
    <div data-h2-margin="base(x3, 0) l-tablet(x4, 0)">
      <div data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2) l-tablet(center, medium, x3)">
        ${heading.render(data, {
          tag: 'h2',
          size: 'h2',
          label: 'Feature overview',
          id: 'features',
          svg: 'robot',
          img: {
            path: '/static/img/icon-robot.svg',
            alt: "A sticker-style icon of one of Hydrogen's adorable little mascots, Beep. Beep is a robot.",
          },
        })}
        ${main_features}
        <div 
          data-h2-margin="base(x2, 0, 0, 0) p-tablet(x3, 0, 0, 0)"
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(100%) p-tablet(4rem auto)"
          data-h2-gap="base(x1)">
          <div>
            ${flourish.render(data, { heading: 'h6' })}
          </div>
          <div>
            <div>
              ${heading.render(data, {
                tag: 'h3',
                size: 'h6',
                label: 'And a whole lot more...',
                id: 'more',
                alignment: 'left',
                margin: 'data-h2-margin="base(0, 0, x1, 0)"',
              })}
            </div>
            <div
              data-h2-display="base(grid)"
              data-h2-grid-template-columns="base(1fr) p-tablet(repeat(2, minmax(0, 1fr))) l-tablet(repeat(3, minmax(0, 1fr))) laptop(repeat(4, minmax(0, 1fr)))"
              data-h2-gap="base(x.5) p-tablet(x1)"
              data-h2-background-color="base:children[>div](foreground)"
              data-h2-border="base:children[>div](1px solid primary.darkest.20)"
              data-h2-radius="base:children[>div](rounded)"
              data-h2-padding="base:children[>div](x1)"
              data-h2-color="base:children[p:first-child](primary.dark)"
              data-h2-font-weight="base:children[p:first-child](800)"
              data-h2-margin="base:children[p:not(:first-child)](x.25, 0, 0, 0)">
              ${sub_features}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2) l-tablet(center, medium, x3)">
      ${rule.render(data)}
    </div>
  `;
}

module.exports = {
  data,
  render,
};
