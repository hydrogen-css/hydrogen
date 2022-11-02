const docs_layout = require('../patterns/docs-layout.11ty');
const heading = require('../components/headings.11ty');
const docs_header = require('../patterns/docs-header.11ty');
const docs_releases = require('../patterns/docs-releases.11ty');

var data = {
  layout: 'patterns/docs-layout.11ty.js',
};

function render(data) {
  function create_content() {
    let content = ``;
    data.sections.forEach((section, index) => {
      if (section.title) {
        let margin = 'data-h2-margin="base(x3, 0, x.5, 0)"';
        if (index === 0) {
          margin = 'data-h2-margin="base(0, 0, x.5, 0)"';
        }
        content =
          content +
          heading.render(data, {
            tag: 'h3',
            size: 'h3',
            label: section.title.label,
            margin: margin,
            id: section.title.id,
            alignment: 'left',
          });
      }
      if (section.content) {
        section.content.forEach((item) => {
          content =
            content +
            String.raw`
              <p>${item}</p>
            `;
        });
      }
      if (section.sections) {
        let parent = section;
        section.sections.forEach((section, index) => {
          if (section.title) {
            content =
              content +
              heading.render(data, {
                tag: 'h4',
                size: 'h4',
                label: section.title.label,
                margin: 'data-h2-margin="base(x2, 0, x.5, 0)"',
                id: section.title.id,
                alignment: 'left',
              });
          }
          if (section.content) {
            section.content.forEach((item) => {
              content =
                content +
                String.raw`
                  <p>${item}</p>
                `;
            });
          }
          if (section.releases) {
            content = content + docs_releases.render(data, section);
          }
        });
      }
      if (section.releases) {
        content = content + docs_releases.render(data, section);
      }
    });
    return content;
  }
  return String.raw`
    ${docs_header.render(data)}
    <div data-h2-padding="base(x2, 0, 0, 0) l-tablet(x3, 0, 0, 0) desktop(x4, 0, 0, 0)">
      ${create_content()}
    </div>
  `;
}

module.exports = {
  data,
  render,
};
