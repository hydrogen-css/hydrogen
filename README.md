# ☀️ Hydrogen

<img alt="npm latest" src="https://img.shields.io/npm/v/@hydrogen-css/hydrogen/latest?color=%239D5CFF&label=latest&style=for-the-badge"> <img alt="npm beta" src="https://img.shields.io/npm/v/@hydrogen-css/hydrogen/beta?color=%239D5CFF&label=beta&style=for-the-badge">

Hydrogen is an open-source design and CSS utility framework powered by data-attributes.

It leverages data-attributes to allow the styling of elements right in your markup, rather than creating your own classes. Hydrogen offers a comprehensive library of tools and configurations for easy, seamless development. When you're ready to publish your project, it then processes your markup and creates a custom CSS file that contains only the code you've used, reducing its own footprint.

[Website](https://hydrogen.design) | [Roadmap](https://workflowy.com/s/hydrogen/7Gjmdbjiqc0Wst1R)

## 🥳 Upcoming 2.0.0 release

Hydrogen is about to undergo some significant improvements, including a drastic speed increase and a massive feature drop. This release does come with some breaking changes, and an upgrade guide will be provided when the time comes.

You can read more about what's included by viewing the `release/2.0.0` branch [here on Github](https://github.com/hydrogen-css/hydrogen/pull/200).

`2.0.0` is almost ready to go, but the [documentation site](https://beta.hydrogen.design) needs to be wrapped up first. In the meantime, if you plan to use Hydrogen on a new project, we recommend installing `2.0.0` now to make it a seamless transition.

You can install the latest `2.0.0` beta release by running `npm install @hydrogen-css/hydrogen@beta --save-dev`

## 🛠️ Basic Usage

### Installation

- run `npm install @hydrogen-css/hydrogen` to install Hydrogen
- run `npx h2-init` to setup your input/output directories
- modify your `hydrogen.config.json` file to match your theme
- run `npx h2-watch` to watch your files for changes and compile when a change is detected
- run `npx h2-build` when you're ready to deploy to production

### Syntax

Hydrogen uses a custom `data-attribute` syntax for complex styling.

`data-h2-property="query:modifiers(options)"`

An example of a Hydrogen attribute in use would be something like:

`data-h2-bg-color="b(primary) b:h(accent)"`

This repository also contains a handy `hydrogen.snippets.json` file that contains snippet automation for VS Code, enabling auto completion and tab stops.

## 🏗️ Configuration

You can learn more about Hydrogen's configuration file on the [documentation website](https://hydrogen.design/#configuration).

Hydrogen is configured using a `hydrogen.config.json` file located at the root of your project. The `npx h2-init` script is designed to create this file for you and prompts for some required information before you can proceed.

Within this configuration file, you can modify many of Hydrogen's utilities to include values that suit your project's needs and theme, including custom media queries, colors, whitespace, and shadows.

## 🤖 Features

### Compression

Hydrogen uses custom scripting to scan your code for `data-h2` attributes and then custom builds a CSS stylesheet that contains only Hydrogen's base and the attributes you've used. No bloat. No duplication. This means that the library in production is extremely small while allowing it to provide a robust set of features and support complex customization.

### Utilities

You can learn about [utility usage in the documentation](https://hydrogen.design/#backgroundColor), but Hydrogen offers the following utilities:

- `align-content`
- `align-items`
- `align-self`
- `bg-color`
- `border`
- `container`
- `display`
- `flex-direction`
- `flex-grid` and `flex-item`
- `flex-wrap`
- `font-color`
- `font-family`
- `font-size`
- `font-style`
- `font-weight`
- `justify-content`
- `layer` for `z-index` control
- `location` for positioning control
- `margin`
- `opacity`
- `order` for flex item order control
- `overflow`
- `overlay`
- `padding`
- `position`
- `radius`
- `shadow`
- `text-align`
- `text-transform`
- `visibility`
- `width`

### States

Along with media queries, Hydrogen offers the ability to modify attributes using the following [state](https://hydrogen.design/#states) keys:

- `:d` for `disabled`
- `:f` for `focus`
- `:h` for `hover`
- `:a` for `active`

While media queries work with all attributes, states are restricted to the utilities listed in the state section of the documentation.
