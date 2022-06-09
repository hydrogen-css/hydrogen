# This release so far

## Breaking

- flex grid only takes 3 (4th optional) values now and has been reworked to avoid horizontal overflows
- state is now :d -> :disabled
- b must now be included in the config, with a null query value
- config options have been renamed in all cases to be more specific to their expected value (e.g. value => query for media queries)
- margin/padding/offset is now b(all), b(top-bottom, right-left), b(top, right, bottom, left)
- separates text deco from font style
- removes border widths from config
- removed width and height from config
- removed opacity from the config
- ditches the compile script
- reworks media query configs so that they can be null or full queries, rather than values
- removes the fixed 90% width on containers (this was to add padding on mobile, you can just do this yourself now)
- whitespace keys are now multipliers instead of tshirts - this also has been expanded so any multiplier works, there's no limit on the number
- side values have been simplified to just all, t-b, r-l, top, right, bottom, left, and they only apply to borders now
- reset no longer assumes you want margins on headings/paragraphs
- font size can now be configured to change at any breakpoint you want, and these breakpoints can contain their own typeScale and line height settings
- reworks gradient configs so that they take a key, CSS string, and fallback color, enabling repeating and conic gradients
- folders have been removed from the config in favor of an input array and an output string
- colors have been reworked to include a 3 point scale each for lightness and darkness that can be set to auto or a custom color
- beta-6: color modifiers have been overhauled to use a dot notation instead of brackets
- overflow values have been swapped so that axis can be optional
- overlay takes two options now, the second being an optional opacity
- adds transition as an attribute, but removes it from all others - this was bugging toggling of styles because it was causing the styles to transition REALLY slowly
- adds the ability to configure whether reset styles are included in the build or not

## Features

- adds gap (value, placement)
- adds template columns/rows
- dark mode woop woop
- adds CSS variable file
- height has been added
- gradients work as font colors
- flex-items can now be set to fill
- most attributes now accept CSS values for things
- adds "offset" as an alt for location
- adds vertical align
- adds max height and width
- adds flex basis - flex-item fill needs flex basis: 100% for line breaks
- beta-6: input and output config values are now sanitized for prefixed/trailing '/'

## Optimizations

- removed layer count from config because layer accepts any value
- removed order's dependency on flex-grid
- adds npm start for dev purposes
- completely removes Sass from the project and no longer has any internal CSS
- console output is much cleaner and more consistent
- moved internal tests to the root under /tests
- moved the default settings to /lib/data
- reworks the default media query keys (xl -> xxl)
- beta-6: a delay has been added to the watch script to prevent it from running if you save consecutively really quickly
- beta-7: reworks console time logging to be rely on process.hrtime rather than console.time

## Bugfixes
