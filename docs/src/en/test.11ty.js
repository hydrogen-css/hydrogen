const site = require('../_data/site');

class Test {
  // or `async data() {`
  // or `get data() {`
  data() {
    return {
      // name: 'Ted',
      layout: 'base.11ty.js',
      // … other front matter keys
    };
  }

  render({ layout }) {
    // will always be "Ted"
    return `
      <p>${site.name}</p>
    `;
  }
}

module.exports = Test;
