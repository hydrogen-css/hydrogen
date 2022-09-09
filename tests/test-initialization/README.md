# Test description

The initialization test ensures that the initialization script properly creates a configuration file and directories if they don't exist, and also tests when the script should error if a configuration already exists.

## Goals of this test

- Ensure the init script creates a configuration file
- Ensure any input/output directories that don't exist are created
- Ensure that the init script errors if a configuration exists

## Expected output

- fresh:
  - you are prompted to enter an input path
  - you are prompted to enter an output path
  - the input directory is created
  - a configuration file is created
- blocked:
  - the script errors, indicating a configuration file already exists
