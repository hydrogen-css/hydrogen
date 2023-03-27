const docs_layout = require('../patterns/docs-layout.11ty');
const { featured } = require('../../_data/releases');
const release_title = require('../components/release-title.11ty');
const release_content = require('../components/release-content.11ty');
const expansion = require('../components/expansion-content.11ty');

var data = {};

function render(data, content) {
  let output = String.raw`
    <div data-h2-margin="base(x1, 0, 0, x.5) p-tablet(x1, 0, 0, x1)">
  `;
  Object.keys(featured).forEach((release) => {
    output =
      output +
      expansion.render(data, {
        state: 'active',
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
