# 🌞 Welcome to Hydrogen

## 📑 Table of contents

- [Helpful links](#link-helpful-links)
- [Conventions](#triangular_ruler-conventions)
- [Development guides](#desktop_computer-development-guides)
  - [Understanding Hydrogen's build process](#understanding-hydrogens-build-process)
  - [Custom CSS properties and implementation](#custom-css-properties-and-implementation)
  - [Updating the documentation](#updating-the-documentation)
  - [Writing tests](#writing-tests)

## :link: Helpful links

- [Hydrogen's website](https://hydrogen.design/en)
- [Hydrogen's documentation](https://hydrogen.design/en/docs)
- [Github](https://github.com/hydrogen-css/hydrogen) - Hydrogen's code is stored here
- [Latest package release](https://www.npmjs.com/package/@hydrogen-css/hydrogen/v/latest) - Found on NPM, contains the latest stable code
- [Beta package release](https://www.npmjs.com/package/@hydrogen-css/hydrogen/v/beta) - Found on NPM, contains new and potentially unstable features

## :triangular_ruler: Conventions

### Code conventions

### Submitting bugs

### Submitting a merge request

## :desktop_computer: Development guides

### Understanding Hydrogen's build process

Hydrogen takes the following steps to build its CSS file:

- locate and parse the user's settings
  - validate settings to ensure required fields, option types, and formats
  - grab command line arguments
  - populate and overwrite any build settings
  - create runtime values for themes, config, input/output
- produce a media array from the user's settings with objects that can be populated with CSS in the correct order
- parse input using RegEx for attributes and generate their data using custom JS parsing, including variable creation
- generate core CSS and reset CSS if it was requested
- loop through the properties found
  - create the property's CSS selectors
  - parse the property's individual queries and options
  - replace configured values
  - generate final CSS
  - validate the final CSS output to ensure it's valid
  - add the final, valid CSS to its matching media object in the media array
- loop through each media object in the media array and append its output to the final CSS string
- write a raw CSS file
- process the raw CSS with Autoprefixer and CSSnano if they're enabled
- write a variable export file if it was requested
- write the processed CSS file as hydrogen.css

### Custom CSS properties and implementation

- if the property needs custom scripting, create a script in `lib/scripts/properties/custom`
- add the property to the sorting function in `lib/scripts/properties/sort-custom-properties.js`
- add the new property to the property data model in `lib/data/property-model.js`
- test the property by adding it to the testing UI markup in `tests/basics/input/index.html`
- add tests to the error testing markup in `tests/markup/errors`
- add the new property's syntax to the snippets file in `.vscode/hydrogen.snippets.json`
- add release notes for the property in the changelog

### Updating the documentation

### Writing tests

#### Writing function unit tests

- functions should live in their own file and be paired with a matching `file-name.test.js`
- tests should follow a similar format
- all unit tests should be added to the final `run-all.tests.js` file found in `./tests`
