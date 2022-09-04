// Listeners

function testDark() {
  var hydrogen = document.querySelectorAll('[data-h2]');
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    hydrogen.forEach(function (item) {
      item.dataset.h2 = 'dark';
    });
  } else {
    hydrogen.forEach(function (item) {
      item.dataset.h2 = '';
    });
  }
}
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => e.matches && testDark());
window
  .matchMedia('(prefers-color-scheme: light)')
  .addEventListener('change', (e) => e.matches && testDark());

// Storage check

if (localStorage.theme != undefined) {
  if (localStorage.theme === 'dark') {
    var hydrogen = document.querySelectorAll('[data-h2]');
    hydrogen.forEach(function (item) {
      item.dataset.h2 = 'dark';
    });
  }
} else if (
  localStorage.theme == undefined &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  var hydrogen = document.querySelectorAll('[data-h2]');
  hydrogen.forEach(function (item) {
    item.dataset.h2 = 'dark';
  });
}

// Toggles

function enablePref() {
  var hydrogen = document.querySelectorAll('[data-h2]');
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    hydrogen.forEach(function (item) {
      item.dataset.h2 = 'dark';
    });
  } else {
    hydrogen.forEach(function (item) {
      item.dataset.h2 = '';
    });
  }
  localStorage.removeItem('theme');
}

function enableLight() {
  var hydrogen = document.querySelectorAll('[data-h2]');
  hydrogen.forEach(function (item) {
    item.dataset.h2 = '';
  });
  localStorage.theme = 'light';
}

function enableDark() {
  var hydrogen = document.querySelectorAll('[data-h2]');
  hydrogen.forEach(function (item) {
    item.dataset.h2 = 'dark';
  });
  localStorage.theme = 'dark';
}
