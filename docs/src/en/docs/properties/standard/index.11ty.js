const { get_css_property_data } = require('@hydrogen-css/hydrogen/lib/data/css-property-data');

let prop_data = get_css_property_data();
let custom_props = prop_data.properties.custom_identifiers;
let color_props = prop_data.properties.color.filter((item) => {
  return custom_props.indexOf(item) === -1;
});
let family_props = prop_data.properties['font-family'].filter((item) => {
  return custom_props.indexOf(item) === -1;
});
let weight_props = prop_data.properties['font-weight'].filter((item) => {
  return custom_props.indexOf(item) === -1;
});
let gradient_props = prop_data.properties.gradient.filter((item) => {
  return custom_props.indexOf(item) === -1;
});
let radius_props = prop_data.properties.radius.filter((item) => {
  return custom_props.indexOf(item) === -1;
});
let shadow_props = prop_data.properties.shadow.filter((item) => {
  return custom_props.indexOf(item) === -1;
});
let space_props = prop_data.properties.space.filter((item) => {
  return custom_props.indexOf(item) === -1;
});
let transition_props = prop_data.properties.transition.filter((item) => {
  return custom_props.indexOf(item) === -1;
});

let data = {
  layout: 'docs.11ty.js',
  navigation: {
    order: 16,
    key: 'standard-properties',
    parent: 'properties',
    pagination: true,
  },
  terms: [
    'property',
    'properties',
    'custom',
    'supports',
    'colors',
    'colours',
    'gradients',
    'radius',
    'radii',
    'borders',
    'space',
    'multipliers',
    'boxes',
    'shadows',
    'transitions',
  ],
  title: 'Standard properties',
  subtitle: "A list of CSS properties supported by Hydrogen's syntax.",
  main: [
    {
      type: 'title',
      label: 'CSS property support',
      id: 'support',
    },
    {
      type: 'copy',
      items: [
        "<strong>Hydrogen supports all available CSS properties as attributes</strong>, assuming you pass their queries standard CSS syntax. This page outlines which properties support the use of keys configured in your settings. If a property is missing from this page, it doesn't mean you can't use it, just that it isn't (yet) supported for configured values.",
      ],
    },
    {
      type: 'title',
      label: 'Color support',
      id: 'color',
    },
    {
      type: 'copy',
      items: [
        "The following properties support colors configured in your settings file. You can learn about <a href='/en/docs/configuration/creating-themes/#colors' title='Find out how to configure color settings.'>configuring custom colors in the configuration section</a> and you can learn more about <a href='/en/docs/styling/colors' title='Learn more about styling with colors.'>using configured colors in the styling section</a>.",
      ],
    },
    {
      type: 'list',
      style: 'grid',
      items: color_props,
    },
    {
      type: 'title',
      label: 'Font family support',
      id: 'font-family',
    },
    {
      type: 'copy',
      items: [
        "The following properties support font families configured in your settings file. You can learn about <a href='/en/docs/configuration/creating-themes/#fonts' title='Find out how to configure font family settings.'>configuring custom font families in the configuration section</a>.",
      ],
    },
    {
      type: 'list',
      style: 'grid',
      items: family_props,
    },
    {
      type: 'title',
      label: 'Font weight support',
      id: 'font-weight',
    },
    {
      type: 'copy',
      items: [
        "The following properties support font weights configured in your settings file. You can learn about <a href='/en/docs/configuration/creating-themes/#weights' title='Find out how to configure font weight settings.'>configuring custom font weights in the configuration section</a>.",
      ],
    },
    {
      type: 'list',
      style: 'grid',
      items: weight_props,
    },
    {
      type: 'title',
      label: 'Gradient support',
      id: 'gradient',
    },
    {
      type: 'copy',
      items: [
        "The following properties support gradients configured in your settings file. You can learn about <a href='/en/docs/configuration/creating-themes/#gradients' title='Find out how to configure gradient settings.'>configuring custom gradients in the configuration section</a> in the styling section</a>.",
      ],
    },
    {
      type: 'list',
      style: 'grid',
      items: gradient_props,
    },
    {
      type: 'title',
      label: 'Radius support',
      id: 'radius',
    },
    {
      type: 'copy',
      items: [
        "The following properties support radii configured in your settings file. You can learn about <a href='/en/docs/configuration/creating-themes/#radii' title='Find out how to configure radius settings.'>configuring custom radii in the configuration section</a> in the styling section</a>.",
      ],
    },
    {
      type: 'list',
      style: 'grid',
      items: radius_props,
    },
    {
      type: 'title',
      label: 'Shadow support',
      id: 'shadow',
    },
    {
      type: 'copy',
      items: [
        "The following properties support shadows configured in your settings file. You can learn about <a href='/en/docs/configuration/creating-themes/#shadows' title='Find out how to configure shadow settings.'>configuring custom shadows in the configuration section</a> in the styling section</a>.",
      ],
    },
    {
      type: 'list',
      style: 'grid',
      items: shadow_props,
    },
    {
      type: 'title',
      label: 'Space support',
      id: 'space',
    },
    {
      type: 'copy',
      items: [
        "The following properties support Hydrogen space multipliers. You can learn about <a href='/en/docs/styling/layout' title='Learn about how space multipliers work.'>using space multipliers</a> in the styling section</a>.",
      ],
    },
    {
      type: 'list',
      style: 'grid',
      items: space_props,
    },
    {
      type: 'title',
      label: 'Transition support',
      id: 'transition',
    },
    {
      type: 'copy',
      items: [
        "The following properties support transition values configured in your settings file. You can learn about <a href='/en/docs/configuration/creating-themes/#transitions' title='Find out how to configure transition settings.'>configuring custom transition values in the configuration section</a> in the styling section</a>.",
      ],
    },
    {
      type: 'list',
      style: 'grid',
      items: transition_props,
    },
  ],
};

function render(data) {
  return data;
}

module.exports = {
  data,
  render,
};
