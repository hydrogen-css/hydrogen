'use strict';

const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const del = require('del');

// Load Hydrogen's Configuration
var { loadH2Config } = require('../functions/config-load');

// Get Markup

function getUserMarkup(env) {
  var config = loadH2Config(env);
  var markupArray = [];
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  // console.log(config.folders.scripts);
  if (Array.isArray(config.folders.markup) == true) {
    config.folders.markup.forEach(function (markupPath, index, array) {
      markupArray = markupArray.concat(path + markupPath + '/**/*');
    });
    // console.log('1', config.folders.markup);
    // console.log('2', markupArray);
    // return markupArray;
    if (
      config.folders.scripts != undefined &&
      config.folders.scripts != '' &&
      config.folders.scripts != []
    ) {
      if (Array.isArray(config.folders.scripts) == true) {
        config.folders.scripts.forEach(function (scriptPath, index, array) {
          markupArray = markupArray.concat(path + scriptPath + '/**/*');
        });
        return markupArray;
      } else {
        markupArray = markupArray.concat(
          path + config.folders.scripts + '/**/*'
        );
        return markupArray;
      }
    } else {
      return markupArray;
    }
    // console.timeLog('Compile Time');
  } else {
    markupArray = markupArray.concat(path + config.folders.markup + '/**/*');
    // console.log(config.folders.markup);
    // console.log(markupArray);
    // console.timeLog('Compile Time');
    // return markupArray;
    if (
      config.folders.scripts != undefined &&
      config.folders.scripts != '' &&
      config.folders.scripts != []
    ) {
      if (Array.isArray(config.folders.scripts) == true) {
        config.folders.scripts.forEach(function (scriptPath, index, array) {
          markupArray = markupArray.concat(path + scriptPath + '/**/*');
        });
        return markupArray;
      } else {
        markupArray = markupArray.concat(
          path + config.folders.scripts + '/**/*'
        );
        return markupArray;
      }
    } else {
      return markupArray;
    }
  }
}

function createUserMarkup(env) {
  var config = loadH2Config(env);
  var markupArray = getUserMarkup(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  return (
    src(markupArray)
      // return src(['./lib/stage/markup/**/*', './lib/stage/multimarkup/**/*'])
      .pipe(concat('markup.txt'))
      // This destination will have to be the CSS folder the user specifies.
      .pipe(dest(path + config.folders.styles + '/hydrogen/markup'))
  );
}

function cleanUserMarkup(env) {
  var config = loadH2Config(env);
  var path;
  if (env == 'dev') {
    path = './lib/stage/';
  } else if (env == 'prod') {
    path = './';
  }
  return del(path + config.folders.styles + '/hydrogen/markup/**/*');
}

module.exports = {
  createUserMarkup,
  cleanUserMarkup,
};
