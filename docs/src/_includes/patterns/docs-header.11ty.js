var data = {};

function render(data) {
  let heading = require('../components/headings.11ty');
  let flourish = require('../components/flourish.11ty');
  function set_icon() {
    let icon = {
      path: '/static/img/icon-gear.svg',
      alt: '',
    };
    if (data.navigation.key === 'docs') {
      icon = {
        path: '/static/img/icon-sol.svg',
        alt: '',
      };
    } else if (data.navigation.key === 'releases') {
      icon = {
        path: '/static/img/icon-test-tubes.svg',
        alt: '',
      };
    } else if (data.navigation.key === 'faqs') {
      icon = {
        path: '/static/img/icon-chat.svg',
        alt: '',
      };
    }
    return icon;
  }
  function generate_sub() {
    let sub = ``;
    if (data.navigation.key === 'docs') {
      let links = String.raw`
        <div 
            data-h2-display="base(grid)"
            data-h2-grid-template-columns="base(100%)"
            data-h2-gap="base(x1)">
      `;
      function generate_links() {
        data.header_index.forEach((item, index) => {
          if (index === Math.ceil((data.header_index.length - 1) / 2)) {
            links =
              links +
              String.raw`
              </div>
              <div
                data-h2-display="base(grid)"
                data-h2-grid-template-columns="base(100%)"
                data-h2-gap="base(x1)">
            `;
          }
          links =
            links +
            String.raw`
              <div
                data-h2-display="base(grid)"
                data-h2-grid-template-columns="base(4rem auto) p-tablet(4rem auto)"
                data-h2-gap="base(x1) p-tablet(x2)">
                ${flourish.render(data, {
                  heading: 'h6',
                  color: 'data-h2-background-color="base(secondary)"',
                })}
                <div>
                  <p
                    data-h2-font-size="base(h6)"
                    data-h2-font-weight="base(200)"
                    data-h2-text-align="base(left)">
                    <a
                      href=${item.path}
                      title=${item.title}
                      ${item.external ? 'target="_blank" rel="noreferrer"' : ''}
                      data-h2-color="base:all(white) base:all:focus-visible(black) base:all:hover(primary.lighter)">${
                        item.label
                      }
                    </a>
                  </p>
                </div>
              </div>
            `;
        });
        links = links + `</div>`;
        return links;
      }
      sub = String.raw`
        <div
          data-h2-margin="base(x1, 0, 0, 0) p-tablet(0)"
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(100%) p-tablet(repeat(2, minmax(0, 1fr)))"
          data-h2-gap="base(x1)">
          ${generate_links()}
        </div>
      `;
    } else {
      sub = String.raw`
        <div data-h2-flex-grid="base(flex-start, x1, 0)">
          <div
            data-h2-display="base(none) p-tablet(block)" 
            data-h2-flex-item="base(content)">
            <div
              data-h2-width="p-tablet(4rem)"
              data-h2-height="base(x.25)"
              data-h2-margin="p-tablet(0.6rem, auto, 0, auto) l-tablet(0.7rem, auto, 0, auto)"
              data-h2-background="base(secondary)"
              data-h2-radius="base(pill)"></div>
          </div>
          <div data-h2-flex-item="base(1of1) p-tablet(fill)">
            <p
              data-h2-font-size="base(h6, 1.3)"
              data-h2-font-weight="base(200)"
              data-h2-font-color="base:all(white)"
              data-h2-text-align="base(center) p-tablet(left)">${data.subtitle}</p>
          </div>
        </div>
      `;
    }
    return sub;
  }
  return String.raw`
    <div 
      id="docs_header"
      data-h2-padding="base(x2, 0, x3, 0) l-tablet(x3, 0, x4, 0) desktop(x4, 0, x5, 0)"
      data-h2-layer="base(2, relative)">
      <div
        data-h2-position="base(absolute)"
        data-h2-location="
          base(0px, calc(0px - x1), auto, calc(0px - x1)) 
          p-tablet(0px, calc(0px - x2), auto, calc(0px - x2)) 
          l-tablet(0px, min(calc(0px - x3), calc(0px - x3 - ((100vw - (var(--h2-wrapper-large) + x4)) / 2))), auto, min(calc(0px - x3 - x15 - x3), calc(0px - x3 - x15 - x3 - ((100vw - (var(--h2-wrapper-large) + x4)) / 2))))
          desktop(0px, min(calc(0px - x3), calc(0px - x3 - ((100vw - (var(--h2-wrapper-large) + x6)) / 2))), auto, min(calc(0px - x4 - x15 - x3), calc(0px - x4 - x15 - x3 - ((100vw - (var(--h2-wrapper-large) + x6)) / 2))))"
        data-h2-height="base(100%)"
        data-h2-background-color="base:all(black)"
        data-h2-overflow="base(hidden)">
        <div
          class="accent-radial"
          data-h2-background="base(accentRadial)"></div>
        <div
          class="primary-radial"
          data-h2-background="base(primaryRadial)"></div>
        <div
          data-h2-height="base(x.5)"
          data-h2-width="base(100%)"
          data-h2-background="base(divider)"
          data-h2-position="base(absolute)"
          data-h2-location="base(auto, auto, 0, 0)"></div>
      </div>
      <div data-h2-layer="base(2, relative)">
        ${heading.render(data, {
          tag: 'h2',
          size: 'display',
          label: data.title_long ? data.title_long : data.title,
          id: false,
          color: 'data-h2-color="base:all(white)"',
          img: {
            path: set_icon().path,
            alt: set_icon().alt,
          },
        })}
        <div data-h2-padding="base(x1, 0, 0, 0) p-tablet(x2, 0, 0, 0)">
          ${generate_sub()}
        </div>
      </div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
