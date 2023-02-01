const base_layout = require('../base.11ty');
const breadcrumb_component = require('../patterns/breadcrumbs.11ty');
const home_hero = require('../patterns/home-hero.11ty');
const home_features = require('../patterns/home-features.11ty');
const home_start = require('../patterns/home-start.11ty');
const home_jump = require('../patterns/home-jump.11ty');

var data = {
  layout: 'base.11ty.js',
};

function render(data) {
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
