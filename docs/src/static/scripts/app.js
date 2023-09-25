const body = document.querySelector('body');

// Get Hydrogen elements
let instances = document.querySelectorAll('[data-h2]');
let switcher = document.querySelector('#switcher');

// Toggle preference
function enable_mode_preference() {
  switcher.classList.add('pref');
  switcher.classList.remove('light', 'dark');
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    instances.forEach((hydrogen) => {
      hydrogen.dataset.h2 =
        hydrogen.dataset.h2.replace(/dark/g, '').replace(/light/g, '') + ' light';
    });
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    instances.forEach((hydrogen) => {
      hydrogen.dataset.h2 =
        hydrogen.dataset.h2.replace(/dark/g, '').replace(/light/g, '') + ' dark';
    });
  } else {
    instances.forEach((hydrogen) => {
      hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '').replace(/light/g, '');
    });
  }
  localStorage.removeItem('mode');
}

// Toggle light
function enable_mode_light() {
  switcher.classList.add('light');
  switcher.classList.remove('dark', 'pref');
  instances.forEach((hydrogen) => {
    hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '').replace(/light/g, '') + ' light';
  });
  localStorage.mode = 'light';
}

// Toggle dark
function enable_mode_dark() {
  switcher.classList.add('dark');
  switcher.classList.remove('light', 'pref');
  instances.forEach((hydrogen) => {
    hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '').replace(/light/g, '') + ' dark';
  });
  localStorage.mode = 'dark';
}

// Listeners
function watch_for_mode_changes() {
  if (
    (localStorage.mode && localStorage.mode === 'light') ||
    (!localStorage.mode && window.matchMedia('(prefers-color-scheme: light)').matches)
  ) {
    instances.forEach((hydrogen) => {
      hydrogen.dataset.h2 =
        hydrogen.dataset.h2.replace(/dark/g, '').replace(/light/g, '') + ' light';
    });
  } else if (
    (localStorage.mode && localStorage.mode === 'dark') ||
    (!localStorage.mode && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    instances.forEach((hydrogen) => {
      hydrogen.dataset.h2 =
        hydrogen.dataset.h2.replace(/dark/g, '').replace(/light/g, '') + ' dark';
    });
  } else {
    instances.forEach((hydrogen) => {
      hydrogen.dataset.h2 = hydrogen.dataset.h2.replace(/dark/g, '').replace(/light/g, '');
    });
  }
}
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => e.matches && watch_for_mode_changes());
window
  .matchMedia('(prefers-color-scheme: light)')
  .addEventListener('change', (e) => e.matches && watch_for_mode_changes());

// Switcher class storage check
if (!localStorage.mode) {
  switcher.setAttribute('class', 'pref');
} else {
  if (localStorage.mode === 'light') {
    switcher.setAttribute('class', 'light');
  } else if (localStorage.mode === 'dark') {
    switcher.setAttribute('class', 'dark');
  }
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

function toggle_menu(e) {
  let body = document.querySelector('body');
  let backdrop = document.querySelector('.mobile-menu-backdrop');
  let wrapper = e.closest('.mobile-menu');
  let links = wrapper.querySelectorAll('a');
  let buttons = wrapper.querySelectorAll('button:not(.mobile-menu-trigger)');
  if (wrapper.classList.contains('active')) {
    body.classList.remove('locked');
    backdrop.classList.remove('active');
    wrapper.classList.remove('active');
    links.forEach((link) => {
      link.setAttribute('tabindex', '-1');
    });
    buttons.forEach((button) => {
      button.setAttribute('tabindex', '-1');
    });
  } else {
    body.classList.add('locked');
    backdrop.classList.add('active');
    wrapper.classList.add('active');
    links.forEach((link) => {
      link.setAttribute('tabindex', '0');
    });
    buttons.forEach((button) => {
      button.setAttribute('tabindex', '0');
    });
  }
}

function capture_anchor_clicks() {
  let body = document.querySelector('body');
  let backdrop = document.querySelector('.mobile-menu-backdrop');
  let menu = document.querySelector('.mobile-menu');
  let links = menu.querySelectorAll('a');
  let buttons = menu.querySelectorAll('button:not(.mobile-menu-trigger)');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      if (e.target.getAttribute('href').includes('#')) {
        e.target.closest('.mobile-menu').classList.remove('active');
        body.classList.remove('locked');
        backdrop.classList.remove('active');
        links.forEach((link) => {
          link.setAttribute('tabindex', '-1');
        });
        buttons.forEach((button) => {
          button.setAttribute('tabindex', '-1');
        });
      }
    });
  });
}

capture_anchor_clicks();

function remove_mobile_menu_from_tab_order() {
  let menu = document.querySelector('.mobile-menu');
  let links = menu.querySelectorAll('a');
  let buttons = menu.querySelectorAll('button:not(.mobile-menu-trigger)');
  links.forEach((link) => {
    link.setAttribute('tabindex', '-1');
  });
  buttons.forEach((button) => {
    button.setAttribute('tabindex', '-1');
  });
}

remove_mobile_menu_from_tab_order();

// Home start handlers

function start_step_click(e) {
  document.querySelectorAll('.start-step-button').forEach((button) => {
    button.classList.remove('active');
  });
  document.querySelectorAll('.start-step-content').forEach((button) => {
    button.classList.remove('active');
  });
  e.classList.add('active');
  let step = e.getAttribute('data-step');
  document.querySelector(`[data-step="${step}"].start-step-content`).classList.add('active');
}

// Search

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    function get_visible_search() {
      let inputs = document.querySelectorAll('.search');
      let search;
      inputs.forEach((item) => {
        let parent = item.closest('.menu');
        if (window.getComputedStyle(parent).display == 'block') {
          search = item;
        }
      });
      return search;
    }
    function get_visible_results() {
      let inputs = document.querySelectorAll('.results');
      let results;
      inputs.forEach((item) => {
        let parent = item.closest('.menu');
        if (window.getComputedStyle(parent).display == 'block') {
          results = item;
        }
      });
      return results;
    }
    let search = get_visible_search();
    let results = get_visible_results();
    document.addEventListener('keyup', (event) => {
      if (event.ctrlKey && event.key == '/') {
        search.focus();
      }
    });
    search.addEventListener('keyup', (event) => {
      let input = event.target.value.toLowerCase();
      let input_array = input.split(' ');
      let total_matches = 0;
      console.log(input_array);
      if (input.length > 0) {
        results.classList.add('active');
        let pages = results.querySelectorAll('.result-item');
        pages.forEach((result) => {
          if (result.dataset.terms != 'undefined' && result.dataset.terms != undefined) {
            let terms = result.dataset.terms.split(',');
            let matches = [];
            terms.forEach((term) => {
              input_array.forEach((value) => {
                if (value != '') {
                  if (term.match(new RegExp('^' + value))) {
                    matches.push(term);
                  }
                }
              });
            });
            if (matches.length > 0) {
              result.classList.add('active');
              total_matches += matches.length;
            } else {
              result.classList.remove('active');
            }
          }
        });
        if (total_matches == 0) {
          results.querySelector('.null-state').classList.add('active');
        } else {
          results.querySelector('.null-state').classList.remove('active');
        }
      } else {
        results.classList.remove('active');
      }
    });
  }
};
