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
  let { dateToRfc3339, absoluteUrl } = require('@11ty/eleventy-plugin-rss');
  var escape = require('escape-html');
  let posts = ``;
  let last_updated;
  function post_content(post) {
    let summary = ``;
    if (post.summary) {
      summary = String.raw`<p>${post.summary}</p>`;
    }
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
        <span>Released: ${post.date.toLocaleString('default', {
          month: 'long',
        })} ${post.date.getDate()}, ${post.date.getFullYear()}</span>
      </p>
      <hr>
      ${features}
      ${optimizations}
      ${bugfixes}
    `;
  }
  data.releases.rss.reverse().forEach((post, index) => {
    if (index === 0) {
      last_updated = dateToRfc3339(post.date);
    }
    posts =
      posts +
      String.raw`
      <entry>
        <title>Release ${post.version}</title>
        <link href="${absoluteUrl('en/releases#' + post.version, data.metadata.url)}"/>
        <updated>${dateToRfc3339(post.date)}</updated>
        <id>${absoluteUrl('en/docs/releases#' + post.version, data.metadata.url)}</id>
        <content xml:lang="${data.metadata.language}" type="html">${escape(
        post_content(post)
      )}</content>
      </entry>
    `;
  });
  return String.raw`<?xml version="1.0" encoding="utf-8"?>
    <?xml-stylesheet href="${absoluteUrl('static/css/hydrogen.css', data.metadata.url)}"?>
    <feed xmlns="http://www.w3.org/2005/Atom" xml:base="${data.metadata.url}">
      <title>${data.metadata.title}</title>
      <subtitle>${data.metadata.subtitle}</subtitle>
      <link href="${absoluteUrl(data.metadata.url + data.permalink)}" rel="self"/>
      <link href="${data.metadata.url}"/>
      <updated>${last_updated}</updated>
      <id>${data.metadata.url}</id>
      <author>
        <name>${data.metadata.author.name}</name>
        <email>${data.metadata.author.email}</email>
      </author>
      ${posts}
    </feed>
  `;
}

module.exports = {
  data,
  render,
};
