// Note that some manual work was still required, because prop.syntax.options.values were merged with prop.syntax.options.types

const og = {};

let nw = {
  properties: [],
};

Object.keys(og.properties).forEach(function (prop) {
  console.log();
  let new_group = og.properties[prop].group;
  if (new_group === 'font') {
    new_group = 'typography';
  }
  let new_keys = [];
  Object.keys(og.properties[prop].property_keys).forEach(function (prop_key) {
    new_keys = new_keys.concat({
      name: prop_key,
      instances: [],
    });
  });
  let new_syntax = [];
  Object.keys(og.properties[prop].syntax).forEach(function (syntax) {
    let new_syntax_options = [];
    Object.keys(og.properties[prop].syntax[syntax].options).forEach(function (
      option
    ) {
      let new_tokens = [];
      if (
        og.properties[prop].syntax[syntax].options[option].types.key === true
      ) {
        new_tokens = new_tokens.concat(
          og.properties[prop].syntax[syntax].options[option].values
        );
      }
      let new_css = [];
      if (
        og.properties[prop].syntax[syntax].options[option].types.css === true
      ) {
        new_css = new_css.concat(
          og.properties[prop].syntax[syntax].options[option].values
        );
      }
      new_syntax_options = new_syntax_options.concat({
        value: option,
        required: og.properties[prop].syntax[syntax].options[option].required,
        types: {
          tokens: new_tokens,
          css: new_css,
        },
      });
    });
    new_syntax = new_syntax.concat({
      default: og.properties[prop].syntax[syntax].default,
      options: new_syntax_options,
    });
  });
  let nw_format = {
    id: prop,
    title: {
      en: og.properties[prop].title.en,
      fr: og.properties[prop].title.fr,
    },
    group: new_group,
    keys: new_keys,
    syntaxes: new_syntax,
    incompatibilities: og.properties[prop].incompatibilities,
  };
  nw.properties = nw.properties.concat(nw_format);
});

console.log(nw);
