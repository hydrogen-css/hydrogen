# 🌞 Welcome to Hydrogen

Hydrogen is an open-source design and CSS utility framework powered by data-attributes.

By parsing the contents of custom `data-h2-` attributes, Hydrogen allows you to style elements completely from your markup. It comes equipped with a comprehensive library of tools and configurations for easy, seamless development. At runtime, it processes your markup and builds a CSS file that contains only the code you've used, preventing duplication and bloat.

[Website](https://hydrogen.design) | [Roadmap](https://workflowy.com/s/hydrogens-roadmap/7Gjmdbjiqc0Wst1R)

## 🛠️ Basic usage

### Installation

- navigate to your project
- run `npm install @hydrogen-css/hydrogen` to install Hydrogen
- run `npx h2-init` to create a configuration file and set up your input/output directories
- modify your `hydrogen.config.json` file to match your theme
- add `data-h2` to your `<html>` element or parent wrapper
- run `npx h2-build` when you're ready to build your CSS or integrate the module into your build tool

### Syntax

Hydrogen uses a custom `data-attribute` syntax:

`data-h2-property="query:modifiers(options)"`

An example of a Hydrogen attribute in use looks something like this:

`data-h2-color="base(primary) base:hover(accent)"`

This repository also contains a handy `hydrogen.snippets.json` file that offers snippet automation for VS Code, enabling auto completion and tab stops so that you don't have to memorize options for every property.

## 🏗️ Configuration

Hydrogen is configured using a `hydrogen.config.json` file located at the root of your project. The `npx h2-init` script is designed to create this file for you and prompts for some required information to get things working.

Within this configuration file, you can modify many of Hydrogen's options to include values that suit your project's needs and theme, including custom media queries, colors, typography, and shadows.

You can learn more about [configuring Hydrogen in the documentation](https://beta.hydrogen.design/en/docs/setup/configuration).

## 🤖 Features

### Utilities

Hydrogen supports almost all CSS properties and includes a handful of custom properties that provide support for common tasks such as containers or color overlays. Standard CSS properties accept their relevant CSS syntax as options.

`data-h2-display="base(grid)"`
`data-h2-border-top="base(1px solid black)"`

Custom Hydrogen properties use a comma separated syntax to accept specific options:

`data-h2-container="base(center, large)"`
`data-h2-flex-grid="base(flex-start, x2)"`

### Queries and modifiers

The biggest advantage to Hydrogen's `data-attribute` syntax is that it enables the use of inline media queries, selectors, states, targeting of nested elements, and dark mode. By chaining modifiers onto your query, you can target complex combinations of elements, manage styles based on the presence of classes or ids, bulk style an element's children, and more.

[Learn more about modifiers in the documentation.](https://beta.hydrogen.design/basics/modifiers)

### Speed and compression

Hydrogen uses custom scripting to scan your code for `data-h2-` attributes and then builds a CSS stylesheet that contains only Hydrogen's core and the attributes you've used. No bloat. No duplication. This means that the library in production is concise while allowing it to provide a robust set of features and support complex customization.

It also runs Autoprefixer and CSSNano on itself to provide a complete, production ready file.

# Development and contribution

- Pull the repository down
- run `npm run setup`
- do some development work in `lib`
- write function tests in sibling `function.test.js` files, or add environment tests in `./tests`
- run tests using the commands found in the root `package.json`

You can read up on specifics about how Hydrogen works on a technical level in the development README found in `CONTRIBUTING.md`.

## Testing coverage

The following functions are currently covered by automated tests:

- `hydrogen_build`

The following areas are currently covered by environment tests:

- basic environment
