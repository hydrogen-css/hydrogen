'use strict';

const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const del = require('del');

// Load Hydrogen's Configuration
var { loadH2Config } = require('../functions/config-load');

// Get Markup

function getUserMarkup(env) {
  var config = loadH2Config(env);
  var markupArray = ['!hydrogen.css', '!hydrogen/**/*'];
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
      markupArray = markupArray.concat(
        '!' + path + markupPath + '/hydrogen.css'
      );
      markupArray = markupArray.concat(
        '!' + path + markupPath + '/hydrogen/**/*'
      );
      markupArray = markupArray.concat(
        '!' + path + markupPath + '/*/hydrogen.css'
      );
      markupArray = markupArray.concat(
        '!' + path + markupPath + '/*/hydrogen/**/*'
      );
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
          markupArray = markupArray.concat(
            '!' + path + scriptPath + '/hydrogen.css'
          );
          markupArray = markupArray.concat(
            '!' + path + scriptPath + '/hydrogen/**/*'
          );
          markupArray = markupArray.concat(
            '!' + path + scriptPath + '/*/hydrogen.css'
          );
          markupArray = markupArray.concat(
            '!' + path + scriptPath + '/*/hydrogen/**/*'
          );
        });
        return markupArray;
      } else {
        markupArray = markupArray.concat(
          path + config.folders.scripts + '/**/*'
        );
        markupArray = markupArray.concat(
          '!' + path + config.folders.scripts + '/hydrogen.css'
        );
        markupArray = markupArray.concat(
          '!' + path + config.folders.scripts + '/hydrogen/**/*'
        );
        markupArray = markupArray.concat(
          '!' + path + config.folders.scripts + '/*/hydrogen.css'
        );
        markupArray = markupArray.concat(
          '!' + path + config.folders.scripts + '/*/hydrogen/**/*'
        );
        return markupArray;
      }
    } else {
      return markupArray;
    }
    // console.timeLog('Compile Time');
  } else {
    markupArray = markupArray.concat(path + config.folders.markup + '/**/*');
    markupArray = markupArray.concat(
      '!' + path + config.folders.markup + '/hydrogen.css'
    );
    markupArray = markupArray.concat(
      '!' + path + config.folders.markup + '/hydrogen/**/*'
    );
    markupArray = markupArray.concat(
      '!' + path + config.folders.markup + '/*/hydrogen.css'
    );
    markupArray = markupArray.concat(
      '!' + path + config.folders.markup + '/*/hydrogen/**/*'
    );
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
          markupArray = markupArray.concat(
            '!' + path + scriptPath + '/hydrogen.css'
          );
          markupArray = markupArray.concat(
            '!' + path + scriptPath + '/hydrogen/**/*'
          );
          markupArray = markupArray.concat(
            '!' + path + scriptPath + '/*/hydrogen.css'
          );
          markupArray = markupArray.concat(
            '!' + path + scriptPath + '/*/hydrogen/**/*'
          );
        });
        return markupArray;
      } else {
        markupArray = markupArray.concat(
          path + config.folders.scripts + '/**/*'
        );
        markupArray = markupArray.concat(
          '!' + path + config.folders.scripts + '/hydrogen.css'
        );
        markupArray = markupArray.concat(
          '!' + path + config.folders.scripts + '/hydrogen/**/*'
        );
        markupArray = markupArray.concat(
          '!' + path + config.folders.scripts + '/*/hydrogen.css'
        );
        markupArray = markupArray.concat(
          '!' + path + config.folders.scripts + '/*/hydrogen/**/*'
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
