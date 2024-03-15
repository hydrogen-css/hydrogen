# 🌞 Hydrogen's release checklist

## Root

- Run `npm update --save` to ensure dependencies are up-to-date
- Update the `package.json`'s version number
- Add a release `json` file to the releases directory
- Ensure a Github milestone exists
- Ensure a Github pull request exists and is linked to the appropriate issues and milestone

## Docs

- Run `npm update --save` to ensure dependencies are up-to-date
- Update the `package.json`'s dependency number

## Test

- Run `npm update --save` to ensure dependencies are up-to-date
- Update the `package.json`'s dependency number

# Publishing

- Ensure a Github release is prepped and contains the release information
- Merge the pull request
- Pull down `main` locally and ensure everything works
- Run `npm publish --access public` to publish the code
