# Work to be done

## Urgent
- Update the snippets file for 2.0.0
- Add the ability to lock CSS values out of attributes to force users into using keys
- move console logging to custom functions

## Breaking

## Features
- Add support for `data-h2-custom`, which should allow you to define a key and associated array containing commonly used Hydrogen attributes - this will allow multiple attributes to be reused and condensed, saving space in the HTML
- Research handling font family options so that they can accept enough information in the configuration to dynamically generate `@font-face` rules
- Enhance radial gradients to accept keyword additives before the color stops

## Optimizations
- To speed things up, when checking for duplicates, check the query instead of the whole attribute's options (this is currently letting duplicate queries in if it finds ="b(red)" and ="b(red) m(green)" - where b(red) is included twice
- Add checks to ensure the correct number of options are passed to each attribute, and throw an appropriate error
- When Hydrogen finds an error in one of the queries passed to an attribute, the whole attribute is ignored and an error is presented - it would be better if correct queries were still passed so that only the wrong query is ignored

## Bugfixes
- Attributes that accept gradients as an option should provide a color fallback generated from the first color value in the gradient - this will require a more complex gradient map that provides access to the fallback color
- The build fails if optional configurations are left blank or are set to null or are set to an empty array
- optimize the darken function to better reflect dark color generation

# This release so far

## Breaking
- flex grid only takes 3 (4th optional) values now and relies on gap and math!
- state is now :d -> :disabled
- b must now be included in the config, with a null query value
- config options have been renamed in all cases to be more specific to their expected value (e.g. value => query for media queries)
- margin/padding is now b(top, right, bottom, left)
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
- font size can now be configured to change at any breakpoint you want
- reworks gradient configs so that they must have a key to simplify their usage
- folders have been removed from the config in favor of an input array and an output string
- colors have been reworked to include a 3 point scale each for lightness and darkness that can be set to auto or a custom color

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

## Optimizations
- removed layer count from config because layer accepts any value
- removed order's dependency on flex-grid
- adds npm start for dev purposes
- completely removes Sass from the project and no longer has any internal CSS
- console output is much cleaner and more consistent
- moved internal tests to the root under /tests
- moved the default settings to /lib/data
- reworks the default media query keys (xl -> xxl)

## Bugfixes
