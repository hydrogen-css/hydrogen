// Local dependencies
const heading = require('../components/headings.11ty');
const rule = require('../components/rule.11ty');
const code = require('../components/code.11ty');

// Create pattern-specific data
var data = {};

/**
 * Render the homepage's features pattern
 * @param {Object} data 11ty's data
 * @returns {String} the rendered pattern
 */
function render(data) {
  // Generate steps
  let steps = ``;
  let counter = 0;
  data.start.steps.forEach(function (step, s_index) {
    counter = counter + 1;
    steps =
      steps +
      String.raw`
      <div 
        data-h2-margin="base(x2, 0, 0, 0)"
        data-h2-display="base(grid)"
        data-h2-grid-template-columns="base(100%) p-tablet(4rem auto)"
        data-h2-gap="base(x1) p-tablet(x2)">
        <div></div>
        <div>
          <div 
            data-h2-display="base(grid)"
            data-h2-grid-template-columns="base(100%) l-tablet(repeat(2, minmax(0, 1fr)))"
            data-h2-gap="base(x1) l-tablet(x4)">
            <div>
              <div
                data-h2-display="base(inline-block)"
                data-h2-vertical-align="base(middle)"
                data-h2-margin="base(-4px, x.25, 0, 0)"
                data-h2-background-color="base(primary.light.2)"
                data-h2-position="base(relative)"
                data-h2-height="base(x1.2)"
                data-h2-border="base(1px solid primary.dark)"
                data-h2-width="base(x1.2)"
                data-h2-radius="base(100%)">
                <span 
                  data-h2-display="base(block)"
                  data-h2-position="base(center)" 
                  data-h2-font-size="base(caption, 1)"
                  data-h2-font-weight="base(700)"
                  data-h2-color="base(primary.darker)">
                  ${counter}
                </span>
              </div>
              <p 
                data-h2-display="base(inline-block)" 
                data-h2-font-weight="base(700)" 
                data-h2-color="base(primary.dark)">
                ${step.title}
              </p>
              ${(function () {
                let items = ``;
                step.content.forEach(function (child) {
                  items =
                    items +
                    String.raw`
                    <p
                      data-h2-margin="base(x.5, 0, 0, 0)"
                      data-h2-color="base:children[a:hover](primary) base:all:children[a:focus-visible](black)"
                      data-h2-background-color="base:children[a:focus-visible](focus)"
                      data-h2-outline="base:children[a](none)">${child}</p>
                  `;
                });
                return items;
              })()}
            </div>
            <div>
              ${code.render(data, {
                file: step.code.file,
                lines: step.code.lines,
              })}
            </div>
          </div>
        </div>
      </div>
    `;
  });
  // Render the pattern
  return String.raw`
    <div data-h2-margin="base(x3, 0) l-tablet(x5, 0)">
      <div data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2) l-tablet(center, medium, x3)">
        ${heading.render(data, {
          tag: 'h2',
          size: 'h2',
          label: data.start.title.label,
          id: data.start.title.id,
          svg: 'flag',
          img: {
            path: data.start.title.icon.path,
            alt: data.start.title.icon.alt,
          },
        })}
        ${heading.render(data, {
          tag: 'h3',
          size: 'h6',
          label: data.start.subtitle.label,
          id: data.start.subtitle.id,
          alignment: 'left',
          margin: 'data-h2-margin="base(x3, 0, x1, 0)"',
          flourish: true,
        })}
        ${steps}
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
