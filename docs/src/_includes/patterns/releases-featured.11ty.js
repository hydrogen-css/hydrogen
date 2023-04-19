var data = {};

function render(data, content) {
  let { featured } = require('../../_data/releases');
  let release_title = require('../components/release-title.11ty');
  let release_content = require('../components/release-content.11ty');
  let expansion = require('../components/expansion-content.11ty');
  let output = String.raw`
    <div data-h2-margin="base(x1, 0, 0, x.5) p-tablet(x1, 0, 0, x1)">
  `;
  Object.keys(featured).forEach((release) => {
    output =
      output +
      expansion.render(data, {
        state: '',
        label: release_title.render(data, 'featured', featured[release]),
        content: release_content.render(data, 'featured', featured[release]),
      });
  });
  output = output + String.raw`</div>`;
  return output;
}

module.exports = {
  data,
  render,
};
