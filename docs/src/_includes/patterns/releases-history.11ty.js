const docs_layout = require('../patterns/docs-layout.11ty');
const { history } = require('../../_data/releases');
const release_title = require('../components/release-title.11ty');
const release_content = require('../components/release-content.11ty');
const expansion = require('../components/expansion-content.11ty');

var data = {};

function render(data, content) {
  let output = String.raw`
    <div data-h2-margin="base(x2, 0, 0, x1) p-tablet(x1, 0, 0, x1)">
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
                  expansion.render(data, {
                    state: '',
                    label: release_title.render(
                      data,
                      'featured',
                      history[major][minor][patch].release
                    ),
                    content: release_content.render(
                      data,
                      'featured',
                      history[major][minor][patch].release
                    ),
                  });
              }
              if (Object.keys(history[major][minor][patch].betas).length != 0) {
                // Render beta releases
                Object.keys(history[major][minor][patch].betas)
                  .slice()
                  .reverse()
                  .forEach((beta) => {
                    output =
                      output +
                      expansion.render(data, {
                        state: '',
                        label: release_title.render(
                          data,
                          'featured',
                          history[major][minor][patch].betas[beta]
                        ),
                        content: release_content.render(
                          data,
                          'featured',
                          history[major][minor][patch].betas[beta]
                        ),
                      });
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
