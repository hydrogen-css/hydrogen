var data = {};

function render(data) {
  const skip_to_content = data.site.components.skip_to_content;
  const skip_to_nav = data.site.components.skip_to_nav;
  return String.raw`
    <!DOCTYPE html>
    <html lang="${data.locale}" data-h2>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- SEO meta -->
        <title>${data.title} · ${data.site.name}</title>
        <meta name="description" content="${
          data.site.description[data.locale]
        }"/>
        <!-- Favicons -->
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9d5cff">
        <meta name="msapplication-TileColor" content="#00aba9">
        <meta name="theme-color" content="#212130">
        <!-- Local styles -->
        <link rel="stylesheet" type="text/css" href="/static/css/hydrogen.css"/>
        <link rel="stylesheet" type="text/css" href="/static/css/app.css"/>
        <!-- Google fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      </head>
      <body 
        data-h2-background-color="base(background) base:children[p code, li code](black.10)"
        data-h2-color="base(font) base:children[p code, li code](font)"
        data-h2-font-size="base:children[p code, li code](caption)"
        data-h2-display="base:children[p code, li code](inline-block)"
        data-h2-padding="base:children[p code, li code](0, x.25)"
        class="test-font"
        data-h2-font-family="base(sans)">
        <a
          href="#main"
          title=${skip_to_content.title[data.locale]}
          style="outline: none;"
          data-h2-display="base(block)"
          data-h2-background-color="base(primary.darker) base:focus(focus)"
          data-h2-color="base(white) base:focus(black)"
          data-h2-text-align="base(center)"
          data-h2-padding="base(x1)"
          data-h2-font-weight="base(700)"
          data-h2-visibility="base(hidden) base:focus(visible)">
          ${skip_to_content.label[data.locale]}
        </a>
        <a
          href="#nav"
          title=${skip_to_nav.title[data.locale]}
          style="outline: none;"
          data-h2-display="base(block)"
          data-h2-background-color="base(primary.darker) base:focus(focus)"
          data-h2-color="base(white) base:focus(black)"
          data-h2-text-align="base(center)"
          data-h2-padding="base(x1)"
          data-h2-font-weight="base(700)"
          data-h2-visibility="base(hidden) base:focus(visible)">
          ${skip_to_nav.label[data.locale]}
        </a>
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
