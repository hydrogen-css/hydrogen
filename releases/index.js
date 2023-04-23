// Hydrogen
'use strict';

// Data models

// Data imports

// Local functions

// Helper functions

// Vendor imports
var exec = require('child_process').execSync;
const { glob } = require('glob');
var path = require('path');

// External data imports
const stable_version = exec('npm view @hydrogen-css/hydrogen@latest version').toString().trim();
const beta_version = exec('npm view @hydrogen-css/hydrogen@beta version').toString().trim();

// Script ==========================================================================================

function releases() {
  try {
    let parsed_data = [];
    let file_list = glob.sync(path.resolve(process.cwd(), '../releases/**/*.js'), {
      ignore: [path.resolve(process.cwd(), '../releases/index.js')],
    });
    file_list.forEach((file) => {
      let change_data = require(file);
      // Get the major, minor, and patch values from the file
      const version = change_data.version;
      const version_numbers = version.match(/\d+/g);
      change_data.major = version_numbers[0];
      change_data.minor = version_numbers[1];
      change_data.patch = version_numbers[2];
      change_data.beta = false;
      if (version.includes('beta') && version_numbers[3]) {
        change_data.beta = version_numbers[3];
      }
      parsed_data = parsed_data.concat(change_data);
    });
    let release_data = {};
    // Create major releases
    parsed_data.forEach((release) => {
      if (!release_data[release.major]) {
        release_data[release.major] = {};
      }
    });
    // Create minor releases
    Object.keys(release_data).forEach((major, index) => {
      parsed_data.forEach((release) => {
        if (release.major === major && !release_data[major][release.minor]) {
          release_data[major][release.minor] = {};
        }
      });
    });
    // Create patches
    Object.keys(release_data).forEach((major, index) => {
      Object.keys(release_data[major]).forEach((minor, index) => {
        parsed_data.forEach((release) => {
          if (
            release.major === major &&
            release.minor === minor &&
            !release_data[major][minor][release.patch]
          ) {
            release_data[major][minor][release.patch] = {
              release: {},
              betas: {},
            };
          }
        });
      });
    });
    // Create betas
    parsed_data.forEach((release) => {
      Object.keys(release_data).forEach((major, index) => {
        Object.keys(release_data[major]).forEach((minor, index) => {
          Object.keys(release_data[major][minor]).forEach((patch, index) => {
            if (release.major === major && release.minor === minor && release.patch === patch) {
              if (release.beta && !release_data[major][minor][patch].betas[release.beta]) {
                release_data[major][minor][patch].betas[release.beta] = {};
              }
            }
          });
        });
      });
    });
    // Add the releases to the newly constructed object
    parsed_data.forEach((release) => {
      Object.keys(release_data).forEach((major, index) => {
        Object.keys(release_data[major]).forEach((minor, index) => {
          Object.keys(release_data[major][minor]).forEach((patch, index) => {
            if (!release.beta) {
              if (release.major === major && release.minor === minor && release.patch === patch) {
                release_data[major][minor][patch].release = release;
              }
            } else {
              Object.keys(release_data[major][minor][patch].betas).forEach((beta, index) => {
                if (
                  release.major === major &&
                  release.minor === minor &&
                  release.patch === patch &&
                  release.beta === beta
                ) {
                  release_data[major][minor][patch].betas[beta] = release;
                }
              });
            }
          });
        });
      });
    });
    return release_data;
  } catch (error) {
    console.log(error);
  }
}

function featured() {
  try {
    let parsed_data = [];
    let file_list = glob.sync(path.resolve(process.cwd(), '../releases/**/*.js'), {
      ignore: [path.resolve(process.cwd(), '../releases/index.js')],
    });
    file_list.forEach((file) => {
      let change_data = require(file);
      if (change_data.featured) {
        parsed_data.push(change_data);
      }
    });
    return parsed_data;
  } catch (error) {
    console.log(error);
  }
}

function stable() {
  try {
    let stable_data = glob.sync(
      path.resolve(process.cwd(), '../releases/**/' + stable_version + '.js')
    );
    if (stable_data) {
      return require(stable_data[0]);
    } else {
      throw new Error('Release data for version ' + stable_version + ' could not be found.');
    }
  } catch (error) {
    console.log(error);
  }
}

function beta() {
  try {
    let beta_data = glob.sync(
      path.resolve(process.cwd(), '../releases/**/betas/' + beta_version + '.js')
    );
    if (beta_data) {
      return require(beta_data[0]);
    } else {
      throw new Error('Release data for version ' + beta_version + ' could not be found.');
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  releases,
  stable,
  beta,
  featured,
};
