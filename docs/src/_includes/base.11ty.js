const mobile_menu = require('./patterns/menu-mobile.11ty');

var data = {};

function render(data) {
  const skip_to_content = data.site.components.skip_to_content;
  const skip_to_nav = data.site.components.skip_to_nav;
  return String.raw`
    <!DOCTYPE html>
    <html lang="${data.locale}" data-h2='' style="scroll-behavior: smooth;">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- SEO meta -->
        <title>${data.title} · ${data.site.name}</title>
        <meta name="description" content="${
          data.site.description[data.locale]
        }"/>
        <!-- 11ty -->
        <meta name="generator" content="Eleventy">
        <!-- Favicons -->
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9d5cff">
        <meta name="msapplication-TileColor" content="#9d5cff">
        <meta name="theme-color" content="#9d5cff">
        <!-- Open graph image settings -->
        <meta property="og:image" content="/static/img/social-hydrogen.png">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:width" content="1201">
        <meta property="og:image:height" content="628">
        <!-- Local styles -->
        <link rel="stylesheet" type="text/css" href="/static/css/hydrogen.css"/>
        <link rel="stylesheet" type="text/css" href="/static/css/app.css"/>
        <!-- Google fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      </head>
      <body 
        data-h2-background-color="
          base(background) 
          base:children[p code, li code](black.10)
          base:all:children[a:focus-visible](focus)"
        data-h2-color="
          base(font) 
          base:children[p code, li code](font) 
          base:children[h1, h2, h3, h4, h5, h6](black)
          base:all:children[a:hover](primary)
          base:all:children[a:focus-visible](black)"
        data-h2-overflow="base:selectors[.locked](hidden)"
        data-h2-outline="base:children[a:focus-visible](none)"
        data-h2-font-size="base:children[p code, li code](caption)"
        data-h2-display="base:children[p code, li code](inline-block)"
        data-h2-padding="base:children[p code, li code](0, x.25)"
        class="test-font"
        data-h2-font-family="base(sans)">
        <a
          href="#nav"
          title=${skip_to_nav.title[data.locale]}
          style="outline: none;"
          data-h2-display="base(none) l-tablet(block)"
          data-h2-background-color="base(primary.darker) base:focus-visible(focus)"
          data-h2-color="base(white) base:all:focus-visible(black)"
          data-h2-text-align="base(center)"
          data-h2-padding="base(x1)"
          data-h2-font-weight="base(700)"
          data-h2-visually-hidden="base(invisible) base:focus-visible(visible)">
          ${skip_to_nav.label[data.locale]}
        </a>
        <a
          href="#main"
          title=${skip_to_content.title[data.locale]}
          style="outline: none;"
          data-h2-display="base(block)"
          data-h2-background-color="base(primary.darker) base:focus-visible(focus)"
          data-h2-color="base(white) base:all:focus-visible(black)"
          data-h2-text-align="base(center)"
          data-h2-padding="base(x1)"
          data-h2-font-weight="base(700)"
          data-h2-visually-hidden="base(invisible) base:focus-visible(visible)">
          ${skip_to_content.label[data.locale]}
        </a>
        <div
          class="mobile-menu-backdrop"
          data-h2-background="base:all(black)"
          data-h2-position="base(fixed)"
          data-h2-height="base(100%)"
          data-h2-width="base(100%)"
          data-h2-opacity="base(0%) base:selectors[.active](95%)"
          data-h2-transform="base(translate(-100%, -100%)) base:selectors[.active](translate(0px, 0px))"
          data-h2-transition="base(transform 0s ease .3s, opacity .1s linear .2s) base:selectors[.active](opacity .1s linear)"
          data-h2-z-index="base(90)"
          data-h2-overflow="base(hidden)">
          <div 
            data-h2-background="base(accentRadial)"
            data-h2-position="base(absolute)"
            data-h2-height="base(300%)"
            data-h2-width="base(200%)"
            data-h2-opacity="base(20%)"
            data-h2-location="base(-150%, auto, auto, -100%)"></div>
          <div 
            data-h2-background="base(primaryRadial)"
            data-h2-position="base(absolute)"
            data-h2-height="base(300%)"
            data-h2-width="base(200%)"
            data-h2-opacity="base(20%)"
            data-h2-location="base(auto, -100%, -150%, auto)"></div>
        </div>
        ${mobile_menu.render(data)}
        ${data.content}
        <!-- Local scripts -->
        <script src="/static/js/app.js"></script>
      </body>
    </html>
  `;
}

module.exports = {
  data,
  render,
};
