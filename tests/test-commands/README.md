# Test description

The commands test enables combinations of commands and their flags to ensure that they all execute correctly.

## Goals of this test

- Ensure Hydrogen's basic build and watch commands run as expected
- Ensure that environment flags (--dev and --prod) alter the configuration and subsequent output as expected
- Ensure that individual flags alter the configuration and output as expected
- Ensure that individual flags override environment flags

## Expected output

- Basic: 0 errors/warnings, timers, success message
  - Environment flags
    - dev: 0 errors/warnings, timers, prefixing, success message
    - prod: 0 errors/warnings, prefixing, minification, success message
  - Individual flags
    - logs: 0 errors/warnings, timers, prefixing, minification, success message, log file output
    - clean: 0 errors/warnings, timers, clean message, prefixing, minification, success message
