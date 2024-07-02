var data = {};

function render(data, unique, release) {
  let heading = require('./headings.11ty');
  let chip = require('./chip.11ty.js');
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
  // Check for and build the summary if it's available
  let summary = ``;
  if (release.summary) {
    summary = String.raw`<p data-h2-margin="base(0, 0, x1, 0)">${release.summary}</p>`;
  }
  // Create the breaking chip
  let breaking_chip = ``;
  let warning_chip = ``;
  // let breaking_chip_template = chip.render(data, {
  //   label: 'breaking',
  //   color: 'error',
  // });
  let breaking_chip_template = String.raw`
    <span data-h2-margin="base(0, x.25)" data-h2-display="base(none) p-tablet(inline)">•</span><span data-h2-display="base(block) p-tablet(inline)" data-h2-font-weight="base(700)" data-h2-color="base(error.dark) base:dark(error.lighter)">🚨 Breaking</span>
  `;
  let warning_chip_template = String.raw`
    <span data-h2-margin="base(0, x.25)" data-h2-display="base(none) p-tablet(inline)">•</span><span data-h2-display="base(block) p-tablet(inline)" data-h2-font-weight="base(700)" data-h2-color="base(warning.dark) base:dark(warning.lighter)">⚠️ Warning</span>
  `;
  if (release.features && release.features.length > 0) {
    release.features.forEach((feature) => {
      if (feature.breaking && feature.breaking === 'warning') {
        warning_chip = warning_chip_template;
      } else if (feature.breaking) {
        breaking_chip = breaking_chip_template;
      }
    });
  }
  if (release.optimizations && release.optimizations.length > 0) {
    release.optimizations.forEach((optimization) => {
      if (optimization.breaking && optimization.breaking === 'warning') {
        warning_chip = warning_chip_template;
      } else if (optimization.breaking) {
        breaking_chip = breaking_chip_template;
      }
    });
  }
  if (release.bugfixes && release.bugfixes.length > 0) {
    release.bugfixes.forEach((bugfix) => {
      if (bugfix.breaking && bugfix.breaking === 'warning') {
        warning_chip = warning_chip_template;
      } else if (bugfix.breaking) {
        breaking_chip = breaking_chip_template;
      }
    });
  }
  let unique_string = '';
  if (unique) {
    unique_string = unique + '-';
  }
  // Generate the release HTML
  return String.raw`
    ${heading.render(data, {
      tag: 'h4',
      size: 'h5',
      label: release.version,
      margin: 'data-h2-margin="base(0, 0, x.5, 0)"',
      id: unique_string + release.version,
      alignment: 'left',
    })}
    ${summary}
    <p 
      data-h2-font-size="base(caption)"
      data-h2-vertical-align="base(middle) base:children[*](middle)"
      data-h2-margin="
        base:children[> span:first-child](0, 0, x.07, 0) 
        base:children[> span:not(:first-child)](x.25, 0, 0, 0) 
        p-tablet:children[> span:first-child, > span:not(:first-child)](0)">
      ${release_type}<span data-h2-margin="base(0, x.25)" data-h2-display="base(none) p-tablet(inline)">•</span>
      <span data-h2-display="base(block) p-tablet(inline)">Released: ${release.date.toLocaleString(
        'default',
        {
          month: 'long',
        }
      )} ${release.date.getDate()}, ${release.date.getFullYear()}</span>
      ${breaking_chip}
      ${warning_chip}
    </p>
  `;
}

module.exports = {
  data,
  render,
};
