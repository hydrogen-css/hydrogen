var data = {};

function render(data) {
  let current;
  data.collections.en_docs.forEach((post, index) => {
    if (post.data.navigation.key === data.navigation.key) {
      current = index;
    }
  });
  function get_previous() {
    let previous = current - 1;
    if (data.collections.en_docs[previous]) {
      return String.raw`
        <p
          data-h2-text-transform="base(uppercase)"
          data-h2-font-size="base(caption)"
          data-h2-font-weight="base(700)"
          data-h2-color="base(black.lighter)">
          Previously
        </p>
        <a 
          href="${data.collections.en_docs[current - 1].url}" 
          title="" 
          data-h2-text-decoration="base(none)" 
          data-h2-font-weight="base(700)" 
          data-h2-color="
            base(primary.dark) 
            base:hover(font) 
            base:all:focus-visible(black)"
          data-h2-position="base(relative)">
          <span 
            data-h2-font-size="base(h6, 1)"
            data-h2-position="base(absolute)"
            data-h2-location="base(50%, auto, auto, 0)"
            data-h2-transform="base(translate(calc((100% + x.25) * -1), -55%))">
            &#171;
          </span>
          <span 
            data-h2-font-size="base(h6, 1)" 
            data-h2-text-decoration="base(underline)">
            ${data.collections.en_docs[previous].data.title}
          </span>
        </a>
      `;
    } else {
      return String.raw``;
    }
  }
  function get_next() {
    if (data.collections.en_docs[current + 1]) {
      return String.raw`
        <p
          data-h2-text-transform="base(uppercase)"
          data-h2-font-size="base(caption)"
          data-h2-font-weight="base(700)"
          data-h2-color="base(black.lighter)">
          Up next
        </p>
        <a 
          href="${data.collections.en_docs[current + 1].url}" 
          title="" 
          data-h2-text-decoration="base(none)" 
          data-h2-font-weight="base(700)" 
          data-h2-color="
            base(primary.dark) 
            base:hover(font) 
            base:all:focus-visible(black)"
          data-h2-position="base(relative)">
          <span 
            data-h2-font-size="base(h6, 1)" 
            data-h2-text-decoration="base(underline)">
            ${data.collections.en_docs[current + 1].data.title}
          </span>
          <span 
            data-h2-font-size="base(h6, 1)"
            data-h2-position="base(absolute)"
            data-h2-location="base(50%, 0, auto, auto)"
            data-h2-transform="base(translate(calc(100% + x.25), -55%))">
            &#187;
          </span>
        </a>
      `;
    } else {
      return String.raw``;
    }
  }
  return String.raw`
    <div data-h2-margin="base(x2, auto, 0, auto)">
      <div data-h2-flex-grid="base(flex-start, x2, 0)">
        <div data-h2-flex-item="base(1of1) p-tablet(fill)">
          <hr
            data-h2-height="base(1px)"
            data-h2-border="base(0px solid transparent)"
            data-h2-background-color="base(black.lightest)" 
            data-h2-margin="base(x1.5, 0, x3, 0)"/>
          <div data-h2-flex-grid="base(flex-start, x1) p-tablet(flex-start, x2) laptop(flex-start, x3)" data-h2-padding="base(0, x1) p-tablet(0)">
            <div data-h2-flex-item="base(1of2)">
              ${get_previous()}
            </div>
            <div
              data-h2-text-align="base(right)" 
              data-h2-flex-item="base(1of2)">
              ${get_next()}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
