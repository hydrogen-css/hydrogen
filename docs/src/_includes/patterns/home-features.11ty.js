// Local dependencies
const heading = require('../components/headings.11ty');
const flourish = require('../components/flourish.11ty');
const rule = require('../components/rule.11ty');
const code = require('../components/code.11ty');
const chip = require('../components/chip.11ty.js');

// Create pattern-specific data
var data = {};

/**
 * Render the homepage's features pattern
 * @param {Object} data 11ty's data
 * @returns {String} the rendered pattern
 */
function render(data) {
  // Generate main features
  let main_features = ``;
  data.features.main.list.forEach(function (item, index) {
    let example;
    if (item.example === 'themes') {
      example = String.raw`
        <div data-h2-display="base(grid)" data-h2-grid-template-columns="base(1fr 1fr)" data-h2-gap="base(x1)" data-h2-height="base(100%)">
          <button>Fluo</button>
          <button>Posh</button>
          <button>Neo</button>
          <button>Boo!</button>
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
        example_pills =
          example_pills + chip.render(data, { label: item, color: 'primary' });
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
      example = code.render(data, {
        file: item.code.file,
        lines: item.code.lines,
      });
    }
    main_features =
      main_features +
      String.raw`
      <div 
        data-h2-margin="base(x2, 0, 0, 0) p-tablet(x3, 0, 0, 0)"
        data-h2-display="base(grid)"
        data-h2-grid-template-columns="base(100%) p-tablet(4rem auto)"
        data-h2-gap="base(x1) p-tablet(x2)">
        <div>
          ${flourish.render(data, { heading: 'h6' })}
        </div>
        <div>
          <div 
            data-h2-display="base(grid)"
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
    <div data-h2-margin="base(x3, 0) l-tablet(x5, 0)">
      <div data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2)">
        ${heading.render(data, {
          tag: 'h2',
          size: 'h2',
          label: 'Feature overview',
          id: 'features',
          img: {
            path: '/static/img/icon-robot.svg',
            alt: "A sticker-style icon of one of Hydrogen's adorable little mascots, Beep. Beep is a robot.",
          },
        })}
        ${main_features}
        ${heading.render(data, {
          tag: 'h3',
          size: 'h6',
          label: 'And a whole lot more...',
          id: 'more',
          margin: "data-h2-margin='base(x4, 0, x1, 0)'",
        })}
        <div
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(1fr) p-tablet(repeat(2, minmax(0, 1fr))) l-tablet(repeat(3, minmax(0, 1fr))) laptop(repeat(4, minmax(0, 1fr)))"
          data-h2-gap="base(x1)"
          data-h2-background-color="base:children[>div](white) base:dark:children[>div](font.dark)"
          data-h2-border="base:children[>div](all, 1px, solid, primary.darkest.20)"
          data-h2-radius="base:children[>div](rounded)"
          data-h2-padding="base:children[>div](x1)"
          data-h2-color="base:children[p:first-child](primary.dark) base:dark:children[p:first-child](primary.lighter)"
          data-h2-font-weight="base:children[p:first-child](800)"
          data-h2-margin="base:children[p:not(:first-child)](x.5, 0, 0, 0)">
          ${sub_features}
        </div>
      </div>
    </div>
    <div data-h2-container="base(center, medium, x1) l-tablet(center, medium, x2)">
      ${rule.render(data)}
    </div>
  `;
}

module.exports = {
  data,
  render,
};
