const docs_layout = require('../patterns/docs-layout.11ty');
const release_layout = require('./releases-release.11ty');
const { latest, beta } = require('../../_data/releases');

var data = {};

function render(data, content) {
  let output = String.raw`
    <div data-h2-margin="base(x2, 0, 0, 0)">
  `;
  // Render the latest stable release
  output = output + release_layout.render(data, latest, 'latest');
  // Render the latest beta release
  output = output + release_layout.render(data, beta, 'latest');
  output = output + String.raw`</div>`;
  return output;
}

module.exports = {
  data,
  render,
};
