const footer = require('../patterns/footer.11ty');

var data = {};

function render(data) {
  return String.raw`
    <div 
      data-h2-margin="base(x3, 0, 0, 0) p-tablet(x4, 0, 0, 0) desktop(x5, 0, 0, 0)"
      data-h2-position="base(relative)"
      data-h2-background-color="base(black)">
      <div
        data-h2-height="base(x.5)"
        data-h2-width="base(100%)"
        data-h2-background-color="base(divider)"></div>
      <div
        data-h2-height="base(100%)"
        data-h2-width="base(100%)"
        data-h2-position="base(absolute)"
        data-h2-offset="base(0, auto, auto, 0)"
        data-h2-overflow="base(hidden)">
        <div 
          data-h2-background-color="base(accentRadial)"
          data-h2-position="base(absolute)"
          data-h2-height="base(300%)"
          data-h2-width="base(200%)"
          data-h2-opacity="base(20%)"
          data-h2-offset="base(-150%, auto, auto, -100%)"></div>
        <div 
          data-h2-background-color="base(primaryRadial)"
          data-h2-position="base(absolute)"
          data-h2-height="base(300%)"
          data-h2-width="base(200%)"
          data-h2-opacity="base(20%)"
          data-h2-offset="base(auto, -100%, -150%, auto)"></div>
      </div>
      ${footer.render(data, { home: true })}
    </div>
  `;
}

module.exports = {
  data,
  render,
};
