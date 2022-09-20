var data = {};

function generate_hero_content(data) {
  let hero_content = String.raw``;
  data.hero.features.forEach(function (item, index) {
    hero_content =
      hero_content +
      String.raw`
        <div>
          <p>${item.title}</p>
          ${(function () {
            let items = ``;
            item.content.forEach(function (child) {
              items = items + String.raw`<p>${child}</p>`;
            });
            return items;
          })()}
        </div>
      `;
  });
  return hero_content;
}

function render(data) {
  return String.raw`
    <div 
      data-h2-position="base(relative)"
      data-h2-background-color="base(black)">
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
      <div
        data-h2-position="base(relative)" 
        data-h2-container="base(center, medium, x1) l-tablet(center, medium, x2)">
        <div 
          data-h2-padding="base(x4, 0)"
          data-h2-text-align="base(right)">
          <div 
            data-h2-width="base(100%)"
            data-h2-max-width="base(x20)"
            data-h2-display="base(inline-block)">
            <div
              data-h2-height="base(x.25)"
              data-h2-width="base(100%)"
              data-h2-background-color="base(accent)"
              data-h2-radius="base(rounded)"></div>
            <p
              data-h2-font-size="base(h6)"
              data-h2-font-weight="base(300)"
              data-h2-max-width="base(x15)"
              data-h2-color="base(white.8)"
              data-h2-margin="base(x1, auto, 0, auto) p-tablet(x1, 0, 0, auto)"
              data-h2-text-align="base(center) p-tablet(right)">${
                data.site.slogan[data.locale]
              }</p>
          </div>
        </div>
        <h1
          data-h2-color="base(white)"
          data-h2-font-weight="base(700)"
          data-h2-padding="base(0, 0, x5, 0)"
          data-h2-text-align="base(center) p-tablet(left)"
          data-h2-font-size="base(display)">${data.site.name}</h1>
      </div>
    </div>
    <div
      data-h2-height="base(x.5)"
      data-h2-width="base(100%)"
      data-h2-background-color="base(divider)"></div>
    <div
      data-h2-position="base(relative)"
      data-h2-margin="base(-x3, 0, 0, 0)">
      <div data-h2-container="base(center, medium, x1) l-tablet(center, medium, x2)">
        <div
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(1fr) l-tablet(1fr 1fr 1fr)"
          data-h2-gap="base(x1) l-tablet(x2, x1)"
          data-h2-background-color="base:children[>div](white) base:dark:children[>div](font.dark)"
          data-h2-radius="base:children[>div](rounded)"
          data-h2-padding="base:children[>div](x1) l-tablet:children[>div](x2)"
          data-h2-shadow="base:children[>div](large)"
          data-h2-color="base:children[p:first-child](primary.dark) base:dark:children[p:first-child](primary.lighter)"
          data-h2-font-weight="base:children[p:first-child](800)"
          data-h2-margin="base:children[p:not(:first-child)](x.5, 0, 0, 0)">
          ${generate_hero_content(data)}
        </div>
      </div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
