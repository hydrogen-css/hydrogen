// Hydrogen dependencies

// Local dependencies

// Create pattern-specific data
var data = {};

/**
 * Render the homepage's features pattern
 * @param {Object} data 11ty's data
 * @param {{home?: Boolean}} props the pattern's properties
 * @returns {String} the rendered pattern
 */
function render(data, props) {
  let container =
    'data-h2-container="base(center, large, x1) p-tablet(center, large, x2)"';
  if (data.navigation.key === 'home') {
    container =
      'data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2)"';
  }
  // Create the footer
  let footer = String.raw`
    <footer
      data-h2-display="base(grid)"
      data-h2-grid-template-columns="base(repeat(2, minmax(0, 1fr)))"
      data-h2-gap="base(x2)">
      <div data-h2-text-align="base(center) p-tablet(left)">
        <p
          data-h2-font-size="base(h6)"
          data-h2-font-weight="base(700)"
          data-h2-color="base:all(white)">${data.site.name}</p>
      </div>
      <div data-h2-text-align="base(center) p-tablet(right)">
        <div
          data-h2-display="base(inline-block)"
          data-h2-width="base(100%)"
          data-h2-max-width="base(x20)">
          <p
            data-h2-font-size="base(h6)"
            data-h2-font-weight="base(300)"
            data-h2-max-width="base(x18)"
            data-h2-color="base:all(white.80)"
            data-h2-margin="base(0, 0, x1, auto)">${
              data.site.footer.farewell[data.locale]
            }</p>
          <div
            data-h2-height="base(x.25)"
            data-h2-width="base(100%)"
            data-h2-background-color="base(secondary)"
            data-h2-radius="base(rounded)"></div>
        </div>
      </div>
    </footer>
  `;
  let footer_content = String.raw`
    <div
      data-h2-padding="base(x4, 0)"
      data-h2-position="base(relative)">
      <div ${container}>
        ${footer}
      </div>
    </div>
  `;
  // Render the pattern
  return footer_content;
}

module.exports = {
  data,
  render,
};
