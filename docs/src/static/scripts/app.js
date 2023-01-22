const body = document.querySelector('body');

window.onload = function () {
  var docsHead = document.querySelector('#docs_header').clientHeight;
  body.setAttribute('style', `--heightHack: ${docsHead}px`);
};

window.onresize = function () {
  var docsHead = document.querySelector('#docs_header').clientHeight;
  body.setAttribute('style', `--heightHack: ${docsHead}px`);
};

// Get Hydrogen elements
let instances = document.querySelectorAll('[data-h2]');
let switcher = document.querySelector('#switcher');

// Listeners
function check_for_dark_mode() {
  if (
    (window.matchMedia('(prefers-color-scheme: dark)').matches &&
      (localStorage.mode === undefined || localStorage.mode != 'light')) ||
    (localStorage.mode != undefined && localStorage.mode === 'dark')
  ) {
    instances.forEach((hydrogen) => {
      hydrogen.dataset.h2 = hydrogen.dataset.h2 + ' dark';
    });
  } else {
    instances.forEach((hydrogen) => {
      hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '');
    });
  }
}
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => e.matches && check_for_dark_mode());
window
  .matchMedia('(prefers-color-scheme: light)')
  .addEventListener('change', (e) => e.matches && check_for_dark_mode());

// Storage check
if (localStorage.mode != undefined) {
  if (localStorage.mode === 'dark') {
    switcher.classList.add('dark');
    switcher.classList.remove('light', 'pref');
    instances.forEach((hydrogen) => {
      hydrogen.dataset.h2 = hydrogen.dataset.h2 + ' dark';
    });
  } else if (localStorage.mode === 'light') {
    switcher.classList.add('light');
    switcher.classList.remove('dark', 'pref');
    instances.forEach((hydrogen) => {
      hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '');
    });
  }
} else if (
  localStorage.mode == undefined &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  switcher.classList.remove('light', 'dark', 'pref');
  instances.forEach((hydrogen) => {
    hydrogen.dataset.h2 = hydrogen.dataset.h2 + ' dark';
  });
}

// Toggles
function enable_mode_preference() {
  switcher.classList.add('pref');
  switcher.classList.remove('light', 'dark');
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    instances.forEach((hydrogen) => {
      if (!hydrogen.dataset.h2.includes('dark'))
        hydrogen.dataset.h2 = hydrogen.dataset.h2 + ' dark';
    });
  } else {
    instances.forEach((hydrogen) => {
      hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '');
    });
  }
  localStorage.removeItem('mode');
}
function enable_mode_light() {
  switcher.classList.add('light');
  switcher.classList.remove('dark', 'pref');
  instances.forEach((hydrogen) => {
    hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '');
  });
  localStorage.mode = 'light';
}
function enable_mode_dark() {
  switcher.classList.add('dark');
  switcher.classList.remove('light', 'pref');
  instances.forEach((hydrogen) => {
    if (!hydrogen.dataset.h2.includes('dark'))
      hydrogen.dataset.h2 = hydrogen.dataset.h2 + ' dark';
  });
  localStorage.mode = 'dark';
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
