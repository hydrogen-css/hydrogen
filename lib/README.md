# Build process

Hydrogen takes the following steps to build its CSS file:

- checks for a configuration file
  - if it can't find one, it checks the folder above
- validates the configuration file has no errors or missing required values
- loads the validated configuration
- checks the "input" value in the configuration file and creates a list of files to check for attributes
- loops through each file, loading it, converting it to a string, and scanning it for Hydrogen attributes
- returns an array of Hydrogen attributes to be used
- checks to see if the wrapper attribute exists anywhere and logs a warning if it doesn't
- builds the core reset style CSS
- creates a unique array of empty media queries from the configuration in the correct cascade order
- builds a CSS variable file if the user has requested one
- for each attribute, the property is found and individual values are separated
- for each value found:
  - the value is parsed for the media, mode, and state portion (anything before the "()") characters
  - this portion is then parsed by ":" characters and compared against the available media query, mode, and state options for matches
  - the CSS selector is constructed (including any pseudo elements required by states that have been found and/or classes supplied through the class modifier and/or children through the children modifier)
  - the interior options are then parsed and separated
  - Hydrogen then loops through all available properties, comparing the property found to what's available
  - when it finds a match, it builds the relevant CSS using either a generic or custom script, depending on the complexity of the property
  - it then does a complex match between the media query array produced earlier and the values found for media query, mode, and state
    - when a match is found (e.g. base query, dark mode, hover), it adds the full CSS value to the respective media array
- Hydrogen then loops through all the completed media array entries, appending them to a single string and closing query brackets where necessary
- the CSS file is then written as a "raw" file so that it can be processed
- AutoPrefixer and CSSnano are both run on the file with custom settings to produce the final CSS

# Adding CSS properties

- if the property needs custom scripting, create a script in `lib/scripts/properties`
- if necessary, add imports to the build script in `lib/scripts/build-hydrogen.js`
- add the property's scripts to the build in `lib/scripts/build-hydrogen.js`
- add the new property to the property data model in `lib/data/property-model.json`
- test the property by adding it to the testing UI markup in `tests/markup/site`
- if it's a custom property, add tests to the error testing markup in `tests/markup/errors`
- add the new property's syntax to the snippets file in `hydrogen.snippets.json`
- update the project's own local .vscode snippets file in `.vscode/hydrogen.code-snippets`
- add release notes for the property in the changelog

# Adding new tests

- create a `test-[NAME]` directory
- add an `env` directory with test command shell scripts
- enable permissions on the test shell scripts using `chmod +x ./tests/test-[NAME]/env/[SCRIPT].sh`
- add a `modify-settings.js` file to copy over and modify the default Hydrogen settings based on the needs of the test
- write the success criteria for the test in `test-[NAME]/README.md`
- add the test to `tests/build.sh` and `tests/refresh.sh`
- add test commands to `./package.json`
