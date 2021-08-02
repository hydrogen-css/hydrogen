# Hydrogen.css

Hydrogen is a utility-first styling tool for creating web interfaces without writing CSS.

It leverages data-attributes to allow the styling of elements right in your markup, rather than creating your own classes. Hydrogen offers a comprehensive library of tools and configurations for easy, seamless development. When you're ready to publish your project, it then processes your markup and creates a custom CSS file that contains only the code you've used, reducing its own footprint.

[https://hydrogen.design](https://hydrogen.design)

## State Support
- bg-color
- border
- display
- font-color
- font-style
- font-weight
- margin
- overflow
- padding
- radius
- shadow
- visibility
- width

## Adding Utilities

### Styles

Updating Hydrogen with new utilities can vary depending on their complexity and requirements.

Utilities require two basic `.scss` files:
- `./lib/styles/maps/_map-[UTILITY].scss`
- `./lib/styles/utilities/_utility-[UTILITY].scss`

The first file remains empty and will be populated by Hydrogen's build scripts with a Sass map that is constructed using the user's configuration file (or the default configuration options).

The second file sets the actual utility's styles by creating a loop and defining the data attribute and its key.

Once these are created, the following files need to be updated:
- `./lib/styles/compile.scss`
- `./lib/styles/utility.scss`

The map needs to be imported, as well as the utility file so that the mixin can be included.

### Scripts

First, the `cacheH2Partials` function in `./lib/scripts/functions/core.js` needs to be updated to include the new utility's Sass file.

A map file needs to be created:
- `./lib/scripts/functions/map-[UTILITY].js`

This file scripts how the configuration file will be used to generate the utility's Sass map.

Then, the `compile.js` and `build.js` files inside the following folders need to be updated to import the new scripts and run them accordingly:
- `./lib/scripts/tests`
- `./lib/scripts/node`

### Configuration

Based on your utility's needs, you can then update Hydrogen's default configuration to include standard options:
- `./lib/hydrogen.default.json`