let data = {
  permalink: 'feed.xml',
  eleventyExcludeFromCollections: true,
  metadata: {
    title: 'Hydrogen releases',
    subtitle: 'Follow along as both stable and beta Hydrogen releases are published to NPM.',
    language: 'en',
    url: 'https://hydrogen.design/',
    author: {
      name: 'Josh Beveridge',
      email: 'hydrogen@joshbeveridge.ca',
    },
  },
};

function render(data) {
  let { absoluteUrl, dateToRfc822 } = require('@11ty/eleventy-plugin-rss');
  var escape = require('escape-html');
  let posts = ``;
  let last_updated;
  function post_content(post) {
    let summary = ``;
    if (post.summary) {
      summary = String.raw`<p>${post.summary}</p>`;
    }
    let release_type = ``;
    if (post.beta) {
      // Beta release
      release_type = 'Beta release';
    } else if (post.minor === '0' && post.patch === '0') {
      // Major release
      release_type = 'Major release';
    } else if (post.patch === '0') {
      // Minor release
      release_type = 'Minor release';
    } else {
      // Patch release
      release_type = 'Patch release';
    }
    // Create the breaking chip
    let breaking_chip = ``;
    let breaking_chip_template = String.raw`
      <span>• 🚨 Breaking</span>
    `;
    function content_type(post, type) {
      let content = ``;
      if (post[type] && post[type].length > 0) {
        if (type === 'features') {
          content = content + `<h2>✨ New features (${post[type].length})</h2><ul>`;
        } else if (type === 'optimizations') {
          content = content + `<h2>🛠️ Optimizations (${post[type].length})</h2><ul>`;
        } else if (type === 'bugfixes') {
          content = content + `<h2>🪲 Bugfixes (${post[type].length})</h2><ul>`;
        }
        post[type].forEach((item) => {
          // Check to see if the change is breaking and set the breaking flag
          if (item.breaking) {
            breaking_chip = breaking_chip_template;
          }
          // Build the change content
          if (Array.isArray(item.changes[data.metadata.language])) {
            content = content + String.raw`<li>`;
            if (item.changes[data.metadata.language].length > 1) {
              item.changes[data.metadata.language].forEach((change, index) => {
                if (index === 0) {
                  content = content + String.raw`${change}<ul>`;
                } else if (index === item.changes[data.metadata.language].length - 1) {
                  content = content + String.raw`<li>${change}</li></ul>`;
                } else {
                  content = content + String.raw`<li>${change}</li>`;
                }
              });
            } else {
              item.changes[data.metadata.language].forEach((change, index) => {
                content = content + String.raw`${change}`;
              });
            }
            content = content + String.raw`</li>`;
          } else {
            content =
              content +
              String.raw`
                <li>${item.changes[data.metadata.language]}</li>
              `;
          }
        });
        content = content + `</ul>`;
      }
      return content;
    }
    let features = content_type(post, 'features');
    let optimizations = content_type(post, 'optimizations');
    let bugfixes = content_type(post, 'bugfixes');
    return String.raw`
      ${summary}
      <p>
        <span>${release_type} • </span>
        <span>Released: ${post.date.toLocaleString('default', {
          month: 'long',
        })} ${post.date.getDate()}, ${post.date.getFullYear()}</span>
        ${breaking_chip}
      </p>
      <hr>
      ${features}
      ${optimizations}
      ${bugfixes}
    `;
  }
  data.releases.rss.reverse().forEach((post, index) => {
    if (index === 0) {
      last_updated = dateToRfc822(post.date);
    }
    posts =
      posts +
      String.raw`
      <item>
        <title>Release ${post.version}</title>
        <link>${absoluteUrl('en/releases#' + post.version, data.metadata.url)}</link>
        <description>${escape(post_content(post))}</description>
        <pubDate>${dateToRfc822(post.date)}</pubDate>
        <dc:creator>${data.metadata.author.name}</dc:creator>
        <guid>${absoluteUrl('en/releases#' + post.version, data.metadata.url)}</guid>
      </item>
    `;
  });
  return String.raw`<?xml version="1.0" encoding="utf-8"?>
    <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xml:base="${
      data.metadata.url
    }" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${data.metadata.title}</title>
        <link>${data.metadata.url}</link>
        <atom:link href="${absoluteUrl(
          data.metadata.url + data.permalink
        )}" rel="self" type="application/rss+xml" />
        <description>${data.metadata.subtitle}</description>
        <language>${data.metadata.language}</language>
        <image>
          <url>${data.site.base_url}/static/img/social-hydrogen.png</url>
          <title>The Hydrogen logo</title>
          <link>${data.site.base_url}/en</link>
        </image>
        ${posts}
      </channel>
    </rss>
  `;
}

module.exports = {
  data,
  render,
};
