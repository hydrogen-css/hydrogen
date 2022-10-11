function switchTheme() {
  let parent = document.querySelector('[data-h2]');
  let state = parent.getAttribute('data-h2');
  if (state.includes('theme')) {
    if (state.includes('dark')) {
      parent.setAttribute('data-h2', 'dark');
    } else {
      parent.setAttribute('data-h2', '');
    }
  } else {
    if (state.includes('dark')) {
      parent.setAttribute('data-h2', 'dark theme');
    } else {
      parent.setAttribute('data-h2', 'theme');
    }
  }
}

function switchMode() {
  let parent = document.querySelector('[data-h2]');
  let state = parent.getAttribute('data-h2');
  if (state.includes('dark')) {
    if (state.includes('theme')) {
      parent.setAttribute('data-h2', 'theme');
    } else {
      parent.setAttribute('data-h2', '');
    }
  } else {
    if (state.includes('theme')) {
      parent.setAttribute('data-h2', 'dark theme');
    } else {
      parent.setAttribute('data-h2', 'dark');
    }
  }
}
