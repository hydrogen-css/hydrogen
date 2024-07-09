var data = {};

function render(data, content) {
  let release_title = require('../components/release-title.11ty');
  let release_content = require('../components/release-content.11ty');
  let expansion = require('../components/expansion-content.11ty');
  let { latest, beta } = require('../../_data/releases');
  let output = String.raw`
    <div data-h2-margin="base(x1, 0, 0, x.5) p-tablet(x1, 0, 0, x1)">
  `;
  // Render the latest stable release
  output =
    output +
    expansion.render(data, {
      state: '',
      label: release_title.render(data, 'latest-stable', latest),
      content: release_content.render(data, 'latest-stable', latest),
    });
  // Render the latest beta release
  // output =
  //   output +
  //   expansion.render(data, {
  //     state: '',
  //     label: release_title.render(data, 'latest-beta', beta),
  //     content: release_content.render(data, 'latest-beta', beta),
  //   });
  // output = output + String.raw`</div>`;
  return output;
}

module.exports = {
  data,
  render,
};
