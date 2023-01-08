var data = {};

/**
 * Render a heading component
 * @param {Object} data 11ty's data
 * @param {{state: boolean, label: string, content: HTMLElement}} props the components's properties
 * @returns {String} the rendered template
 */
function render(data, props) {
  // Check for state
  let state_class = 'expand-collapse-wrapper';
  let state_string = '';
  if (props.state) {
    state_class = 'expand-collapse-wrapper active';
    state_string = props.state + '-';
  }
  return String.raw`
    <div 
      class="${state_class}" 
      data-h2-position="base(relative)"
      data-h2-display="
        base:children[>button .ec-collapsed-icon](block)
        base:children[>button .ec-expanded-icon](none)
        base:selectors[.active]:children[>button .ec-collapsed-icon](none)
        base:selectors[.active]:children[>button .ec-expanded-icon](block)
        base:children[>.expand-collapse-content](none) 
        base:selectors[.active]:children[>.expand-collapse-content](block)">
      <button
        data-h2-cursor="base(pointer)"
        data-h2-display="base(block)"
        data-h2-width="base(100%)"
        data-h2-border="base(none)"
        data-h2-background="base(transparent)"
        data-h2-padding="base(0)"
        onclick="toggle_ec(this)">
        <div 
          data-h2-display="base(grid)" 
          data-h2-gap="base(x.25)" 
          data-h2-grid-template-columns="base(x1 1fr)">
          <div data-h2-position="base(relative)">
            <span
              class="ec-collapsed-icon"
              data-h2-position="base(center)"
              data-h2-font-weight="base(600)">
              <svg
                data-h2-display="base(block)"
                data-h2-height="base(x.5)" 
                data-h2-width="base(x.5)" 
                width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 23.1964L32.5 48.6964L58 23.1964" stroke="#9D5CFF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span
              class="ec-expanded-icon"
              data-h2-position="base(center)"
              data-h2-font-weight="base(600)">
              <svg
                data-h2-display="base(block)"
                data-h2-height="base(x.5)" 
                data-h2-width="base(x.5)" 
                width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M58 42.2344L32.5 16.7344L7 42.2344" stroke="#9D5CFF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          <p 
            data-h2-text-align="base(left)"
            data-h2-text-decoration="base(underline)"
            data-h2-color="base(font.dark) base:dark(font.light)">${props.label}</p>
        </div>
      </button>
      <div class="expand-collapse-content" data-h2-margin-left="base(x.25)">
        ${props.content}
      </div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
