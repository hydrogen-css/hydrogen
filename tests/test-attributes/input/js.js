const test = {
  // prettier-ignore
  'data-h2-background-color': 'base(primary) p-tablet(blue)',
  // prettier-ignore
  'data-h2-background-color':'base(green)p-tablet(cyan)',
  'data-h2-background-color':
    'base(black) base:dark(white) base:children[>div](red) p-tablet(black)',
};

const jsx = {
  'data-h2-background-color': `
    base(magenta)
    base:dark(lime)
  `,
};
