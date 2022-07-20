# ☀️ Hydrogen

<img alt="npm" src="https://img.shields.io/npm/v/@hydrogen-design-system/hydrogen.css?color=%239d5cff&label=latest">

Hydrogen is a utility-first styling tool for creating web interfaces without writing CSS.

It leverages data-attributes to allow the styling of elements, media queries, states, and dark mode right in your markup. Hydrogen offers a comprehensive library of tools and configurations for easy, seamless development. Hydrogen processes your markup and creates a custom CSS file that contains only the code you've used, reducing its own footprint.

[Visit the documentation website for details.](https://hydrogen.design)

## 🛠️ Basic Usage

### Installation

- run `npm install @hydrogen-design-system/hydrogen.css` to install Hydrogen
- run `npx h2-init` to setup your input/output directories
- modify your `hydrogen.config.json` file to match your theme
- add `data-h2` to your `<html>` element or parent wrapper
- run `npx h2-watch` to watch your files for changes and compile when a change is detected
- run `npx h2-build` when you're ready to deploy to production

### Syntax

Hydrogen uses a custom `data-attribute` syntax for complex styling.

`data-h2-UTILITY="MEDIA:DARK:STATE(PARAMETERS)"`

An example of a Hydrogen attribute in use would be something like:

`data-h2-bg-color="base(primary) base:hover(accent)"`

This repository also contains a handy `hydrogen.snippets.json` file that contains snippet automation for VS Code, enabling auto completion and tab stops.

## 🏗️ Configuration

You can learn more about Hydrogen's configuration file on the [documentation website](https://hydrogen.design/#configuration).

Hydrogen is configured using a `hydrogen.config.json` file located at the root of your project. The `npx h2-init` script is designed to create this file for you and prompts for some required information before you can proceed.

Within this configuration file, you can modify many of Hydrogen's utilities to include values that suit your project's needs and theme, including custom media queries, colors, whitespace, and shadows.

## 🤖 Features

### Compression

Hydrogen uses custom scripting to scan your code for `data-h2` attributes and then builds a CSS stylesheet that contains only Hydrogen's base and the attributes you've used. No bloat. No duplication. This means that the library in production is extremely small while allowing it to provide a robust set of features and support complex customization.

It also runs Autoprefixer and CSSNano on itself to provide a complete, production ready file.

### Utilities

You can learn about [utility usage in the documentation](https://hydrogen.design/#backgroundColor), but Hydrogen offers the following utilities:

- `align-content`
- `align-items`
- `align-self`
- `background-color`
- `border`
- `color`
- `container`
- `cursor`
- `display`
- `flex-basis`
- `flex-direction`
- `flex-grid` and `flex-item`
- `flex-grow`
- `flex-wrap`
- `font-family`
- `font-size`
- `font-style`
- `font-weight`
- `gap`
- `grid-column`
- `grid-row`
- `grid-template-columns`
- `grid-template-rows`
- `height`
- `justify-content`
- `justify-items`
- `layer` for `z-index` control
- `list-style`
- `margin`
- `max-height`
- `max-width`
- `min-height`
- `min-width`
- `offset` for positioning control
- `opacity`
- `order` for flex item order control
- `outline`
- `overflow`
- `overlay`
- `padding`
- `position`
- `radius`
- `shadow`
- `text-align`
- `text-decoration`
- `text-transform`
- `transition`
- `visibility`
- `width`

### States

Along with media queries, Hydrogen offers the ability to modify attributes using the following [state](https://hydrogen.design/#states) keys:

- `:active`
- `:checked`
- `:disabled`
- `:enabled`
- `:focus`
- `:hover`
- `:link`
- `:optional`
- `:required`
- `:valid`
- `:visited`

### Dark Mode

You can specify unique styles for users who have their browsers/OS set to prefer dark mode or simply want to toggle it on using a class. This can be done by adding `:dark` to your media query calls:

- `data-h2-bg-color="base(primary)"` will set the default background color to `primary`;
- `data-h2-bg-color="base(primary) base:dark(secondary)"` will set the default background color to `primary`, and if the user prefers dark mode, will set the background to `secondary`

# Development and contribution

- Pull the repository down
- run `npm install`
- run `npm link`
- navigate to `cd tests`
- run `npm link @hydrogen-design-system/hydrogen.css`
- run `npm start`

## Adding CSS properties

- create the property script (generic or custom) in `lib/scripts/properties`
- add imports to the build script in `lib/scripts/build-hydrogen.js`
- add the property's scripts to the build in `lib/scripts/build-hydrogen.js`
- add the new property to the property data model in `lib/data/property-model.json`
- test the property by adding it to the testing UI markup in `tests/markup/site`
- if it's a custom property, add tests to the error testing markup in `tests/markup/errors`
- add the new property's syntax to the snippets file in `hydrogen.snippets.json`
- update the project's own local .vscode snippets file in `.vscode/hydrogen.code-snippets`
- add release notes for the property in the changelog
