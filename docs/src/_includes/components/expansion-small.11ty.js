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
  // Check for active state
  let active_state = '';
  if (props.active) {
    active_state = `
      data-h2-font-weight="base(700)"
      data-h2-color="base(black) base:focus-visible(black)"
      data-h2-text-decoration="base(none)"
    `;
  }
  // Render label
  function render_label() {
    if (props.link) {
      return String.raw`
        <a 
          href="${props.link.url}"
          title=""
          data-h2-text-align="base(left)"
          ${active_state}>
          ${props.link.label}
        </a>
      `;
    } else {
      return String.raw`
        <p 
          data-h2-text-align="base(left)"
          ${active_state}>
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
      <div data-h2-position="base(relative)">
        <button
          data-h2-background="base(transparent) base:focus-visible(focus)"
          data-h2-color="base:all:focus-visible(black)"
          data-h2-stroke="base:all:focus-visible:children[svg, path](black)"
          data-h2-cursor="base(pointer)"
          data-h2-height="base(x1)"
          data-h2-width="base(x1)" 
          data-h2-border="base(none)"
          data-h2-outline="base(none)"
          data-h2-padding="base(0)"
          data-h2-position="base(absolute)"
          data-h2-top="base(0)"
          data-h2-left="base(-x.75)"
          data-h2-transform="base(translate(-50%, 0))"
          onclick="toggle_ec(this)">
          <span
            class="ec-collapsed-icon"
            data-h2-position="base(center)"
            data-h2-font-weight="base(600)"
            data-h2-stroke="base:children[path](primary.dark)">
            <svg
              data-h2-display="base(block)"
              data-h2-height="base(x.5)" 
              data-h2-width="base(x.5)" 
              data-h2-transform="base(rotate(-90deg))"
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
              data-h2-height="base(x.5)" 
              data-h2-width="base(x.5)" 
              width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 23.1964L32.5 48.6964L58 23.1964" stroke="#9D5CFF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
        ${render_label()}
      </div>
      <div 
        class="expand-collapse-content"
        data-h2-position="base(relative) base:selectors[::before](absolute)"
        data-h2-left="base:selectors[::before](calc(-x.75 - 1px))"
        data-h2-background="base:selectors[::before](primary.darkest.2)"
        data-h2-content="base:selectors[::before](' ')"
        data-h2-height="base:selectors[::before](100%)"
        data-h2-width="base:selectors[::before](1px)"
        >
        ${props.content}
      </div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
