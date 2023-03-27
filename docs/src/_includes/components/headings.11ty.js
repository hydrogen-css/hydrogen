// Local dependencies
const cp_flourish = require('./flourish.11ty');
const robot = require('./icons/robot.11ty');
const flag = require('./icons/flag.11ty');
const compass = require('./icons/compass.11ty');

// Create component-specific data
var data = {};

/**
 * Render a heading component
 * @param {Object} data 11ty's data
 * @param {{tag: String, size: String, label: String, id: String, alignment?: String, margin?: String, img?: {path: String, alt: String}, flourish?: boolean, chips?: HTMLElement[], link?: {path: String, title: String, label: String}}} props the components's properties
 * @returns {String} the rendered template
 */
function render(data, props) {
  // Set font size
  let font_sizes = {
    display: 'data-h2-font-size="base(display)"',
    h1: 'data-h2-font-size="base(h1)"',
    h2: 'data-h2-font-size="base(h2)"',
    h3: 'data-h2-font-size="base(h3)"',
    h4: 'data-h2-font-size="base(h4)"',
    h5: 'data-h2-font-size="base(h5)"',
    h6: 'data-h2-font-size="base(h6)"',
  };
  // Set font weight
  let font_weights = {
    display: 'data-h2-font-weight="base(700)"',
    h1: 'data-h2-font-weight="base(700)"',
    h2: 'data-h2-font-weight="base(700)"',
    h3: 'data-h2-font-weight="base(700)"',
    h4: 'data-h2-font-weight="base(300)"',
    h5: 'data-h2-font-weight="base(700)"',
    h6: 'data-h2-font-weight="base(300)"',
  };
  // Set color
  let color = "data-h2-color='base(black)'";
  if (props.color) {
    color = props.color;
  }
  // Set layout options
  let layout = 'data-h2-grid-template-columns="base(1fr)"';
  if (props.img || props.flourish) {
    layout = 'data-h2-grid-template-columns="base(100%) p-tablet(4rem 1fr)"';
  }
  // Set alignment
  let alignment = 'data-h2-text-align="base(center) p-tablet(left)"';
  if (props.alignment && props.alignment === 'left') {
    alignment = 'data-h2-text-align="base(left)"';
  }
  // Set margins
  let margin = '';
  if (props.margin) {
    margin = props.margin;
  }
  // Create icon
  let icon = ``;
  if (props.svg) {
    let svg = ``;
    if (props.svg === 'robot') {
      svg = robot.render(data);
    } else if (props.svg === 'flag') {
      svg = flag.render(data);
    } else if (props.svg === 'compass') {
      svg = compass.render(data);
    } else {
      throw new Error('Pass an existing icon.');
    }
    icon = String.raw`
      <div 
        data-h2-position="base(relative)"
        data-h2-height="p-tablet(100%)"
        data-h2-text-align="base(center)">
        <div
          data-h2-display="base(inline-block)"
          data-h2-position="base(relative) p-tablet(absolute)"
          data-h2-location="p-tablet(60%, auto, auto, 50%)"
          data-h2-width="base(x3) p-tablet(100%)"
          data-h2-transform="base(rotate(-15deg)) p-tablet(translate(-50%, -50%) rotate(-15deg))">
          ${svg}
        </div>
      </div>
    `;
  } else if (props.img) {
    icon = String.raw`
      <div 
        data-h2-position="base(relative)"
        data-h2-height="p-tablet(100%)"
        data-h2-text-align="base(center)">
        <img
          src="${props.img.path}"
          alt="${props.img.alt}"
          data-h2-display="base(inline-block)"
          data-h2-position="base(relative) p-tablet(absolute)"
          data-h2-location="p-tablet(60%, auto, auto, 50%)"
          data-h2-width="base(x3) p-tablet(100%)"
          data-h2-transform="base(rotate(-15deg)) p-tablet(translate(-50%, -50%) rotate(-15deg))" />
      </div>
    `;
  }
  // Create flourish
  let flourish = ``;
  if (props.flourish) {
    flourish = cp_flourish.render(data, {
      heading: props.size,
    });
  }
  // Create hash
  let hash = ``;
  if (props.id != false) {
    hash = String.raw`
      <a 
        data-h2-color="base(black.lightest) base:hover(primary) base:all:focus-visible(black)" 
        data-h2-font-size="base(caption)" 
        data-h2-display="base(inline)"
        data-h2-background-color="base:focus-visible(focus)"
        data-h2-padding="base(x.15, x.25)"
        data-h2-font-weight="base(700)"
        data-h2-text-decoration="base(none)"
        data-h2-outline="base(none)"
        data-h2-vertical-align="base(middle)"
        href="${data.page.url}#${props.id}" 
        title="Skip to this section.">
        #</a>
    `;
  }
  // Create chip
  let chips = ``;
  if (props.chips && props.chips.length > 0) {
    chips = `<div>`;
    props.chips.forEach((chip) => {
      chips = chips + chip;
    });
    chips = chips + `</div>`;
  }
  // Create link
  let link = ``;
  if (props.link) {
    link = String.raw`
      <div data-h2-text-align="base(center) p-tablet(right)">
        <a
          href="${props.link.path}"
          title="${props.link.title}"
          data-h2-font-size="base(h6, 1.3)"
          data-h2-font-weight="base(300)"
          data-h2-background-color="base:focus-visible(focus)"
          style="outline: none;"
          data-h2-color="base:hover(primary) base:all:focus-visible(black)">${props.link.label}</a>
      </div>
    `;
  }
  return String.raw`
    <span id="${props.id}" ></span>
    <div 
      ${margin}
      data-h2-display="base(grid)"
      ${layout}
      data-h2-gap="base(x1) p-tablet(x2)"
      data-h2-align-items="base(center)">
      ${icon}
      ${flourish}
      <div>
        <div 
          data-h2-display="base(grid) p-tablet(flex)"
          data-h2-gap="base(x.5) p-tablet(x2)"
          data-h2-align-items="p-tablet(center)">
          <div
            data-h2-flex-grow="p-tablet(1)"
            ${alignment}>
            <${props.tag} 
              ${font_sizes[props.size]}
              ${font_weights[props.size]}
              ${color}
              data-h2-position='base(relative)'
              data-h2-display="base(inline-block) p-tablet(block)">
              <span data-h2-vertical-align="base(middle)">
                ${props.label}
              </span>
              ${hash}
            </${props.tag}>
          </div>
          ${link}
          ${chips}
        </div>
      </div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
