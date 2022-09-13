class Base {
  render(data) {
    return `
      <p>${data.layout}</p>
      ${data.content}
    `;
  }
}

module.exports = Base;
