var data = {};

function generate_home_nav(data) {
  let item_list = ``;
  data.home_nav.forEach((item, index) => {
    let item_style =
      'data-h2-color="base:hover(primary) base:all:focus-visible(black)"';
    if (item.label === 'Home') {
      item_style = 'data-h2-font-weight="base(800)"';
      item_style = item_style + ' data-h2-text-decoration="base(none)"';
      item_style =
        item_style +
        ' data-h2-color="base(primary.dark) base:all:focus-visible(black) base:hover(primary)"';
    }
    item_list =
      item_list +
      String.raw`
      <li>
        <a 
          href="${item.path}"
          title="${item.title}"
          data-h2-background-color="base:focus-visible(focus)"
          data-h2-outline="base(none)"
          ${item_style}>${item.label}</a>
      </li>
      `;
  });
  return item_list;
}

function generate_crumbs(data) {
  let collection = data.collections[data.locale + '_site'];
  let crumbs = ``;
  let current_page = true;
  let separator = '';
  let active_key = data.navigation.key;
  let root = false;
  do {
    collection.forEach((post) => {
      if (
        post.data.locale === data.locale &&
        post.data.navigation.key === active_key
      ) {
        if (!current_page) {
          separator = String.raw`
            <span data-h2-margin="base(0, 0, 0, x.5)" data-h2-display="base(inline-block)">/</span>
          `;
          crumbs =
            String.raw`
              <li>
                <a
                  href="${post.url}"
                  title=""
                  data-h2-background-color="base:focus-visible(focus)"
                  data-h2-outline="base(none)"
                  data-h2-color="base:hover(primary) base:all:focus-visible(black)">${post.data.title}</a>${separator}
              </li>
            ` + crumbs;
        } else {
          crumbs =
            String.raw`
              <li>
                <a 
                  href="${post.url}" 
                  title="" 
                  data-h2-background-color="base:focus-visible(focus)" 
                  data-h2-color="base(primary.dark) base:hover(primary) base:all:focus-visible(black)" 
                  data-h2-text-decoration="base(none)" 
                  data-h2-outline="base(none)" 
                  data-h2-font-weight="base(800)">${post.data.title}</a>
              </li>
            ` + crumbs;
        }
        if (post.data.navigation.parent) {
          active_key = post.data.navigation.parent;
        } else {
          root = true;
        }
        current_page = false;
      }
    });
  } while (!root);
  return crumbs;
}

function render(data) {
  let theme_switcher = require('../components/theme-switcher.11ty');
  let container =
    'data-h2-container="base(center, large, x1) p-tablet(center, large, x2) l-tablet(center, large, x3)"';
  let nav_id = '';
  let nav_items = '';
  let gap = 'data-h2-gap="base(x1)"';
  if (data.navigation.key === 'home') {
    container =
      'data-h2-container="base(center, medium, x1) p-tablet(center, medium, x2) l-tablet(center, medium, x3)"';
    nav_id = 'nav';
    nav_items = generate_home_nav(data);
  } else {
    nav_items = generate_crumbs(data);
    gap = 'data-h2-gap="base(x.5)"';
  }
  // Generate language toggle
  // let lang_toggle = ``;
  // data.site.languages.forEach(function (item, index) {
  //   let translated_path = '/' + item.code + '/';
  //   data.collections.all.forEach(function (collection, c_index) {
  //     if (
  //       collection.data.locale === item.code &&
  //       collection.data.navigation.key === data.navigation.key
  //     ) {
  //       translated_path = collection.url;
  //     }
  //   });
  //   if (data.locale != item.code) {
  //     lang_toggle =
  //       lang_toggle +
  //       String.raw`
  //       <li>
  //         <a
  //           href="${translated_path}"
  //           title="${
  //             data.site.components.breadcrumbs.language_toggle.title[
  //               data.locale
  //             ]
  //           }"
  //           data-h2-background-color="base:focus-visible(focus)"
  //           data-h2-outline="base(none)"
  //           data-h2-color="base:hover(primary) base:all:focus-visible(black)">${
  //             item.label
  //           }</a>
  //       </li>
  //     `;
  //   }
  // });
  return String.raw`
    <div
      data-h2-background-color="base(background)"
      data-h2-border-bottom="base(1px solid primary.darkest.20)"
      data-h2-padding="base(x1, 0) l-tablet(x.5, 0)"
      data-h2-layer="base(3, relative)">
      <div ${container}>
        <div
          data-h2-display="base(grid)"
          data-h2-grid-template-columns="base(1fr) l-tablet(1fr 1fr)"
          data-h2-gap="base(x1)"
          data-h2-align-items="base(center)"
          data-h2-padding="base:children[ul](0)"
          data-h2-list-style="base:children[ul](none)">
          <div
            data-h2-visually-hidden="base(hidden) l-tablet(visible)" 
            data-h2-text-align="base(center) l-tablet(left)">
            <ul
              id="${nav_id}"
              data-h2-display="base(flex)"
              data-h2-align-items="base(center)"
              data-h2-justify-content="base(center) l-tablet(flex-start)"
              ${gap}>
              ${nav_items}
            </ul>
          </div>
          <div>
            <ul 
              data-h2-display="base(flex)"
              data-h2-align-items="base(center)"
              data-h2-justify-content="base(center) l-tablet(flex-end)"
              data-h2-gap="base(x1)">
              <li>
                <span>version <a 
                  data-h2-font-weight="base(800)" 
                  data-h2-color="base(primary.dark) base:all:focus-visible(black)"
                  href="/${data.locale}/docs/releases">
                  ${data.releases.latest.version}</a>
                </span>
              </li>
              <li data-h2-vertical-align="base(middle)">
                ${theme_switcher.render(data)}
              </li>
              <li>
              <span 
                title="French translations for Hydrogen's documentation are coming soon."
                data-h2-text-decoration="base(underline)"
                h2 data-h2-cursor="base(pointer)"
                data-h2-color="base(black.70)">FR</span>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

module.exports = {
  data,
  render,
};
