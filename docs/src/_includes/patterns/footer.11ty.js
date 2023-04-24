// Create pattern-specific data
var data = {};

/**
 * Render the homepage's features pattern
 * @param {Object} data 11ty's data
 * @param {{home?: Boolean}} props the pattern's properties
 * @returns {String} the rendered pattern
 */
function render(data, props) {
  // Local dependencies
  let theo = require('../components/icons/theo.11ty');
  let sybil = require('../components/icons/sybil.11ty');
  let container =
    'data-h2-container="base(center, large, x1) p-tablet(center, large, x2) l-tablet(center, large, x3)"';
  if (data.navigation.key === 'home') {
    container =
      'data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2) l-tablet(center, medium, x3)"';
  }
  // Create the footer
  let footer = String.raw`
    <footer
      data-h2-display="base(grid)"
      data-h2-grid-template-columns="l-tablet(repeat(2, minmax(0, 1fr)))"
      data-h2-gap="base(x2)"
      data-h2-padding-bottom="base(x7) l-tablet(x4)">
      <div 
        data-h2-text-align="base(center) l-tablet(left)"
        data-h2-position="base(relative)"
        data-h2-order="base(2) l-tablet(1)">
        <p
          data-h2-font-size="base(h6)"
          data-h2-font-weight="base(700)"
          data-h2-color="base:all(white)">${data.site.name}</p>
        <div
          data-h2-display="base(block)"
          data-h2-position="base(absolute)"
          data-h2-location="base(auto, auto, -x3.5, 50%) l-tablet(auto, auto, -x4, -10px)"
          data-h2-transform="base(translate(-50%, 0)) l-tablet(translate(0, 0))"
          >
          <span 
            data-h2-display="base(inline-block)"
            data-h2-transition="base(transform .5s cubic-bezier(.68,-0.55,.27,1.55))" 
            data-h2-transform="base(translate(0, 60%)) l-tablet(translate(0, 60%)) l-tablet:hover(translate(0, 0))"
            data-h2-width="base(x3.2)">
            ${theo.render(data)}
          </span>
          <span 
            data-h2-display="base(inline-block)"
            data-h2-transition="base(transform .5s cubic-bezier(.68,-0.55,.27,1.55))" 
            data-h2-transform="base(translate(0, 60%)) l-tablet(translate(0, 60%)) l-tablet:hover(translate(0, 0))"
            data-h2-width="base(x3)">
            ${sybil.render(data)}
          </span>
        </div>
      </div>
      <div 
        data-h2-text-align="base(center) l-tablet(right)"
        data-h2-order="base(1) l-tablet(2)">
        <div
          data-h2-display="base(inline-block)"
          data-h2-width="base(100%)"
          data-h2-max-width="base(x20)">
          <p
            data-h2-font-size="base(h6)"
            data-h2-font-weight="base(300)"
            data-h2-max-width="base(x18)"
            data-h2-color="base:all(white.80)"
            data-h2-margin="base(0, auto, x1, auto) l-tablet(0, 0, x1, auto)">${
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
      data-h2-padding="base(x4, 0, 0, 0)"
      data-h2-position="base(relative)"
      data-h2-overflow="base(hidden)">
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
