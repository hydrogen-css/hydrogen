const { DateTime } = require('luxon');
const { hydrogen_build } = require('@hydrogen-css/hydrogen/lib/build');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    // Default values are shown:
    // Whether the live reload snippet is used
    liveReload: true,
    // Whether DOM diffing updates are applied where possible instead of page reloads
    domDiff: false,
    // The starting port number
    // Will increment up to (configurable) 10 times if a port is already in use.
    port: 8080,
    // Additional files to watch that will trigger server updates
    // Accepts an Array of file paths or globs (passed to `chokidar.watch`).
    // Works great with a separate bundler writing files to your output folder.
    // e.g. `watch: ["_site/**/*.css"]`
    watch: [],
    // Show local network IP addresses for device testing
    showAllHosts: false,
    // Use a local key/certificate to opt-in to local HTTP/2 with https
    https: {
      // key: "./localhost.key",
      // cert: "./localhost.cert",
    },
    // Change the default file encoding for reading/serving files
    encoding: 'utf-8',
    // Show the dev server version number on the command line
    showVersion: true,
  });
  // Add the Hydrogen configuration file as a watch target
  eleventyConfig.addWatchTarget('./hydrogen.config.json');
  // Add the Hydrogen library release directory as a watch target for easy reloading
  eleventyConfig.addWatchTarget('../releases/**/*');
  // Run Hydrogen after the eleventy build executes
  eleventyConfig.on('eleventy.after', () => {
    try {
      hydrogen_build();
    } catch (error) {
      console.log(error);
    }
  });
  // Add other plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  // Create a human readable date format
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy');
  });
  // date filter (localized)
  eleventyConfig.addNunjucksFilter('date', function (date, format, locale) {
    locale = locale ? locale : 'en';
    moment.locale(locale);
    return moment(date).format(format);
  });
  // Handle static assets
  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    './src/static/css/app.css': './static/css/app.css',
    './src/static/css/duotone-sea.css': './static/css/duotone-sea.css',
    './src/static/css/synthwave.css': './static/css/synthwave.css',
    './src/static/css/laserwave.css': './static/css/laserwave.css',
    './node_modules/prismjs/themes/prism-funky.min.css': './static/css/prism-funky.min.css',
    './src/static/scripts/app.js': './static/js/app.js',
    './src/static/_redirects': './_redirects',
    './src/static/robots.txt': './robots.txt',
    './src/static/img': './static/img',
    './src/static/img/favicons': './',
  });
  // Build the English collections
  // Full site
  eleventyConfig.addCollection('en_site', function (collectionApi) {
    return collectionApi.getFilteredByGlob('./src/en/**/*.11ty.js');
  });
  // Complete documentation
  eleventyConfig.addCollection('en_docs', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('./src/en/docs/**/*.11ty.js')
      .filter(function (item) {
        return item.data.navigation.order;
      })
      .sort(function (a, b) {
        if (!a.data.navigation.order);
        else if (a.data.navigation.order > b.data.navigation.order) return 1;
        else if (a.data.navigation.order < b.data.navigation.order) return -1;
        else return 0;
      });
  });
  // Installation
  eleventyConfig.addCollection('en_installation', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('./src/en/docs/installation/*/*.11ty.js')
      .filter(function (item) {
        return item.data.navigation.order;
      })
      .sort(function (a, b) {
        if (!a.data.navigation.order);
        else if (a.data.navigation.order > b.data.navigation.order) return 1;
        else if (a.data.navigation.order < b.data.navigation.order) return -1;
        else return 0;
      });
  });
  // Configuration
  eleventyConfig.addCollection('en_configuration', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('./src/en/docs/configuration/*/*.11ty.js')
      .filter(function (item) {
        return item.data.navigation.order;
      })
      .sort(function (a, b) {
        if (!a.data.navigation.order);
        else if (a.data.navigation.order > b.data.navigation.order) return 1;
        else if (a.data.navigation.order < b.data.navigation.order) return -1;
        else return 0;
      });
  });
  // Styling
  eleventyConfig.addCollection('en_styling', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('./src/en/docs/styling/*/*.11ty.js')
      .filter(function (item) {
        return item.data.navigation.order;
      })
      .sort(function (a, b) {
        if (!a.data.navigation.order);
        else if (a.data.navigation.order > b.data.navigation.order) return 1;
        else if (a.data.navigation.order < b.data.navigation.order) return -1;
        else return 0;
      });
  });
  // Properties
  eleventyConfig.addCollection('en_properties', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('./src/en/docs/properties/*/*.11ty.js')
      .filter(function (item) {
        return item.data.navigation.order;
      })
      .sort(function (a, b) {
        if (!a.data.navigation.order);
        else if (a.data.navigation.order > b.data.navigation.order) return 1;
        else if (a.data.navigation.order < b.data.navigation.order) return -1;
        else return 0;
      });
  });
  // Return the standard settings object
  return {
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
    },
    templateFormats: ['11ty.js'],
  };
};
