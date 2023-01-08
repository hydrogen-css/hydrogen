const docs_layout = require('../patterns/docs-layout.11ty');
const release_layout = require('./releases-release.11ty');
const { history } = require('../../_data/releases');

var data = {};

function render(data, content) {
  let output = String.raw`
    <div data-h2-margin="base(x1, 0, 0, 0)">
  `;
  Object.keys(history)
    .slice()
    .reverse()
    .forEach((major) => {
      Object.keys(history[major])
        .slice()
        .reverse()
        .forEach((minor) => {
          Object.keys(history[major][minor])
            .slice()
            .reverse()
            .forEach((patch) => {
              // Check for a release
              if (history[major][minor][patch].release.version) {
                // Render the release
                output =
                  output +
                  release_layout.render(
                    data,
                    history[major][minor][patch].release
                  );
              }
              if (Object.keys(history[major][minor][patch].betas).length != 0) {
                // Render beta releases
                Object.keys(history[major][minor][patch].betas)
                  .slice()
                  .reverse()
                  .forEach((beta) => {
                    output =
                      output +
                      release_layout.render(
                        data,
                        history[major][minor][patch].betas[beta]
                      );
                  });
              }
            });
        });
    });
  output = output + String.raw`</div>`;
  return output;
}

module.exports = {
  data,
  render,
};
