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
      <div data-h2-container="base(center, large, x1) p-tablet(center, large, x2) l-tablet(center, large, x3)">
        <div
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(100%) l-tablet(x15 minmax(0, 1fr))"
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
