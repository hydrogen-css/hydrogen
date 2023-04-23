var data = {};

/**
 * Render a heading component
 * @param {Object} data 11ty's data
 * @param {{state: "active" | null, label: string | HTMLElement, content: HTMLElement}} props the components's properties
 * @returns {String} the rendered template
 */
function render(data, props) {
  return String.raw`
    <div 
      class="expand-collapse-wrapper ${props.state}"
      data-h2-margin="base(x.5, 0, 0, 0)"
      data-h2-position="base(relative)"
      data-h2-display="
        base:children[.ec-collapsed-icon](block)
        base:children[.ec-expanded-icon](none)
        base:selectors[.active]:children[.ec-collapsed-icon](none)
        base:selectors[.active]:children[.ec-expanded-icon](block)
        base:children[.expand-collapse-content](none) 
        base:selectors[.active]:children[.expand-collapse-content](block)">
      <button
        data-h2-height="base(x2)"
        data-h2-width="base(x2)"
        data-h2-background-color="base(foreground) base:focus-visible(focus)"
        data-h2-color="
          base:children[span](primary)
          base:all:focus-visible:children[span](black)"
        data-h2-stroke="base:all:focus-visible:children[path](black)"
        data-h2-shadow="base(small) base:hover(large) base:focus-visible(none)"
        data-h2-cursor="base(pointer)"
        data-h2-position="base(absolute)"
        data-h2-radius="base(circle)"
        data-h2-outline="base(none)"
        data-h2-border="
          base(1px solid primary.darkest.2)
          base:children[>div](x.1 solid foreground)
          base:all:focus-visible:children[>div](x.1 solid black)"
        data-h2-transition="base(box-shadow, .2s, ease)"
        data-h2-z-index="base(2)"
        data-h2-location="base(x.6, auto, auto, 0)"
        data-h2-transform="base(translate(-50%, 0))"
        title="Expand or collapse this release."
        onclick="toggle_ec(this)">
        <div
          data-h2-position="base(center)"
          data-h2-height="base(x1.75)"
          data-h2-width="base(x1.75)"
          data-h2-radius="base(circle)"></div>
        <span
          class="ec-collapsed-icon"
          data-h2-position="base(absolute)"
          data-h2-top="base(calc(50% + 1px))"
          data-h2-left="base(50%)"
          data-h2-transform="base(translate(-50%, -50%))"
          data-h2-font-weight="base(600)">
          <svg
            data-h2-display="base(block)"
            data-h2-height="base(x.75)" 
            data-h2-width="base(x.75)" 
            width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 23.1964L32.5 48.6964L58 23.1964" stroke="#9D5CFF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span
          class="ec-expanded-icon"
          data-h2-position="base(absolute)"
          data-h2-top="base(50%)"
          data-h2-left="base(50%)"
          data-h2-transform="base(translate(-50%, -50%))"
          data-h2-font-weight="base(600)">
          <svg
            data-h2-display="base(block)"
            data-h2-height="base(x.75)" 
            data-h2-width="base(x.75)" 
            width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M58 42.2344L32.5 16.7344L7 42.2344" stroke="#9D5CFF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
      <div
        data-h2-background-color="base(foreground)"
        data-h2-padding="base(x1, x1, x1, x1.5) p-tablet(x1, x2)"
        data-h2-border="base(1px solid primary.darkest.20)"
        data-h2-radius="base(rounded)"
        data-h2-flex-grow="base(1)">
        ${props.label}
        <div class="expand-collapse-content">
          ${props.content}
        </div>
      </div>  
    </div>
  `;
}

module.exports = {
  data,
  render,
};
