"use strict";

const { series, parallel, src, dest, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const del = require('del');
var footer = require('gulp-footer');
const fs = require('fs');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');

// Set the Sass compiler to Dart Sass.
sass.compiler = require('sass');

// Load Hydrogen's Configuration
var { loadH2Defaults, loadH2Config } = require('../functions/config-load');

// Load Hydrogen Modules
var { loadMediaMap } = require('../functions/map-media');

// Load the Font Face Function
var { setFontFaceCSS } = require('../functions/set-fonts');

async function createCleanCSS(env) {
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  console.log('Hydrogen: starting the file reduction...');
  // Reset the variables.
  var hydrogen = '';
  var mediaMap = loadMediaMap(env);
  var stateMap = '$h2-map-states: ("": "",":a": ":active",":h": ":hover",":f": ":focus",":d": ":disabled");'
  var fontFaceCSS = setFontFaceCSS(env);
  // Get the Hydrogen markup from the user's folder.
  var markup = fs.readFileSync(path + config.folders.styles + '/hydrogen/markup/markup.txt').toString();
  // Get all instances of Hydrogen data attributes (data-h2-*="*").
  // var dataRegex = /data-h2-([^"]*)="([^"]*)"/g;
  var dataRegex = /data-h2-([^=\s]+)(?:(\s)|=["'{]([^"'}]*)["'}]{1}|.*)/g;
  // Get the utility portion of the attribute (data-h2-*).
  // var utilityRegex = /data-h2-([^=]*)/g;
  var utilityRegex = /data-h2-(?:([^=\s]*)|([^\s]+))/g;
  // Get individual attribute values (x(y)).
  var valueRegex = /([^"' ]*?)\(([^)]*)\)/g;
  // var valueRegex = /.\(.*\)/g;
  // Get the temporary core Hydrogen.
  var hydrogenCoreCSS = fs.readFileSync(path + config.folders.styles + '/hydrogen/compressed/core.css').toString();
  // Get the temporary compressed Hydrogen file, located in the user's specified location in the config.
  var hydrogenUtilityCSS = fs.readFileSync(path + config.folders.styles + '/hydrogen/compressed/utility.css').toString();
  // console.log('sampleCSS file: ', hydrogenUtilityCSS);
  // Set up a variable list of arrays for each media query in the config. Thanks Chris Wiseman!
  let queries = {
    b: []
  };
  if (config.media != null && config.media != undefined && config.media.length > 0) {
    config.media.forEach(function(mediaQuery) {
      queries[mediaQuery.key] = [];
    }); 
  } else {
    defaults.media.forEach(function(mediaQuery) {
      queries[mediaQuery.key] = [];
    }); 
  }
  // console.log(queries);
  // Set up a string variable for our final CSS file and assemble font face, and the core.
  hydrogen = '' + fontFaceCSS + hydrogenCoreCSS;
  // We'll then have to parse through each one and break things apart by media query, and add the * selector...
  // e.g. data-h2-bg-color="b(red) m(yellow)" needs to become [data-h2-bg-color*="b(red)"] and [data-h2-bg-color*="m(yellow)"]
  var fullUsedAttributes = markup.match(dataRegex);
  // This now removes duplicates from the array before running the Clean script, drastically reducing time.
  function uniq(a) {
    return Array.from(new Set(a));
  }
  // console.log("old", fullUsedAttributes);
  var usedAttributes = uniq(fullUsedAttributes);
  // console.log("new", usedAttributes);
  // console.log(usedAttributes);
  if (usedAttributes != null) {
    usedAttributes.forEach(function(attribute) {
      // console.log(attribute);
      var utility = attribute.match(utilityRegex);
      var values = attribute.match(valueRegex);
        // console.log("Utility:", utility[0]);
        // console.log('Values inside each attribute:', values);
      if (values != null) {
        values.forEach(function(value) {
          // Get the media query set for this particular value.
          var mediaValue = value.match(/^.[^:(]*/g); // Returns media value: x
          var stateValue = value.match(/:.{1}/g); // Returns a state value or null (:n)
          // console.log(value, mediaValue, mediaVariable);
          // console.log("media query: ", mediaValue);
          // We have to build a RegEx to match the correct media query by checking against the list of available media queries and getting their screen value. Don't forget that "b" will always be an option, which has an empty value because it represents all "screen" queries.
          var defaultQueries = mediaMap;
          // Construct the query RegEx.
          var queryRegEx = `"` + mediaValue + `": ".*?(?:")`;
          // Create the RegEx.
          var createQueryRegEx = new RegExp(queryRegEx, 'g');
          // Search the default queries for the value.
          var queryMatch = defaultQueries.match(createQueryRegEx); // Returns media query: "x": "screen and..."
            // console.log(queryMatch);
          // Isolate the query itself so it can be used as text.
          if (queryMatch != null) {

            var queryValue;
              // console.log("queryMatch: ", queryMatch[0]);
            queryValue = queryMatch[0].match(/[^"]([^"]*)[^"\s]/g); // Returns the media side of the media query: screen and...
              // console.log("final media query: ", queryValue);

            // var stateNewValue;
            // if (stateValue != null) {
            //   // We now have to perform a similar match for states so that we can append the state value to the end of the query if a state exists.
            //   var stateExpression = '"' + stateValue + '": ".*?(?:")';
            //   var stateRegEx = new RegExp(stateExpression, 'g');
            //   var stateMatch = stateMap.match(stateRegEx); // Returns the state query: ":h": ":hover"
            //   if (stateMatch != null) {
            //     stateNewValue = stateMatch[0].match(/[^"]([^"]{2,})[^"\s]/g); // Returns the pseudo class side of the query.
            //     console.log(stateNewValue);
            //   }
            // }

            // This if statement is required to work around the nested nature of the flex-grid CSS. All of the grid CSS is applied to the file at the end of the build every time until this can be solved.
            var newRegEx;
            // newRegEx = '[^{}]*\\[' + utility + '\\*="' + value.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\][^{]*{[^}]*}';
            // if (stateNewValue != undefined) {
            //   var mediaState = "MEDIAKEY" + stateValue[0];
            //   var mediaVariable = value.replace(mediaValue, "MEDIAKEY");
            //   console.log('state value', stateValue);
            //   console.log('media state', mediaState);
            //   console.log('media variable', mediaVariable);
            //   newRegEx = '[^{}]*?\\[' + utility + '\\*="' + mediaVariable.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\][^{]*{[^}]*}';
            // } else {
            //   var mediaVariable = value.replace(mediaValue, "MEDIAKEY");
            //   console.log(mediaVariable);
            //   newRegEx = '[^{}]*?\\[' + utility + '\\*="' + mediaVariable.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\][^{]*{[^}]*}';
            // }

            var mediaVariable = value.replace(mediaValue, "MEDIAKEY");
            // console.log(mediaVariable);
            newRegEx = '[^{}]*?\\[' + utility + '\\*="' + mediaVariable.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '"\\][^{]*{[^}]*}';
      
            // console.log(value);
            // console.log(newRegEx);
            var cssRegex = new RegExp(newRegEx, 'g');
            // console.log('css specific regex: ', cssRegex);
            // console.log('test css regex: ', /\[data-h2-bg-color\*="b\(red\)"\]{([^}])*}/g);
            var cssMatch = hydrogenUtilityCSS.match(cssRegex); // Returns the full CSS selector: [data-hydrogen=VARVERSION] [data-h2-ATTRIBUTE*="MEDIA(VALUE)"]***{CSS}
            // console.log('css match values: ', cssMatch);
            // console.log("CSSMATCH:".green, cssMatch);
            if (cssMatch != null) {
              // var cssFinal = cssMatch[0].replace("MEDIAKEY", mediaValue);
              var cssFinal = [];
              cssMatch.forEach(function(match) {
                // console.log("match", match);
                cssFinal = cssFinal.concat(match.replace(/MEDIAKEY/g, mediaValue));
              });
              // Transform the matched CSS to include its media query.
              // var CSSwithMedia = '@media ' + queryValue[0] + '{' + cssMatch + '}';
              // console.log(CSSwithMedia);
              // hydrogen = hydrogen.concat(CSSwithMedia);
              // console.log(queries);
              // console.log(queries[mediaValue]);
              queries[mediaValue] = queries[mediaValue].concat(cssFinal);
              // console.log(queries);
            }
          } else {
            if (config.mediaWarnings != false) {
              console.log('[WARNING]'.yellow, 'Hydrogen: there is a media query being used in your markup', '('.yellow + mediaValue[0].yellow + ')'.yellow, 'that hasn\'t been defined in the media section of your configuration file.');
            }
          }
        }); 
      }
    });
    // Loop through each media query array now that they're populated with CSS and concatenate them into the final file.
      // console.log(queries);
    for (let query in queries) {
      var queryValue;
        // console.log(queryValue);
      var defaultQueries = mediaMap;
      // Construct the query RegEx.
      var queryRegEx = `"` + query + `": ".*?(?:")`;
      // Create the RegEx.
      var createQueryRegEx = new RegExp(queryRegEx, 'g');
      // Search the default queries for the value.
      var queryMatch = defaultQueries.match(createQueryRegEx); // Returns media query: "x": "screen and..."
        // console.log(queryMatch);
      // Isolate the query itself so it can be used as text.
      if (queryMatch != null) {
        // console.log("queryMatch: ", queryMatch[0]);
        queryValue = queryMatch[0].match(/ "([^"])*"/g); // Returns the media side of the media query: screen and...
      } else {
        if (config.mediaWarnings != false) {
          console.log('[WARNING]'.yellow, 'Hydrogen: there is a media query being used in your markup', '('.yellow + mediaValue[0].yellow + ')'.yellow, 'that hasn\'t been defined in the media section of your configuration file.');
        }
      }
      // Append the media query to the CSS group.
      hydrogen = hydrogen + '@media' + queryValue[0].replace(/["']/g, "") + ' {';
      // Add the CSS to the media query.
      // console.log(queries[query]);
      queries[query].forEach(function(item) {
        // console.log(item);
        hydrogen = hydrogen + item;
      })
      // console.log(hydrogen);
      // Close the media query.
      hydrogen = hydrogen + '}';
    }
    // console.log('final css: ', hydrogen);
    // Create the cleaned folder and write the file.
    console.timeEnd('Hydrogen: Custom Reduction Time');
    fs.mkdirSync(path + config.folders.styles + '/hydrogen/cleaned');
    fs.writeFile(path + config.folders.styles + '/hydrogen/cleaned/hydrogen.css', hydrogen, function(err) {
      if (err) {
        console.log('[ERROR]'.red, 'Hydrogen: ', err);
      }
    });
  } else {
    console.error('[ERROR]'.red, 'Hydrogen: we couldn\'t find any Hydrogen attributes in your markup so the build failed.');
    await Promise.reject(new Error('Try adding some attributes to your code!'));
  }
  await Promise.resolve('done?');
}

module.exports = createCleanCSS;