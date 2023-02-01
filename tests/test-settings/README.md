# Test description

The settings tests run specific validation tests to ensure that settings are parsed as expected

## Goals of this test

- 1: Test minimum configuration requirements
- 2: Test a complete settings file

TBD

- 3: Test input validation
- 4: Test output validation
- 5: Test build validation
- 6: Test spaces in keys
- 7: Test periods in keys
- 8: Test duplicate media keys
- 9: Test mismatched typography query_key
- 10: Test duplicate color keys
- 11: Test duplicate color and modifier keys
- 12: Test duplicate color and gradient keys
- 13: Test duplicate gradient and modifier keys

## Expected output

- Each test should expect different output:

  - 1: A clean compile
  - 2: A clean compile

  TBD

  - 3: 1 error indicating that the input setting is the wrong type
  - 4: 1 error indicating that the output setting is the wrong type
  - 5: 3 errors
    - That the dark_mode setting is the wrong type
    - That the dark_mode setting must be one of two values
    - That the export_variable_file setting is the wrong type
  - 6: 1 error indicating that a key contains whitespace
  - 7: 1 error indicating that a key contains a period
  - 8: 4 errors, 2 of which are duplicates
    - That two media keys have the same key
    - That two media settings have invalid keys due to one ending with the other
  - 9: 1 error indicating that a typography setting's query_key doesn't match any available media query keys
  - 10: 2 errors, 1 of which is a duplicate
    - That two color keys are the same
  - 11: 1 error indicating that a modifier has a key that matches its parent color's key
  - 12: 1 error indicating that a gradient key matches a color key
  - 13: 1 error indicating that a gradient key matches a modifier key defined in a color setting
