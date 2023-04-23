// Local dependencies

// Create component-specific data
var data = {};

var util = (function () {
  // Thanks to Andrea Giammarchi
  var reEscape = /[&<>'"]/g,
    reUnescape = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g,
    oEscape = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    },
    oUnescape = {
      '&amp;': '&',
      '&#38;': '&',
      '&lt;': '<',
      '&#60;': '<',
      '&gt;': '>',
      '&#62;': '>',
      '&apos;': "'",
      '&#39;': "'",
      '&quot;': '"',
      '&#34;': '"',
    },
    fnEscape = function (m) {
      return oEscape[m];
    },
    fnUnescape = function (m) {
      return oUnescape[m];
    },
    replace = String.prototype.replace;
  return (Object.freeze || Object)({
    escape: function escape(s) {
      return replace.call(s, reEscape, fnEscape);
    },
    unescape: function unescape(s) {
      return replace.call(s, reUnescape, fnUnescape);
    },
  });
})();

// Tagged template function
function html(pieces) {
  var result = pieces[0];
  var substitutions = [].slice.call(arguments, 1);
  for (var i = 0; i < substitutions.length; ++i) {
    result += util.escape(substitutions[i]) + pieces[i + 1];
  }

  return result;
}

/**
 * Render a heading component
 * @param {Object} data 11ty's data
 * @param {{copy: boolean, file: String, lines: [String]}} props the components's properties
 * @returns {String} the rendered template
 */
function render(data, props) {
  // Render the header
  function render_header() {
    let output = '';
    let columns = 'data-h2-grid-template-columns="base(1fr)"';
    let copy_button = '';
    if (props.copy) {
      columns = 'data-h2-grid-template-columns="base(1fr auto)"';
      copy_button = String.raw`
        <div>
          <button
            title="${data.site.components.code.copy_button.title[data.locale]}"
            onclick="copy_code(this)"
            data-h2-background-color="base(transparent) base:focus-visible(focus)"
            data-h2-color="base:all(white) base:all:hover(primary.lighter) base:all:focus-visible(black)"
            data-h2-border="base(0px solid transparent)"
            data-h2-border-left="base:all(1px solid white.1)"
            data-h2-cursor="base(pointer)"
            data-h2-padding="base(x.5, x1)"
            data-h2-text-decoration="base(underline)" 
            data-h2-radius="base(0, code, 0, 0)"
            data-h2-font-family="base(sans)"
            data-h2-font-size="base(caption)"
            data-h2-outline="base(none)">
            <span class="default">${data.site.components.code.copy_button.label[data.locale]}</span>
            <span class="confirmation">${
              data.site.components.code.copy_button.label_active[data.locale]
            }</span>
          </button>
        </div>
      `;
    }
    if (props.file) {
      output =
        output +
        String.raw`
          <div
            data-h2-display="base(grid)"
            ${columns}
            data-h2-align-items="base(center)">
            <div>
              <span
                data-h2-color="base:all(white)"
                data-h2-display="base(block)"
                data-h2-padding="base(x.5, x1)">${props.file}</span>
            </div>
            ${copy_button}
          </div>
          <hr
            data-h2-height="base(1px)"
            data-h2-background-color="base:all(white.1)"
            data-h2-margin="base(0)"
            data-h2-border="base(0px solid transparent)" />
        `;
    }
    return output;
  }
  // Generate line count
  // {% set lineCount = 0 %}{% for item in code.lines %}{% set lineCount = lineCount + 1 %}<span data-h2-color="base(code.lighter)">{{ lineCount }}</span><br>{% endfor %}
  let line_count = ``;
  let counter = 0;
  props.lines.forEach(function (item, index) {
    counter = counter + 1;
    line_count = line_count + String.raw`${counter}<br>`;
  });
  // Generate code lines
  // {% for item in code.lines %}{{ item }}<br>{% endfor %}
  let code_lines = '';
  props.lines.forEach(function (item, index) {
    code_lines = code_lines + html`${item}` + `<br>`;
  });
  // Generate copy-safe code lines
  // {% for item in code.lines %}{{ item }}{{ "\r\n" | safe }}{% endfor %}
  let code_lines_safe = ``;
  props.lines.forEach(function (item, index) {
    code_lines_safe = code_lines_safe + html`${item}` + `\r\n`;
  });
  // Return the component
  return String.raw`
    <div
      data-h2-font-family="base(mono)"
      data-h2-background-color="base:all(code)"
      data-h2-border="base:all(1px solid white.1)"
      data-h2-color="base:all(white)"
      data-h2-font-size="base:children[pre, code](caption)"
      data-h2-radius="base(code)"
      class="code_wrapper">
      ${render_header()}
      <div 
        data-h2-max-height="base(35vh)" 
        data-h2-overflow="base(auto)"
        data-h2-outline="base(none)"
        data-h2-border-top="base:focus-visible(x.5 solid focus)">
        <div
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(auto 1fr)"
          data-h2-gap="base(x.35)">
          <div>
            <pre
              data-h2-padding="base(x.75, 0, x.75, x1)"
              data-h2-margin="base(0)"><code data-h2-color="base:all(code.lighter)">${line_count}</code></pre>
          </div>
          <div 
            data-h2-overflow="base(auto, visible)"
            data-h2-outline="base(none)"
            data-h2-border-left="base:focus-visible(x.5 solid focus)"
            data-h2-padding="base(0, 0, 0, x.35)">
            <pre
              data-h2-display="base(block)"
              data-h2-padding="base(x.75, 0)"
              data-h2-margin="base(0)"><code data-h2-display="base(block)" data-h2-padding="base(0, x1, 0, 0)">${code_lines_safe}</code></pre>
          </div>
        </div>
      </div>
      <textarea class="code_content">${code_lines_safe}</textarea>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
