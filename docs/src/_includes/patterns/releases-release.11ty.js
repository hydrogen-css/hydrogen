const heading = require('../components/headings.11ty');
const chip = require('../components/chip.11ty.js');

var data = {};

function render(data, release, state) {
  // Check for state
  let state_class = 'expand-collapse-wrapper';
  let state_string = '';
  if (state) {
    state_class = 'expand-collapse-wrapper active';
    state_string = state + '-';
  }
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
  // Create the release information
  function get_release_content(release, change) {
    let title = '';
    if (change === 'features') {
      title = 'New features';
    } else if (change === 'optimizations') {
      title = 'Optimizations';
    } else if (change === 'bugfixes') {
      title = 'Bugfixes';
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
          margin: 'data-h2-margin="base(x1, 0, x.5, 0)"',
          id: state_string + release.version + '-' + change,
          alignment: 'left',
        })}
        <ul data-h2-padding="base(0, 0, 0, x1)">
      `;
      release[change].forEach((item) => {
        let breaking_label = ``;
        if (item.breaking) {
          breaking_label = String.raw`
            <span
              data-h2-color="base(error.darker)"
              data-h2-font-weight="base(700)">Breaking: </span>
          `;
        }
        if (Array.isArray(item.changes[data.locale])) {
          output = output + String.raw`<li>`;
          if (item.changes[data.locale].length > 1) {
            item.changes[data.locale].forEach((change, index) => {
              if (index === 0) {
                output = output + String.raw`${breaking_label}${change}<ul>`;
              } else if (index === item.changes[data.locale].length - 1) {
                output =
                  output + String.raw`<li>${breaking_label}${change}</li></ul>`;
              } else {
                output =
                  output + String.raw`<li>${breaking_label}${change}</li>`;
              }
            });
          } else {
            item.changes[data.locale].forEach((change, index) => {
              output = output + String.raw`${breaking_label}${change}`;
            });
          }
          output = output + String.raw`</li>`;
        } else {
          output =
            output +
            String.raw`
              <li>${breaking_label}${item.changes[data.locale]}</li>
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
  // Generate the release HTML
  return String.raw`
    <div 
      class="${state_class}"
      data-h2-margin="base(x.5, 0, 0, 0)"
      data-h2-position="base(relative)"
      data-h2-display="
        base:children[.ec-collapsed-icon](block)
        base:children[.ec-expanded-icon](none)
        base:selectors[.active]:children[.ec-collapsed-icon](none)
        base:selectors[.active]:children[.ec-expanded-icon](block)
        base:children[.expand-collapse-content](none) 
        base:selectors[.active]:children[.expand-collapse-content](block)">
      <button
        data-h2-height="base(x2)"
        data-h2-width="base(x2)"
        data-h2-background-color="base(foreground) base:focus-visible(focus)"
        data-h2-color="
          base:children[span](primary)
          base:focus-visible:children[span](black)"
        data-h2-stroke="base:focus-visible:children[path](black)"
        data-h2-shadow="base(small) base:hover(large) base:focus-visible(none)"
        data-h2-cursor="base(pointer)"
        data-h2-position="base(absolute)"
        data-h2-radius="base(circle)"
        data-h2-outline="base(none)"
        data-h2-border="
          base(none)
          base:children[>div](x.2 solid primary.lightest)
          base:focus-visible:children[>div](x.2 solid black)"
        data-h2-margin="base(x2, 0, 0, 0)"
        data-h2-transition="base(box-shadow, .2s, ease)"
        data-h2-z-index="base(2)"
        data-h2-location="base(0, auto, auto, 0)"
        data-h2-transform="base(translate(-50%, 0))"
        title="Expand or collapse this release."
        onclick="toggle_ec(this)">
        <div
          data-h2-position="base(center)"
          data-h2-height="base(x1.75)"
          data-h2-width="base(x1.75)"
          data-h2-radius="base(circle)"></div>
        <span
          class="ec-collapsed-icon"
          data-h2-position="base(center)"
          data-h2-font-weight="base(600)">
          <svg
            data-h2-display="base(block)"
            data-h2-height="base(x.75)" 
            data-h2-width="base(x.75)" 
            width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 23.1964L32.5 48.6964L58 23.1964" stroke="#9D5CFF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span
          class="ec-expanded-icon"
          data-h2-position="base(center)"
          data-h2-font-weight="base(600)">
          <svg
            data-h2-display="base(block)"
            data-h2-height="base(x.75)" 
            data-h2-width="base(x.75)" 
            width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M58 42.2344L32.5 16.7344L7 42.2344" stroke="#9D5CFF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
      <div
        data-h2-background-color="base(foreground)"
        data-h2-padding="base(x1, x2, x1.5, x2)"
        data-h2-border="base(1px solid primary.darkest.20)"
        data-h2-radius="base(rounded)"
        data-h2-flex-grow="base(1)">
        ${heading.render(data, {
          tag: 'h4',
          size: 'h4',
          label: release.version,
          margin: 'data-h2-margin="base(0, 0, x.5, 0)"',
          id: state_string + release.version,
          alignment: 'left',
          chips: [release_type, breaking_chip],
        })}
        <p data-h2-font-size="base(caption)">
          <span data-h2-font-weight="base(700)">Released on:</span> ${release.date.toLocaleString(
            'default',
            { month: 'long' }
          )} ${release.date.getDate()}, ${release.date.getFullYear()}
        </p>
        <div class="expand-collapse-content">
          ${features}
          ${optimizations}
          ${bugfixes}
        </div>
      </div>  
    </div>
  `;
}

module.exports = {
  data,
  render,
};
