const { DateTime } = require('luxon');
var exec = require('child_process').execSync;
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
var fs = require('fs');
var path = require('path');

module.exports = function (eleventyConfig) {
  // Serve from en directory
  eleventyConfig.setBrowserSyncConfig({
    startPath: 'en/',
  });

  // Run Hydrogen before the eleventy build executes
  eleventyConfig.on('eleventy.after', async () => {
    console.log(exec('npx h2-build').toString());
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Create a human readable date format
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  // date filter (localized)
  eleventyConfig.addNunjucksFilter('date', function (date, format, locale) {
    locale = locale ? locale : 'en';
    moment.locale(locale);
    return moment(date).format(format);
  });

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    './src/static/css/app.css': './static/css/app.css',
    './src/static/scripts/app.js': './static/js/app.js',
    './src/static/_redirects': './_redirects',
  });

  // eleventyConfig.addCollection('all_en', function (collectionApi) {
  //   return collectionApi.getFilteredByGlob('./src/en/docs/**/*.md');
  // });

  // eleventyConfig.addCollection('all_fr', function (collectionApi) {
  //   return collectionApi.getFilteredByGlob('./src/fr/docs/**/*.md');
  // });

  // eleventyConfig.addCollection('configuration_en', function (collectionApi) {
  //   return collectionApi.getFilteredByGlob('./src/en/configuration/**/*.md');
  // });

  // eleventyConfig.addCollection('configuration_fr', function (collectionApi) {
  //   return collectionApi.getFilteredByGlob('./src/fr/configuration/**/*.md');
  // });

  // eleventyConfig.addCollection('attributes_en', function (collectionApi) {
  //   return collectionApi.getFilteredByGlob('./src/en/docs/attributes/**/*.md');
  // });

  // eleventyConfig.addCollection('attributes_fr', function (collectionApi) {
  //   return collectionApi.getFilteredByGlob('./src/fr/docs/attributes/**/*.md');
  // });

  // eleventyConfig.addCollection('attributes_en_asc', function (collectionApi) {
  //   return collectionApi
  //     .getFilteredByGlob('./src/en/docs/attributes/**/*.md')
  //     .sort(function (a, b) {
  //       if (a.data.key > b.data.key) return 1;
  //       else if (a.data.key < b.data.key) return -1;
  //       else return 0;
  //     });
  // });

  // eleventyConfig.addCollection('attributes_fr_asc', function (collectionApi) {
  //   return collectionApi
  //     .getFilteredByGlob('./src/fr/docs/attributes/**/*.md')
  //     .sort(function (a, b) {
  //       if (a.data.key > b.data.key) return 1;
  //       else if (a.data.key < b.data.key) return -1;
  //       else return 0;
  //     });
  // });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy('./src/static/img');

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy({ './src/static/img/favicons': './' });

  // Let Eleventy transform HTML files as nunjucks so that we can use .html instead of .njk
  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
  };
};
