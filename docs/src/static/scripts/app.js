const body = document.querySelector('body');

window.onload = function () {
  var docsHead = document.querySelector('#docs_header').clientHeight;
  body.setAttribute('style', `--heightHack: ${docsHead}px`);
};

window.onresize = function () {
  var docsHead = document.querySelector('#docs_header').clientHeight;
  body.setAttribute('style', `--heightHack: ${docsHead}px`);
};

// Listeners

function testDark() {
  var hydrogen = document.querySelectorAll('[data-h2]');
  if (
    (window.matchMedia('(prefers-color-scheme: dark)').matches &&
      (localStorage.theme === undefined || localStorage.theme != 'light')) ||
    (localStorage.theme != undefined && localStorage.theme === 'dark')
  ) {
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
    var switcher = document.querySelector('#switcher');
    switcher.classList.remove('light');
    switcher.classList.add('dark');
    switcher.classList.remove('pref');
    hydrogen.forEach(function (item) {
      item.dataset.h2 = 'dark';
    });
  } else if (localStorage.theme === 'light') {
    var hydrogen = document.querySelectorAll('[data-h2]');
    var switcher = document.querySelector('#switcher');
    switcher.classList.add('light');
    switcher.classList.remove('dark');
    switcher.classList.remove('pref');
    hydrogen.forEach(function (item) {
      item.dataset.h2 = '';
    });
  }
} else if (
  localStorage.theme == undefined &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  var hydrogen = document.querySelectorAll('[data-h2]');
  var switcher = document.querySelector('#switcher');
  switcher.classList.remove('light');
  switcher.classList.remove('dark');
  switcher.classList.remove('pref');
  hydrogen.forEach(function (item) {
    item.dataset.h2 = 'dark';
  });
}

// Toggles

function enablePref() {
  var hydrogen = document.querySelectorAll('[data-h2]');
  var switcher = document.querySelector('#switcher');
  switcher.classList.remove('light');
  switcher.classList.remove('dark');
  switcher.classList.add('pref');
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
  var switcher = document.querySelector('#switcher');
  switcher.classList.add('light');
  switcher.classList.remove('dark');
  switcher.classList.remove('pref');
  hydrogen.forEach(function (item) {
    item.dataset.h2 = '';
  });
  localStorage.theme = 'light';
}

function enableDark() {
  var hydrogen = document.querySelectorAll('[data-h2]');
  var switcher = document.querySelector('#switcher');
  switcher.classList.remove('light');
  switcher.classList.add('dark');
  switcher.classList.remove('pref');
  hydrogen.forEach(function (item) {
    item.dataset.h2 = 'dark';
  });
  localStorage.theme = 'dark';
}

// Toggle main menu
function toggle_main_menu(e) {
  var button = e;
  var main_menu = button.closest('.main_menu');
  if (main_menu.classList.contains('showing')) {
    main_menu.classList.remove('showing');
  } else {
    main_menu.classList.add('showing');
  }
}

// Copy code
function copy_code(e) {
  var button = e;
  var code_wrapper = button.closest('.code_wrapper');
  var code_content = code_wrapper.querySelector('.code_content');
  // Select the text
  code_content.select();
  code_content.setSelectionRange(0, 99999);
  // Copy the text
  navigator.clipboard.writeText(code_content.value);
  // Add the confirmation class with time out so it reverts
  button.classList.add('copied');
  setTimeout(function () {
    button.classList.remove('copied');
  }, 2000);
}

// Expand collapse
function toggle_ec(e) {
  let trigger = e;
  let ec_wrapper = trigger.closest('.expand-collapse-wrapper');
  let ec_content = ec_wrapper.querySelector('.expand-collapse-content');
  // Toggle the wrapper
  if (ec_wrapper.classList.contains('active')) {
    ec_wrapper.classList.remove('active');
  } else {
    ec_wrapper.classList.add('active');
  }
}

// Themes
function toggle_glow(e) {
  let trigger = e;
  let wrapper = document.querySelector('[data-h2]');
  let mode = '';
  if (wrapper.dataset.h2.includes('dark')) {
    mode = 'dark';
  }
  wrapper.dataset.h2 = '' + mode;
}

function toggle_wave(e) {
  let trigger = e;
  let wrapper = document.querySelector('[data-h2]');
  let mode = '';
  if (wrapper.dataset.h2.includes('dark')) {
    mode = 'dark';
  }
  wrapper.dataset.h2 = 'wave ' + mode;
}

function toggle_neon(e) {
  let trigger = e;
  let wrapper = document.querySelector('[data-h2]');
  let mode = '';
  if (wrapper.dataset.h2.includes('dark')) {
    mode = 'dark';
  }
  wrapper.dataset.h2 = 'neon ' + mode;
}

function toggle_fern(e) {
  let trigger = e;
  let wrapper = document.querySelector('[data-h2]');
  let mode = '';
  if (wrapper.dataset.h2.includes('dark')) {
    mode = 'dark';
  }
  wrapper.dataset.h2 = 'fern ' + mode;
}
