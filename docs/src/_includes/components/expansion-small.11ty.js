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
  // Render label
  function render_label() {
    if (props.link) {
      return String.raw`
        <a 
          href="${props.link.url}"
          title=""
          data-h2-text-align="base(left)">
          ${props.link.label}
        </a>
      `;
    } else {
      return String.raw`
        <p 
          data-h2-text-align="base(left)">
          ${props.label}
        </p>
      `;
    }
  }
  return String.raw`
    <div 
      class="${state_class}" 
      data-h2-position="base(relative)"
      data-h2-display="
        base:children[>div >button .ec-collapsed-icon](block)
        base:children[>div >button .ec-expanded-icon](none)
        base:selectors[.active]:children[>div >button .ec-collapsed-icon](none)
        base:selectors[.active]:children[>div >button .ec-expanded-icon](block)
        base:children[>.expand-collapse-content](none) 
        base:selectors[.active]:children[>.expand-collapse-content](block)">
      <div
        data-h2-display="base(flex)" 
        data-h2-gap="base(x.25)"
        data-h2-align-items="base(center)">
        <button
          data-h2-background="base(transparent) base:focus-visible(focus)"
          data-h2-color="base:all:focus-visible(black)"
          data-h2-stroke="base:all:focus-visible:children[svg, path](black)"
          data-h2-cursor="base(pointer)"
          data-h2-height="base(x.75)"
          data-h2-width="base(x.75)" 
          data-h2-border="base(none)"
          data-h2-outline="base(none)"
          data-h2-padding="base(0)"
          data-h2-position="base(relative)"
          onclick="toggle_ec(this)">
          <span
            class="ec-collapsed-icon"
            data-h2-position="base(center)"
            data-h2-font-weight="base(600)"
            data-h2-stroke="base:children[path](primary.dark)">
            <svg
              data-h2-display="base(block)"
              data-h2-height="base(x.4)" 
              data-h2-width="base(x.4)" 
              width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 23.1964L32.5 48.6964L58 23.1964" stroke="#9D5CFF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span
            class="ec-expanded-icon"
            data-h2-position="base(center)"
            data-h2-font-weight="base(600)"
            data-h2-stroke="base:children[path](primary.dark)">
            <svg
              data-h2-display="base(block)"
              data-h2-height="base(x.4)" 
              data-h2-width="base(x.4)" 
              width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M58 42.2344L32.5 16.7344L7 42.2344" stroke="#9D5CFF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
        ${render_label()}
      </div>
      <div class="expand-collapse-content">
        ${props.content}
      </div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
