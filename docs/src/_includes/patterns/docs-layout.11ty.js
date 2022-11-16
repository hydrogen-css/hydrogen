const base_layout = require('../base.11ty');
const breadcrumb_component = require('../patterns/breadcrumbs.11ty');
const docs_menu = require('../patterns/docs-menu.11ty');
const docs_footer = require('../patterns/docs-footer.11ty');

var data = {
  layout: 'base.11ty.js',
};

function render(data) {
  return String.raw`
    ${breadcrumb_component.render(data)}
    <div data-h2-position="base(relative)">
      <div
        data-h2-position="base(absolute)"
        data-h2-offset="base(0, auto, auto, 0)"
        data-h2-height="base(var(--heightHack))"
        data-h2-width="base(100%)"
        data-h2-background-color="base:all(black)"
        data-h2-overflow="base(hidden)">
        <div
          class="accent-radial"
          data-h2-background-color="base(accentRadial)"></div>
        <div
          class="primary-radial"
          data-h2-background-color="base(primaryRadial)"></div>
        <div
          data-h2-height="base(x.5)"
          data-h2-width="base(100%)"
          data-h2-background-color="base(divider)"
          data-h2-position="base(absolute)"
          data-h2-offset="base(auto, auto, 0, 0)"></div>
      </div>
      <div data-h2-container="base(center, large, x1) p-tablet(center, large, x2)">
        <div 
          class="test-before" 
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(1fr) l-tablet(x15 minmax(0, 1fr))"
          data-h2-gap="base(x1) l-tablet(x3) desktop(x4)">
          <div
            data-h2-position="base(relative)" 
            data-h2-display="base(none) l-tablet(block)">
            ${docs_menu.render(data)}
          </div>
          <div>
            ${data.content}
          </div>
        </div>
      </div>
    </div>
    ${docs_footer.render(data)}
  `;
}

module.exports = {
  data,
  render,
};
