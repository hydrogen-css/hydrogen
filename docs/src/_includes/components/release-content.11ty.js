var data = {};

function render(data, unique, release) {
  let heading = require('./headings.11ty');
  // Create the release information
  function get_release_content(release, change) {
    let title = '';
    if (change === 'features') {
      title = '✨ New features (' + release[change].length + ')';
    } else if (change === 'optimizations') {
      title = '🛠️ Optimizations (' + release[change].length + ')';
    } else if (change === 'bugfixes') {
      title = '🪲 Bugfixes (' + release[change].length + ')';
    } else if (change === 'documentation') {
      title = '📚 Documentation (' + release[change].length + ')';
    }
    let output = ``;
    if (release[change] && release[change].length > 0) {
      output =
        output +
        String.raw`
        ${heading.render(data, {
          tag: 'h5',
          size: 'h6',
          label: title,
          margin: 'data-h2-margin="base(x1, 0, 0, 0)"',
          id: unique + '-' + release.version + '-' + change,
          alignment: 'left',
        })}
        <ul data-h2-padding="base(0, 0, 0, x.75) p-tablet(0, 0, 0, x1) base:children[li](x.5, 0, 0, 0)" data-h2-word-break="base:children[code](break-all)">
      `;
      release[change].forEach((item) => {
        let breaking_label = ``;
        let warning_label = ``;
        if (item.breaking && item.breaking === 'warning') {
          warning_label = String.raw`
            <span
              data-h2-color="base(warning.dark)"
              data-h2-font-weight="base(700)">Warning: </span>
          `;
        } else if (item.breaking) {
          breaking_label = String.raw`
            <span
              data-h2-color="base(error.dark)"
              data-h2-font-weight="base(700)">Breaking: </span>
          `;
        }
        if (Array.isArray(item.changes[data.locale])) {
          output = output + String.raw`<li>`;
          if (item.changes[data.locale].length > 1) {
            item.changes[data.locale].forEach((change, index) => {
              if (index === 0) {
                output =
                  output +
                  String.raw`${breaking_label}${warning_label}${change}<ul data-h2-padding="base(0, 0, 0, x.75) p-tablet(0, 0, 0, x1)">`;
              } else if (index === item.changes[data.locale].length - 1) {
                output = output + String.raw`<li>${change}</li></ul>`;
              } else {
                output = output + String.raw`<li>${change}</li>`;
              }
            });
          } else {
            item.changes[data.locale].forEach((change, index) => {
              output = output + String.raw`${breaking_label}${warning_label}${change}`;
            });
          }
          output = output + String.raw`</li>`;
        } else {
          output =
            output +
            String.raw`
              <li>${breaking_label}${warning_label}${item.changes[data.locale]}</li>
            `;
        }
      });
      output = output + String.raw`</ul>`;
    }
    return output;
  }
  // Check for features
  let features = ``;
  if (release.features) {
    features = get_release_content(release, 'features');
  }
  // Check for optimizations
  let optimizations = ``;
  if (release.optimizations) {
    optimizations = get_release_content(release, 'optimizations');
  }
  // Check for bugfixes
  let bugfixes = ``;
  if (release.bugfixes) {
    bugfixes = get_release_content(release, 'bugfixes');
  }
  // Check for documentation
  let documentation = ``;
  if (release.documentation) {
    documentation = get_release_content(release, 'documentation');
  }
  // Generate the release HTML
  return String.raw`
    ${require('./rule.11ty').render(data, {
      margin: 'data-h2-margin="base(x1, 0, 0, 0)"',
    })}
    ${features}
    ${optimizations}
    ${bugfixes}
    ${documentation}
  `;
}

module.exports = {
  data,
  render,
};
