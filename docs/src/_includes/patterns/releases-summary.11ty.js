const chip = require('../components/chip.11ty.js');

var data = {};

function render(data, content) {
  let output = ``;
  Object.keys(content.content).forEach((item) => {
    let category = 'Stable';
    let color = 'primary';
    if (item === 'beta') {
      category = 'Experimental';
      color = 'secondary';
    }
    let label = String.raw`
      <p data-h2-vertical-align="base(middle)"><strong data-h2-vertical-align="base(middle)">${category}</strong> ${chip.render(
      data,
      {
        label: item,
        color: color,
      }
    )} <strong data-h2-vertical-align="base(middle)">releases</strong></p>
    `;
    let item_content = ``;
    content.content[item].forEach((copy) => {
      item_content =
        item_content +
        String.raw`
        <p data-h2-margin="base(x.5, 0, 0, 0)">${copy}</p>
      `;
    });
    let span = ``;
    if (item === 'beta') {
      span = 'data-h2-grid-column="base(1 / 1) p-tablet(1 / 4)"';
    }
    output =
      output +
      String.raw`
      <div
        ${span}
        data-h2-background-color="base(foreground)"
        data-h2-border="base(1px solid primary.darkest.20) base:dark(1px solid primary.lightest.20)"
        data-h2-radius="base(rounded)"
        data-h2-padding="base(x1)">
        ${label}
        ${item_content}
      </div>
    `;
  });
  return String.raw`
    <div
      data-h2-margin="base(x2, 0, 0, 0)"
      data-h2-display="base(grid)"
      data-h2-gap="base(x1)"
      data-h2-grid-template-columns="base(1fr) p-tablet(repeat(3, minmax(0, 1fr)))">
      ${output}
    </div>
  `;
}

module.exports = {
  data,
  render,
};
