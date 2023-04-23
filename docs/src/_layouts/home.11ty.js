let data = {
  layout: 'base.11ty.js',
};

function render(data) {
  let breadcrumb_component = require('../_includes/patterns/breadcrumbs.11ty');
  let home_hero = require('../_includes/patterns/home-hero.11ty');
  let home_features = require('../_includes/patterns/home-features.11ty');
  let home_start = require('../_includes/patterns/home-start.11ty');
  let home_jump = require('../_includes/patterns/home-jump.11ty');
  return String.raw`
    ${breadcrumb_component.render(data)}
    ${home_hero.render(data)}
    ${home_features.render(data)}
    ${home_start.render(data)}
    ${home_jump.render(data)}
  `;
}

module.exports = {
  data,
  render,
};
