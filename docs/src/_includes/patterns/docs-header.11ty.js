const heading = require('../components/headings.11ty');
const flourish = require('../components/flourish.11ty');

var data = {};

function render(data) {
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
    }
    return icon;
  }
  function generate_sub() {
    let sub = ``;
    if (data.navigation.key === 'docs') {
      let links = ``;
      function generate_links() {
        data.header_index.forEach((item) => {
          links =
            links +
            String.raw`
              <div
                data-h2-display="base(grid)"
                data-h2-grid-template-columns="base(100%) p-tablet(4rem auto)"
                data-h2-gap="base(x1) p-tablet(x2)">
                ${flourish.render(data, {
                  heading: 'h6',
                  color: 'data-h2-background-color="base(secondary)"',
                })}
                <div>
                  <p
                    data-h2-font-size="base(h6)"
                    data-h2-font-weight="base(200)"
                    data-h2-text-align="base(center) p-tablet(left)">
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
        return links;
      }
      sub = String.raw`
        <div
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(100%) p-tablet(repeat(2, minmax(0, 1fr)))"
          data-h2-gap="base(x1)">
          ${generate_links()}
        </div>
      `;
    } else {
      sub = String.raw`
        <div data-h2-flex-grid="base(flex-start, x2, 0)">
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
      <div data-h2-layer="base(2, relative)">
        ${heading.render(data, {
          tag: 'h2',
          size: 'h1',
          label: data.title_long ? data.title_long : data.title,
          id: false,
          color: 'data-h2-color="base:all(white)"',
          img: {
            path: set_icon().path,
            alt: set_icon().alt,
          },
          alignment: 'left',
        })}
        <div data-h2-padding="base(x1, 0, 0, 0) l-tablet(x2, 0, 0, 0)">
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
