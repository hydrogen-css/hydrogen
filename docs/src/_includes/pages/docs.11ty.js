const docs_layout = require('../patterns/docs-layout.11ty');
const heading = require('../components/headings.11ty');
const docs_header = require('../patterns/docs-header.11ty');
const docs_release_latest = require('../patterns/releases-latest.11ty');
const docs_release_summary = require('../patterns/releases-summary.11ty');
const docs_history = require('../patterns/releases-history.11ty');
const code = require('../components/code.11ty');
const { latest, beta } = require('../../_data/releases');

var data = {
  layout: 'patterns/docs-layout.11ty.js',
};

function render(data) {
  function create_content() {
    let content = ``;
    function render_title(item, index, level) {
      let margin = '';
      if (level === 'h3') {
        margin = 'data-h2-margin="base(x3, 0, x.5, 0)"';
        if (index === 0) {
          margin = 'data-h2-margin="base(0, 0, x.5, 0)"';
        }
      } else if (level === 'h4' || level === 'h5') {
        margin = 'data-h2-margin="base(x2, 0, x.5, 0)"';
      }
      if (item.link) {
        return heading.render(data, {
          tag: level,
          size: level,
          label: item.label,
          margin: margin,
          id: item.id,
          alignment: 'left',
          link: item.link,
        });
      } else {
        return heading.render(data, {
          tag: level,
          size: level,
          label: item.label,
          margin: margin,
          id: item.id,
          alignment: 'left',
        });
      }
    }
    function render_copy(item, index) {
      let output = ``;
      item.items.forEach((content, item_index) => {
        let margin = 'data-h2-margin="base(x.5, 0, 0, 0)"';
        if (index === 0 && item_index === 0) {
          margin = '';
        }
        output =
          output +
          String.raw`
            <p ${margin}>${content}</p>
          `;
      });
      return output;
    }
    function render_list(item, index) {
      let output = ``;
      if (item.style === 'ordered') {
        output = output + String.raw`<ol data-h2-padding="base(0, 0, 0, x1)">`;
      } else if (item.style === 'unordered') {
        output = output + String.raw`<ul data-h2-padding="base(0, 0, 0, x1)">`;
      }
      item.items.forEach((list_item) => {
        if (Array.isArray(list_item)) {
          if (item.style === 'ordered') {
            output =
              output + String.raw`<ol data-h2-padding="base(0, 0, 0, x1)">`;
          } else if (item.style === 'unordered') {
            output =
              output + String.raw`<ul data-h2-padding="base(0, 0, 0, x1)">`;
          }
          list_item.forEach((sub_list_item) => {
            output =
              output +
              String.raw`
              <li data-h2-margin="base(x.5, 0, 0, 0)">${sub_list_item}</li>
            `;
          });
          if (item.style === 'ordered') {
            output = output + String.raw`</ol>`;
          } else if (item.style === 'unordered') {
            output = output + String.raw`</ul>`;
          }
        } else {
          output =
            output +
            String.raw`
            <li data-h2-margin="base(x.5, 0, 0, 0)">${list_item}</li>
          `;
        }
      });
      if (item.style === 'ordered') {
        output = output + String.raw`</ol>`;
      } else if (item.style === 'unordered') {
        output = output + String.raw`</ul>`;
      }
      return output;
    }
    function render_embed(item, index) {
      return item.embed;
    }
    function render_code(item, index) {
      return code.render(data, {
        file: item.file,
        lines: item.lines,
      });
    }
    function render_group(item, index, level) {
      let output = String.raw`
        <div data-h2-display="base(grid)" data-h2-grid-template-columns="base(100%) desktop(repeat(2, minmax(0, 1fr)))" data-h2-gap="base(x1) desktop(x3)">
      `;
      let content = [];
      let example = [];
      item.items.forEach((subitem, index) => {
        if (
          subitem.type === 'title' ||
          subitem.type === 'copy' ||
          subitem.type === 'list'
        ) {
          content = content.concat(subitem);
        } else {
          example = example.concat(subitem);
        }
      });
      output = output + String.raw`<div>`;
      content.forEach((item, index) => {
        if (item.type === 'title') {
          output = output + render_title(item, index, level);
        } else if (item.type === 'copy') {
          output = output + render_copy(item, index);
        } else if (item.type === 'list') {
          output = output + render_list(item, index);
        }
      });
      output = output + String.raw`</div>`;
      output = output + String.raw`<div>`;
      example.forEach((item, index) => {
        if (item.type === 'code') {
          output = output + render_code(item, index);
        } else if (item.type === 'embed') {
          output = output + render_embed(item, index);
        }
      });
      output = output + String.raw`</div>`;
      output = output + String.raw`</div>`;
      return output;
    }
    function render_latest(item, index) {
      return docs_release_latest.render(data);
    }
    function render_history(item, index) {
      return docs_history.render(data, item);
    }
    function render_release_summaries(item, index) {
      return docs_release_summary.render(data, item);
    }
    function render_section(section, index) {
      let output = ``;
      section.content.forEach((item, index) => {
        if (item.type === 'title') {
          output = output + render_title(item, index, 'h4');
        } else if (item.type === 'copy') {
          output = output + render_copy(item, index);
        } else if (item.type === 'list') {
          output = output + render_list(item, index);
        } else if (item.type === 'code') {
          output = output + render_code(item, index);
        } else if (item.type === 'group') {
          output = output + render_group(item, index, 'h4');
        } else if (item.type === 'section') {
          output = output + render_subsection(item, index);
        }
      });
      return output;
    }
    function render_subsection(section, index) {
      let output = ``;
      section.content.forEach((item, index) => {
        if (item.type === 'title') {
          output = output + render_title(item, index, 'h5');
        } else if (item.type === 'copy') {
          output = output + render_copy(item, index);
        } else if (item.type === 'list') {
          output = output + render_list(item, index);
        } else if (item.type === 'code') {
          output = output + render_code(item, index);
        } else if (item.type === 'group') {
          output = output + render_group(item, index, 'h5');
        }
      });
      return output;
    }
    data.main.forEach((item, index) => {
      if (item.type === 'title') {
        content = content + render_title(item, index, 'h3');
      } else if (item.type === 'copy') {
        content = content + render_copy(item, index);
      } else if (item.type === 'list') {
        content = content + render_list(item, index);
      } else if (item.type === 'code') {
        content = content + render_code(item, index);
      } else if (item.type === 'group') {
        content = content + render_group(item, index, 'h3');
      } else if (item.type === 'latest') {
        content = content + render_latest(item, index);
      } else if (item.type === 'history') {
        content = content + render_history(item, index);
      } else if (item.type === 'release-summary') {
        content = content + render_release_summaries(item, index);
      } else if (item.type === 'section') {
        content = content + render_section(item, index);
      }
    });
    return content;
  }
  return String.raw`
    ${docs_header.render(data)}
    <div id="main" data-h2-padding="base(x2, 0, 0, 0) l-tablet(x3, 0, 0, 0) desktop(x4, 0, 0, 0)">
      ${create_content()}
    </div>
  `;
}

module.exports = {
  data,
  render,
};
