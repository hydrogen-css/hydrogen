# 🌞 Welcome to Hydrogen

## 📑 Table of contents

- [Helpful links](#🔗-helpful-links)
- [Conventions](#📐-conventions)
- [Development guides](#🖥️-development-guides)
  - [Understanding Hydrogen's build process](#understanding-hydrogens-build-process)
  - [CSS properties and implementation](#css-properties-and-implementation)
    - [How to add basic CSS properties](#how-to-add-basic-css-properties)
    - [How to add complex CSS properties](#how-to-add-complex-css-properties)
  - [Updating the documentation](#updating-the-documentation)
  - [Writing tests](#writing-tests)

## 🔗 Helpful links

- [Hydrogen's website](https://hydrogen.design/en)
- [Hydrogen's documentation](https://hydrogen.design/en/docs)
- [Gitlab](https://gitlab.com/hydrogen-css/hydrogen) - Hydrogen's code is stored here
- [Latest package release](https://www.npmjs.com/package/@hydrogen-css/hydrogen/v/latest) - Found on NPM, contains the latest stable code
- [Beta package release](https://www.npmjs.com/package/@hydrogen-css/hydrogen/v/beta) - Found on NPM, contains new and potentially unstable features

## 📐 Conventions

### Code conventions

### Submitting bugs

### Submitting a merge request

## 🖥️ Development guides

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
  - create the property's actual CSS
  - validate the final CSS output to ensure it's valid
  - add the final, valid CSS to its matching media object in the media array
- loop through each media object in the media array and append its output to the final CSS string
- write a raw CSS file
- process the raw CSS with Autoprefixer and CSSnano if they're enabled
- write a variable export file if it was requested
- write the processed CSS file as hydrogen.css

### CSS properties and implementation

- if the property needs custom scripting, create a script in `lib/scripts/properties`
- if necessary, add imports to the build script in `lib/scripts/build-hydrogen.js`
- add the property's scripts to the build in `lib/scripts/build-hydrogen.js`
- add the new property to the property data model in `lib/data/property-model.json`
- test the property by adding it to the testing UI markup in `tests/markup/site`
- if it's a custom property, add tests to the error testing markup in `tests/markup/errors`
- add the new property's syntax to the snippets file in `hydrogen.snippets.json`
- update the project's own local .vscode snippets file in `.vscode/hydrogen.code-snippets`
- add release notes for the property in the changelog

#### How to add basic CSS properties

#### How to add complex CSS properties

### Updating the documentation

### Writing tests

#### Writing function unit tests

- functions should live in their own file and be paired with a matching file-name.test.js
- tests should follow a similar format and return promises where possible
- all unit tests should be added to the final run-all.tests.js file in helpers

#### Manual visual tests

- create a `test-[NAME]` directory
- add an `env` directory with test command shell scripts
- enable permissions on the test shell scripts using `chmod +x ./tests/test-[NAME]/env/[SCRIPT].sh`
- add a `modify-settings.js` file to copy over and modify the default Hydrogen settings based on the needs of the test
- write the success criteria for the test in `test-[NAME]/README.md`
- add the test to `tests/build.sh` and `tests/refresh.sh`
- add test commands to `./package.json`
