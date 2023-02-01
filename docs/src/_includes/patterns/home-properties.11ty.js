// Hydrogen dependencies

// Local dependencies
const heading = require('../components/headings.11ty');
const footer = require('../patterns/footer.11ty');

// Create pattern-specific data
var data = {};

/**
 * Render the homepage's features pattern
 * @param {Object} data 11ty's data
 * @returns {String} the rendered pattern
 */
function render(data) {
  // Render the pattern
  return String.raw`
    <div data-h2-margin="base(x5 0 0 0)" data-h2-padding="base(0, 0, x2, 0)">
      <div data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2)">
        ${heading.render(data, {
          tag: 'h2',
          size: 'h2',
          label: data.friends.title.label,
          id: data.friends.title.id,
          img: {
            path: data.friends.title.icon.path,
            alt: data.friends.title.icon.alt,
          },
        })}
      </div>
    </div>
    <div 
      data-h2-margin="base(x3, 0, 0, 0)"
      data-h2-position="base(relative)"
      data-h2-background-color="base:all(black)">
      <div
        data-h2-height="base(x.5)"
        data-h2-width="base(100%)"
        data-h2-background="base(divider)"></div>
      <div
        data-h2-height="base(100%)"
        data-h2-width="base(100%)"
        data-h2-position="base(absolute)"
        data-h2-location="base(0, auto, auto, 0)"
        data-h2-overflow="base(hidden)">
        <div 
          data-h2-background="base(accentRadial)"
          data-h2-position="base(absolute)"
          data-h2-height="base(300%)"
          data-h2-width="base(200%)"
          data-h2-opacity="base(20%)"
          data-h2-location="base(-150%, auto, auto, -100%)"></div>
        <div 
          data-h2-background="base(primaryRadial)"
          data-h2-position="base(absolute)"
          data-h2-height="base(300%)"
          data-h2-width="base(200%)"
          data-h2-opacity="base(20%)"
          data-h2-location="base(auto, -100%, -150%, auto)"></div>
      </div>
      <div
        data-h2-position="base(relative)" 
        data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2)">
        <div
          data-h2-margin="base(-x3, 0, 0, 0)"
          data-h2-background-color="base(foreground)"
          data-h2-radius="base(rounded)"
          data-h2-padding="base(x1) l-tablet(x2)"
          data-h2-shadow="base(large)">
          <div 
            data-h2-display="base(grid)" 
            data-h2-grid-template-columns="base(repeat(1, minmax(0, 1fr))) p-tablet(repeat(3, minmax(0, 1fr))) l-tablet(repeat(5, minmax(0, 1fr)))" 
            data-h2-gap="base(x2)">
            Stuff
          </div>
        </div>
      </div>
      ${footer.render(data, { home: true })}
    </div>
  `;
}

module.exports = {
  data,
  render,
};
