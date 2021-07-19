function setFlexgridConfig(defaults, config) {
  if (config.flexgrid != null && config.flexgrid != undefined && config.flexgrid.enabled == true) {
    // console.log('Hydrogen: you\'ve successfully enabled flexgrid!');
    return true;
  } else {
    return false;
  }
}

function setFlexgridColumns(defaults, config) {
  if (config.flexgrid != null && config.flexgrid != undefined && config.flexgrid.columns != null && config.flexgrid.columns != undefined) {
    // console.log('Hydrogen: you\'ve set a custom grid column value!');
    return config.flexgrid.columns;
  } else {
    return defaults.flexgrid.columns;
  }
}

// Move the flexgrid core file.
function moveFlexgridCore(defaults, config, env) {
  var flexgridEnabled = setFlexgridConfig(defaults, config);
  if (flexgridEnabled == true) {
    if (env == "dev") {
      return src('./lib/styles/utilities/_core-flex-grid.scss')
        .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
    } else if (env == "prod") {
      return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_core-flex-grid.scss')
        .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
    }
  }
}

// Modify the cached version of H2's core.
function enableFlexgridCore(defaults, config, env) {
  var flexgridEnabled = setFlexgridConfig(defaults, config);
  if (flexgridEnabled == true) {
    if (env == "dev") {
      return src('./' + config.folders.styles + '/hydrogen/core.scss')
        .pipe(replace('// @use "utilities/core-flex-grid";', '@use "utilities/core-flex-grid";'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    } else if (env == "prod") {
      return src('./' + config.folders.styles + '/hydrogen/core.scss')
        .pipe(replace('// @use "utilities/core-flex-grid";', '@use "utilities/core-flex-grid";'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    }
  }
}

// Move the flexgrid utility file.
function moveFlexgrid(defaults, config, env) {
  var flexgridEnabled = setFlexgridConfig(defaults, config);
  var flexgridColumns = setFlexgridColumns(defaults, config);
  if (flexgridEnabled == true) {
    if (env == "dev") {
      return src('./lib/styles/utilities/_utility-flex-grid.scss')
        // Set the column variable to the user's specification, or use the default.
        .pipe(replace('$h2GridColumns: 12;', '$h2GridColumns: ' + flexgridColumns + ';'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
    } else if (env == "prod") {
      return src('./node_modules/@hydrogen-design-system/hydrogen.css/lib/styles/utilities/_utility-flex-grid.scss')
        // Set the column variable to the user's specification, or use the default.
        .pipe(replace('$h2GridColumns: 12;', '$h2GridColumns: ' + flexgridColumns + ';'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen/utilities'));
    }
  }
}

// Modify the cached version of H2.
function enableFlexgrid(defaults, config, env) {
  var flexgridEnabled = setFlexgridConfig(defaults, config);
  if (flexgridEnabled == true) {
    if (env == "dev") {
      return src('./' + config.folders.styles + '/hydrogen/utility.scss')
        .pipe(replace('// @use "utilities/utility-flex-grid" as flexGridStyles;', '@use "utilities/utility-flex-grid" as flexGridStyles;'))
        .pipe(replace('// @include flexGridStyles.h2-utility-flex-grid($mediaKey: "MEDIAKEY");', '@include flexGridStyles.h2-utility-flex-grid($mediaKey: "MEDIAKEY");'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    } else if (env == "prod") {
      return src('./' + config.folders.styles + '/hydrogen/compile.scss')
        .pipe(replace('// @use "utilities/utility-flex-grid" as flexGridStyles;', '@use "utilities/utility-flex-grid" as flexGridStyles;'))
        .pipe(replace('// @include flexGridStyles.h2-utility-flex-grid($mediaKey: $mediaKey);', '@include flexGridStyles.h2-utility-flex-grid($mediaKey: $mediaKey);'))
        .pipe(dest('./' + config.folders.styles + '/hydrogen'));
    }
  }
}

module.exports = {
  moveFlexgridCore,
  enableFlexgridCore,
  moveFlexgrid,
  enableFlexgrid
}