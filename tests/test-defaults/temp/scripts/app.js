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

function switchTestTheme() {
  let parent = document.querySelector('[data-h2]');
  let state = parent.getAttribute('data-h2');
  if (state.includes('dt')) {
    if (state.includes('dark')) {
      parent.setAttribute('data-h2', 'iap dark');
    } else {
      parent.setAttribute('data-h2', 'iap');
    }
  } else {
    if (state.includes('dark')) {
      parent.setAttribute('data-h2', 'dt dark');
    } else {
      parent.setAttribute('data-h2', 'dt');
    }
  }
}

function switchTestMode() {
  let parent = document.querySelector('[data-h2]');
  let state = parent.getAttribute('data-h2');
  if (state.includes('dark')) {
    if (state.includes('dt')) {
      parent.setAttribute('data-h2', 'dt');
    } else if (state.includes('iap')) {
      parent.setAttribute('data-h2', 'iap');
    } else {
      parent.setAttribute('data-h2', '');
    }
  } else {
    if (state.includes('dt')) {
      parent.setAttribute('data-h2', 'dt dark');
    } else if (state.includes('iap')) {
      parent.setAttribute('data-h2', 'iap dark');
    } else {
      parent.setAttribute('data-h2', 'dark');
    }
  }
}
