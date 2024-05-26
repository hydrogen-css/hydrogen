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
          data-h2-order="base(1) p-tablet(2)" 
          data-h2-padding="base(x2, 0, x4, 0) p-tablet(x4, 0, x6, 0)"
          data-h2-text-align="base(center)">
          <h1
            data-h2-color="base:all(white)"
            data-h2-font-weight="base(700)"
            data-h2-margin-bottom="base(x.5)"
            data-h2-font-size="base(calc(var(--h2-font-size-display) * 1.25))"
            data-h2-overflow-wrap="base(anywhere)">
            ${data.site.name}
          </h1>
          <p 
            data-h2-color="base:all(white.5)"
            data-h2-margin-bottom="base(x1)">${data.site.slogan[data.locale]}</p>
          <div 
            class="code_wrapper"
            data-h2-display="base(inline-block) p-tablet(block)">
            <button
              title="${data.site.components.code.copy_button.title[data.locale]}"
              onclick="copy_code(this)"
              data-h2-background-color="base(transparent) base:focus-visible(focus)"
              data-h2-border="base(none)"
              data-h2-cursor="base(pointer)"
              data-h2-margin="base(0, x.25, 0, -1ch)"
              data-h2-font-size="base(caption)"
              data-h2-outline="base(none)"
              data-h2-radius="base(5px)"
              data-h2-height="base(x1.5)"
              data-h2-width="base(x1.5)"
              data-h2-vertical-align="base(middle)">
              <span 
                class="default"
                data-h2-position="base(center)">📋</span>
              <span 
                class="confirmation"
                data-h2-position="base(center)">✅</span>
            </button><code data-h2-color="base:all(white)">npm install @hydrogen-css/hydrogen --save</code>
            <textarea 
              class="code_content"
              data-h2-display="base(none)">npm install @hydrogen-css/hydrogen --save</textarea>
          </div>
        </div>
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
          data-h2-margin="base:children[p:not(:first-child)](x.25, 0, 0, 0)">
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
