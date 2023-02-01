var fs = require('fs');
var path = require('path');

function releases() {
  try {
    let parsed_data = [];
    fs.readdirSync(path.resolve(process.cwd(), '../releases')).forEach(
      (file) => {
        if (file != 'index.js') {
          let change_data = require(path.resolve(
            process.cwd(),
            '../releases/' + file
          ));
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
        }
      }
    );
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
            if (
              release.major === major &&
              release.minor === minor &&
              release.patch === patch
            ) {
              if (
                release.beta &&
                !release_data[major][minor][patch].betas[release.beta]
              ) {
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
              if (
                release.major === major &&
                release.minor === minor &&
                release.patch === patch
              ) {
                release_data[major][minor][patch].release = release;
              }
            } else {
              Object.keys(release_data[major][minor][patch].betas).forEach(
                (beta, index) => {
                  if (
                    release.major === major &&
                    release.minor === minor &&
                    release.patch === patch &&
                    release.beta === beta
                  ) {
                    release_data[major][minor][patch].betas[beta] = release;
                  }
                }
              );
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
    fs.readdirSync(path.resolve(process.cwd(), '../releases')).forEach(
      (file) => {
        if (file != 'index.js') {
          let change_data = require(path.resolve(
            process.cwd(),
            '../releases/' + file
          ));
          if (change_data.featured) {
            parsed_data.push(change_data);
          }
        }
      }
    );
    return parsed_data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  releases,
  featured,
};
