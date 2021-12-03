'use strict';

const fs = require('fs');
var glob = require('glob');

// Load Hydrogen's Configuration
var {
  loadH2Defaults,
  loadH2Config,
  getH2SourcePath,
  getH2DestinationPath,
  getH2OutputDirectory,
} = require('../functions/config-load');

// Load Hydrogen Modules
var { loadMediaMap } = require('../functions/map-media');

// Load the Font Face Function
var { setFontFaceCSS } = require('../functions/set-fonts');

// Create the input pattern.
function createInputPattern(env) {
  var config = loadH2Config(env);
  var path = getH2DestinationPath(env);
  var inputPattern = '{';
  // Check to see if the new input syntax is being used, and whether it's an array or not.
  if (Array.isArray(config.input) == true) {
    config.input.forEach(function (inputPath, index, array) {
      inputPattern = inputPattern + path + inputPath + '/**/*,';
    });
    inputPattern = inputPattern + '}';
    return inputPattern;
  } else if (config.input != null && config.input != undefined) {
    inputPattern = inputPattern + path + config.input + '/**/*,';
    inputPattern = inputPattern + '}';
    return inputPattern;
  } else {
    // The old syntax is in use, and we need to run through markup and scripts.
    if (Array.isArray(config.folders.markup) == true) {
      config.folders.markup.forEach(function (markupPath, index, array) {
        inputPattern = inputPattern + path + markupPath + '/**/*,';
      });
      if (
        config.folders.scripts != undefined &&
        config.folders.scripts != '' &&
        config.folders.scripts != []
      ) {
        if (Array.isArray(config.folders.scripts) == true) {
          config.folders.scripts.forEach(function (scriptPath, index, array) {
            inputPattern = inputPattern + path + scriptPath + '/**/*,';
          });
          inputPattern = inputPattern + '}';
          return inputPattern;
        } else {
          inputPattern =
            inputPattern + path + config.folders.scripts + '/**/*,';
          inputPattern = inputPattern + '}';
          return inputPattern;
        }
      } else {
        inputPattern = inputPattern + '}';
        return inputPattern;
      }
    } else {
      inputPattern = inputPattern + path + config.folders.markup + '/**/*,';
      if (
        config.folders.scripts != undefined &&
        config.folders.scripts != '' &&
        config.folders.scripts != []
      ) {
        if (Array.isArray(config.folders.scripts) == true) {
          config.folders.scripts.forEach(function (scriptPath, index, array) {
            inputPattern = inputPattern + path + scriptPath + '/**/*,';
          });
          inputPattern = inputPattern + '}';
          return inputPattern;
        } else {
          inputPattern =
            inputPattern + path + config.folders.scripts + '/**/*,';
          inputPattern = inputPattern + '}';
          return inputPattern;
        }
      } else {
        inputPattern = inputPattern + '}';
        return inputPattern;
      }
    }
  }
}

// Create the input ignore pattern.
function createInputIgnorePattern(env) {
  var config = loadH2Config(env);
  var path = getH2DestinationPath(env);
  var ignorePattern = [];
  // Check to see if the new input syntax is being used, and whether it's an array or not.
  if (Array.isArray(config.input) == true) {
    config.input.forEach(function (inputPath, index, array) {
      ignorePattern = ignorePattern.concat(path + inputPath + '/hydrogen.css');
      ignorePattern = ignorePattern.concat(
        path + inputPath + '/hydrogen-variables.scss'
      );
      ignorePattern = ignorePattern.concat(path + inputPath + '/hydrogen/**/*');
      ignorePattern = ignorePattern.concat(
        path + inputPath + '/*/hydrogen.css'
      );
      ignorePattern = ignorePattern.concat(
        path + inputPath + '/*/hydrogen/**/*'
      );
    });
    return ignorePattern;
  } else if (config.input != null && config.input != undefined) {
    ignorePattern = ignorePattern.concat(path + config.input + '/hydrogen.css');
    ignorePattern = ignorePattern.concat(
      path + config.input + '/hydrogen-variables.scss'
    );
    ignorePattern = ignorePattern.concat(
      path + config.input + '/hydrogen/**/*'
    );
    ignorePattern = ignorePattern.concat(
      path + config.input + '/*/hydrogen.css'
    );
    ignorePattern = ignorePattern.concat(
      path + config.input + '/*/hydrogen/**/*'
    );
    return ignorePattern;
  } else {
    // The old syntax is in use, and we need to run through markup and scripts.
    if (Array.isArray(config.folders.markup) == true) {
      config.folders.markup.forEach(function (markupPath, index, array) {
        ignorePattern = ignorePattern.concat(
          path + markupPath + '/hydrogen.css'
        );
        ignorePattern = ignorePattern.concat(
          path + markupPath + '/hydrogen-variables.scss'
        );
        ignorePattern = ignorePattern.concat(
          path + markupPath + '/hydrogen/**/*'
        );
        ignorePattern = ignorePattern.concat(
          path + markupPath + '/*/hydrogen.css'
        );
        ignorePattern = ignorePattern.concat(
          path + markupPath + '/*/hydrogen/**/*'
        );
      });
      if (
        config.folders.scripts != undefined &&
        config.folders.scripts != '' &&
        config.folders.scripts != []
      ) {
        if (Array.isArray(config.folders.scripts) == true) {
          config.folders.scripts.forEach(function (scriptPath, index, array) {
            ignorePattern = ignorePattern.concat(
              path + scriptPath + '/hydrogen.css'
            );
            ignorePattern = ignorePattern.concat(
              path + scriptPath + '/hydrogen-variables.scss'
            );
            ignorePattern = ignorePattern.concat(
              path + scriptPath + '/hydrogen/**/*'
            );
            ignorePattern = ignorePattern.concat(
              path + scriptPath + '/*/hydrogen.css'
            );
            ignorePattern = ignorePattern.concat(
              path + scriptPath + '/*/hydrogen/**/*'
            );
          });

          return ignorePattern;
        } else {
          ignorePattern = ignorePattern.concat(
            path + config.folders.scripts + '/hydrogen.css'
          );
          ignorePattern = ignorePattern.concat(
            path + config.folders.scripts + '/hydrogen-variables.scss'
          );
          ignorePattern = ignorePattern.concat(
            path + config.folders.scripts + '/hydrogen/**/*'
          );
          ignorePattern = ignorePattern.concat(
            path + config.folders.scripts + '/*/hydrogen.css'
          );
          ignorePattern = ignorePattern.concat(
            path + config.folders.scripts + '/*/hydrogen/**/*'
          );
          return ignorePattern;
        }
      } else {
        return ignorePattern;
      }
    } else {
      ignorePattern = ignorePattern.concat(
        path + config.folders.markup + '/hydrogen.css'
      );
      ignorePattern = ignorePattern.concat(
        path + config.folders.markup + '/hydrogen-variables.scss'
      );
      ignorePattern = ignorePattern.concat(
        path + config.folders.markup + '/hydrogen/**/*'
      );
      ignorePattern = ignorePattern.concat(
        path + config.folders.markup + '/*/hydrogen.css'
      );
      ignorePattern = ignorePattern.concat(
        path + config.folders.markup + '/*/hydrogen/**/*'
      );
      if (
        config.folders.scripts != undefined &&
        config.folders.scripts != '' &&
        config.folders.scripts != []
      ) {
        if (Array.isArray(config.folders.scripts) == true) {
          config.folders.scripts.forEach(function (scriptPath, index, array) {
            ignorePattern = ignorePattern.concat(
              path + scriptPath + '/hydrogen.css'
            );
            ignorePattern = ignorePattern.concat(
              path + scriptPath + '/hydrogen-variables.scss'
            );
            ignorePattern = ignorePattern.concat(
              path + scriptPath + '/hydrogen/**/*'
            );
            ignorePattern = ignorePattern.concat(
              path + scriptPath + '/*/hydrogen.css'
            );
            ignorePattern = ignorePattern.concat(
              path + scriptPath + '/*/hydrogen/**/*'
            );
          });

          return ignorePattern;
        } else {
          ignorePattern = ignorePattern.concat(
            path + config.folders.scripts + '/hydrogen.css'
          );
          ignorePattern = ignorePattern.concat(
            path + config.folders.scripts + '/hydrogen-variables.scss'
          );
          ignorePattern = ignorePattern.concat(
            path + config.folders.scripts + '/hydrogen/**/*'
          );
          ignorePattern = ignorePattern.concat(
            path + config.folders.scripts + '/*/hydrogen.css'
          );
          ignorePattern = ignorePattern.concat(
            path + config.folders.scripts + '/*/hydrogen/**/*'
          );

          return ignorePattern;
        }
      } else {
        return ignorePattern;
      }
    }
  }
}

// Clean the CSS.
async function createCleanCSS(env) {
  console.time(
    'Hydrogen ' + '[TIMELOG]'.magenta + ' Code scrape and CSS build time was',
    'cleanTime'
  );
  var defaults = loadH2Defaults(env);
  var config = loadH2Config(env);
  var path = getH2DestinationPath(env);
  var output = getH2OutputDirectory(env);
  var destPath = path + output;
  // console.log('output path: ', output);
  // Reset the variables.
  var hydrogen = '';
  var flexgridWarning = false;
  var mediaMap = loadMediaMap(env);
  var fontFaceCSS = setFontFaceCSS(env);
  // Get all instances of Hydrogen data attributes (data-h2-*="*").
  var dataRegex =
    /data-h2-([^=\s'"]+)(\s|(=|["']+:+ ?)(\\)?["'{]([^"'}]*)["'}]{1})/g;
  // Returns string matches for data-h2-XXX="XXX"
  // Returns key/value matches for data-h2-XXX": "XXX"
  // Get the utility portion of the attribute (data-h2-*).
  var utilityRegex = /data-h2-(?:([^"'=\s]*)|([^\s]+))/g;
  // Get individual attribute values (x(y)).
  var valueRegex = /([^"' ]*?)\(([^)]*)\)/g;
  // Get the temporary core Hydrogen.
  var hydrogenCoreCSS = fs
    .readFileSync(destPath + '/hydrogen/compressed/core.css')
    .toString();
  // Get the temporary compressed Hydrogen file, located in the user's specified location in the config.
  // console.log('sampleCSS file: ', hydrogenUtilityCSS);
  // Set up a variable list of arrays for each media query in the config. Thanks Chris Wiseman!
  let queries = {
    b: [],
    'b:dark': [],
  };
  if (
    config.media != null &&
    config.media != undefined &&
    config.media.length > 0
  ) {
    config.media.forEach(function (mediaQuery) {
      queries[mediaQuery.key] = [];
      queries[mediaQuery.key + ':dark'] = [];
    });
  } else {
    defaults.media.forEach(function (mediaQuery) {
      queries[mediaQuery.key] = [];
    });
  }
  // console.log(queries);
  // Set up a string variable for our final CSS file and assemble font face, and the core.
  hydrogen = '' + fontFaceCSS + hydrogenCoreCSS;
  // We'll then have to parse through each one and break things apart by media query, and add the * selector...
  // e.g. data-h2-bg-color="b(red) m(yellow)" needs to become [data-h2-bg-color*="b(red)"] and [data-h2-bg-color*="m(yellow)"]
  var fullUsedAttributes = [];
  // Get the input values based the user's config.
  var input = createInputPattern(env);
  // console.log(input);
  // Generate the ignore list so that Hydrogen doesn't process itself.
  var inputIgnore = createInputIgnorePattern(env);
  // console.log(inputIgnore);
  // Load the user's input.
  var files = glob.sync(input, {
    ignore: inputIgnore,
  });
  // console.log(files);
  if (files.length > 0) {
    // Loop through each file, load it as a string and then Regex it for Hydrogen attributes.
    for (let item in files) {
      if (fs.lstatSync(files[item]).isDirectory() == false) {
        var read = fs.readFileSync(files[item]).toString();
        var matches = read.match(dataRegex);
        if (matches != null) {
          fullUsedAttributes = fullUsedAttributes.concat(matches);
        }
      }
    }
  } else {
    console.error(
      'Hydrogen',
      '[ERROR]'.red,
      "It doesn't look like the directories in your configuration folder contain any files. Hydrogen will compile, but only the base and reset styles."
    );
  }
  // This now removes duplicates from the array before running the Clean script, drastically reducing time.
  function uniq(a) {
    return Array.from(new Set(a));
  }
  // console.log('old', fullUsedAttributes);
  var usedAttributes = uniq(fullUsedAttributes);
  // console.log('new', usedAttributes);
  // console.log(usedAttributes);
  if (usedAttributes.length == 0) {
    console.error(
      'Hydrogen',
      '[ERROR]'.red,
      "Hydrogen couldn't find any attributes in your code. Hydrogen will compile, but only the base and reset styles."
    );
  }
  usedAttributes.forEach(function (attribute) {
    // console.log(attribute);
    var utility = attribute.match(utilityRegex);
    var values = attribute.match(valueRegex);
    // console.log("Utility:", utility[0]);
    // console.log('Values inside each attribute:', values);
    if (values != null) {
      values.forEach(function (value) {
        // console.log(value);
        // Get the media query set for this particular value.
        var mediaValue = value.match(/^.[^:(]*(:dark)*/g); // Returns media value: x
        var stateValue = value.match(/:.{1}/g); // Returns a state value or null (:n)
        // console.log(value, mediaValue, mediaVariable);
        // console.log('media query: ', mediaValue);
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
          // This if statement is required to work around the nested nature of the flex-grid CSS. All of the grid CSS is applied to the file at the end of the build every time until this can be solved.
          var newRegEx;
          var mediaVariable = value.replace(mediaValue, 'MEDIAKEY');
          // This regex has performance implications. The first section searches for the beginning of the file or any } character and then works its way through to find the applicable utility. From there, it finds all content to the following }, without including it. As a result, we need to modify the resulting match so that the starting } is removed if it exists, and a } is added to the end.
          newRegEx =
            '(^|})([^}]*)\\[' +
            utility +
            '\\*="' +
            mediaVariable
              .replace(/\(/g, '\\(')
              .replace(/\)/g, '\\)')
              .replace(/\[/g, '\\[')
              .replace(/\]/g, '\\]') +
            '"\\][^{]*{[^}]*(?=})';
          // console.log(mediaVariable);
          var getUtility;
          if (
            utility[0] == 'data-h2-flex-grid' ||
            utility[0] == 'data-h2-flex-item'
          ) {
            getUtility = 'flex-grid';
          } else {
            getUtility = utility[0].replace('data-h2-', '');
          }
          // console.log(value);
          // console.log(newRegEx);
          var cssRegex = new RegExp(newRegEx, 'g');
          // console.log('css specific regex: ', cssRegex);
          // console.log('test css regex: ', /\[data-h2-bg-color\*="b\(red\)"\]{([^}])*}/g);
          var utilityCSS;
          if (
            fs.existsSync(
              destPath + '/hydrogen/compressed/' + getUtility + '.css'
            ) == false
          ) {
            if (getUtility == 'flex-grid') {
              if (flexgridWarning == false) {
                console.log(
                  'Hydrogen',
                  '[ERROR]'.red,
                  "It looks like you're using flex-grid in your code, but it hasn't been enabled in your config file."
                );
                flexgridWarning = true;
              } else {
                // Do nothing.
              }
            } else {
              console.log(
                'Hydrogen',
                '[WARNING]'.yellow,
                'There is an incorrect Hydrogen attribute',
                '('.bold.yellow + utility[0].bold.yellow + ')'.bold.yellow,
                'in your code.'
              );
            }
          } else {
            utilityCSS = fs
              .readFileSync(
                destPath + '/hydrogen/compressed/' + getUtility + '.css'
              )
              .toString();
            var cssMatch = utilityCSS.match(cssRegex); // Returns the full CSS selector: [data-hydrogen=VARVERSION] [data-h2-ATTRIBUTE*="MEDIA(VALUE)"]***{CSS}
            // console.log('css match values: ', cssMatch);
            // console.log("CSSMATCH:".green, cssMatch);
            if (cssMatch != null) {
              var cssFinal = [];
              cssMatch.forEach(function (match) {
                // Strip preceding } if it exists
                if (match.charAt(0) == '}') {
                  match = match.substr(1);
                }
                // Add the trailing } that was removed in the RegEx
                match = match + '}';
                // console.log("match", match);
                cssFinal = cssFinal.concat(
                  match.replace(/MEDIAKEY/g, mediaValue)
                );
              });
              // console.log(queries);
              // console.log(mediaValue);
              // console.log(queries[mediaValue]);
              queries[mediaValue] = queries[mediaValue].concat(cssFinal);
              // console.log(queries);
            } else {
              // console.log("You've used a value somewhere that doesn't match.", utility, mediaVariable);
              var opacityMatch = mediaVariable.match(
                /\[([\d]*[.].*|[\d]*[%])\]/g
              );
              if (opacityMatch != null && opacityMatch != false) {
                var brokenUtility = utility[0] + '="' + value + '"';
                console.log(
                  'Hydrogen',
                  '[WARNING]'.yellow,
                  "You're using an opacity modifier on",
                  brokenUtility.bold.yellow,
                  "that hasn't been configured."
                );
                console.log(
                  'Please ensure that your configuration file has this opacity value enabled inside the color definition.'
                    .gray
                );
              }
            }
          }
        } else {
          if (config.mediaWarnings != false) {
            console.log(
              'Hydrogen',
              '[WARNING]'.yellow,
              'There is a media query being used in your code',
              '('.bold.yellow + mediaValue[0].bold.yellow + ')'.bold.yellow,
              "that hasn't been defined in the media section of your configuration file."
            );
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
        console.log(
          'Hydrogen',
          '[WARNING]'.yellow,
          'There is a media query being used in your code',
          '('.bold.yellow + mediaValue[0].bold.yellow + ')'.bold.yellow,
          "that hasn't been defined in the media section of your configuration file."
        );
      }
    }
    // Append the media query to the CSS group.
    hydrogen = hydrogen + '@media' + queryValue[0].replace(/["']/g, '') + ' {';
    // Add the CSS to the media query.
    // console.log(queries[query]);
    queries[query].forEach(function (item) {
      // console.log(item);
      hydrogen = hydrogen + item;
    });
    // console.log(hydrogen);
    // Close the media query.
    hydrogen = hydrogen + '}';
  }
  // console.log('final css: ', hydrogen);
  // Create the cleaned folder and write the file.
  // Had to add this if check so that watch wouldn't fail if the directory already existed.
  if (fs.existsSync(destPath + '/hydrogen/cleaned') == true) {
    fs.rmdirSync(destPath + '/hydrogen/cleaned', {
      recursive: true,
    });
  }
  fs.mkdirSync(destPath + '/hydrogen/cleaned');
  fs.writeFileSync(
    destPath + '/hydrogen/cleaned/hydrogen.css',
    hydrogen,
    function (err) {
      if (err) {
        console.log('Hydrogen', '[ERROR]'.red, err);
      }
    }
  );
  console.timeEnd(
    'Hydrogen ' + '[TIMELOG]'.magenta + ' Code scrape and CSS build time was',
    'cleanTime'
  );
  await Promise.resolve('done?');
}

module.exports = createCleanCSS;
