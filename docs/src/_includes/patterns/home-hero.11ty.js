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
      id="main"
      data-h2-position="base(relative)"
      data-h2-background-color="base:all(black)">
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
        data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2) l-tablet(center, medium, x3)"
        data-h2-display="base(grid)">
        <div 
          data-h2-order="base(2) p-tablet(1)"
          data-h2-padding="base(x1, 0, x5, 0) p-tablet(x4, 0)"
          data-h2-text-align="base(right)">
          <div 
            data-h2-width="base(100%)"
            data-h2-max-width="base(x20)"
            data-h2-display="base(inline-block)">
            <div
              data-h2-height="base(x.25)"
              data-h2-width="base(100%)"
              data-h2-background-color="base(secondary)"
              data-h2-radius="base(rounded)"></div>
            <p
              data-h2-font-size="base(h6)"
              data-h2-font-weight="base(300)"
              data-h2-max-width="base(x18)"
              data-h2-color="base:all(white.80)"
              data-h2-margin="base(x1, auto, 0, auto) p-tablet(x1, 0, 0, auto)"
              data-h2-text-align="base(center) p-tablet(right)">${data.site.slogan[data.locale]}</p>
          </div>
        </div>
        <h1
          data-h2-order="base(1) p-tablet(2)"
          data-h2-color="base:all(white)"
          data-h2-font-weight="base(700)"
          data-h2-padding="base(x4, 0, 0, 0) p-tablet(0, 0, x4, 0)"
          data-h2-text-align="base(center) p-tablet(left)"
          data-h2-font-size="base(calc(var(--h2-font-size-display) * 1.15))">${data.site.name}</h1>
      </div>
    </div>
    <div
      data-h2-height="base(x.5)"
      data-h2-width="base(100%)"
      data-h2-background="base(divider)"></div>
    <div
      data-h2-position="base(relative)"
      data-h2-margin="base(-x3, 0, 0, 0)">
      <div data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2)l-tablet(center, medium, x3)">
        <div
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(1fr) l-tablet(1fr 1fr 1fr)"
          data-h2-gap="base(x.5) l-tablet(x2 x1)"
          data-h2-background-color="base:children[>div](foreground)"
          data-h2-radius="base:children[>div](rounded)"
          data-h2-padding="base:children[>div](x1) l-tablet:children[>div](x2)"
          data-h2-border="base:children[>div](1px solid primary.darkest.2)"
          data-h2-shadow="base:children[>div](large)"
          data-h2-color="base:children[p:first-child](primary.dark)"
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
