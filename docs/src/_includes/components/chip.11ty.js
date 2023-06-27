var data = {};

/**
 * Render a heading component
 * @param {Object} data 11ty's data
 * @param {{label: string, color: "primary" | "secondary"}} props the components's properties
 * @returns {String} the rendered template
 */
function render(data, props) {
  let background = {
    primary: 'data-h2-background-color="base(primary.lightest)"',
    secondary: 'data-h2-background-color="base(secondary.lightest)"',
    error: 'data-h2-background-color="base(error.lightest)"',
  };
  let border = {
    primary: 'data-h2-border="base(1px solid primary.dark)"',
    secondary: 'data-h2-border="base(1px solid secondary.darker)"',
    error: 'data-h2-border="base(1px solid error.darker)"',
  };
  let font_color = {
    primary: 'data-h2-color="base(primary.dark)"',
    secondary: 'data-h2-color="base(secondary.darker)"',
    error: 'data-h2-color="base(error.darker)"',
  };
  return String.raw`
    <span
      ${background[props.color]}
      ${border[props.color]}
      ${font_color[props.color]}
      data-h2-padding="base(x.15, x.5)"
      data-h2-radius="base(pill)"
      data-h2-font-size="base(caption, 1.2)"
      data-h2-font-weight="base(400)"
      data-h2-display="base(inline-block)"
      data-h2-vertical-align="base(middle)">
      ${props.label}
    </span>
  `;
}

module.exports = {
  data,
  render,
};
