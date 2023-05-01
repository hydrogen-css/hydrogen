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

const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');
loadLanguages(['powershell', 'json']);

/**
 * Render a heading component
 * @param {object} data 11ty's data
 * @param {object} props
 * @param {boolean} props.copy
 * @param {string} [props.file]
 * @param {number} props.count
 * @param {string[]} props.lines
 * @returns {string} the rendered template
 */
function render(data, props) {
  // Render the header
  function render_header() {
    let location = 'data-h2-location="base(x.5, x.5, auto, auto)"';
    if (props.file) {
      location = 'data-h2-location="base(x.25, x.5, auto, auto)"';
    }
    let output = String.raw`
      <button
        title="${data.site.components.code.copy_button.title[data.locale]}"
        onclick="copy_code(this)"
        data-h2-background-color="base(code.8) base:dark(foreground.8) base:focus-visible(focus)"
        data-h2-border="base(none)"
        data-h2-cursor="base(pointer)"
        data-h2-font-size="base(caption)"
        data-h2-outline="base(none)"
        data-h2-layer="base(2, absolute)"
        data-h2-radius="base(5px)"
        data-h2-height="base(x1.5)"
        data-h2-width="base(x1.5)"
        ${location}>
        <span 
          class="default"
          data-h2-position="base(center)">📋</span>
        <span 
          class="confirmation"
          data-h2-position="base(center)">✅</span>
      </button>
    `;
    if (props.file) {
      output += String.raw`
        <div
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(1fr)"
          data-h2-align-items="base(center)">
          <div>
            <span
              data-h2-color="base:all(white)"
              data-h2-display="base(block)"
              data-h2-padding="base(x.5, x1)"
              data-h2-font-family="base(mono)"
              data-h2-font-size="base(caption)">${props.file}</span>
          </div>
        </div>
        <hr
          data-h2-height="base(1px)"
          data-h2-background-color="base:all(primary.lightest.2)"
          data-h2-margin="base(0)"
          data-h2-border="base(0px solid transparent)" />
      `;
    }
    return output;
  }
  // Generate line count
  let line_html = ``;
  for (let i = 1; i <= props.count; i++) {
    line_html += String.raw`${i}<br>`;
  }
  // Generate displayed and copied code
  let displayed_code_html = ``;
  let copied_code_html = ``;
  if (!props.lines) {
    console.log('lines are missing:', props);
  }
  props.lines.forEach((line) => {
    displayed_code_html +=
      Prism.highlight(line, Prism.languages[props.language], `${props.language}`) + `\r\n`;
    copied_code_html += html(line) + `\r\n`;
  });
  // Return the component
  return String.raw`
    <div
      data-h2-background-color="base(code) base:dark(foreground)"
      data-h2-border="base:all(1px solid primary.lightest.2)"
      data-h2-color="base:all(white)"
      data-h2-radius="base(code)"
      data-h2-position="base(relative)"
      class="code_wrapper">
      ${render_header()}
      <div 
        data-h2-max-height="base(35vh)" 
        data-h2-overflow-y="base(auto)"
        data-h2-outline="base(none)"
        data-h2-border-top="base:focus-visible(x.5 solid focus)"
        data-h2-position="base(relative)">
        <div
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(auto 1fr)">
          <div 
            data-h2-border-right="base:all(1px solid primary.lightest.2)"
            data-h2-padding="base(0, x1, 0, 0)">
            <pre
              data-h2-padding="base(x.75, 0, x.75, x1)"
              data-h2-margin="base(0)"><code data-h2-color="base:all(primary.lighter)" data-h2-font-family="base(mono)" data-h2-font-size="base(caption)" data-h2-display="base(inline-block)" data-h2-text-align="base(right)">${line_html}</code></pre>
          </div>
          <div 
            data-h2-overflow-x="base(auto)"
            data-h2-outline="base(none)"
            data-h2-border-left="base:all(x.5 solid transparent) base:focus-visible(x.5 solid focus)"
            data-h2-padding="base(0, 0, 0, x.5)"
            tabindex="0">
            <pre
              data-h2-padding="base(x.75, x3. x.75, 0)"
              data-h2-margin="base(0)"
              data-h2-display="base(inline-block)"><code data-h2-display="base(inline-block)" data-h2-font-family="base(mono)" data-h2-font-size="base(caption)">${displayed_code_html}</code></pre>
          </div>
        </div>
      </div>
      <textarea 
        class="code_content"
        data-h2-display="base(none)">${copied_code_html}</textarea>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
