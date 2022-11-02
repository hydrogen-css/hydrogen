// Local dependencies

// Create component-specific data
var data = {};

/**
 * Render a heading component
 * @param {Object} data 11ty's data
 * @param {{heading: String}} props the components's properties
 * @returns {String} the rendered template
 */
function render(data, props) {
  let flourish_margin = {
    display:
      "data-h2-margin='base(calc((var(--h2-line-height-display) / 2) * 1rem), 0, 0, 0)'",
    h1: "data-h2-margin='base(calc((var(--h2-line-height-h1) / 2) * 1rem), 0, 0, 0)'",
    h2: "data-h2-margin='base(calc((var(--h2-line-height-h2) / 2) * 1rem), 0, 0, 0)'",
    h3: "data-h2-margin='base(calc((var(--h2-line-height-h3) / 2) * 1rem), 0, 0, 0)'",
    h4: "data-h2-margin='base(calc((var(--h2-line-height-h4) / 2) * 1rem), 0, 0, 0)'",
    h5: "data-h2-margin='base(calc((var(--h2-line-height-h5) / 2) * 1rem), 0, 0, 0)'",
    h6: "data-h2-margin='base(calc((var(--h2-line-height-h6) / 2) * 1rem), 0, 0, 0)'",
  };
  let color = 'data-h2-background-color="base(primary) base:dark(accent)"';
  if (props.color) {
    color = props.color;
  }
  return String.raw`
    <div 
      data-h2-position="base(relative)"
      data-h2-height="base(100%)">
      <div
        ${color}
        data-h2-height="base(x.25)"
        data-h2-radius="base(rounded)"
        data-h2-width="base(4rem)"
        ${flourish_margin[props.heading]}></div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
