let data = {
  layout: 'base.11ty.js',
};

function render(data) {
  return String.raw`
    ${require('../_includes/patterns/breadcrumbs.11ty').render(data)}
    ${require('../_includes/patterns/home-hero.11ty').render(data)}
    ${require('../_includes/patterns/home-features.11ty').render(data)}
    ${require('../_includes/patterns/home-start.11ty').render(data)}
    ${require('../_includes/patterns/home-jump.11ty').render(data)}
  `;
}

module.exports = {
  data,
  render,
};
