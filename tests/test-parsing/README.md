# Test description

The parsing test runs through both attribute and file parsing to ensure that only correct matches are found in the correct files.

## Goals of this test

- Ensure Hydrogen ignores its own files
- Ensure Hydrogen properly parses both standard data-attributes and key/value pair declarations
- Display a warning when data-h2 can't be found in the user's input
- Display multiple files in the same warning when an error is found in multiple places

## Expected output

- 3 errors
  - Invalid property (because it correctly found the key/value pair in app.js)
  - Invalid property (because it correctly found the attribute inside of a CSS file that wasn't Hydrogen)
  - Invalid number of options (because it correctly parsed the attribute in index.html)
    - This error should contain multiple file locations
- 1 warning
  - Missing data-h2 wrapper (because data-h2- in the index.html and \[data-h2\] in app.js were correctly ignored)
