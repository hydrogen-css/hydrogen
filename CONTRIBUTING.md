# 🌞 Hydrogen's contribution guidelines

Thanks for considering helping out with Hydrogen! Below is a set of helpful information that should give you a basic understanding of the project's contribution expectations and best practices.

## :link: Helpful links

- [Hydrogen's website](https://hydrogen.design/en)
- [Hydrogen's documentation](https://hydrogen.design/en/docs)
- [Code repository](https://github.com/hydrogen-css/hydrogen)
- [Development roadmap](https://github.com/orgs/hydrogen-css/projects/3/views/3)
- [Latest package release](https://www.npmjs.com/package/@hydrogen-css/hydrogen/v/latest)
- [Beta package release](https://www.npmjs.com/package/@hydrogen-css/hydrogen/v/beta)

## :triangular_ruler: Conventions

### Code conventions

- Functions should be added to `index.js` files inside of a folder named after the function's name
- Function folders should be prefixed with two digits (e.g. 01) if the function is a synchronous step or dependency
- Functions should be accompanied by an `index.test.js` Jest test where possible
- Format files with `prettier` on save
- Leave concise comments as frequently as reasonably possible that describe the goal of the line or group of lines
- New features, bugfixes, and enhancements should always be given their own branch, preferably named `release/X.X.X` if they're in bulk
- All new branches should be submitted as pull requests

### System conventions

- When adding new console logging to Hydrogen's output, wrap the log in the appropriate checks to ensure that it doesn't add to the reduced output mode
- Always update the correct documentation inside of `docs` in the same PR as the new/updated feature

## :desktop_computer: Development guides

### Understanding Hydrogen's build process

Hydrogen's folder structure inside of the `lib` directory does its best to represent the following process as closely as possible so that it's always clear where in the build you are while making changes.

1. Locate and parse the user's `hydrogen.config.json` settings
   1. Find a configuration file
      1. If the user passed `h2_config_path` use the file found in that directory, otherwise
      2. Check the current process directory for a configuration file, otherwise
      3. Check recursively up from the process directory for a configuration file
   2. Validate the existing settings to ensure required options, types, and formats
   3. Load the default build settings from the data model and replace them with any configured values
   4. Parse configured theme settings
   5. Check for command line arguments and replace any default or configured settings with their values
2. Using the `mode` and `media` configurations, generate a media query object for CSS storage
3. CSS variables are created based on the final configuration data and sorted into relevant media queries
4. If enabled, Hydrogen's core CSS is built
5. Files found in the `input` directories are read and parsed using RegExp for `data-h2-` attributes
   1. When a new attribute is found, it's broken into consumable parts based on Hydrogen's syntax
   2. Individual query values found in the attribute are parsed for their media query, modifiers, and content, which are then added to the attribute's object record
6. Once all attributes are parsed and deconstructed, CSS is constructed
   1. Custom selectors are generated and are added to the record
   2. The actual CSS code is created and added to the record
   3. The attribute record is added to the media query object generated earlier
7. The media query object is then looped through, assembling a single unprocessed CSS string
8. The CSS string is then optionally run through Lightning CSS (browser prefixing and CSS minification)
9. If requested, a `hydrogen.vars.css` variable file is written to the configured `output` directory
10. The final processed CSS is written to a `hydrogen.css` file in the configured `output` directory
