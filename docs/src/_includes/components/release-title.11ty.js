const heading = require('./headings.11ty');
const chip = require('./chip.11ty.js');

var data = {};

function render(data, unique, release) {
  // Create the type chip
  let release_type = ``;
  if (release.beta) {
    // Beta release
    release_type = chip.render(data, { label: 'beta', color: 'secondary' });
  } else if (release.minor === '0' && release.patch === '0') {
    // Major release
    release_type = chip.render(data, { label: 'major', color: 'primary' });
  } else if (release.patch === '0') {
    // Minor release
    release_type = chip.render(data, { label: 'minor', color: 'primary' });
  } else {
    // Patch release
    release_type = chip.render(data, { label: 'patch', color: 'primary' });
  }
  // Create the breaking chip
  let breaking_chip = ``;
  if (release.features && release.features.length > 0) {
    release.features.forEach((feature) => {
      if (feature.breaking) {
        breaking_chip = chip.render(data, {
          label: 'breaking',
          color: 'error',
        });
      }
    });
  }
  if (release.optimizations && release.optimizations.length > 0) {
    release.optimizations.forEach((optimization) => {
      if (optimization.breaking) {
        breaking_chip = chip.render(data, {
          label: 'breaking',
          color: 'error',
        });
      }
    });
  }
  if (release.bugfixes && release.bugfixes.length > 0) {
    release.bugfixes.forEach((bugfix) => {
      if (bugfix.breaking) {
        breaking_chip = chip.render(data, {
          label: 'breaking',
          color: 'error',
        });
      }
    });
  }
  // Generate the release HTML
  return String.raw`
    ${heading.render(data, {
      tag: 'h4',
      size: 'h5',
      label: release.version,
      margin: 'data-h2-margin="base(0, 0, x.5, 0)"',
      id: unique + '-' + release.version,
      alignment: 'left',
      chips: [release_type, breaking_chip],
    })}
    <p data-h2-font-size="base(caption)">
      <span data-h2-font-weight="base(700)">Released on:</span> ${release.date.toLocaleString(
        'default',
        { month: 'long' }
      )} ${release.date.getDate()}, ${release.date.getFullYear()}
    </p>
  `;
}

module.exports = {
  data,
  render,
};
