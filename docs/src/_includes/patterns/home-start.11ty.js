const { start } = require('prompt');

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
  let rule = require('../components/rule.11ty');
  let code = require('../components/code.11ty');
  // Generate steps
  let steps = ``;
  let counter = 0;
  data.start.steps.forEach((step, index) => {
    counter = counter + 1;
    let active = '';
    if (index === 0) {
      active = 'class="active"';
    }
    steps =
      steps +
      String.raw`
        <button 
          data-h2-background="base(transparent)"
          data-h2-border="base(none)"
          data-h2-display="base(block)" 
          data-h2-grid-column="base(1 / 2)" 
          data-h2-text-align="base(left)">
          <div
            data-h2-display="base(inline-block)"
            data-h2-vertical-align="base(middle)"
            data-h2-margin="base(-4px, x.25, 0, 0)"
            data-h2-background-color="base(foreground)"
            data-h2-position="base(relative)"
            data-h2-height="base(x1)"
            data-h2-border="base(1px solid primary.darkest.2)"
            data-h2-width="base(x1)"
            data-h2-radius="base(100%)">
            <span 
              data-h2-display="base(block)"
              data-h2-position="base(center)" 
              data-h2-font-size="base(caption, 1)"
              data-h2-font-weight="base(700)"
              data-h2-color="base(primary.dark)">
              ${counter}
            </span>
          </div>
          <span data-h2-display="base(inline-block)">
            ${step.title}
          </span>
        </button>
        <div 
          ${active}
          data-h2-background="base(foreground)"
          data-h2-border="base(1px solid primary.darkest.2)"
          data-h2-radius="base(5px)"
          data-h2-padding="base(x2)"
          data-h2-display="base(none) base:selectors[.active](block)"
          data-h2-grid-column="base(2 / span 1)"
          data-h2-grid-row="base(1 / span 6)">
          ${(function () {
            let items = ``;
            step.content.forEach(function (child) {
              items =
                items +
                String.raw`
                <p data-h2-margin="base(0, 0, x1, 0)">${child}</p>
              `;
            });
            return items;
          })()}
          ${code.render(data, {
            file: step.code.file,
            lines: step.code.lines,
          })}
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
          label: data.start.title.label,
          id: data.start.title.id,
          svg: 'flag',
          img: {
            path: data.start.title.icon.path,
            alt: data.start.title.icon.alt,
          },
          link: {
            label: data.start.title.link.label,
            title: data.start.title.link.title,
            path: data.start.title.link.path,
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
        <div data-h2-margin-left="base(calc(4rem + x1))" data-h2-display="base(grid)" data-h2-grid-template-columns="base(calc(2/5 * 100%) calc(3/5 * 100%))" data-h2-grid-template-rows="base(1fr 1fr 1fr 1fr 1fr 1fr)">
          ${steps}
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
