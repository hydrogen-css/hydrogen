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
  data.start.steps.forEach((step, index) => {
    let active = '';
    let margin = "data-h2-margin-top='base(x1)'";
    if (index === 0) {
      active = 'active';
      margin = "data-h2-margin-top='base(0px)'";
    }
    steps += String.raw`
      <button 
        onclick="start_step_click(this)"
        class="start-step-button ${active}"
        data-step="${index + 1}"
        ${margin}
        data-h2-background="
          base(transparent)
          base:children[>div](foreground)
          base:selectors[.active]:children[>div](primary.dark)"
        data-h2-padding="base(0)"
        data-h2-border="base(none)"
        data-h2-display="base(flex)" 
        data-h2-gap="base(x.5)"
        data-h2-cursor="base(pointer) base:selectors[.active](initial)"
        data-h2-pointer-events="base:selectors[.active](none)"
        data-h2-text-align="base(left)"
        data-h2-font-weight="base:selectors[.active]:children[>span](700)"
        data-h2-color="
          base:children[>div>span](primary.dark)
          base:children[>span](font)
          base:hover:children[>span](primary)
          base:selectors[.active]:children[>div>span](white)"
        data-h2-text-decoration="base:children[>span](underline) base:selectors[.active]:children[>span](none)">
        <div
          data-h2-display="base(block)"
          data-h2-vertical-align="base(middle)"
          data-h2-position="base(relative)"
          data-h2-min-height="base(x1)"
          data-h2-height="base(x1)"
          data-h2-border="base(1px solid primary.darkest.2)"
          data-h2-min-width="base(x1)"
          data-h2-width="base(x1)"
          data-h2-radius="base(100%)">
          <span 
            data-h2-display="base(block)"
            data-h2-position="base(center)" 
            data-h2-font-size="base(caption, 1)"
            data-h2-font-weight="base(700)">
            ${index + 1}
          </span>
        </div>
        <span 
          data-h2-display="base(block)" 
          data-h2-background-color="base:children[code](black.10)"
          data-h2-padding="base:children[code](0 x.25)">
          ${step.title}
        </span>
      </button>
      <div 
        class="start-step-content ${active}"
        data-step="${index + 1}"
        data-h2-background="base(foreground)"
        data-h2-border="base(1px solid primary.darkest.2)"
        data-h2-radius="base(5px)"
        data-h2-padding="base(x1) l-tablet(x1.5)"
        data-h2-display="base(none) base:selectors[.active](block)"
        data-h2-width="l-tablet(calc(70% - x3))"
        data-h2-position="l-tablet(absolute)"
        data-h2-margin-top="base(x1) l-tablet(0)"
        data-h2-top="l-tablet(-x2)"
        data-h2-right="l-tablet(0px)"
        data-h2-height="l-tablet(calc(100% + x2))"
        data-h2-overflow="l-tablet(auto)">
        ${(() => {
          let items = ``;
          step.content.forEach((child, child_index) => {
            if (child_index === 0) {
              items += String.raw`<p data-h2-color="base:dark(black)" data-h2-margin="base(0, 0, x.25, 0)" data-h2-font-weight="base(800)">Step ${
                index + 1
              }:</p>`;
            }
            items += String.raw`
              <p data-h2-margin="base(0, 0, x1, 0)">${child}</p>
            `;
          });
          return items;
        })()}
        ${code.render(data, step.code)}
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
        <div 
          data-h2-margin-left="p-tablet(calc(4rem + x1))"
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="l-tablet(30%)"
          data-h2-position="base(relative)">
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
