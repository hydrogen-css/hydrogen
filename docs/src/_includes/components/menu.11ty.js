let data = {};

function return_menu_item(label, url, props) {
  function external_data() {
    if (props.external) {
      return 'target="_blank" rel="noreferrer"';
    } else {
      return '';
    }
  }
  function child_data() {
    if (props.children) {
      return props.children;
    } else {
      return '';
    }
  }
  let active_state = '';
  if (props.active) {
    active_state = `
      data-h2-font-weight="base(700)"
      data-h2-color="base(black) base:focus-visible(black)"
      data-h2-text-decoration="base(none)"
    `;
  }
  return String.raw`
    <li data-h2-margin="base(x.5, 0, 0, 0)">
      <div data-h2-position="base(relative)">
        <div 
          data-h2-height="base(x1)" 
          data-h2-width="base(x1)" 
          data-h2-position="base(absolute)"
          data-h2-top="base(0)"
          data-h2-left="base(-x.75)"
          data-h2-transform="base(translate(-50%, 0))">
          <span
            data-h2-font-size="base(1rem)"
            data-h2-color="base(primary.dark)"
            data-h2-position="base(center)">•</span>
        </div>
        <a 
          href="${url}"
          title=""
          ${external_data()}
          ${active_state}>
          ${label}
        </a>
      </div>
      ${child_data()}
    </li>
  `;
}

function create_page_menu(page) {
  let output = ``;
  page.main.forEach((item) => {
    if (item.type === 'title') {
      output =
        output +
        return_menu_item(item.label, page.page.url + '#' + item.id, {
          external: false,
          children: false,
        });
    }
  });
  return output;
}

function parent(url, key) {
  if (url.includes(key)) {
    return true;
  }
  return false;
}

function active(url, key) {
  if (url.endsWith(key + '/')) {
    return true;
  }
  return false;
}

function render(data, context) {
  let locale = [data.locale] + '_site';
  let expansion_small = require('./expansion-small.11ty');
  let getting_started_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'getting-started') {
      getting_started_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let running_commands_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'commands') {
      running_commands_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let installation_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x1)">
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'getting-started'),
          active: active(data.page.url, 'getting-started'),
          label: 'Getting started',
          link: {
            url: '/' + data.locale + '/docs/installation/getting-started',
            label: 'Getting started',
          },
          content: getting_started_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'running-commands'),
          active: active(data.page.url, 'running-commands'),
          label: 'Running commands',
          link: {
            url: '/' + data.locale + '/docs/installation/running-commands',
            label: 'Running commands',
          },
          content: running_commands_content,
        })}
      </li>
    </ul>
  `;
  let core_settings_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'core-settings') {
      core_settings_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let configuring_queries_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'configuring-queries') {
      configuring_queries_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let configuring_modes_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'configuring-modes') {
      configuring_modes_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let creating_themes_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'creating-themes') {
      creating_themes_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let configuration_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x1)">
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'core-settings'),
          active: active(data.page.url, 'core-settings'),
          label: 'Core settings',
          link: {
            url: '/' + data.locale + '/docs/configuration/core-settings',
            label: 'Core settings',
          },
          content: core_settings_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'configuring-queries'),
          active: active(data.page.url, 'configuring-queries'),
          label: 'Configuring media queries',
          link: {
            url: '/' + data.locale + '/docs/configuration/configuring-queries',
            label: 'Configuring media queries',
          },
          content: configuring_queries_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'configuring-modes'),
          active: active(data.page.url, 'configuring-modes'),
          label: 'Configuring dark mode',
          link: {
            url: '/' + data.locale + '/docs/configuration/configuring-modes',
            label: 'Configuring dark mode',
          },
          content: configuring_modes_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'creating-themes'),
          active: active(data.page.url, 'creating-themes'),
          label: 'Creating themes',
          link: {
            url: '/' + data.locale + '/docs/configuration/creating-themes',
            label: 'Creating themes',
          },
          content: creating_themes_content,
        })}
      </li>
    </ul>
  `;
  let syntax_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'syntax') {
      syntax_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let typography_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'typography') {
      typography_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let layout_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'layout') {
      layout_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let colors_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'colors') {
      colors_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let styling_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x1)">
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'syntax'),
          active: active(data.page.url, 'syntax'),
          label: 'Syntax',
          link: {
            url: '/' + data.locale + '/docs/styling/syntax',
            label: 'Syntax',
          },
          content: syntax_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'typography'),
          active: active(data.page.url, 'typography'),
          label: 'Typography',
          link: {
            url: '/' + data.locale + '/docs/styling/typography',
            label: 'Typography',
          },
          content: typography_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'layout'),
          active: active(data.page.url, 'layout'),
          label: 'Layout',
          link: {
            url: '/' + data.locale + '/docs/styling/layout',
            label: 'Layout',
          },
          content: layout_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'colors'),
          active: active(data.page.url, 'colors'),
          label: 'Colors',
          link: {
            url: '/' + data.locale + '/docs/styling/colors',
            label: 'Colors',
          },
          content: colors_content,
        })}
      </li>
    </ul>
  `;
  let standard_properties_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'standard-properties') {
      standard_properties_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let custom_properties_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'hydrogen-properties') {
      custom_properties_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let properties_content = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x1)">
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'standard'),
          active: active(data.page.url, 'standard'),
          label: 'Standard properties',
          link: {
            url: '/' + data.locale + '/docs/properties/standard',
            label: 'Standard properties',
          },
          content: standard_properties_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'hydrogen'),
          active: active(data.page.url, 'hydrogen'),
          label: 'Hydrogen properties',
          link: {
            url: '/' + data.locale + '/docs/properties/hydrogen',
            label: 'Hydrogen properties',
          },
          content: custom_properties_content,
        })}
      </li>
    </ul>
  `;
  let variables_content;
  data.collections[locale].forEach((item) => {
    if (item.data.navigation.key === 'variables') {
      variables_content = String.raw`<ul data-h2-padding-left="base(x1)">${create_page_menu(
        item.data
      )}</ul>`;
    }
  });
  let docs_menu = String.raw`
    <ul data-h2-padding="base(0, 0, 0, x1)">
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'installation'),
          active: active(data.page.url, 'installation'),
          label: 'Installation',
          link: {
            url: '/' + data.locale + '/docs/installation',
            label: 'Installation',
          },
          content: installation_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'configuration'),
          active: active(data.page.url, 'configuration'),
          label: 'Configuration',
          link: {
            url: '/' + data.locale + '/docs/configuration',
            label: 'Configuration',
          },
          content: configuration_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'styling'),
          active: active(data.page.url, 'styling'),
          label: 'Styling',
          link: {
            url: '/' + data.locale + '/docs/styling',
            label: 'Styling',
          },
          content: styling_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'properties'),
          active: active(data.page.url, 'properties'),
          label: 'Properties',
          link: {
            url: '/' + data.locale + '/docs/properties',
            label: 'Properties',
          },
          content: properties_content,
        })}
      </li>
      <li data-h2-margin="base(x.5, 0, 0, 0)">
        ${expansion_small.render(data, {
          state: parent(data.page.url, 'variables'),
          active: active(data.page.url, 'variables'),
          label: 'Variables',
          link: {
            url: '/' + data.locale + '/docs/variables',
            label: 'Variables',
          },
          content: variables_content,
        })}
      </li>
    </ul>
  `;
  let search_content = String.raw`
    <div 
      class="results"
      data-h2-display="base(none) base:selectors[.active](block)"
      data-h2-padding-bottom="base(x1.5)"
      data-h2-border-bottom="base(1px solid primary.darkest.2)">
      <p
        data-h2-font-weight="base(700)"
        data-h2-margin="base(x1.5, 0, x.5, 0)"
        data-h2-color="base(black)">Search results:</p>
      <div 
        class='null-state'
        data-h2-display="base(none) base:selectors[.active](block)">Sorry, there were no matching results.</div>
      <ul data-h2-padding-left="base(x1)">
  `;
  data.collections[locale].forEach((page) => {
    search_content += String.raw`
      <li 
        class="result-item" 
        data-h2-display="base(none) base:selectors[.active](block)"
        data-h2-margin-top="base(x.5)" 
        data-terms=${page.data.terms}>
        <div data-h2-position="base(relative)">
          <div 
            data-h2-height="base(x1)" 
            data-h2-width="base(x1)" 
            data-h2-position="base(absolute)"
            data-h2-top="base(0)"
            data-h2-left="base(-x.75)"
            data-h2-transform="base(translate(-50%, 0))">
            <span
              data-h2-font-size="base(1rem)"
              data-h2-color="base(primary.dark)"
              data-h2-position="base(center)">•</span>
          </div>
          <a
            href=${page.url}
            title=""
            data-h2-text-decoration="base(none)"
            data-h2-color="base:children[span:first-child](black) base:all:children[span:last-child](black.lighter) base:all:focus-visible:children[span](black)">
            <span
              data-h2-display="base(block)" 
              data-h2-text-decoration="base(underline)">${page.data.title}</span>
            <span
              data-h2-display="base(block)"
              data-h2-font-size="base(caption)">${page.data.subtitle}</span>
          </a>
        </div>
      </li>
    `;
  });
  search_content += `</ul></div>`;
  let menu_content = String.raw`
    <div data-h2-margin="base(x1.5, 0, 0, 0)">
      <nav>
        <ul data-h2-padding="base(0, 0, 0, x1)" data-h2-list-style="base(none) base:children[ul](none)">
          <li data-h2-margin="base(x.5, 0, 0, 0)">
            ${expansion_small.render(data, {
              state: true,
              active: active(data.page.url, 'docs'),
              label: 'Documentation',
              link: {
                url: '/' + data.locale + '/docs',
                label: 'Documentation',
              },
              content: docs_menu,
            })}
          </li>
          ${return_menu_item('Releases', '/' + data.locale + '/docs/releases', {
            active: active(data.page.url, 'releases'),
            external: false,
            children: false,
          })}
          ${return_menu_item('Github', 'https://github.com/hydrogen-design-system/hydrogen', {
            external: true,
            children: false,
          })}
        </ul>
      </nav>
    </div>
  `;
  let placeholder = `CTRL + /`;
  if (context === 'mobile') {
    placeholder = 'Find something...';
  }
  return String.raw`
    <h1
      data-h2-font-weight="base(800)"
      data-h2-text-align="base(center)"
      data-h2-margin-bottom="base(x1.5)">
      <a
        href="/${data.locale}"
        title="Return the main home page."
        data-h2-color="base(black) base:hover(primary) base:all:focus-visible(black)"
        data-h2-transition="base:hover(color, .2s, ease, 0s)"
        data-h2-text-decoration="base(none)">
        Hydrogen
      </a>
    </h1>
    <label
      data-h2-display="base(block)"
      data-h2-position="base(relative)">
      <span data-h2-visually-hidden="base(invisible)">Search</span>
      <svg 
        width="68" 
        height="68" 
        viewBox="0 0 68 68" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        data-h2-display="base(block)"
        data-h2-position="base(absolute)"
        data-h2-location="base(50%, auto, auto, x.75)"
        data-h2-transform="base(translate(0, -50%))"
        data-h2-height="base(x.75)"
        data-h2-width="base(x.75)"
        data-h2-color="base:all(black.lightest)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M47.6616 30.5843C47.6616 40.3926 39.7104 48.3438 29.9021 48.3438C20.0938 48.3438 12.1426 40.3926 12.1426 30.5843C12.1426 20.7759 20.0938 12.8247 29.9021 12.8247C39.7104 12.8247 47.6616 20.7759 47.6616 30.5843ZM46.2728 55.4403C41.5765 58.5397 35.95 60.3438 29.9021 60.3438C13.4664 60.3438 0.142578 47.02 0.142578 30.5843C0.142578 14.1485 13.4664 0.824738 29.9021 0.824738C46.3378 0.824738 59.6616 14.1485 59.6616 30.5843C59.6616 36.6322 57.8575 42.2587 54.7581 46.9551L65.3442 57.541C67.6873 59.8842 67.6874 63.6832 65.3442 66.0263C63.0011 68.3695 59.2021 68.3695 56.8589 66.0264L46.2728 55.4403Z" fill="currentColor"/>
      </svg>
      <input 
        class="search"
        type="text" 
        placeholder="${placeholder}"
        data-h2-background-color="base(foreground)"
        data-h2-color="base(font)"
        data-h2-outline="base(none)"
        data-h2-padding="base(x.5 x1 x.5 x2)"
        data-h2-radius="base(rounded)"
        data-h2-border="base(1px solid primary.darkest.5) base:focus-visible(1px solid transparent)"
        data-h2-shadow="base:focus-visible(0 0 0 3px focus)"
        data-h2-width="base(100%)"/>
    </label>
    ${search_content}
    ${menu_content}
  `;
}

module.exports = {
  data,
  render,
};
