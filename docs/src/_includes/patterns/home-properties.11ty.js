// Hydrogen dependencies
const property_data = require('../../../../lib/data/property-model');

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
  // Generate groups
  let groups = ``;
  let properties = property_data.properties;
  Object.keys(data.groups).forEach(function (group, g_index) {
    let group_content = String.raw`
      <div>
        <p data-h2-color="base(primary.dark) base:dark(primary.lighter)" data-h2-font-weight="base(800)" data-h2-margin="base(0, 0, x.5, 0)">${
          data.groups[group].title[data.locale]
        }</p>
        <ul data-h2-padding="base(0, 0, 0, x1)">
    `;
    properties.forEach(function (property, p_index) {
      if (group === property.group) {
        if (
          property != 'margin-top' &&
          property != 'margin-right' &&
          property != 'margin-bottom' &&
          property != 'margin-left' &&
          property != 'padding-top' &&
          property != 'padding-right' &&
          property != 'padding-bottom' &&
          property != 'padding-left'
        ) {
          group_content =
            group_content +
            String.raw`
          <li data-h2-margin="base(x.25, 0, 0, 0)">
            <a
              href="/${data.locale}/docs/properties/${
              property.group
            }/${property}"
              title=""
              data-h2-background-color="base:focus-visible(focus)"
              data-h2-outline="base(none)"
              data-h2-color="base:hover(primary) base:dark:hover(primary.lighter) base:focus-visible(black)">${
                property.title[data.locale]
              }</a>
          </li>
        `;
        }
      }
    });
    groups =
      groups +
      group_content +
      String.raw`
        </ul>
      </div>
    `;
  });
  // Render the pattern
  return String.raw`
    <div data-h2-margin="base(x5, 0, 0, 0)" data-h2-padding="base(0, 0, x2, 0)">
      <div data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2)">
        ${heading.render(data, {
          tag: 'h2',
          size: 'h2',
          label: data.properties.title.label,
          id: data.properties.title.id,
          img: {
            path: data.properties.title.icon.path,
            alt: data.properties.title.icon.alt,
          },
          link: {
            path: data.properties.title.link.path,
            title: data.properties.title.link.title,
            label: data.properties.title.link.label,
          },
        })}
      </div>
    </div>
    <div 
      data-h2-margin="base(x3, 0, 0, 0)"
      data-h2-position="base(relative)"
      data-h2-background-color="base(black)">
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
          data-h2-background-color="base(white)"
          data-h2-radius="base(rounded)"
          data-h2-padding="base(x1) l-tablet(x2)"
          data-h2-shadow="base(large)">
          <div 
            data-h2-display="base(grid)" 
            data-h2-grid-template-columns="base(repeat(1, minmax(0, 1fr))) p-tablet(repeat(3, minmax(0, 1fr))) l-tablet(repeat(5, minmax(0, 1fr)))" 
            data-h2-gap="base(x2)">
            ${groups}
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
