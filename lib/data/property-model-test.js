let property_model = require('./property-model');

function property_model_test_data() {
  return JSON.parse(JSON.stringify(property_model));
}

function attribute_test_data() {
  return {
    attribute: 'data-h2-background="base(primary) p-tablet(secondary)"',
    queries: [
      {
        query: 'base(primary)',
        prefix: 'base',
        modifiers: {
          media: 'base',
          theme: 'default',
          mode: 'default',
          state: null,
          selectors: null,
          children: null,
          id: null,
          class: null,
        },
        values: ['primary'],
        selectors: [],
      },
      {
        query: 'p-tablet(secondary)',
        prefix: 'p-tablet',
        modifiers: {
          media: 'p-tablet',
          theme: 'default',
          mode: 'default',
          state: null,
          selectors: null,
          children: null,
          id: null,
          class: null,
        },
        values: ['secondary'],
        selectors: [],
      },
    ],
    files: ['path/to/file'],
  };
}

function query_test_standard_data() {
  return {
    query: 'base(primary)',
    prefix: 'base',
    modifiers: {
      media: 'base',
      theme: 'default',
      mode: 'default',
      state: null,
      selectors: null,
      children: null,
      id: null,
      class: null,
    },
    values: ['primary'],
    selectors: [],
  };
}

function query_test_selectors_data() {
  return {
    query: 'base:selectors[.testClass, #testID](primary)',
    prefix: 'base:selectors[.testClass, #testID]',
    modifiers: {
      media: 'base',
      theme: 'default',
      mode: 'default',
      state: null,
      selectors: ['.testClass', '#testID'],
      children: null,
      id: null,
      class: null,
    },
    values: ['primary'],
    selectors: [],
  };
}

function query_test_children_data() {
  return {
    query: 'base:children[p, >div *](primary)',
    prefix: 'base:children[p, >div *]',
    modifiers: {
      media: 'base',
      theme: 'default',
      mode: 'default',
      state: null,
      selectors: null,
      children: ['p', '>div *'],
      id: null,
      class: null,
    },
    values: ['primary'],
    selectors: [],
  };
}

function query_test_id_data() {
  return {
    query: 'base:id[testID](primary)',
    prefix: 'base:id[testID]',
    modifiers: {
      media: 'base',
      theme: 'default',
      mode: 'default',
      state: null,
      selectors: null,
      children: null,
      id: ['testID'],
      class: null,
    },
    values: ['primary'],
    selectors: [],
  };
}

function query_test_class_data() {
  return {
    query: 'base:class[testClass, testOtherClass](primary)',
    prefix: 'base:class[testClass, testOtherClass]',
    modifiers: {
      media: 'base',
      theme: 'default',
      mode: 'default',
      state: null,
      selectors: null,
      children: null,
      id: null,
      class: ['testClass', 'testOtherClass'],
    },
    values: ['primary'],
    selectors: [],
  };
}

module.exports = {
  property_model_test_data,
  attribute_test_data,
  query_test_standard_data,
  query_test_selectors_data,
  query_test_children_data,
  query_test_id_data,
  query_test_class_data,
};
