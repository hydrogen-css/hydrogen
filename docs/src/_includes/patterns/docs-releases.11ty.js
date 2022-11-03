const docs_layout = require('../patterns/docs-layout.11ty');
const heading = require('../components/headings.11ty');
const { latest, beta } = require('../../_data/releases');

var data = {};

function render(data, section) {
  let type;
  if (section.releases === 'latest') {
    type = latest;
  } else if (section.releases === 'beta') {
    type = beta;
  }
  function get_release_content(release, change) {
    let title = '';
    if (change === 'breaking') {
      title = 'Breaking changes';
    } else if (change === 'features') {
      title = 'New features';
    } else if (change === 'optimizations') {
      title = 'Optimizations';
    } else if (change === 'bugfixes') {
      title = 'Bugfixes';
    } else if (change === 'testing') {
      title = 'Development and testing';
    }
    let content = ``;
    if (release[data.locale][change].length > 0) {
      content =
        content +
        String.raw`
        ${heading.render(data, {
          tag: 'h5',
          size: 'h6',
          label: title,
          margin: 'data-h2-margin="base(x2, 0, x.5, 0)"',
          id: 'latest',
          alignment: 'left',
        })}
        <ul data-h2-padding="base(0, 0, 0, x1)">
      `;
      release[data.locale][change].forEach((item) => {
        if (Array.isArray(item.changes)) {
          item.changes.forEach((change) => {
            content =
              content +
              String.raw`
                <li>${change}</li>
              `;
          });
        } else {
          content =
            content +
            String.raw`
              <li>${item.changes}</li>
            `;
        }
      });
      content = content + String.raw`</ul>`;
    }
    return content;
  }
  // Create breaking
  let breaking = get_release_content(type, 'breaking');
  // Create features
  let features = get_release_content(type, 'features');
  // Create optimizations
  let optimizations = get_release_content(type, 'optimizations');
  // Create bugfixes
  let bugfixes = get_release_content(type, 'bugfixes');
  return String.raw`
    <div data-h2-display="base(flex)" data-h2-gap="base(x2)">
      <p><span data-h2-font-weight="base(700)" data-h2-color="base(primary.dark)">Version:</span> ${type.version}</p>
      <p><span data-h2-font-weight="base(700)" data-h2-color="base(primary.dark)">Released on:</span> ${type.date}</p>
    </div>
    ${breaking}
    ${features}
    ${optimizations}
    ${bugfixes}
  `;
}

module.exports = {
  data,
  render,
};
