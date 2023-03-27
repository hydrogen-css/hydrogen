const docs_layout = require('../patterns/docs-layout.11ty');
const heading = require('../components/headings.11ty');
const docs_header = require('../patterns/docs-header.11ty');
const docs_release_featured = require('../patterns/releases-featured.11ty');
const docs_release_latest = require('../patterns/releases-latest.11ty');
const docs_release_summary = require('../patterns/releases-summary.11ty');
const docs_history = require('../patterns/releases-history.11ty');
const code = require('../components/code.11ty');
const { latest, beta } = require('../../_data/releases');
const expansion = require('../components/expansion-content.11ty');

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
      } else if (level === 'h4' || level === 'h5' || level === 'h6') {
        margin = 'data-h2-margin="base(x2, 0, x.5, 0)"';
      }
      if (item.link) {
        return heading.render(data, {
          tag: level,
          size: level,
          label: item.label,
          margin: margin,
          id: item.id,
          link: item.link,
        });
      } else {
        return heading.render(data, {
          tag: level,
          size: level,
          label: item.label,
          margin: margin,
          id: item.id,
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
      let margin = 'data-h2-margin="base(x1, 0, 0, 0)"';
      if (index === 0) {
        margin = '';
      }
      if (item.style === 'ordered') {
        output = output + String.raw`<ol data-h2-padding="base(0, 0, 0, x1)">`;
      } else if (item.style === 'unordered') {
        output = output + String.raw`<ul data-h2-padding="base(0, 0, 0, x1)">`;
      } else if (item.style === 'grid') {
        output =
          output +
          String.raw`
            <ul 
              ${margin}
              data-h2-padding="base(0, 0, 0, x1)"
              data-h2-display="base(grid)"
              data-h2-gap="base(0, x1) p-tablet(0, x2)"
              data-h2-grid-template-columns="
                base(100%) 
                p-tablet(repeat(2, minmax(0, 1fr))) 
                laptop(repeat(4, minmax(0, 1fr)))">
          `;
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
      } else if (item.style === 'unordered' || item.style === 'grid') {
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
        copy: item.copy,
        lines: item.lines,
      });
    }
    function render_rhythm(item, index) {
      let output = String.raw`
        <div
          data-h2-background="base(foreground)"
          data-h2-radius="base(rounded)"
          data-h2-shadow="base(large)"
          data-h2-padding="base(0, x2)">
          <span
            data-h2-height="base(x2)"
            data-h2-background="base(secondary.lightest.5)"
            data-h2-align-items="base(center)"
            data-h2-justify-content="base(center)"
            data-h2-font-size="base(caption)"
            data-h2-display="base(flex)"
            data-h2-width="base(100%)">x2 line height</span>
          <h3>Heading 3</h3>
          <span
            data-h2-height="base(x1)"
            data-h2-background="base(primary.lightest.5)"
            data-h2-align-items="base(center)"
            data-h2-justify-content="base(center)"
            data-h2-font-size="base(caption)"
            data-h2-display="base(flex)"
            data-h2-width="base(100%)">x1 line height</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor.</p>
          <span
            data-h2-height="base(x1)"
            data-h2-background="base(primary.lightest.5)"
            data-h2-align-items="base(center)"
            data-h2-justify-content="base(center)"
            data-h2-font-size="base(caption)"
            data-h2-display="base(flex)"
            data-h2-width="base(100%)">x1 line height</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor.</p>
          <span
            data-h2-height="base(x2)"
            data-h2-background="base(secondary.lightest.5)"
            data-h2-align-items="base(center)"
            data-h2-justify-content="base(center)"
            data-h2-font-size="base(caption)"
            data-h2-display="base(flex)"
            data-h2-width="base(100%)">x2 line height</span>
          <h4>Heading 4</h4>
          <span
            data-h2-height="base(x1)"
            data-h2-background="base(primary.lightest.5)"
            data-h2-align-items="base(center)"
            data-h2-justify-content="base(center)"
            data-h2-font-size="base(caption)"
            data-h2-display="base(flex)"
            data-h2-width="base(100%)">x1 line height</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor.</p>
          <span
            data-h2-height="base(x1)"
            data-h2-background="base(primary.lightest.5)"
            data-h2-align-items="base(center)"
            data-h2-justify-content="base(center)"
            data-h2-font-size="base(caption)"
            data-h2-display="base(flex)"
            data-h2-width="base(100%)">x1 line height</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor.</p>
          <span
            data-h2-height="base(x2)"
            data-h2-background="base(secondary.lightest.5)"
            data-h2-align-items="base(center)"
            data-h2-justify-content="base(center)"
            data-h2-font-size="base(caption)"
            data-h2-display="base(flex)"
            data-h2-width="base(100%)">x2 line height</span>
        </div>
      `;
      return output;
    }
    function render_rhythm_clear(item, index) {
      let output = String.raw`
        <div
          data-h2-background="base(foreground)"
          data-h2-radius="base(rounded)"
          data-h2-shadow="base(large)"
          data-h2-padding="base(x2)">
          <h3>Heading 3</h3>
          <p data-h2-margin-top="base(x1)">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor.</p>
          <p data-h2-margin-top="base(x1)">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor.</p>
          <h4 data-h2-margin-top="base(x2)">Heading 4</h4>
          <p data-h2-margin-top="base(x1)">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor.</p>
          <p data-h2-margin-top="base(x1)">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor.</p>
        </div>
      `;
      return output;
    }
    function render_group(item, index, level) {
      let margin = 'data-h2-margin="base(x1, 0, 0, 0)"';
      if (index === 0) {
        margin = '';
      }
      let output = String.raw`
        <div ${margin} data-h2-display="base(grid)" data-h2-grid-template-columns="base(100%) desktop(repeat(2, minmax(0, 1fr)))" data-h2-gap="base(x1) desktop(x3)">
      `;
      let content = [];
      let example = [];
      item.items.forEach((subitem, index) => {
        if (
          subitem.type === 'title' ||
          subitem.type === 'copy' ||
          subitem.type === 'list' ||
          subitem.type === 'rhythm-clear'
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
        } else if (item.type === 'rhythm-clear') {
          output = output + render_rhythm_clear(item, index);
        }
      });
      output = output + String.raw`</div>`;
      output = output + String.raw`<div>`;
      example.forEach((item, index) => {
        if (item.type === 'code') {
          output = output + render_code(item, index);
        } else if (item.type === 'embed') {
          output = output + render_embed(item, index);
        } else if (item.type === 'rhythm') {
          output = output + render_rhythm(item, index);
        }
      });
      output = output + String.raw`</div>`;
      output = output + String.raw`</div>`;
      return output;
    }
    function render_split(item, index) {
      let margin = 'data-h2-margin="base(x1, 0, 0, 0)"';
      if (index === 0) {
        margin = '';
      }
      let output = String.raw`
        <div 
          ${margin} 
          data-h2-display="base(grid)" 
          data-h2-grid-template-columns="
            base(100%) 
            desktop(repeat(2, minmax(0, 1fr)))" 
          data-h2-gap="base(x1) desktop(x3)">
      `;
      let item1 = String.raw`<div>`;
      item.first.items.forEach((e) => {
        if (e.type === 'copy') {
          item1 = item1 + render_copy(e, index);
        } else if (e.type === 'list') {
          item1 = item1 + render_list(e, index);
        } else if (e.type === 'code') {
          item1 = item1 + render_code(e, index);
        }
      });
      item1 = item1 + String.raw`</div>`;
      let item2 = String.raw`<div>`;
      item.second.items.forEach((e) => {
        if (e.type === 'copy') {
          item2 = item2 + render_copy(e, index);
        } else if (e.type === 'list') {
          item2 = item2 + render_list(e, index);
        } else if (e.type === 'code') {
          item2 = item2 + render_code(e, index);
        }
      });
      item2 = item2 + String.raw`</div>`;
      output =
        output +
        String.raw`
          ${item1}
          ${item2}
        </div>
      `;
      return output;
    }
    function render_featured(item, index) {
      return docs_release_featured.render(data);
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
        } else if (item.type === 'expansion') {
          output = output + render_expansion(item, index);
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
        } else if (item.type === 'expansion') {
          output = output + render_expansion(item, index);
        } else if (item.type === 'section') {
          output = output + render_subsubsection(item, index);
        }
      });
      return output;
    }
    function render_subsubsection(section, index) {
      let output = ``;
      section.content.forEach((item, index) => {
        if (item.type === 'title') {
          output = output + render_title(item, index, 'h6');
        } else if (item.type === 'copy') {
          output = output + render_copy(item, index);
        } else if (item.type === 'list') {
          output = output + render_list(item, index);
        } else if (item.type === 'code') {
          output = output + render_code(item, index);
        } else if (item.type === 'group') {
          output = output + render_group(item, index, 'h6');
        } else if (item.type === 'expansion') {
          output = output + render_expansion(item, index);
        }
      });
      return output;
    }
    function render_expansion(item, index) {
      let margin =
        'data-h2-margin="base(x1, 0, 0, x.5) p-tablet(x1, 0, 0, x1)"';
      if (index === 0) {
        margin = 'data-h2-margin="base(0, 0, 0, x.5) p-tablet(0, 0, 0, x1)"';
      }
      let output = String.raw`
        <div ${margin}>
      `;
      let label = heading.render(data, {
        tag: 'h6',
        size: 'h6',
        label: item.label,
        id: item.id,
        alignment: 'left',
      });
      let content = String.raw`
        <div data-h2-margin="base(x1, 0, 0, 0)">
      `;
      item.items.forEach((item, index) => {
        if (item.type === 'title') {
          content = content + render_title(item, index, 'h5');
        } else if (item.type === 'copy') {
          content = content + render_copy(item, index);
        } else if (item.type === 'list') {
          content = content + render_list(item, index);
        } else if (item.type === 'code') {
          content = content + render_code(item, index);
        } else if (item.type === 'group') {
          content = content + render_group(item, index, 'h5');
        }
      });
      content = content + `</div>`;
      output =
        output +
        expansion.render(data, {
          state: item.state,
          label: label,
          content: content,
        }) +
        String.raw`</div>`;
      return output;
    }
    function render_overview(item, index) {
      let posts = data.collections[item.collection_id];
      let output = String.raw`
        <div
          data-h2-margin="base(x2, 0, 0, 0)"
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(100%) p-tablet(repeat(2, minmax(0, 1fr)))"
          data-h2-gap="base(x1) p-tablet(x2)">
      `;
      posts.forEach((card) => {
        function get_title() {
          if (card.data.title_long) {
            return card.data.title_long;
          } else {
            return card.data.title;
          }
        }
        output =
          output +
          String.raw`
            <a
              href="${card.url}"
              title=""
              data-h2-display="base(block)"
              data-h2-background="base(foreground)"
              data-h2-radius="base(rounded)"
              data-h2-shadow="base(medium) base:hover(larger)"
              data-h2-transition-property="base(box-shadow, color)"
              data-h2-transition-duration="base(.2s)"
              data-h2-transition-timing-function="base(ease)"
              data-h2-padding="base(x5, x1, x1, x1)"
              data-h2-font-weight="base(700)">
              ${get_title()}
            </a>
          `;
      });
      output = output + String.raw`</div>`;
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
      } else if (item.type === 'split') {
        content = content + render_split(item, index);
      } else if (item.type === 'featured') {
        content = content + render_featured(item, index);
      } else if (item.type === 'latest') {
        content = content + render_latest(item, index);
      } else if (item.type === 'history') {
        content = content + render_history(item, index);
      } else if (item.type === 'release-summary') {
        content = content + render_release_summaries(item, index);
      } else if (item.type === 'section') {
        content = content + render_section(item, index);
      } else if (item.type === 'expansion') {
        content = content + render_expansion(item, index);
      } else if (item.type === 'overview') {
        content = content + render_overview(item, index);
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
