var data = {};

function render(data) {
  return String.raw`
    <div data-h2-margin="base(x2, auto, 0, auto)">
      <div data-h2-flex-grid="base(flex-start, x2, 0)">
        <div data-h2-flex-item="base(1of1) p-tablet(fill)">
          <hr
            data-h2-height="base(1px)"
            data-h2-border="base(0px solid transparent)"
            data-h2-background-color="base(black.lightest)" 
            data-h2-margin="base(x1.5, 0, x3, 0)"/>
          <div data-h2-flex-grid="base(flex-start, x1) p-tablet(flex-start, x2) laptop(flex-start, x3)">
            <div data-h2-flex-item="base(1of2)">
                  <p
                    data-h2-text-transform="base(uppercase)"
                    data-h2-font-size="base(caption)"
                    data-h2-font-weight="base(700)"
                    data-h2-margin="base(0, 0, 0, x1.2)"
                    data-h2-color="base(black.lighter)">
                    Previously
                  </p>
                  <a href="url" title="" data-h2-text-decoration="base(none)" data-h2-font-weight="base(700)" data-h2-color="base(primary.dark) base:hover(font)" data-h2-transition="base(color .2s ease)">
                    <span data-h2-font-size="base(h6, 1)">&#171;</span>
                    <span data-h2-font-size="base(h6, 1)" data-h2-text-decoration="base(underline)" data-h2-margin="base(0, 0, 0, x.5)">Previous page title</span>
                  </a>
            </div>
            <div
              data-h2-text-align="base(right)" 
              data-h2-flex-item="base(1of2)">
                  <p
                    data-h2-text-transform="base(uppercase)"
                    data-h2-font-size="base(caption)"
                    data-h2-font-weight="base(700)"
                    data-h2-margin="base(0, x1.2, 0, 0)"
                    data-h2-color="base(black.lighter)">
                    Up next
                  </p>
                  <a href="url" title="" data-h2-text-decoration="base(none)" data-h2-font-weight="base(700)" data-h2-color="base(primary.dark) base:hover(font)" data-h2-transition="base(color .2s ease 0s)">
                    <span data-h2-font-size="base(h6, 1)" data-h2-text-decoration="base(underline)" data-h2-margin="base(0, x.5, 0, 0)">Next page title</span>
                    <span data-h2-font-size="base(h6, 1)">&#187;</span>
                  </a>
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
