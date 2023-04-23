let data = {
  layout: 'base.11ty.js',
};

function render(data) {
  let breadcrumb_component = require('../_includes/patterns/breadcrumbs.11ty');
  let docs_menu = require('../_includes/patterns/docs-menu.11ty');
  let docs_pagination = require('../_includes/patterns/docs-pagination.11ty');
  let docs_footer = require('../_includes/patterns/docs-footer.11ty');
  function get_pagination() {
    if (data.navigation.pagination) {
      return docs_pagination.render(data);
    } else {
      return String.raw``;
    }
  }
  return String.raw`
    ${breadcrumb_component.render(data)}
    <div data-h2-position="base(relative)">
      <div
        data-h2-position="base(absolute)"
        data-h2-location="base(0, auto, auto, 0)"
        data-h2-height="base(var(--heightHack))"
        data-h2-width="base(100%)"
        data-h2-background-color="base:all(black)"
        data-h2-overflow="base(hidden)">
        <div
          class="accent-radial"
          data-h2-background="base(accentRadial)"></div>
        <div
          class="primary-radial"
          data-h2-background="base(primaryRadial)"></div>
        <div
          data-h2-height="base(x.5)"
          data-h2-width="base(100%)"
          data-h2-background="base(divider)"
          data-h2-position="base(absolute)"
          data-h2-location="base(auto, auto, 0, 0)"></div>
      </div>
      <div data-h2-container="base(center, large, x1) p-tablet(center, large, x2) l-tablet(center, large, x3)">
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
            ${get_pagination()}
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
