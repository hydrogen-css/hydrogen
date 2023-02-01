// Local dependencies

// Create component-specific data
var data = {};

/**
 * Render a heading component
 * @param {Object} data 11ty's data
 * @param {{}} props the components's properties
 * @returns {String} the rendered template
 */
function render(data, props) {
  return String.raw`
    <hr 
      data-h2-border="base(none)"
      data-h2-height="base(1px)"
      data-h2-background-color="base(primary.darkest.20)"
      data-h2-margin="base(0)">
  `;
}

module.exports = {
  data,
  render,
};
